#!/bin/sh
# Volume이 비어있으면 이미지에 포함된 chroma_db를 복사
if [ ! -f "/data/chroma_db/chroma.sqlite3" ] && [ -d "/app/chroma_db" ]; then
  echo "Initializing chroma_db in volume..."
  cp -r /app/chroma_db/* /data/chroma_db/
fi

exec uvicorn server:app --host 0.0.0.0 --port 8080
