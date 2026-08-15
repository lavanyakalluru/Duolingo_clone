from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine, migrate_existing_database
from app import models
from app.seed import reset_legacy_demo_progress, upgrade_seed_lesson_titles
from app.routes.user import router as user_router
from app.routes.path import router as path_router
from app.routes.lessons import router as lessons_router
from app.routes.gamification import router as gamification_router
from app.routes.profile import router as profile_router
from app.routes.leaderboard import router as leaderboard_router
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
    allow_origins=["*"],
    allow_credentials=False,
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
