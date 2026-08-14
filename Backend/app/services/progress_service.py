from sqlalchemy.orm import Session

from ..models import (
    Skill,
    UserSkillProgress,
    UserLessonProgress,
    Lesson,
)


def mark_lesson_completed(
    db: Session,
    user_id: int,
    lesson: Lesson,
    xp_earned: int,
    correct_answers: int,
    total_questions: int,
):
    """
    Mark a lesson as completed.
    """

    progress = (
        db.query(UserLessonProgress)
        .filter(
            UserLessonProgress.user_id == user_id,
            UserLessonProgress.lesson_id == lesson.id,
        )
        .first()
    )

    if progress:
        if progress.completed:
            return progress

        progress.completed = True
        progress.xp_earned = xp_earned
        progress.correct_answers = correct_answers
        progress.total_questions = total_questions

    else:
        progress = UserLessonProgress(
            user_id=user_id,
            lesson_id=lesson.id,
            completed=True,
            xp_earned=xp_earned,
            correct_answers=correct_answers,
            total_questions=total_questions,
        )

        db.add(progress)

    return progress


def update_skill_progress(
    db: Session,
    user_id: int,
    skill: Skill,
):
    """
    Recalculate the user's progress for a skill
    based on completed lessons.
    """

    total_lessons = len(skill.lessons)

    if total_lessons == 0:
        return None

    completed_lessons = (
        db.query(UserLessonProgress)
        .filter(
            UserLessonProgress.user_id == user_id,
            UserLessonProgress.completed.is_(True),
            UserLessonProgress.lesson_id.in_(
                [lesson.id for lesson in skill.lessons]
            ),
        )
        .count()
    )

    progress_percentage = int(
        completed_lessons / total_lessons * 100
    )

    completed = progress_percentage == 100

    crowns = completed_lessons

    user_skill_progress = (
        db.query(UserSkillProgress)
        .filter(
            UserSkillProgress.user_id == user_id,
            UserSkillProgress.skill_id == skill.id,
        )
        .first()
    )

    if not user_skill_progress:

        user_skill_progress = UserSkillProgress(
            user_id=user_id,
            skill_id=skill.id,
        )

        db.add(user_skill_progress)

    user_skill_progress.progress = progress_percentage
    user_skill_progress.completed = completed
    user_skill_progress.crowns = crowns

    return user_skill_progress
