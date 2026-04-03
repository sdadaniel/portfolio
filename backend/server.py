"""포트폴리오 RAG 챗봇 서버."""

import os
from contextlib import asynccontextmanager

import chromadb
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

load_dotenv()

CHROMA_DIR = os.getenv("CHROMA_DIR", "./chroma_db")
COLLECTION_NAME = "portfolio_docs"
EMBEDDING_MODEL = "intfloat/multilingual-e5-small"
TOP_K = 5
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

embedder: SentenceTransformer | None = None
collection: chromadb.Collection | None = None
openai_client: OpenAI | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global embedder, collection, openai_client
    embedder = SentenceTransformer(EMBEDDING_MODEL)
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    collection = client.get_collection(COLLECTION_NAME)
    openai_client = OpenAI()
    print(f"Loaded collection with {collection.count()} chunks")
    yield
    print("Shutting down...")


app = FastAPI(title="Portfolio RAG Chatbot", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """당신은 프론트엔드 개발자 곽성실의 포트폴리오 챗봇입니다.
제공된 컨텍스트를 기반으로 질문에 답변하세요.
컨텍스트에 없는 내용은 "해당 정보는 포트폴리오에 없습니다"라고 답하세요.
한국어로 답변하세요. 친절하고 전문적인 톤을 유지하세요."""


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


class ChatResponse(BaseModel):
    answer: str
    sources: list[str]


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="메시지를 입력해주세요.")

    # 1. 쿼리 임베딩
    query_embedding = embedder.encode(
        f"query: {req.message}", normalize_embeddings=True
    ).tolist()

    # 2. 벡터 검색
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=TOP_K,
    )
    context_chunks = results["documents"][0]
    sources = list({m["source"] for m in results["metadatas"][0]})

    # 3. 컨텍스트 조립
    context = "\n---\n".join(context_chunks)

    # 4. LLM 호출
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for h in req.history[-6:]:
        messages.append({"role": h["role"], "content": h["content"]})
    messages.append(
        {
            "role": "user",
            "content": f"[참고 컨텍스트]\n{context}\n\n[질문]\n{req.message}",
        }
    )

    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.3,
        max_tokens=1024,
    )

    return ChatResponse(
        answer=response.choices[0].message.content,
        sources=sources,
    )


@app.get("/health")
def health():
    count = collection.count() if collection else 0
    return {"status": "ok", "chunks": count}
