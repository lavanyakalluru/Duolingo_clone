from datetime import date, datetime
from typing import Any, List, Optional

from pydantic import BaseModel, ConfigDict, Field


# ============================================================
# USER SCHEMAS
# ============================================================

class UserBase(BaseModel):
    username: str


class UserResponse(UserBase):
    id: int
    streak: int
    total_xp: int
    hearts: int
    gems: int
    daily_xp: int
    daily_goal: int
    last_activity_date: Optional[date] = None

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# COURSE SCHEMAS
# ============================================================

class CourseResponse(BaseModel):
    id: int
    name: str
    language: str
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# UNIT SCHEMAS
# ============================================================

class UnitResponse(BaseModel):
    id: int
    course_id: int
    title: str
    description: Optional[str] = None
    order_index: int

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# SKILL SCHEMAS
# ============================================================

class SkillBase(BaseModel):
    title: str
    description: Optional[str] = None
    order_index: int


class SkillResponse(SkillBase):
    id: int
    unit_id: int
    xp_reward: int
    required_skill_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# SKILL PROGRESS
# ============================================================

class SkillProgressResponse(BaseModel):
    skill_id: int
    progress: int
    completed: bool
    crowns: int

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# LEARNING PATH
# ============================================================

class PathSkillResponse(BaseModel):
    """
    This is what the frontend needs to render
    each skill/node on the learning path.
    """

    id: int
    title: str
    description: Optional[str] = None

    status: str
    # Possible values:
    #
    # "locked"
    # "available"
    # "completed"

    progress: int
    crowns: int

    xp_reward: int


class PathUnitResponse(BaseModel):
    """
    Represents one unit in the learning path.
    """

    id: int
    title: str
    description: Optional[str] = None

    order_index: int

    skills: List[PathSkillResponse]


class LearningPathResponse(BaseModel):
    """
    Complete learning path returned to Next.js.
    """

    course_id: int
    course_name: str
    language: str

    units: List[PathUnitResponse]


# ============================================================
# EXERCISE SCHEMAS
# ============================================================

class ExerciseResponse(BaseModel):
    """
    Exercise sent to the frontend.

    IMPORTANT:
    We intentionally DO NOT include correct_answer.
    """

    id: int
    lesson_id: int

    type: str

    question: str

    options: Optional[List[str]] = None

    data: Optional[Any] = None

    order_index: int


# ============================================================
# LESSON SCHEMAS
# ============================================================

class LessonSummaryResponse(BaseModel):
    id: int
    skill_id: int
    title: str
    order_index: int
    xp_reward: int

    model_config = ConfigDict(from_attributes=True)


class LessonResponse(BaseModel):
    """
    Complete lesson returned to the frontend.
    """

    id: int
    skill_id: int
    title: str

    xp_reward: int

    exercises: List[ExerciseResponse]


# ============================================================
# ANSWER SUBMISSION
# ============================================================


# ============================================================
# ANSWER RESULT
# ============================================================

class AnswerRequest(BaseModel):
    exercise_id: int
    answer: Any
class AnswerResponse(BaseModel):
    correct: bool
    hearts: int
    message: str
    correct_answer: str | None = None

# ============================================================
# LESSON COMPLETION
# ============================================================

class LessonCompleteResponse(BaseModel):
    """
    Returned after successfully completing
    an entire lesson.
    """

    lesson_id: int

    completed: bool
    
    xp_earned: int

    total_xp: int

    hearts: int

    streak: int

    skill_progress: int

    skill_completed: bool

    next_skill_unlocked: bool

    daily_xp: int

    daily_goal: int

    correct_answers: int

    total_questions: int


class LessonCompleteRequest(BaseModel):
    correct_answers: int = Field(ge=0)
    total_questions: int = Field(gt=0)


# ============================================================
# HEARTS
# ============================================================

class HeartsResponse(BaseModel):
    hearts: int
    max_hearts: int = 5


# ============================================================
# DAILY GOAL
# ============================================================

class DailyGoalResponse(BaseModel):
    daily_xp: int
    daily_goal: int

    completed: bool

    progress_percentage: int


# ============================================================
# DAILY ACTIVITY
# ============================================================

class DailyActivityResponse(BaseModel):
    activity_date: date
    xp_earned: int

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# LEADERBOARD
# ============================================================

class LeaderboardEntry(BaseModel):
    rank: int
    user_id: int
    username: str
    total_xp: int


class LeaderboardResponse(BaseModel):
    entries: List[LeaderboardEntry]


# ============================================================
# ACHIEVEMENTS
# ============================================================

class AchievementResponse(BaseModel):
    id: int
    name: str
    description: str
    icon: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class UserAchievementResponse(BaseModel):
    id: int

    achievement: AchievementResponse

    earned_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ============================================================
# PROFILE
# ============================================================

class ProfileResponse(BaseModel):
    """
    Data needed for the learner profile page.
    """

    user_id: int
    username: str

    streak: int
    total_xp: int
    hearts: int
    gems: int

    completed_lessons: int
    completed_skills: int

    achievements: List[UserAchievementResponse]


# ============================================================
# PROGRESS
# ============================================================

class UserProgressResponse(BaseModel):
    user_id: int

    total_xp: int
    streak: int
    hearts: int
    gems: int

    daily_xp: int
    daily_goal: int

    skills: List[SkillProgressResponse]

    model_config = ConfigDict(from_attributes=True)
