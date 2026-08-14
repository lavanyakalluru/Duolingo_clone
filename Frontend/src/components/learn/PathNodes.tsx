"use client";

import { useState } from "react";
import {
  ChestIcon,
  DuoOwl,
  StarIcon,
  TrophyIcon,
} from "@/components/icons/LearnIcons";
import type { PathSkill } from "@/lib/types";
import { SkillProgressRing } from "@/components/learn/SkillProgressRing";

const PATH_OFFSETS = [0, -52, 28, -36, 44, -20, 32];

type NodeStatus = "completed" | "available" | "locked";

type PathNode = {
  id: string;
  title: string;
  type: "lesson" | "chest" | "trophy";
  status: NodeStatus;
  offset: number;
  skill?: PathSkill;
  skillId?: number;
  isStart?: boolean;
  showOwl?: boolean;
};

function buildUnitPath(skills: PathSkill[]): PathNode[] {
  const nodes: PathNode[] = [];
  const startSkillId = skills.find((skill) => skill.status === "available")?.id;

  skills.forEach((skill, index) => {
    const status = skill.status;
    const isStart = skill.id === startSkillId;

    nodes.push({
      id: `skill-${skill.id}`,
      title: skill.title,
      type: "lesson",
      status,
      offset: 0,
      skill,
      skillId: skill.id,
      isStart,
      showOwl: isStart,
    });

    // A single reward chest keeps the six-lesson route readable and matches
    // the learning-tree cadence rather than placing a chest after every node.
    if (index === 2) {
      const nextSkill = skills[index + 1];
      const chestLocked = nextSkill.status === "locked";

      nodes.push({
        id: `chest-after-${skill.id}`,
        title: nextSkill.title,
        type: "chest",
        status: chestLocked ? "locked" : status === "completed" ? "completed" : "available",
        offset: 0,
      });
    }
  });

  const allSkillsCompleted = skills.every((skill) => skill.status === "completed");

  nodes.push({
    id: "unit-trophy",
    title: "Unit complete",
    type: "trophy",
    status: allSkillsCompleted ? "completed" : "locked",
    offset: 0,
  });

  return nodes.map((node, index) => ({
    ...node,
    offset: PATH_OFFSETS[index % PATH_OFFSETS.length],
  }));
}

function connectorTone(
  fromNode: PathNode,
  toNode: PathNode,
): "completed" | "active" | "locked" {
  if (fromNode.status === "completed") return "completed";
  if (fromNode.status === "available" && toNode.status !== "locked") return "active";
  return "locked";
}

function PathConnector({ tone }: { tone: "completed" | "active" | "locked" }) {
  const colors = {
    completed: "bg-[#58CC02]",
    active: "bg-gradient-to-b from-[#58CC02] to-[#37464f]",
    locked: "bg-[#37464f]/80",
  };

  return (
    <div
      className={`h-12 w-[4px] rounded-full ${colors[tone]}`}
      aria-hidden="true"
    />
  );
}

function NodePopup({
  title,
  subtitle,
  buttonLabel,
  buttonDisabled,
  onAction,
  onClose,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonDisabled?: boolean;
  onAction?: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-40 w-[280px] rounded-2xl bg-[#58cc02] px-5 py-4 shadow-2xl">
        {/* Speech Bubble Arrow pointing UP */}
        <div 
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 border-transparent border-b-[#58cc02]" 
          style={{ borderStyle: 'solid', borderWidth: '0 8px 10px 8px' }} 
        />
        
        <h3 className="mb-0.5 text-center text-[18px] font-extrabold text-white leading-snug">
          {title}
        </h3>
        <p className="mb-4 text-center text-[13px] font-bold text-[#e5ffcc] leading-normal">
          {subtitle}
        </p>
        <button
          type="button"
          disabled={buttonDisabled}
          onClick={() => {
            if (!buttonDisabled && onAction) onAction();
          }}
          className={[
            "w-full rounded-2xl border-b-4 py-3.5 text-[14px] font-extrabold uppercase tracking-wide transition-all",
            buttonDisabled
              ? "border-[#4aab02] bg-[#4aab02] text-[#8ce043] cursor-not-allowed opacity-60"
              : "border-[#e5e5e5] bg-white text-[#58cc02] active:translate-y-[2px] active:border-b-2 hover:bg-[#f7f7f7]",
          ].join(" ")}
        >
          {buttonLabel}
        </button>
      </div>
    </>
  );
}

function ringStatus(
  status: NodeStatus,
): "active" | "locked" | "completed" {
  if (status === "completed") return "completed";
  if (status === "available") return "active";
  return "locked";
}

function PathNodeButton({
  node,
  isSelected,
  onSelect,
  onStartClick,
}: {
  node: PathNode;
  isSelected: boolean;
  onSelect: () => void;
  onStartClick?: (skillId: number) => void;
}) {
  const isStart = node.isStart === true;
  const isCompleted = node.status === "completed";
  const isLocked = node.status === "locked";
  const isChest = node.type === "chest";
  const isTrophy = node.type === "trophy";
  const isLesson = node.type === "lesson";
  const nodeSize = isStart ? 74 : 62;
  const skill = node.skill;
  const lessonCount = skill?.lesson_count ?? 2;
  const completedLessons = skill?.completed_lessons ?? skill?.crowns ?? 0;

  const handleClick = () => {
    if (isChest || isTrophy) return;

    if (isStart && node.skillId && onStartClick) {
      onStartClick(node.skillId);
      return;
    }

    if (isLesson) {
      onSelect();
    }
  };

  const button = (
    <button
      type="button"
      onClick={handleClick}
      title={node.title}
      disabled={isChest || isTrophy}
      className={[
        "relative flex items-center justify-center rounded-full transition-all duration-75",
        isStart
          ? "h-[74px] w-[74px] cursor-pointer border-b-[6px] border-duo-green-dark bg-duo-green active:translate-y-[2px] active:border-b-[3px]"
          : isCompleted && isLesson
            ? "h-[62px] w-[62px] cursor-pointer border-b-[5px] border-[#e5a000] bg-[#ffc800] active:translate-y-[2px] active:border-b-[2px]"
            : isChest
              ? [
                  "h-[58px] w-[58px] border-b-[5px]",
                  isLocked
                    ? "border-[#2a3c44] bg-duo-node-inactive opacity-60"
                    : "border-[#c49200] bg-[#ffc800]",
                ].join(" ")
              : isTrophy
                ? [
                    "h-[58px] w-[58px] border-b-[5px]",
                    isCompleted
                      ? "border-[#c49200] bg-[#ffc800]"
                      : "border-[#2a3c44] bg-duo-node-inactive opacity-60",
                  ].join(" ")
                : isLesson
                  ? "h-[62px] w-[62px] cursor-pointer border-b-[5px] border-[#2a3c44] bg-duo-node-inactive active:translate-y-[2px] active:border-b-[2px]"
                  : "",
      ].join(" ")}
    >
      {isStart && (
        <span className="absolute -inset-[3px] rounded-full border-[3px] border-duo-green-dark/50" />
      )}

      {isChest ? (
        <ChestIcon
          className={[
            "h-7 w-7",
            isLocked ? "text-[#52656d]" : "text-[#8a5700]",
          ].join(" ")}
        />
      ) : isTrophy ? (
        <TrophyIcon
          className={[
            "h-7 w-7",
            isCompleted ? "text-[#8a5700]" : "text-[#52656d]",
          ].join(" ")}
        />
      ) : (
        <StarIcon
          className={[
            "relative h-7 w-7",
            isStart || isCompleted ? "text-white" : "text-[#52656d]",
          ].join(" ")}
        />
      )}
    </button>
  );

  const popupSubtitle =
    isLocked && skill
      ? "Complete all levels above to unlock this!"
      : skill
        ? `Lesson ${Math.min(completedLessons + 1, lessonCount)} of ${lessonCount}`
        : "";

  const popupButton =
    isLocked 
      ? "Locked" 
      : isCompleted 
        ? "Practice +10 XP" 
        : "Start +10 XP";

  return (
    <div
      className={`relative flex flex-col items-center pb-2 ${isSelected ? "z-50" : "z-0"}`}
      style={{ transform: `translateX(${node.offset}px)` }}
      id={isStart ? "path-start" : undefined}
    >
      {isStart && (
        <div className="absolute -top-[56px] z-50 whitespace-nowrap rounded-xl bg-[#292929] px-5 py-2.5 text-[13px] font-extrabold uppercase tracking-[0.06em] text-duo-green shadow-lg">
          START
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-[7px] border-transparent border-t-[#292929]" />
        </div>
      )}

      {isSelected && isLesson && (
        <NodePopup
          title={node.title}
          subtitle={popupSubtitle}
          buttonLabel={popupButton}
          buttonDisabled={isLocked}
          onAction={() => {
            if (node.skillId && onStartClick) {
              onStartClick(node.skillId);
            }
          }}
          onClose={onSelect}
        />
      )}

      {isLesson && skill ? (
        <SkillProgressRing
          progress={skill.progress}
          crowns={skill.crowns}
          lessonCount={lessonCount}
          status={ringStatus(node.status)}
          size={nodeSize}
        >
          {button}
        </SkillProgressRing>
      ) : (
        button
      )}

      {isLesson && skill && (
        <span
          className={[
            "mt-2 max-w-[130px] truncate text-center text-[11px] font-extrabold uppercase tracking-wide",
            node.status === "locked"
              ? "text-[#52656d]"
              : node.status === "completed"
                ? "text-[#e5a000]"
                : "text-duo-green",
          ].join(" ")}
        >
          {skill.title}
        </span>
      )}
    </div>
  );
}

type PathNodesProps = {
  skills: PathSkill[];
  onStartClick?: (skillId: number) => void;
};

export function PathNodes({ skills, onStartClick }: PathNodesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const pathNodes = buildUnitPath(skills);

  return (
    <div className="relative mx-auto flex max-w-[300px] flex-col items-center pb-4">
      {pathNodes.map((node, index) => (
        <div key={node.id} className="flex flex-col items-center">
          <div className="relative">
            <PathNodeButton
              node={node}
              isSelected={selectedId === node.id}
              onSelect={() =>
                setSelectedId((current) =>
                  current === node.id ? null : node.id,
                )
              }
              onStartClick={onStartClick}
            />

            {node.showOwl && (
              <div className="pointer-events-none absolute -right-14 top-0 sm:-right-20">
                <DuoOwl className="h-[110px] w-[90px]" />
              </div>
            )}
          </div>

          {index < pathNodes.length - 1 && (
            <PathConnector
              tone={connectorTone(node, pathNodes[index + 1])}
            />
          )}
        </div>
      ))}
    </div>
  );
}
