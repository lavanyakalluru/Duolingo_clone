from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine, migrate_existing_database
from . import models
from .seed import reset_legacy_demo_progress, upgrade_seed_lesson_titles
from .routes.user import router as user_router
from .routes.path import router as path_router
from .routes.lessons import router as lessons_router
from .routes.gamification import router as gamification_router
from .routes.profile import router as profile_router
from .routes.leaderboard import router as leaderboard_router
Base.metadata.create_all(bind=engine)
migrate_existing_database()
upgrade_seed_lesson_titles()
reset_legacy_demo_progress()


app = FastAPI(
    title="Duolingo Clone API",
    description="Backend API for the Duolingo Fullstack Assignment",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(path_router)
app.include_router(lessons_router)
app.include_router(gamification_router)
app.include_router(profile_router)
app.include_router(leaderboard_router)
@app.get("/")
def root():
    return {
        "message": "Duolingo Clone API is running"
    }
