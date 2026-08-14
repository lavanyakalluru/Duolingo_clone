from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    Course,
    Unit,
    Skill,
    UserSkillProgress,
    UserLessonProgress,
)


router = APIRouter(
    prefix="/api",
    tags=["Learning Path"],
)


@router.get("/path")
def get_learning_path(
    db: Session = Depends(get_db),
):
    """
    Return the complete learning path for the default learner.
    """

    user_id = 1

    course = db.query(Course).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found",
        )

    units = (
        db.query(Unit)
        .filter(Unit.course_id == course.id)
        .order_by(Unit.order_index)
        .all()
    )

    result = {
        "course_id": course.id,
        "course_name": course.name,
        "language": course.language,
        "units": [],
    }

    for unit in units:

        skills = (
            db.query(Skill)
            .filter(Skill.unit_id == unit.id)
            .order_by(Skill.order_index)
            .all()
        )

        unit_data = {
            "id": unit.id,
            "title": unit.title,
            "description": unit.description,
            "skills": [],
        }

        for skill in skills:

            progress = (
                db.query(UserSkillProgress)
                .filter(
                    UserSkillProgress.user_id == user_id,
                    UserSkillProgress.skill_id == skill.id,
                )
                .first()
            )

            # -----------------------------------------
            # Determine skill status
            # -----------------------------------------

            if progress and progress.completed:
                status = "completed"

            elif skill.required_skill_id is None:
                status = "available"

            else:
                required_progress = (
                    db.query(UserSkillProgress)
                    .filter(
                        UserSkillProgress.user_id == user_id,
                        UserSkillProgress.skill_id
                        == skill.required_skill_id,
                    )
                    .first()
                )

                if required_progress and required_progress.completed:
                    status = "available"
                else:
                    status = "locked"

            lesson_count = len(skill.lessons)
            completed_lessons = progress.crowns if progress else 0

            lesson_nodes = []
            ordered_lessons = sorted(skill.lessons, key=lambda lesson: lesson.order_index)
            for lesson_index, lesson in enumerate(ordered_lessons):
                lesson_progress = (
                    db.query(UserLessonProgress)
                    .filter(
                        UserLessonProgress.user_id == user_id,
                        UserLessonProgress.lesson_id == lesson.id,
                    )
                    .first()
                )

                if lesson_progress and lesson_progress.completed:
                    lesson_status = "completed"
                elif lesson_index == 0:
                    lesson_status = "available" if status == "available" else "locked"
                else:
                    previous_lesson = ordered_lessons[lesson_index - 1]
                    previous_progress = (
                        db.query(UserLessonProgress)
                        .filter(
                            UserLessonProgress.user_id == user_id,
                            UserLessonProgress.lesson_id == previous_lesson.id,
                            UserLessonProgress.completed.is_(True),
                        )
                        .first()
                    )
                    lesson_status = "available" if previous_progress else "locked"

                lesson_nodes.append(
                    {
                        "id": lesson.id,
                        "title": lesson.title,
                        "status": lesson_status,
                        "progress": 100 if lesson_status == "completed" else 0,
                        "crowns": 1 if lesson_status == "completed" else 0,
                        "lesson_count": 1,
                        "completed_lessons": 1 if lesson_status == "completed" else 0,
                        "xp_reward": lesson.xp_reward,
                    }
                )

            unit_data["skills"].append(
                {
                    "id": skill.id,
                    "title": skill.title,
                    "description": skill.description,
                    "status": status,
                    "progress": (
                        progress.progress
                        if progress
                        else 0
                    ),
                    "crowns": (
                        progress.crowns
                        if progress
                        else 0
                    ),
                    "lesson_count": lesson_count,
                    "completed_lessons": completed_lessons,
                    "xp_reward": skill.xp_reward,
                    "lessons": lesson_nodes,
                }
            )

        result["units"].append(unit_data)

    return result
