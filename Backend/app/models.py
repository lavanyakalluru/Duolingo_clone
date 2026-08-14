from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Text,
    UniqueConstraint,
)

from sqlalchemy.orm import relationship

from .database import Base


# ============================================================
# USER
# ============================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(
        String(50),
        unique=True,
        nullable=False,
    )

    # -------------------------
    # Gamification
    # -------------------------

    streak = Column(
        Integer,
        default=0,
        nullable=False,
    )

    total_xp = Column(
        Integer,
        default=0,
        nullable=False,
    )

    hearts = Column(
        Integer,
        default=5,
        nullable=False,
    )

    gems = Column(
        Integer,
        default=500,
        nullable=False,
    )

    # -------------------------
    # Daily goal
    # -------------------------

    daily_xp = Column(
        Integer,
        default=0,
        nullable=False,
    )

    daily_goal = Column(
        Integer,
        default=30,
        nullable=False,
    )

    # Last day on which the user
    # performed learning activity
    last_activity_date = Column(
        Date,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # ========================================================
    # Relationships
    # ========================================================

    skill_progress = relationship(
        "UserSkillProgress",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    lesson_progress = relationship(
        "UserLessonProgress",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    daily_activities = relationship(
        "DailyActivity",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    achievements = relationship(
        "UserAchievement",
        back_populates="user",
        cascade="all, delete-orphan",
    )


# ============================================================
# COURSE
# ============================================================

class Course(Base):
    __tablename__ = "courses"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    language = Column(
        String(50),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # One course → many units
    units = relationship(
        "Unit",
        back_populates="course",
        cascade="all, delete-orphan",
    )


# ============================================================
# UNIT
# ============================================================

class Unit(Base):
    __tablename__ = "units"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    course_id = Column(
        Integer,
        ForeignKey("courses.id"),
        nullable=False,
    )

    title = Column(
        String(100),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    # Used to determine the order
    # of units in the learning path
    order_index = Column(
        Integer,
        nullable=False,
    )

    # ========================================================
    # Relationships
    # ========================================================

    course = relationship(
        "Course",
        back_populates="units",
    )

    # One unit → many skills
    skills = relationship(
        "Skill",
        back_populates="unit",
        cascade="all, delete-orphan",
    )


# ============================================================
# SKILL
# ============================================================

class Skill(Base):
    __tablename__ = "skills"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    unit_id = Column(
        Integer,
        ForeignKey("units.id"),
        nullable=False,
    )

    title = Column(
        String(100),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    order_index = Column(
        Integer,
        nullable=False,
    )

    # XP awarded when the skill is completed
    xp_reward = Column(
        Integer,
        default=20,
        nullable=False,
    )

    # --------------------------------------------------------
    # Self-referencing foreign key
    #
    # Example:
    #
    # Greetings      → NULL
    # Introductions  → Greetings.id
    # Numbers        → Introductions.id
    #
    # This allows us to determine which skill is required
    # before another skill becomes available.
    # --------------------------------------------------------

    required_skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=True,
    )

    # ========================================================
    # Relationships
    # ========================================================

    unit = relationship(
        "Unit",
        back_populates="skills",
    )

    # One skill → many lessons
    lessons = relationship(
        "Lesson",
        back_populates="skill",
        cascade="all, delete-orphan",
    )

    # Skill that must be completed before this skill
    required_skill = relationship(
        "Skill",
        remote_side=[id],
        foreign_keys=[required_skill_id],
        back_populates="dependent_skills",
    )

    # Skills that depend on this skill
    dependent_skills = relationship(
        "Skill",
        back_populates="required_skill",
        foreign_keys=[required_skill_id],
    )


# ============================================================
# LESSON
# ============================================================

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=False,
    )

    title = Column(
        String(100),
        nullable=False,
    )

    order_index = Column(
        Integer,
        nullable=False,
    )

    # XP awarded for completing the lesson
    xp_reward = Column(
        Integer,
        default=10,
        nullable=False,
    )

    # ========================================================
    # Relationships
    # ========================================================

    skill = relationship(
        "Skill",
        back_populates="lessons",
    )

    # One lesson → many exercises
    exercises = relationship(
        "Exercise",
        back_populates="lesson",
        cascade="all, delete-orphan",
    )


# ============================================================
# EXERCISE
# ============================================================

class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    lesson_id = Column(
        Integer,
        ForeignKey("lessons.id"),
        nullable=False,
    )

    # Possible values:
    #
    # multiple_choice
    # translate
    # match_pairs
    # fill_blank
    # type_answer
    #
    type = Column(
        String(30),
        nullable=False,
    )

    question = Column(
        Text,
        nullable=False,
    )

    # Correct answer.
    #
    # For simple exercises:
    # "Hello"
    #
    # For word-bank exercises:
    # ["Yo", "soy"]
    #
    # We store JSON strings in SQLite.
    correct_answer = Column(
        Text,
        nullable=False,
    )

    # Used mainly for multiple-choice questions.
    #
    # Example:
    # ["Hello", "Goodbye", "Thanks"]
    #
    # Stored as JSON text.
    options = Column(
        Text,
        nullable=True,
    )

    # Flexible JSON data for different exercise types.
    #
    # Example for word bank:
    #
    # {
    #   "word_bank": ["Yo", "soy", "un"]
    # }
    #
    # Example for match pairs:
    #
    # {
    #   "pairs": [
    #       ["Hello", "Hola"],
    #       ["Goodbye", "Adiós"]
    #   ]
    # }
    data = Column(
        Text,
        nullable=True,
    )

    # Order of the exercise inside a lesson
    order_index = Column(
        Integer,
        nullable=False,
    )

    # ========================================================
    # Relationships
    # ========================================================

    lesson = relationship(
        "Lesson",
        back_populates="exercises",
    )


# ============================================================
# USER SKILL PROGRESS
# ============================================================

class UserSkillProgress(Base):
    __tablename__ = "user_skill_progress"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=False,
    )

    # Percentage from 0 to 100
    progress = Column(
        Integer,
        default=0,
        nullable=False,
    )

    completed = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    # Number of crowns earned for the skill
    crowns = Column(
        Integer,
        default=0,
        nullable=False,
    )

    # One user can have only one progress record
    # for a particular skill.
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "skill_id",
            name="unique_user_skill",
        ),
    )

    # ========================================================
    # Relationships
    # ========================================================

    user = relationship(
        "User",
        back_populates="skill_progress",
    )

    skill = relationship(
        "Skill",
    )


# ============================================================
# USER LESSON PROGRESS
# ============================================================

class UserLessonProgress(Base):
    __tablename__ = "user_lesson_progress"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    lesson_id = Column(
        Integer,
        ForeignKey("lessons.id"),
        nullable=False,
    )

    completed = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    # How much XP was awarded for this lesson
    xp_earned = Column(
        Integer,
        default=0,
        nullable=False,
    )

    # Result snapshot from the completed lesson. These values let the
    # completion screen remain accurate after a refresh or a new session.
    correct_answers = Column(
        Integer,
        default=0,
        nullable=False,
    )

    total_questions = Column(
        Integer,
        default=0,
        nullable=False,
    )

    completed_at = Column(
        DateTime,
        nullable=True,
    )

    # Prevent duplicate progress records.
    #
    # A user can have only one record for
    # a particular lesson.
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "lesson_id",
            name="unique_user_lesson",
        ),
    )

    # ========================================================
    # Relationships
    # ========================================================

    user = relationship(
        "User",
        back_populates="lesson_progress",
    )

    lesson = relationship(
        "Lesson",
    )


# ============================================================
# DAILY ACTIVITY
# ============================================================

class DailyActivity(Base):
    __tablename__ = "daily_activity"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    # The day on which the user practiced
    activity_date = Column(
        Date,
        nullable=False,
    )

    # XP earned on that day
    xp_earned = Column(
        Integer,
        default=0,
        nullable=False,
    )

    # A user can have only one activity record
    # per day.
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "activity_date",
            name="unique_daily_activity",
        ),
    )

    # ========================================================
    # Relationships
    # ========================================================

    user = relationship(
        "User",
        back_populates="daily_activities",
    )


# ============================================================
# ACHIEVEMENT
# ============================================================

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    # Example: "🔥", "⭐", "🏆"
    icon = Column(
        String(20),
        nullable=True,
    )

    # Possible values:
    #
    # lessons_completed
    # total_xp
    # streak
    #
    requirement_type = Column(
        String(50),
        nullable=False,
    )

    requirement_value = Column(
        Integer,
        nullable=False,
    )

    # ========================================================
    # Relationships
    # ========================================================

    users = relationship(
        "UserAchievement",
        back_populates="achievement",
        cascade="all, delete-orphan",
    )


# ============================================================
# USER ACHIEVEMENT
# ============================================================

class UserAchievement(Base):
    __tablename__ = "user_achievements"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    achievement_id = Column(
        Integer,
        ForeignKey("achievements.id"),
        nullable=False,
    )

    earned_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # Prevent the same achievement from being
    # awarded to the same user multiple times.
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "achievement_id",
            name="unique_user_achievement",
        ),
    )

    # ========================================================
    # Relationships
    # ========================================================

    user = relationship(
        "User",
        back_populates="achievements",
    )

    achievement = relationship(
        "Achievement",
        back_populates="users",
    )
