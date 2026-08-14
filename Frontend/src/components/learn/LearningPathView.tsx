"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UnitHeader } from "@/components/learn/UnitHeader";
import { PathNodes } from "@/components/learn/PathNodes";
import { ScrollToTop } from "@/components/learn/ScrollToTop";
import { StatsBar } from "@/components/learn/StatsBar";
import { getNextLessonForSkill } from "@/lib/api";
import type { LearningPath as LearningPathData, PathSkill } from "@/lib/types";

const SECTION_NUMBER = 1;
const UNIT_NUMBER = 1;

type HeaderState = {
  unitTitle: string;
  lessonName: string;
  color: "green" | "teal" | "purple";
};

type LessonPathItem = PathSkill & {
  unitTitle: string;
};

function getActiveSkillIndex(skills: PathSkill[]) {
  const availableIndex = skills.findIndex(
    (skill) => skill.status === "available",
  );
  if (availableIndex >= 0) return availableIndex;

  const lastCompletedIndex = skills.reduce(
    (last, skill, index) => (skill.status === "completed" ? index : last),
    -1,
  );
  if (lastCompletedIndex >= 0) return lastCompletedIndex;

  return 0;
}

function getHeaderColor(skillIndex: number): HeaderState["color"] {
  const colors: HeaderState["color"][] = ["green", "teal", "purple"];
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
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisibleRef.current(buildHeaderState(unitTitle, skill, skillIndex));
        }
      },
      { rootMargin: "-130px 0px -50% 0px", threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [unitTitle, skill, skillIndex]);

  return (
    <div ref={ref} id={id} className="h-px w-full scroll-mt-32" aria-hidden="true" />
  );
}

type LearningPathViewProps = {
  path: LearningPathData;
};

export function LearningPathView({ path }: LearningPathViewProps) {
  const router = useRouter();

  if (path.units.length === 0) {
    return (
      <p className="py-12 text-center text-duo-text-muted">
        No learning path available.
      </p>
    );
  }

  // This list must remain referentially stable. ScrollMarker observes each
  // item; rebuilding it during a header update continually recreated every
  // observer and made the Learn UI flicker.
  const lessons = useMemo<LessonPathItem[]>(
    () =>
      path.units
        .flatMap((unit) =>
          unit.skills.flatMap((skill) =>
            (skill.lessons ?? []).map((lesson) => ({
              ...lesson,
              description: skill.title,
              required_skill_id: undefined,
              unitTitle: unit.title,
            })),
          ),
        )
        .slice(0, 6),
    [path.units],
  );
  const legacyItems = useMemo<LessonPathItem[]>(
    () =>
      path.units
        .flatMap((unit) =>
          unit.skills.map((skill) => ({ ...skill, unitTitle: unit.title })),
        )
        .slice(0, 6),
    [path.units],
  );
  // The fallback keeps the page usable until the backend has been restarted
  // and begins returning the per-lesson nodes.
  const pathItems = useMemo(
    () => (lessons.length > 0 ? lessons : legacyItems),
    [lessons, legacyItems],
  );
  const hasLessonNodes = lessons.length > 0;
  const activeSkillIndex = getActiveSkillIndex(pathItems);
  const activeSkill = pathItems[activeSkillIndex] ?? pathItems[0];

  const [header, setHeader] = useState<HeaderState>(() =>
    buildHeaderState(activeSkill.unitTitle, activeSkill, activeSkillIndex),
  );

  const handleHeaderChange = useCallback((state: HeaderState) => {
    setHeader(state);
  }, []);

  const handleStartClick = useCallback(
    async (id: number) => {
      if (hasLessonNodes) {
        router.push(`/lesson/${id}`);
        return;
      }

      const nextLesson = await getNextLessonForSkill(id);
      router.push(`/lesson/${nextLesson.lesson_id}`);
    },
    [hasLessonNodes, router],
  );

  return (
    <div className="relative pb-24">
      <div className="sticky top-0 z-20 -mx-1 overflow-visible bg-duo-bg-dark pb-2 pt-1">
        <StatsBar className="mb-3 px-1 xl:hidden" />
        <UnitHeader
          section={`Section ${SECTION_NUMBER}`}
          unit={`Unit ${UNIT_NUMBER}`}
          title={header.unitTitle}
          lessonName={header.lessonName}
          color={header.color}
        />
      </div>

      {pathItems.map((skill, skillIndex) => (
        <ScrollMarker
          key={skill.id}
          id={`skill-marker-${skill.id}`}
          unitTitle={skill.unitTitle}
          skill={skill}
          skillIndex={skillIndex}
          onVisible={handleHeaderChange}
        />
      ))}

      <div className="mt-2">
        <PathNodes skills={pathItems} onStartClick={handleStartClick} />
      </div>

      <ScrollToTop />
    </div>
  );
}
