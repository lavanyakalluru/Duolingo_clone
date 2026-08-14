import { AppShell } from "@/components/learn/AppShell";
import { DuoButton } from "@/components/ui/DuoButton";
import {
  getLeaderboard,
  getProfile,
  LEADERBOARD_UNLOCK_LESSONS,
} from "@/lib/api";
import type { LeaderboardEntry } from "@/lib/types";

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="mx-auto h-[100px] w-[200px]" aria-hidden="true">
      <path d="M60 90L40 70V35L60 20L80 35V70L60 90Z" fill="#CD7F32" />
      <path d="M100 100L70 75V30L100 10L130 30V75L100 100Z" fill="#FFD700" />
      <path d="M140 85L125 70V40L140 28L155 40V70L140 85Z" fill="#C0C0C0" />
      <path d="M95 55L100 40L105 55L120 58L108 68L112 83L100 75L88 83L92 68L80 58L95 55Z" fill="#FF9600" />
      <rect x="30" y="15" width="8" height="8" rx="1" fill="#FFF5E0" transform="rotate(45 34 19)" />
      <rect x="160" y="25" width="6" height="6" rx="1" fill="#FFF5E0" transform="rotate(30 163 28)" />
      <rect x="150" y="80" width="7" height="7" rx="1" fill="#FFF5E0" transform="rotate(15 153 83)" />
    </svg>
  );
}

function InfoCard() {
  return (
    <div className="hidden w-[240px] shrink-0 rounded-2xl border-2 border-duo-border p-4 lg:block">
      <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-duo-text-muted">
        What are leaderboards?
      </p>
      <h3 className="mb-2 text-[17px] font-extrabold leading-snug text-white">
        Do lessons. Earn XP. Compete.
      </h3>
      <div className="flex items-start gap-3">
        <p className="flex-1 text-[13px] font-bold leading-snug text-duo-text-muted">
          Earn XP through lessons, then compete with players in a weekly
          leaderboard
        </p>
        <svg viewBox="0 0 60 70" className="h-[70px] w-[60px] shrink-0" aria-hidden="true">
          <ellipse cx="30" cy="38" rx="22" ry="26" fill="#58CC02" />
          <ellipse cx="24" cy="32" rx="7" ry="8" fill="white" />
          <ellipse cx="36" cy="32" rx="7" ry="8" fill="white" />
          <ellipse cx="25" cy="33" rx="3" ry="4" fill="#4B4B4B" />
          <ellipse cx="37" cy="33" rx="3" ry="4" fill="#4B4B4B" />
          <rect x="18" y="10" width="24" height="8" rx="4" fill="#FF4B4B" />
          <rect x="42" y="45" width="14" height="14" rx="3" fill="#52656D" />
        </svg>
      </div>
    </div>
  );
}

function LeaderboardRow({
  entry,
  isCurrentUser,
}: {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2.5",
        isCurrentUser ? "border-2 border-duo-blue bg-[#18282f]" : "",
      ].join(" ")}
    >
      <span className="w-6 text-[15px] font-extrabold text-duo-text-muted">
        {entry.rank}
      </span>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-duo-purple text-[13px] font-extrabold text-white">
        {entry.username.charAt(0).toUpperCase()}
      </div>
      <span className="flex-1 text-left text-[15px] font-extrabold text-white">
        {entry.username}
      </span>
      <span className="text-[13px] font-extrabold text-duo-text-muted">
        {entry.total_xp} XP
      </span>
    </div>
  );
}

export default async function LeaderboardsPage() {
  const [profile, { leaderboard }] = await Promise.all([
    getProfile(),
    getLeaderboard(),
  ]);

  const remainingLessons = Math.max(
    0,
    LEADERBOARD_UNLOCK_LESSONS - profile.completed_lessons,
  );
  const unlocked = remainingLessons === 0;

  return (
    <AppShell>
      <div className="flex gap-8 pt-4">
        <div className="mx-auto max-w-[420px] flex-1 text-center">
          {unlocked ? (
            <>
              <h1 className="mb-6 text-[24px] font-extrabold text-white">
                Leaderboard
              </h1>
              <div className="flex flex-col gap-1 text-left">
                {leaderboard.map((entry) => (
                  <LeaderboardRow
                    key={entry.user_id}
                    entry={entry}
                    isCurrentUser={entry.user_id === profile.id}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <ShieldIllustration />
              <h1 className="mb-2 text-[24px] font-extrabold text-white">
                Unlock Leaderboards!
              </h1>
              <p className="mb-6 text-[15px] font-bold text-duo-text-muted">
                Complete {remainingLessons} more lesson
                {remainingLessons === 1 ? "" : "s"} to start competing
              </p>
              <DuoButton variant="outline-blue" href="/learn" className="max-w-[280px]">
                Start a lesson
              </DuoButton>
            </>
          )}
        </div>

        <InfoCard />
      </div>
    </AppShell>
  );
}
