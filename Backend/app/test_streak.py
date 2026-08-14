from datetime import date

from app.services.streak_service import update_streak


class FakeUser:
    def __init__(self):
        self.streak = 0
        self.last_activity_date = None


# -----------------------------------------
# Test 1: First activity
# -----------------------------------------

user = FakeUser()

result = update_streak(
    user,
    date(2026, 8, 13)
)

print("Test 1:", result)
# Expected: 1


# -----------------------------------------
# Test 2: Consecutive day
# -----------------------------------------

result = update_streak(
    user,
    date(2026, 8, 14)
)

print("Test 2:", result)
# Expected: 2


# -----------------------------------------
# Test 3: Same day
# -----------------------------------------

result = update_streak(
    user,
    date(2026, 8, 14)
)

print("Test 3:", result)
# Expected: 2


# -----------------------------------------
# Test 4: Missed days
# -----------------------------------------

result = update_streak(
    user,
    date(2026, 8, 17)
)

print("Test 4:", result)
# Expected: 1