from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User


router = APIRouter(
    prefix="/api",
    tags=["Gamification"],
)


MAX_HEARTS = 5


@router.post("/hearts/refill")
def refill_hearts(
    db: Session = Depends(get_db),
):
    user_id = 1

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

    user.hearts = MAX_HEARTS

    db.commit()
    db.refresh(user)

    return {
        "hearts": user.hearts,
        "message": "Hearts refilled!",
    }


@router.post("/hearts/practice")
def practice_for_heart(
    db: Session = Depends(get_db),
):
    user_id = 1

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

    if user.hearts >= MAX_HEARTS:
        return {
            "hearts": user.hearts,
            "message": "Hearts are already full.",
        }

    user.hearts += 1

    db.commit()
    db.refresh(user)

    return {
        "hearts": user.hearts,
        "message": "You earned a heart!",
    }