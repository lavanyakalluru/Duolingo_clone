"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { UnitHeader } from "@/components/learn/UnitHeader";
import { PathNodes } from "@/components/learn/PathNodes";
import { ScrollToTop } from "@/components/learn/ScrollToTop";
import { StatsBar } from "@/components/learn/StatsBar";

import { getNextLessonForSkill } from "@/lib/api";

import type {
  LearningPath as LearningPathData,
  PathSkill,
} from "@/lib/types";

const SECTION_NUMBER = 1;

type HeaderState = {
  unitTitle: string;
  lessonName: string;
  color: "green" | "teal" | "purple";
};

type UnitWithSkills = LearningPathData["units"][number];

function getActiveSkillIndex(skills: PathSkill[]) {
  const availableIndex = skills.findIndex(
    (skill) => skill.status === "available",
  );

  if (availableIndex >= 0) {
    return availableIndex;
  }

  const lastCompletedIndex = skills.reduce(
    (last, skill, index) =>
      skill.status === "completed" ? index : last,
    -1,
  );

  if (lastCompletedIndex >= 0) {
    return lastCompletedIndex;
  }

  return 0;
}

function getHeaderColor(skillIndex: number): HeaderState["color"] {
  const colors: HeaderState["color"][] = [
    "green",
    "teal",
    "purple",
  ];

  return colors[skillIndex % colors.length];
}

function buildHeaderState(
  unitTitle: string,
  skill: PathSkill,
  skillIndex: number,
): HeaderState {
  return {
    unitTitle,
    lessonName: skill.title,
    color: getHeaderColor(skillIndex),
  };
}

type ScrollMarkerProps = {
  id: string;
  unitTitle: string;
  skill: PathSkill;
  skillIndex: number;
  onVisible: (state: HeaderState) => void;
};

function ScrollMarker({
  id,
  unitTitle,
  skill,
  skillIndex,
  onVisible,
}: ScrollMarkerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onVisibleRef = useRef(onVisible);

  onVisibleRef.current = onVisible;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisibleRef.current(
            buildHeaderState(
              unitTitle,
              skill,
              skillIndex,
            ),
          );
        }
      },
      {
        rootMargin: "-130px 0px -50% 0px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [unitTitle, skill, skillIndex]);

  return (
    <div
      ref={ref}
      id={id}
      className="h-px w-full scroll-mt-32"
      aria-hidden="true"
    />
  );
}

type LearningPathViewProps = {
  path: LearningPathData;
};

export function LearningPathView({
  path,
}: LearningPathViewProps) {
  const router = useRouter();

  /*
   * Keep the backend hierarchy intact:
   *
   * Unit
   *   ├── Skill
   *   │    ├── Lesson
   *   │    └── Lesson
   *   ├── Skill
   *   └── Skill
   *
   * PathNodes expects PathSkill[], so we pass the skills
   * belonging to each unit directly.
   */
  const units = useMemo<UnitWithSkills[]>(
    () => path.units ?? [],
    [path.units],
  );

  /*
   * Find the first available skill in the entire path.
   * If none is available, use the last completed skill.
   */
  const activeLocation = useMemo(() => {
    for (
      let unitIndex = 0;
      unitIndex < units.length;
      unitIndex += 1
    ) {
      const unit = units[unitIndex];

      const availableIndex = unit.skills.findIndex(
        (skill) => skill.status === "available",
      );

      if (availableIndex >= 0) {
        return {
          unitIndex,
          skillIndex: availableIndex,
        };
      }
    }

    for (
      let unitIndex = units.length - 1;
      unitIndex >= 0;
      unitIndex -= 1
    ) {
      const unit = units[unitIndex];

      const completedIndex = unit.skills.reduce(
        (last, skill, index) =>
          skill.status === "completed"
            ? index
            : last,
        -1,
      );

      if (completedIndex >= 0) {
        return {
          unitIndex,
          skillIndex: completedIndex,
        };
      }
    }

    return {
      unitIndex: 0,
      skillIndex: 0,
    };
  }, [units]);

  const initialHeader = useMemo<HeaderState>(() => {
    const unit =
      units[activeLocation.unitIndex];

    const skill =
      unit?.skills[activeLocation.skillIndex] ??
      unit?.skills[0];

    if (!unit || !skill) {
      return {
        unitTitle: "Learning Path",
        lessonName: "",
        color: "green",
      };
    }

    return buildHeaderState(
      unit.title,
      skill,
      activeLocation.skillIndex,
    );
  }, [units, activeLocation]);

  const [header, setHeader] =
    useState<HeaderState>(initialHeader);

  /*
   * If the path changes after loading, update the header.
   */
  useEffect(() => {
    setHeader(initialHeader);
  }, [initialHeader]);

  const handleHeaderChange = useCallback(
    (state: HeaderState) => {
      setHeader(state);
    },
    [],
  );

  /*
   * PathNodes gives us a SKILL id.
   *
   * We then ask the backend for the next lesson
   * belonging to that skill.
   */
  const handleStartClick = useCallback(
    async (skillId: number) => {
      try {
        const nextLesson =
          await getNextLessonForSkill(skillId);

        router.push(
          `/lesson/${nextLesson.lesson_id}`,
        );
      } catch (error) {
        console.error(
          "Failed to start lesson:",
          error,
        );
      }
    },
    [router],
  );

  /*
   * Empty path.
   */
  if (units.length === 0) {
    return (
      <p className="py-12 text-center text-duo-text-muted">
        No learning path available.
      </p>
    );
  }

  return (
    <div className="relative pb-24">
      {/* =====================================================
          STICKY HEADER
          ===================================================== */}

      <div className="sticky top-0 z-20 -mx-1 overflow-visible bg-duo-bg-dark pb-2 pt-1">
        <StatsBar className="mb-3 px-1 xl:hidden" />

        <UnitHeader
          section={`Section ${SECTION_NUMBER}`}
          unit={`Unit ${activeLocation.unitIndex + 1}`}
          title={header.unitTitle}
          lessonName={header.lessonName}
          color={header.color}
        />
      </div>

      {/* =====================================================
          LEARNING PATH
          ===================================================== */}

      <div className="mt-2">
        {units.map((unit, unitIndex) => {
          const skills = unit.skills ?? [];

          if (skills.length === 0) {
            return null;
          }

          return (
            <section
              key={unit.id}
              className="relative"
            >
              {/* ---------------------------------------------
                  Scroll markers

                  Each marker belongs to an actual SKILL,
                  not a flattened LESSON.
                 --------------------------------------------- */}

              {skills.map((skill, skillIndex) => (
                <ScrollMarker
                  key={`marker-${unit.id}-${skill.id}`}
                  id={`skill-marker-${unit.id}-${skill.id}`}
                  unitTitle={unit.title}
                  skill={skill}
                  skillIndex={skillIndex}
                  onVisible={handleHeaderChange}
                />
              ))}

              {/* ---------------------------------------------
                  Unit path

                  IMPORTANT:
                  PathNodes expects PathSkill[].
                  Therefore we pass the unit's skills directly.
                 --------------------------------------------- */}

              <PathNodes
                skills={skills}
                onStartClick={handleStartClick}
              />
            </section>
          );
        })}
      </div>

      <ScrollToTop />
    </div>
  );
}