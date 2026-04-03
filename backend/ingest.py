"""docs 폴더의 MD/PDF 파일을 읽어 ChromaDB에 임베딩하는 스크립트."""

import os
import pathlib

import chromadb
import fitz  # pymupdf
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer

load_dotenv()

DOCS_DIR = os.getenv("DOCS_DIR", "../docs")
CHROMA_DIR = os.getenv("CHROMA_DIR", "./chroma_db")
COLLECTION_NAME = "portfolio_docs"
EMBEDDING_MODEL = "intfloat/multilingual-e5-small"

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


def ingest():
    print(f"Loading documents from {DOCS_DIR} ...")
    documents = load_documents(DOCS_DIR)
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

    # 임베딩
    print(f"Loading embedding model: {EMBEDDING_MODEL} ...")
    model = SentenceTransformer(EMBEDDING_MODEL)
    texts_to_embed = [f"passage: {c['text']}" for c in chunks]
    embeddings = model.encode(texts_to_embed, show_progress_bar=True, normalize_embeddings=True)

    # ChromaDB 저장
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    # 기존 컬렉션 있으면 삭제 후 재생성
    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass
    collection = client.create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )

    collection.add(
        ids=[c["id"] for c in chunks],
        embeddings=embeddings.tolist(),
        documents=[c["text"] for c in chunks],
        metadatas=[c["metadata"] for c in chunks],
    )
    print(f"Saved {len(chunks)} chunks to ChromaDB at {CHROMA_DIR}")


if __name__ == "__main__":
    ingest()
