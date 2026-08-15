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

    db.flush()

    return progress


def update_skill_progress(
    db: Session,
    user_id: int,
    skill: Skill,
):
    total_lessons = len(skill.lessons)

    if total_lessons == 0:
        return None

    lesson_ids = [lesson.id for lesson in skill.lessons]

    completed_lessons = (
        db.query(UserLessonProgress)
        .filter(
            UserLessonProgress.user_id == user_id,
            UserLessonProgress.lesson_id.in_(lesson_ids),
            UserLessonProgress.completed.is_(True),
        )
        .count()
    )

    progress_percentage = int(
        completed_lessons / total_lessons * 100
    )

    skill_completed = completed_lessons >= total_lessons

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
    user_skill_progress.completed = skill_completed
    user_skill_progress.crowns = completed_lessons

    db.flush()

    return user_skill_progress