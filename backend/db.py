"""Database connection pool for BHUnetra (PostgreSQL + PostGIS)."""
import os

from psycopg.rows import dict_row
from psycopg_pool import ConnectionPool

# With Postgres.app on a Mac, no username/password is needed: libpq uses your
# computer's username automatically. Override with the DATABASE_URL environment
# variable if you ever need a different user, host or password.
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://localhost:5432/bhunetra")

pool = ConnectionPool(
    DATABASE_URL,
    min_size=1,
    max_size=5,
    kwargs={"row_factory": dict_row},
    open=False,  # opened in main.py when the app starts
)


def fetch_all(sql: str, params: tuple = ()) -> list[dict]:
    """Run a SELECT with parameters and return all rows as dicts."""
    with pool.connection() as conn:
        return conn.execute(sql, params).fetchall()


def fetch_one(sql: str, params: tuple = ()) -> dict | None:
    with pool.connection() as conn:
        return conn.execute(sql, params).fetchone()