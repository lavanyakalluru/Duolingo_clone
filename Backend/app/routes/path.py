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

            # ==================================================
            # GET SKILL PROGRESS
            # ==================================================

            skill_progress = (
                db.query(UserSkillProgress)
                .filter(
                    UserSkillProgress.user_id == user_id,
                    UserSkillProgress.skill_id == skill.id,
                )
                .first()
            )

            # ==================================================
            # GET ONLY THE 2 LESSONS FOR THIS SKILL
            # ==================================================

            ordered_lessons = sorted(
                skill.lessons,
                key=lambda lesson: lesson.order_index,
            )[:2]

            lesson_count = 2

            # ==================================================
            # COUNT COMPLETED LESSONS
            # ==================================================

            completed_lessons = (
                db.query(UserLessonProgress)
                .filter(
                    UserLessonProgress.user_id == user_id,
                    UserLessonProgress.lesson_id.in_(
                        [lesson.id for lesson in ordered_lessons]
                    ),
                    UserLessonProgress.completed.is_(True),
                )
                .count()
                if ordered_lessons
                else 0
            )

            # Never allow the value to exceed 2.
            completed_lessons = min(completed_lessons, 2)

            # ==================================================
            # CALCULATE SKILL PROGRESS
            # ==================================================

            calculated_progress = int(
                completed_lessons / 2 * 100
            )

            # ==================================================
            # DETERMINE WHETHER THIS SKILL IS COMPLETED
            # ==================================================

            skill_completed = (
                completed_lessons == 2
            )

            # ==================================================
            # DETERMINE SKILL STATUS
            # ==================================================

            if skill_completed:

                status = "completed"

            elif skill.required_skill_id is None:

                # First skill
                status = "available"

            else:

                # ----------------------------------------------
                # IMPORTANT:
                # Determine required skill completion from its
                # ACTUAL LESSONS, not stale UserSkillProgress.
                # ----------------------------------------------

                required_skill = (
                    db.query(Skill)
                    .filter(
                        Skill.id == skill.required_skill_id
                    )
                    .first()
                )

                required_completed = False

                if required_skill:

                    required_lessons = sorted(
                        required_skill.lessons,
                        key=lambda lesson: lesson.order_index,
                    )[:2]

                    required_lesson_count = len(
                        required_lessons
                    )

                    required_completed_count = (
                        db.query(UserLessonProgress)
                        .filter(
                            UserLessonProgress.user_id == user_id,
                            UserLessonProgress.lesson_id.in_(
                                [
                                    lesson.id
                                    for lesson in required_lessons
                                ]
                            ),
                            UserLessonProgress.completed.is_(True),
                        )
                        .count()
                        if required_lessons
                        else 0
                    )

                    required_completed = (
                        required_lesson_count == 2
                        and required_completed_count >= 2
                    )

                status = (
                    "available"
                    if required_completed
                    else "locked"
                )

            # ==================================================
            # LESSON NODES
            # ==================================================

            lesson_nodes = []

            for lesson_index, lesson in enumerate(
                ordered_lessons
            ):

                lesson_progress = (
                    db.query(UserLessonProgress)
                    .filter(
                        UserLessonProgress.user_id == user_id,
                        UserLessonProgress.lesson_id == lesson.id,
                    )
                    .first()
                )

                # ----------------------------------------------
                # Completed
                # ----------------------------------------------

                if (
                    lesson_progress
                    and lesson_progress.completed
                ):

                    lesson_status = "completed"

                # ----------------------------------------------
                # First lesson
                # ----------------------------------------------

                elif lesson_index == 0:

                    lesson_status = (
                        "available"
                        if status in ("available", "completed")
                        else "locked"
                    )

                # ----------------------------------------------
                # Second lesson
                # ----------------------------------------------

                else:

                    previous_lesson = ordered_lessons[
                        lesson_index - 1
                    ]

                    previous_completed = (
                        db.query(UserLessonProgress)
                        .filter(
                            UserLessonProgress.user_id == user_id,
                            UserLessonProgress.lesson_id
                            == previous_lesson.id,
                            UserLessonProgress.completed.is_(True),
                        )
                        .first()
                    )

                    lesson_status = (
                        "available"
                        if previous_completed
                        else "locked"
                    )

                lesson_nodes.append(
                    {
                        "id": lesson.id,
                        "title": lesson.title,
                        "status": lesson_status,

                        "progress": (
                            100
                            if lesson_status == "completed"
                            else 0
                        ),

                        "crowns": (
                            1
                            if lesson_status == "completed"
                            else 0
                        ),

                        # Always 2.
                        "lesson_count": 2,

                        # IMPORTANT:
                        # This is skill-level completed count,
                        # not "1 if this individual lesson is
                        # completed".
                        "completed_lessons": completed_lessons,

                        "xp_reward": lesson.xp_reward,
                    }
                )

            # ==================================================
            # SKILL RESPONSE
            # ==================================================

            unit_data["skills"].append(
                {
                    "id": skill.id,
                    "title": skill.title,
                    "description": skill.description,

                    "status": status,

                    "progress": calculated_progress,

                    "crowns": (
                        skill_progress.crowns
                        if skill_progress
                        else 0
                    ),

                    # ALWAYS 2
                    "lesson_count": 2,

                    "completed_lessons": completed_lessons,

                    "xp_reward": skill.xp_reward,

                    "lessons": lesson_nodes,
                }
            )

        result["units"].append(unit_data)

    return result