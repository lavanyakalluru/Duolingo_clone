from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import declarative_base, sessionmaker

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATABASE_URL = f"sqlite:///{BASE_DIR / 'app.db'}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def migrate_existing_database():
    """Apply the small additive migration needed by existing SQLite files."""
    inspector = inspect(engine)
    if "user_lesson_progress" not in inspector.get_table_names():
        return

    existing_columns = {
        column["name"] for column in inspector.get_columns("user_lesson_progress")
    }
    additions = {
        "correct_answers": "INTEGER NOT NULL DEFAULT 0",
        "total_questions": "INTEGER NOT NULL DEFAULT 0",
    }

    with engine.begin() as connection:
        for name, definition in additions.items():
            if name not in existing_columns:
                connection.execute(
                    text(f"ALTER TABLE user_lesson_progress ADD COLUMN {name} {definition}")
                )


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
