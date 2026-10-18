# BHUnetra Backend (FastAPI + PostgreSQL/PostGIS)

## Setup
1. Install Postgres with PostGIS (Postgres.app on Mac) and create a database: `createdb bhunetra`
2. Load the schema and sample data: `psql bhunetra -f database/bhunetra_dump.sql`
3. Create a virtual environment and install packages:
   `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`
4. Run the API: `uvicorn main:app --reload`
5. Open http://127.0.0.1:8000/docs

## Main endpoints
GET /health, /regions, /regions/{id}, /regions/{id}/snapshots, /regions/{id}/changes,
/regions/{id}/protected-zones, /alerts, POST /analysis
