#!/usr/bin/env bash
set -euo pipefail

echo "Waiting for database..."
python - <<'PY'
import os, time
import psycopg2

url = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@db:5432/sih')
for i in range(60):
    try:
        conn = psycopg2.connect(url)
        conn.close()
        print('Database is ready')
        break
    except Exception as e:
        print('DB not ready, retrying...', e)
        time.sleep(2)
else:
    raise SystemExit('Database not available')
PY

export FLASK_APP=wsgi.py

if [ ! -d "/app/migrations" ]; then
  echo "Initializing migrations..."
  flask db init
fi

echo "Running migrations..."
flask db migrate -m "auto" || true
flask db upgrade

echo "Seeding data..."
python - <<'PY'
from app import create_app
from app.seeds import run_seeds

app = create_app()
with app.app_context():
    run_seeds()
PY

# Warm download HF model cache (idempotent)
echo "Preparing QA model cache..."
python - <<'PY'
try:
    from transformers import pipeline
    pipeline('question-answering', model='distilbert-base-uncased-distilled-squad')
    print('Model cached successfully')
except Exception as e:
    print('Model cache step failed:', e)
PY

# If models exist, enable offline mode to avoid network pulls
if [ -d "/models" ] && [ "$(ls -A /models 2>/dev/null)" ]; then
  export TRANSFORMERS_OFFLINE=1
  export HF_HUB_OFFLINE=1
  echo "Transformers offline mode enabled"
fi

echo "Starting Flask..."
flask run --host=0.0.0.0 --port=5000

