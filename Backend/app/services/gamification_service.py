from datetime import datetime

from sqlalchemy.orm import Session

from ..models import User, DailyActivity


MAX_HEARTS = 5


def award_xp(
    db: Session,
    user: User,
    xp: int,
):
    """
    Award XP to a user and update today's
    activity record.
    """

    user.total_xp += xp

    today = datetime.utcnow().date()

    activity = (
        db.query(DailyActivity)
        .filter(
            DailyActivity.user_id == user.id,
            DailyActivity.activity_date == today,
        )
        .first()
    )

    if activity:
        activity.xp_earned += xp
    else:
        activity = DailyActivity(
            user_id=user.id,
            activity_date=today,
            xp_earned=xp,
        )

        db.add(activity)

    # Keep the user daily XP synchronized
    # with today's activity.
    user.daily_xp = activity.xp_earned

    return user


def lose_heart(
    db: Session,
    user: User,
):
    """
    Remove one heart from the learner.

    Hearts can never go below zero.
    """

    if user.hearts > 0:
        user.hearts -= 1

    return user


def refill_hearts(
    db: Session,
    user: User,
):
    """
    Mocked heart refill.
    """

    user.hearts = MAX_HEARTS

    return user