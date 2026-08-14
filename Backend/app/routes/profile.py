from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    User,
    UserSkillProgress,
    UserLessonProgress,
)


router = APIRouter(
    prefix="/api",
    tags=["Profile"],
)


@router.get("/profile")
def get_profile(
    db: Session = Depends(get_db),
):
    user_id = 1

    # -----------------------------------------
    # 1. Get user
    # -----------------------------------------

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    # -----------------------------------------
    # 2. Count completed skills
    # -----------------------------------------

    completed_skills = (
        db.query(UserSkillProgress)
        .filter(
            UserSkillProgress.user_id == user_id,
            UserSkillProgress.completed == True,
        )
        .count()
    )

    # -----------------------------------------
    # 3. Count completed lessons
    # -----------------------------------------

    completed_lessons = (
        db.query(UserLessonProgress)
        .filter(
            UserLessonProgress.user_id == user_id,
            UserLessonProgress.completed == True,
        )
        .count()
    )

    # -----------------------------------------
    # 4. Return profile
    # -----------------------------------------

    return {
        "id": user.id,
        "username": user.username,

        "streak": user.streak,

        "total_xp": user.total_xp,

        "hearts": user.hearts,

        "gems": user.gems,

        "daily_xp": user.daily_xp,

        "daily_goal": user.daily_goal,

        "completed_skills": completed_skills,

        "completed_lessons": completed_lessons,

        # Achievements will be added later
        "achievements": [],
    }