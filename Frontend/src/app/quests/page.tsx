"use client";

import Image from "next/image";
import {
  ClockIcon,
  LightningIcon,
  LockIcon,
  SmallChestIcon,
} from "@/components/icons/LearnIcons";
import { AppShell } from "@/components/learn/AppShell";
import { FooterLinks } from "@/components/learn/FooterLinks";
import { SidebarCard } from "@/components/learn/SidebarCard";
import { StatsBar } from "@/components/learn/StatsBar";
import { useUser } from "@/components/providers/UserProvider";
import { DuoButton } from "@/components/ui/DuoButton";

function WelcomeBanner() {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl">
      <Image
        src="/quests-welcome.png"
        alt="Welcome! Complete quests to earn rewards. Quests refresh every day."
        width={560}
        height={120}
        className="h-auto w-full object-cover"
        priority
      />
    </div>
  );
}

function QuestsRightSidebar() {
  return (
    <aside className="hidden w-[300px] shrink-0 flex-col gap-3 xl:flex">
      <StatsBar className="px-1 py-1" />

      <SidebarCard>
        <div className="flex items-start gap-3">
          <svg viewBox="0 0 60 50" className="h-[50px] w-[60px] shrink-0" aria-hidden="true">
            <circle cx="30" cy="25" r="18" fill="#FFC800" />
            <path d="M24 22L30 14L36 22L44 24L36 30L38 38L30 34L22 38L24 30L16 24L24 22Z" fill="#FF9600" />
            <circle cx="42" cy="12" r="8" fill="#58CC02" opacity="0.8" />
          </svg>
          <div>
            <h3 className="mb-1 text-[15px] font-extrabold leading-snug text-white">
              Monthly challenges unlock soon!
            </h3>
            <p className="text-[13px] font-bold leading-snug text-duo-text-muted">
              Complete each month&apos;s challenge to earn exclusive badges
            </p>
          </div>
        </div>
        <div className="mt-3">
          <DuoButton variant="outline-blue" href="/learn">
            Start a lesson
          </DuoButton>
        </div>
      </SidebarCard>

      <FooterLinks />
    </aside>
  );
}

function DailyQuestProgress() {
  const { profile, loading } = useUser();
  const dailyXp = profile?.daily_xp ?? 0;
  const questGoal = 10;
  const progress = Math.min(dailyXp, questGoal);
  const progressPercent = (progress / questGoal) * 100;

  return (
    <SidebarCard className="bg-duo-bg-card">
      <div className="flex items-center gap-3">
        <LightningIcon className="h-8 w-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[15px] font-extrabold text-white">
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

export default function QuestsPage() {
  return (
    <AppShell rightSidebar={<QuestsRightSidebar />}>
      <WelcomeBanner />

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[19px] font-extrabold text-white">Daily Quests</h2>
        <div className="flex items-center gap-1.5">
          <ClockIcon className="h-4 w-4" />
          <span className="text-[13px] font-extrabold uppercase text-[#FF9600]">
            4 hours
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <DailyQuestProgress />

        <SidebarCard className="bg-duo-bg-card">
          <div className="flex items-center gap-3">
            <LockIcon className="h-7 w-7 shrink-0" />
            <p className="text-[15px] font-extrabold text-duo-text-muted">
              More quests unlock soon
            </p>
          </div>
        </SidebarCard>
      </div>
    </AppShell>
  );
}
