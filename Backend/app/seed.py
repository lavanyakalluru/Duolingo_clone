import json
from datetime import date

from .database import Base, SessionLocal, engine
from .models import (
    User,
    Course,
    Unit,
    Skill,
    Lesson,
    Exercise,
    UserSkillProgress,
    UserLessonProgress,
    DailyActivity,
)


# ---------------------------------------------------------
# Database setup
# ---------------------------------------------------------

Base.metadata.create_all(bind=engine)


# ---------------------------------------------------------
# Helper functions
# ---------------------------------------------------------

def create_exercise(
    lesson,
    exercise_type,
    question,
    correct_answer,
    order_index,
    options=None,
    data=None,
):
    exercise = Exercise(
        lesson_id=lesson.id,
        type=exercise_type,
        question=question,
        correct_answer=(
            json.dumps(correct_answer)
            if isinstance(correct_answer, list)
            else correct_answer
        ),
        options=json.dumps(options) if options else None,
        data=json.dumps(data) if data else None,
        order_index=order_index,
    )

    return exercise


# ---------------------------------------------------------
# Course content
# ---------------------------------------------------------

COURSE_DATA = [
    {
        "title": "First Steps",
        "skills": [
            {
                "title": "Greetings",
                "description": "Learn basic Spanish greetings.",
                "lesson_titles": [
                    "Say hello and goodbye",
                    "Say thanks and be polite",
                ],
                "vocabulary": [
                    ("Hello", "Hola"),
                    ("Goodbye", "Adiós"),
                    ("Thank you", "Gracias"),
                    ("Please", "Por favor"),
                    ("Yes", "Sí"),
                ],
            },
            {
                "title": "Introductions",
                "description": "Learn how to introduce yourself.",
                "lesson_titles": [
                    "Introduce yourself",
                    "Meet new people",
                ],
                "vocabulary": [
                    ("My name is", "Me llamo"),
                    ("I am", "Soy"),
                    ("Nice to meet you", "Mucho gusto"),
                    ("Friend", "Amigo"),
                    ("Student", "Estudiante"),
                ],
            },
            {
                "title": "Common Phrases",
                "description": "Learn everyday Spanish phrases.",
                "lesson_titles": [
                    "Morning and night",
                    "How are you?",
                ],
                "vocabulary": [
                    ("Good morning", "Buenos días"),
                    ("Good night", "Buenas noches"),
                    ("How are you?", "¿Cómo estás?"),
                    ("I'm fine", "Estoy bien"),
                    ("See you later", "Hasta luego"),
                ],
            },
        ],
    },
]


# ---------------------------------------------------------
# Main seed function
# ---------------------------------------------------------

def seed_database():
    db = SessionLocal()

    try:
        # -------------------------------------------------
        # Prevent duplicate seeding
        # -------------------------------------------------

        existing_course = db.query(Course).first()

        if existing_course:
            print("Database already contains seed data.")
            print("Delete app.db if you want to seed from scratch.")
            return

        print("Starting database seed...")

        # -------------------------------------------------
        # 1. Create users
        # -------------------------------------------------

        main_user = User(
            username="Learner",
            streak=0,
            total_xp=0,
            hearts=5,
            gems=500,
            daily_xp=0,
            daily_goal=30,
            last_activity_date=None,
        )

        leaderboard_users = [
            User(
                username="Emma",
                streak=14,
                total_xp=1250,
                hearts=5,
                gems=900,
                daily_xp=30,
                daily_goal=30,
                last_activity_date=date.today(),
            ),
            User(
                username="Alex",
                streak=9,
                total_xp=980,
                hearts=5,
                gems=700,
                daily_xp=25,
                daily_goal=30,
                last_activity_date=date.today(),
            ),
            User(
                username="Sophia",
                streak=7,
                total_xp=760,
                hearts=3,
                gems=600,
                daily_xp=30,
                daily_goal=30,
                last_activity_date=date.today(),
            ),
            User(
                username="Daniel",
                streak=4,
                total_xp=540,
                hearts=5,
                gems=450,
                daily_xp=10,
                daily_goal=30,
                last_activity_date=date.today(),
            ),
            User(
                username="Mia",
                streak=3,
                total_xp=280,
                hearts=5,
                gems=400,
                daily_xp=15,
                daily_goal=30,
                last_activity_date=date.today(),
            ),
        ]

        db.add(main_user)

        for user in leaderboard_users:
            db.add(user)

        db.flush()

        print("Created users.")

        # -------------------------------------------------
        # 2. Create course
        # -------------------------------------------------

        course = Course(
            name="Spanish for Beginners",
            language="Spanish",
            description="Learn basic Spanish vocabulary and phrases.",
        )

        db.add(course)
        db.flush()

        print("Created course.")

        # -------------------------------------------------
        # 3. Create units, skills, lessons, exercises
        # -------------------------------------------------

        all_skills = []

        previous_skill = None

        for unit_index, unit_data in enumerate(COURSE_DATA, start=1):

            unit = Unit(
                course_id=course.id,
                title=unit_data["title"],
                description=f"Learn Spanish in {unit_data['title'].lower()}.",
                order_index=unit_index,
            )

            db.add(unit)
            db.flush()

            print(f"Created Unit {unit_index}: {unit.title}")

            for skill_index, skill_data in enumerate(
                unit_data["skills"],
                start=1,
            ):

                skill = Skill(
                    unit_id=unit.id,
                    title=skill_data["title"],
                    description=skill_data["description"],
                    order_index=skill_index,
                    xp_reward=20,
                    required_skill_id=(
                        previous_skill.id
                        if previous_skill
                        else None
                    ),
                )

                db.add(skill)
                db.flush()

                all_skills.append(skill)

                print(f"  Created Skill: {skill.title}")

                vocabulary = skill_data["vocabulary"]

                # -------------------------------------------------
                # Create 2 lessons for every skill
                # -------------------------------------------------

                for lesson_number in range(1, 3):

                    lesson = Lesson(
                        skill_id=skill.id,
                        title=skill_data["lesson_titles"][lesson_number - 1],
                        order_index=lesson_number,
                        xp_reward=10,
                    )

                    db.add(lesson)
                    db.flush()

                    # Pick vocabulary for this lesson.
                    word1 = vocabulary[(lesson_number - 1) * 2]
                    word2 = vocabulary[(lesson_number - 1) * 2 + 1]
                    word3 = vocabulary[(lesson_number - 1) * 2 + 2]

                    english1, spanish1 = word1
                    english2, spanish2 = word2
                    english3, spanish3 = word3

                    # -------------------------------------------------
                    # Exercise 1: Multiple Choice
                    # -------------------------------------------------

                    exercise = create_exercise(
                        lesson=lesson,
                        exercise_type="multiple_choice",
                        question=f"What does '{spanish1}' mean?",
                        correct_answer=english1,
                        options=[
                            english1,
                            english2,
                            english3,
                        ],
                        order_index=1,
                    )

                    db.add(exercise)

                    # -------------------------------------------------
                    # Exercise 2: Translate / Word Bank
                    # -------------------------------------------------

                    exercise = create_exercise(
                        lesson=lesson,
                        exercise_type="translate",
                        question=f"Translate: {english2}",
                        correct_answer=[spanish2],
                        order_index=2,
                        data={
                            "word_bank": [
                                spanish2,
                                spanish1,
                                spanish3,
                                "Gracias",
                            ]
                        },
                    )

                    db.add(exercise)

                    # -------------------------------------------------
                    # Exercise 3: Match Pairs
                    # -------------------------------------------------

                    exercise = create_exercise(
                        lesson=lesson,
                        exercise_type="match_pairs",
                        question="Match the words with their translations.",
                        correct_answer="all_pairs",
                        order_index=3,
                        data={
                            "pairs": [
                                [english1, spanish1],
                                [english2, spanish2],
                                [english3, spanish3],
                            ]
                        },
                    )

                    db.add(exercise)

                    # -------------------------------------------------
                    # Exercise 4: Fill in the blank
                    # -------------------------------------------------

                    exercise = create_exercise(
                        lesson=lesson,
                        exercise_type="fill_blank",
                        question=f"Translate: {english3}",
                        correct_answer=spanish3,
                        order_index=4,
                    )

                    db.add(exercise)

                    # -------------------------------------------------
                    # Exercise 5: Type the answer
                    # -------------------------------------------------

                    exercise = create_exercise(
                        lesson=lesson,
                        exercise_type="type_answer",
                        question=f"Type the Spanish word for '{english1}'.",
                        correct_answer=spanish1,
                        order_index=5,
                    )

                    db.add(exercise)

                previous_skill = skill

        db.flush()

        print("Created all units, skills, lessons, and exercises.")

        # -------------------------------------------------
        # 4. Create initial skill progress
        # -------------------------------------------------

        # All six lessons start locked except for the first available lesson.
        # Gold nodes must always be earned by an actual completion.

        for index, skill in enumerate(all_skills):

            progress = UserSkillProgress(
                user_id=main_user.id,
                skill_id=skill.id,
                progress=0,
                completed=False,
                crowns=0,
            )

            db.add(progress)

        db.flush()

        print("Created skill progress.")

        # -------------------------------------------------
        # 5. Commit everything
        # -------------------------------------------------

        db.commit()

        print()
        print("=" * 50)
        print("DATABASE SEED COMPLETE")
        print("=" * 50)
        print(f"Main user ID: {main_user.id}")
        print(f"Username: {main_user.username}")
        print(f"Course: {course.name}")
        print(f"Skills created: {len(all_skills)}")
        print()
        print("Login is simplified.")
        print(f"Use user ID {main_user.id} as the default learner.")
        print("=" * 50)

    except Exception as error:

        db.rollback()

        print()
        print("SEED FAILED")
        print(error)

        raise

    finally:
        db.close()


def upgrade_seed_lesson_titles():
    """Rename only the original sample lessons in an existing local database."""
    legacy_titles = [
        "Greetings - Lesson 1",
        "Greetings - Lesson 2",
        "Introductions - Lesson 1",
        "Introductions - Lesson 2",
        "Common Phrases - Lesson 1",
        "Common Phrases - Lesson 2",
        "Food - Lesson 1",
        "Food - Lesson 2",
    ]
    lesson_titles = [
        "Say hello and goodbye",
        "Say thanks and be polite",
        "Introduce yourself",
        "Meet new people",
        "Morning and night",
        "How are you?",
        "Order food and drinks",
        "At the cafe",
    ]
    db = SessionLocal()
    try:
        for old_title, new_title in zip(legacy_titles, lesson_titles):
            lesson = db.query(Lesson).filter(Lesson.title == old_title).first()
            if lesson:
                lesson.title = new_title
        db.commit()
    finally:
        db.close()


def reset_legacy_demo_progress():
    """Remove only the old pre-completed sample state from the original seed."""
    db = SessionLocal()
    try:
        user = (
            db.query(User)
            .filter(User.id == 1, User.total_xp.in_([320, 340]))
            .first()
        )
        if not user:
            return

        completed_count = (
            db.query(UserLessonProgress)
            .filter(UserLessonProgress.user_id == user.id, UserLessonProgress.completed.is_(True))
            .count()
        )
        if completed_count < 2 or completed_count > 4:
            return

        db.query(UserLessonProgress).filter(UserLessonProgress.user_id == user.id).delete()
        db.query(UserSkillProgress).filter(UserSkillProgress.user_id == user.id).update(
            {"progress": 0, "completed": False, "crowns": 0}
        )
        db.query(DailyActivity).filter(DailyActivity.user_id == user.id).delete()
        user.total_xp = 0
        user.daily_xp = 0
        user.streak = 0
        user.hearts = 5
        user.last_activity_date = None
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
