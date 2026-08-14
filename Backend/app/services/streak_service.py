from datetime import date, timedelta

from ..models import User


def update_streak(
    user: User,
    activity_date: date,
) -> User:
    """
    Update the user's learning streak.

    Rules:
    - First activity: streak becomes 1
    - Same day: streak stays unchanged
    - Yesterday: streak increases by 1
    - Older than yesterday: streak resets to 1
    """

    last_activity = user.last_activity_date

    if last_activity is None:
        # First-ever activity
        user.streak = 1

    elif last_activity == activity_date:
        # Already practiced today.
        # Do not increase the streak again.
        pass

    elif last_activity == activity_date - timedelta(days=1):
        # Practiced yesterday.
        user.streak += 1

    else:
        # Missed one or more days.
        user.streak = 1

    # Record today's activity
    user.last_activity_date = activity_date

    return user