from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User
from ..schemas import UserResponse


router = APIRouter(
    prefix="/api",
    tags=["User"],
)


@router.get(
    "/user",
    response_model=UserResponse,
)
def get_current_user(
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.id == 1)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Default learner not found",
        )

    return user