from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User


router = APIRouter(
    prefix="/api",
    tags=["Leaderboard"],
)


@router.get("/leaderboard")
def get_leaderboard(
    db: Session = Depends(get_db),
):
    users = (
        db.query(User)
        .order_by(User.total_xp.desc())
        .limit(10)
        .all()
    )

    leaderboard = []

    for rank, user in enumerate(users, start=1):
        leaderboard.append(
            {
                "rank": rank,
                "user_id": user.id,
                "username": user.username,
                "total_xp": user.total_xp,
                "streak": user.streak,
            }
        )

    return {
        "leaderboard": leaderboard
    }