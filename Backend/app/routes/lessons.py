import json
from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db

from ..models import (
    Lesson,
    Exercise,
    User,
    UserLessonProgress,
    Skill,
)

from ..schemas import (
    AnswerRequest,
    AnswerResponse,
    LessonCompleteRequest,
    LessonCompleteResponse,
)

from ..services.progress_service import (
    mark_lesson_completed,
    update_skill_progress,
)

from ..services.streak_service import update_streak


router = APIRouter(
    prefix="/api",
    tags=["Lessons"],
)


# ============================================================
# GET NEXT LESSON FOR A SKILL
# ============================================================

@router.get("/skills/{skill_id}/next-lesson")
def get_next_lesson_for_skill(
    skill_id: int,
    db: Session = Depends(get_db),
):
    user_id = 1

    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_id)
        .first()
    )

    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Skill not found",
        )

    lessons = sorted(
        skill.lessons,
        key=lambda item: item.order_index,
    )

    if not lessons:
        raise HTTPException(
            status_code=404,
            detail="No lessons found for this skill",
        )

    for lesson in lessons:

        progress = (
            db.query(UserLessonProgress)
            .filter(
                UserLessonProgress.user_id == user_id,
                UserLessonProgress.lesson_id == lesson.id,
            )
            .first()
        )

        if not progress or not progress.completed:
            return {
                "lesson_id": lesson.id,
                "title": lesson.title,
            }

    # All lessons completed.
    # Return the first lesson so the user can practice again.
    return {
        "lesson_id": lessons[0].id,
        "title": lessons[0].title,
    }


# ============================================================
# GET LESSON
# ============================================================

@router.get("/lessons/{lesson_id}")
def get_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
):
    lesson = (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id)
        .first()
    )

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found",
        )

    exercises = []

    for exercise in lesson.exercises:

        exercise_data = {
            "id": exercise.id,
            "type": exercise.type,
            "question": exercise.question,
            "order_index": exercise.order_index,
        }

        # Convert JSON strings back into Python objects
        if exercise.options:
            exercise_data["options"] = json.loads(
                exercise.options
            )

        if exercise.data:
            exercise_data["data"] = json.loads(
                exercise.data
            )

        exercises.append(exercise_data)

    exercises.sort(
        key=lambda x: x["order_index"]
    )

    return {
        "id": lesson.id,
        "title": lesson.title,
        "skill_id": lesson.skill_id,
        "xp_reward": lesson.xp_reward,
        "exercise_count": len(exercises),
        "exercises": exercises,
    }


# ============================================================
# SUBMIT ANSWER
# ============================================================

@router.post(
    "/lessons/{lesson_id}/answer",
    response_model=AnswerResponse,
)
def submit_answer(
    lesson_id: int,
    request: AnswerRequest,
    db: Session = Depends(get_db),
):
    user_id = 1

    # --------------------------------------------------------
    # 1. Find lesson
    # --------------------------------------------------------

    lesson = (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id)
        .first()
    )

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found",
        )

    # --------------------------------------------------------
    # 2. Find exercise
    # --------------------------------------------------------

    exercise = (
        db.query(Exercise)
        .filter(
            Exercise.id == request.exercise_id,
            Exercise.lesson_id == lesson_id,
        )
        .first()
    )

    if not exercise:
        raise HTTPException(
            status_code=404,
            detail="Exercise not found",
        )
    correct_answer = exercise.correct_answer

    # --------------------------------------------------------
    # 3. Find user
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # 4. Check if user already has no hearts
    # --------------------------------------------------------

    if user.hearts <= 0:
        return AnswerResponse(
            correct=False,
            hearts=0,
            message="You are out of hearts. Lesson failed.",
            correct_answer=str(correct_answer),
        )

    # --------------------------------------------------------
    # 5. Check answer
    # --------------------------------------------------------

    correct_answer = exercise.correct_answer

    is_correct = False

    # --------------------------------------------------------
    # MATCH PAIRS
    # --------------------------------------------------------

    if exercise.type == "match_pairs":

        is_correct = (
            str(request.answer).strip().lower()
            == "all_pairs"
        )

    # --------------------------------------------------------
    # TRANSLATE / LIST ANSWERS
    # --------------------------------------------------------

    elif (
        exercise.type == "translate"
        and isinstance(request.answer, list)
    ):

        try:
            stored_answer = json.loads(
                correct_answer
            )

            is_correct = (
                request.answer == stored_answer
            )

        except (
            json.JSONDecodeError,
            TypeError,
        ):
            is_correct = False

    # --------------------------------------------------------
    # OTHER LIST ANSWERS
    # --------------------------------------------------------

    elif isinstance(request.answer, list):

        try:
            stored_answer = json.loads(
                correct_answer
            )

            is_correct = (
                request.answer == stored_answer
            )

        except (
            json.JSONDecodeError,
            TypeError,
        ):
            is_correct = False

    # --------------------------------------------------------
    # NORMAL STRING ANSWER
    # --------------------------------------------------------

    else:

        is_correct = (
            str(request.answer).strip().lower()
            ==
            str(correct_answer).strip().lower()
        )

    # ========================================================
    # CORRECT ANSWER
    # ========================================================

    if is_correct:

        return AnswerResponse(
            correct=True,
            hearts=user.hearts,
            message="Correct!",
            correct_answer=str(correct_answer),

        )

    # ========================================================
    # INCORRECT ANSWER
    # ========================================================

    user.hearts -= 1

    # Never allow hearts to become negative
    if user.hearts < 0:
        user.hearts = 0

    db.commit()

    # --------------------------------------------------------
    # User has no hearts remaining
    # --------------------------------------------------------

    if user.hearts == 0:

        return AnswerResponse(
            correct=False,
            hearts=0,
            message="Incorrect. You are out of hearts!",
            correct_answer=str(correct_answer),
        )

    # --------------------------------------------------------
    # User still has hearts
    # --------------------------------------------------------

    return AnswerResponse(
        correct=False,
        hearts=user.hearts,
        message="Incorrect",
        correct_answer=str(correct_answer),
    )


# ============================================================
# COMPLETE LESSON
# ============================================================

@router.post(
    "/lessons/{lesson_id}/complete",
    response_model=LessonCompleteResponse,
)
def complete_lesson(
    lesson_id: int,
    request: LessonCompleteRequest,
    db: Session = Depends(get_db),
):
    user_id = 1

    # ========================================================
    # 1. FIND LESSON
    # ========================================================

    lesson = (
        db.query(Lesson)
        .filter(Lesson.id == lesson_id)
        .first()
    )

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail="Lesson not found",
        )

    # ========================================================
    # 2. VALIDATE QUESTION COUNT
    # ========================================================

    total_questions = len(
        lesson.exercises
    )

    if request.total_questions != total_questions:

        raise HTTPException(
            status_code=400,
            detail="Lesson question count does not match",
        )

    # ========================================================
    # 3. VALIDATE CORRECT ANSWERS
    # ========================================================

    if request.correct_answers < 0:

        raise HTTPException(
            status_code=400,
            detail="Correct answer count cannot be negative",
        )

    if request.correct_answers > total_questions:

        raise HTTPException(
            status_code=400,
            detail="Correct answer count cannot exceed question count",
        )

    # ========================================================
    # 4. FIND USER
    # ========================================================

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
        
        
        # ========================================================
# CHECK PASSING SCORE
# ========================================================

    passing_score = 80

    score_percentage = int(
    request.correct_answers
    / request.total_questions
    * 100
    )

    if score_percentage < passing_score:

        return LessonCompleteResponse(
            lesson_id=lesson.id,
            completed=False,
            xp_earned=0,
            total_xp=user.total_xp,
            hearts=user.hearts,
            streak=user.streak,
            skill_progress=0,
            skill_completed=False,
            next_skill_unlocked=False,
            daily_xp=user.daily_xp,
            daily_goal=user.daily_goal,
            correct_answers=request.correct_answers,
            total_questions=request.total_questions,
        )
    # ========================================================
    # 5. CHECK HEARTS
    # ========================================================

    if user.hearts <= 0:

        raise HTTPException(
            status_code=400,
            detail="Lesson failed. You are out of hearts.",
        )

    # ========================================================
    # 6. FIND EXISTING LESSON PROGRESS
    # ========================================================

    existing_progress = (
        db.query(UserLessonProgress)
        .filter(
            UserLessonProgress.user_id == user_id,
            UserLessonProgress.lesson_id == lesson_id,
        )
        .first()
    )

    # ========================================================
    # 7. PREVENT DUPLICATE XP
    # ========================================================

    if (
        existing_progress
        and existing_progress.completed
    ):

        skill_progress = update_skill_progress(
            db=db,
            user_id=user_id,
            skill=lesson.skill,
        )

        # Find next skill
        next_skill = (
            db.query(Skill)
            .filter(
                Skill.required_skill_id
                == lesson.skill_id
            )
            .first()
        )

        next_skill_unlocked = (
            skill_progress.completed
            and next_skill is not None
        )

        db.commit()

        return LessonCompleteResponse(
            lesson_id=lesson.id,
            completed=True,
            xp_earned=0,
            total_xp=user.total_xp,
            hearts=user.hearts,
            streak=user.streak,
            skill_progress=skill_progress.progress,
            skill_completed=skill_progress.completed,
            next_skill_unlocked=next_skill_unlocked,
            daily_xp=user.daily_xp,
            daily_goal=user.daily_goal,
            correct_answers=(
                existing_progress.correct_answers
            ),
            total_questions=(
                existing_progress.total_questions
            ),
        )

    # ========================================================
    # 8. MARK LESSON COMPLETED
    # ========================================================

    xp_earned = lesson.xp_reward

    lesson_progress = mark_lesson_completed(
        db=db,
        user_id=user_id,
        lesson=lesson,
        xp_earned=xp_earned,
        correct_answers=request.correct_answers,
        total_questions=request.total_questions,
    )

    # ========================================================
    # 9. AWARD XP
    # ========================================================

    user.total_xp += xp_earned
    user.daily_xp += xp_earned

    # ========================================================
    # 10. UPDATE STREAK
    # ========================================================

    update_streak(
        user=user,
        activity_date=date.today(),
    )

    # ========================================================
    # 11. UPDATE SKILL PROGRESS
    # ========================================================

    skill_progress = update_skill_progress(
        db=db,
        user_id=user_id,
        skill=lesson.skill,
    )

    # ========================================================
    # 12. FIND NEXT SKILL
    # ========================================================

    next_skill = (
        db.query(Skill)
        .filter(
            Skill.required_skill_id
            == lesson.skill_id
        )
        .first()
    )

    next_skill_unlocked = (
        skill_progress.completed
        and next_skill is not None
    )

    # ========================================================
    # 13. SAVE EVERYTHING
    # ========================================================

    db.commit()

    db.refresh(user)
    db.refresh(skill_progress)

    # ========================================================
    # 14. RETURN RESULT
    # ========================================================

    return LessonCompleteResponse(
        lesson_id=lesson.id,
        completed=True,
        xp_earned=xp_earned,
        total_xp=user.total_xp,
        hearts=user.hearts,
        streak=user.streak,
        skill_progress=skill_progress.progress,
        skill_completed=skill_progress.completed,
        next_skill_unlocked=next_skill_unlocked,
        daily_xp=user.daily_xp,
        daily_goal=user.daily_goal,
        correct_answers=lesson_progress.correct_answers,
        total_questions=lesson_progress.total_questions,
    )