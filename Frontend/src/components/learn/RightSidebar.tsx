"use client";

import Link from "next/link";
import {
  LightningIcon,
  ShieldIcon,
  SmallChestIcon,
} from "@/components/icons/LearnIcons";
import { SidebarCard } from "@/components/learn/SidebarCard";
import { StatsBar } from "@/components/learn/StatsBar";
import { useUser } from "@/components/providers/UserProvider";
import { LEADERBOARD_UNLOCK_LESSONS } from "@/lib/api";

type RightSidebarProps = {
  showFooter?: boolean;
  showLeaderboardTitle?: boolean;
};

function DailyQuestCard() {
  const { profile, loading } = useUser();
  const dailyXp = profile?.daily_xp ?? 0;
  const questGoal = 10;
  const progress = Math.min(dailyXp, questGoal);
  const progressPercent = (progress / questGoal) * 100;

  return (
    <SidebarCard>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[17px] font-extrabold text-white">Daily Quests</h3>
        <Link
          href="/quests"
          className="text-[13px] font-extrabold uppercase tracking-wide text-duo-blue hover:text-duo-blue-dark"
        >
          View all
        </Link>
      </div>

      <div className="flex items-center gap-2.5">
        <LightningIcon className="h-8 w-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[15px] font-bold text-duo-text-muted">
            Earn 10 XP
          </p>
          <div className="flex items-center gap-2">
            <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-[#37464f]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-duo-green transition-all"
                style={{ width: loading ? "0%" : `${progressPercent}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[12px] font-extrabold text-white">
                {loading ? "…" : `${progress} / ${questGoal}`}
              </span>
            </div>
            <SmallChestIcon className="h-5 w-5 shrink-0" />
          </div>
        </div>
      </div>
    </SidebarCard>
  );
}

export function RightSidebar({
  showFooter = false,
  showLeaderboardTitle = true,
}: RightSidebarProps) {
  const { profile, loading } = useUser();
  const completedLessons = profile?.completed_lessons ?? 0;
  const remainingLessons = Math.max(
    0,
    LEADERBOARD_UNLOCK_LESSONS - completedLessons,
  );
  const leaderboardsUnlocked = !loading && remainingLessons === 0;

  return (
    <aside className="hidden w-[300px] shrink-0 flex-col gap-3 pt-1 xl:flex">
      <StatsBar className="mb-1 justify-end px-0.5" />

      <SidebarCard>
        {showLeaderboardTitle && (
          <h3 className="mb-1.5 text-[17px] font-extrabold text-white">
            {leaderboardsUnlocked ? "Leaderboards" : "Unlock Leaderboards!"}
          </h3>
        )}
        <div className="flex items-start gap-2">
          <ShieldIcon className="h-9 w-9 shrink-0" />
          <p className="text-[15px] font-bold leading-snug text-duo-text-muted">
            {loading
              ? "Loading progress…"
              : leaderboardsUnlocked
                ? "You unlocked leaderboards! Keep earning XP."
                : `Complete ${remainingLessons} more lesson${remainingLessons === 1 ? "" : "s"} to start competing`}
          </p>
        </div>
      </SidebarCard>

      <DailyQuestCard />
    </aside>
  );
}
