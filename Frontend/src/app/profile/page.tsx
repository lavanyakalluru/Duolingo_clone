import { AppShell } from "@/components/learn/AppShell";
import { RightSidebar } from "@/components/learn/RightSidebar";
import { DuoButton } from "@/components/ui/DuoButton";
import { getProfile } from "@/lib/api";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <AppShell rightSidebar={<RightSidebar />}>
      <div className="flex flex-col items-center pt-8 text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-duo-purple">
          <svg viewBox="0 0 60 60" className="h-16 w-16" aria-hidden="true">
            <circle cx="30" cy="22" r="14" fill="#FFD4A8" />
            <path
              d="M10 52C10 40 18 34 30 34C42 34 50 40 50 52"
              fill="#CE82FF"
            />
          </svg>
        </div>

        <h1 className="mb-1 text-[24px] font-extrabold text-white">
          {profile.username}
        </h1>
        <p className="mb-6 text-[15px] font-bold text-duo-text-muted">
          {profile.total_xp} total XP · {profile.streak} day streak
        </p>

        <div className="mb-8 grid w-full max-w-[360px] grid-cols-2 gap-3">
          <StatCard label="Lessons" value={profile.completed_lessons} />
          <StatCard label="Skills" value={profile.completed_skills} />
          <StatCard label="Gems" value={profile.gems} />
          <StatCard label="Hearts" value={profile.hearts} />
        </div>

        <DuoButton variant="profile" href="/learn" className="max-w-[280px]">
          Continue learning
        </DuoButton>
      </div>
    </AppShell>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border-2 border-duo-border bg-duo-bg-card px-4 py-3">
      <p className="text-[13px] font-extrabold uppercase tracking-wide text-duo-text-muted">
        {label}
      </p>
      <p className="text-[22px] font-extrabold text-white">{value}</p>
    </div>
  );
}
