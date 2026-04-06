"""docs 폴더의 MD/PDF 파일을 읽어 ChromaDB에 임베딩하는 스크립트."""

import argparse
import os
import pathlib

import chromadb
import fitz  # pymupdf
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from openai import OpenAI

load_dotenv()

ROOT_DIR = pathlib.Path(__file__).resolve().parent.parent.parent
DOCS_DIRS = [
    str(ROOT_DIR / "docs"),
    str(ROOT_DIR / "packages" / "front" / "src" / "content"),
]
BACKEND_DIR = pathlib.Path(__file__).resolve().parent
CHROMA_DIR = os.getenv("CHROMA_DIR", str(BACKEND_DIR / "chroma_db"))
COLLECTION_NAME = "portfolio_docs"
EMBEDDING_MODEL = "text-embedding-3-small"

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=80,
    separators=["\n## ", "\n### ", "\n---", "\n\n", "\n", " "],
)


def read_md(path: str) -> str:
    with open(path, encoding="utf-8") as f:
        return f.read()


def read_pdf(path: str) -> str:
    doc = fitz.open(path)
    text = "\n".join(page.get_text() for page in doc)
    doc.close()
    return text


def load_documents(docs_dir: str) -> list[dict]:
    """docs 디렉토리를 재귀 탐색하여 문서 목록 반환."""
    documents: list[dict] = []
    base = pathlib.Path(docs_dir).resolve()

    for path in sorted(base.rglob("*")):
        if path.is_dir():
            continue
        ext = path.suffix.lower()
        rel = str(path.relative_to(base))

        if ext == ".md":
            text = read_md(str(path))
        elif ext == ".pdf":
            text = read_pdf(str(path))
        else:
            continue

        if not text.strip():
            continue

        documents.append({"text": text, "source": rel, "ext": ext})
    return documents


def ingest(reset: bool = False):
    documents = []
    for docs_dir in DOCS_DIRS:
        print(f"Loading documents from {docs_dir} ...")
        documents.extend(load_documents(docs_dir))
    print(f"Found {len(documents)} documents")

    # 청킹
    chunks: list[dict] = []
    for doc in documents:
        splits = splitter.split_text(doc["text"])
        for i, chunk_text in enumerate(splits):
            chunks.append(
                {
                    "id": f"{doc['source']}::{i}",
                    "text": chunk_text,
                    "metadata": {"source": doc["source"], "chunk_index": i},
                }
            )
    print(f"Created {len(chunks)} chunks")

    # ChromaDB 준비
    client = chromadb.PersistentClient(path=CHROMA_DIR)

    if reset:
        print("Resetting: 기존 컬렉션 삭제 후 재생성")
        try:
            client.delete_collection(COLLECTION_NAME)
        except Exception:
            pass
        collection = client.create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )
    else:
        collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )
        # 이미 있는 ID 제외
        existing_ids = set(collection.get()["ids"])
        chunks = [c for c in chunks if c["id"] not in existing_ids]
        if not chunks:
            print("새로 추가할 문서가 없습니다.")
            return
        print(f"새로 추가할 청크: {len(chunks)}개 (기존 {len(existing_ids)}개 유지)")

    # 임베딩
    print(f"Using OpenAI embedding model: {EMBEDDING_MODEL} ...")
    client_openai = OpenAI()
    texts_to_embed = [c["text"] for c in chunks]
    response = client_openai.embeddings.create(model=EMBEDDING_MODEL, input=texts_to_embed)
    embeddings = [item.embedding for item in response.data]

    collection.add(
        ids=[c["id"] for c in chunks],
        embeddings=embeddings,
        documents=[c["text"] for c in chunks],
        metadatas=[c["metadata"] for c in chunks],
    )
    print(f"Saved {len(chunks)} chunks to ChromaDB at {CHROMA_DIR}")
    print(f"총 청크 수: {collection.count()}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="포트폴리오 문서 임베딩")
    parser.add_argument("--reset", action="store_true", help="기존 데이터 삭제 후 전체 재생성")
    args = parser.parse_args()
    ingest(reset=args.reset)
