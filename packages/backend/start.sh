#!/bin/sh
# 이미지에 포함된 chroma_db를 Volume에 항상 동기화 (기존 데이터 제거 후 복사)
if [ -d "/app/chroma_db" ]; then
  echo "Syncing chroma_db to volume..."
  rm -rf /data/chroma_db/*
  cp -r /app/chroma_db/* /data/chroma_db/
fi

exec uvicorn server:app --host 0.0.0.0 --port 8080
