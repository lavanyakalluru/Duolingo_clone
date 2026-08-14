"use client";

import {
  FlameIcon,
  FrenchFlag,
  GemIcon,
  HeartIcon,
} from "@/components/icons/LearnIcons";
import { useUser } from "@/components/providers/UserProvider";

function StatItem({
  children,
  value,
  colorClass = "text-duo-text-muted",
}: {
  children: React.ReactNode;
  value: string | number;
  colorClass?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <span className={`text-[15px] font-extrabold ${colorClass}`}>
        {value}
      </span>
    </div>
  );
}

export function StatsBar({ className = "" }: { className?: string }) {
  const { profile, loading } = useUser();

  const streak = profile?.streak ?? 0;
  const gems = profile?.gems ?? 0;
  const hearts = profile?.hearts ?? 0;

  const isStreakActive = streak > 0;

  return (
    <div className={`flex items-center justify-end gap-5 sm:gap-6 ${className}`}>
      {/* Course Flag */}
      <FrenchFlag className="h-[22px] w-[30px] shrink-0 rounded-md cursor-pointer hover:opacity-85 transition-opacity" />

      {/* Streak (Flame) */}
      <StatItem
        value={loading ? "…" : streak}
        colorClass={isStreakActive ? "text-[#ff9600]" : "text-[#4b4b4b]"}
      >
        <FlameIcon className="h-[24px] w-[20px]" active={isStreakActive} />
      </StatItem>

      {/* Gems */}
      <StatItem value={loading ? "…" : gems} colorClass="text-[#1cb0f6]">
        <GemIcon className="h-[22px] w-[22px]" />
      </StatItem>

      {/* Hearts */}
      <StatItem value={loading ? "…" : hearts} colorClass="text-[#ff4b4b]">
        <HeartIcon className="h-[22px] w-[22px]" />
      </StatItem>
    </div>
  );
}

