import { GemIcon, StreakFreezeIcon } from "@/components/icons/LearnIcons";
import { AppShell } from "@/components/learn/AppShell";
import { RightSidebar } from "@/components/learn/RightSidebar";
import { DuoButton } from "@/components/ui/DuoButton";

export default function ShopPage() {
  return (
    <AppShell rightSidebar={<RightSidebar />}>
      <div className="pt-2 text-center">
        <p className="mb-4 text-[17px] font-extrabold leading-snug text-white">
          You earned 500 gems! Create a profile to spend them in the store!
        </p>
        <DuoButton variant="profile" className="mx-auto max-w-[280px]">
          Create a profile
        </DuoButton>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-[13px] font-extrabold uppercase tracking-wide text-duo-text-muted">
          Power-Ups
        </h2>

        <div className="flex items-start gap-4 border-t-2 border-duo-border pt-4">
          <StreakFreezeIcon className="h-12 w-12 shrink-0" />

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h3 className="text-[17px] font-extrabold text-white">
                Streak Freeze
              </h3>
              <span className="rounded-lg border-2 border-duo-border px-2 py-0.5 text-[11px] font-extrabold uppercase text-duo-text-muted">
                0 / 2 equipped
              </span>
            </div>
            <p className="mb-3 text-[13px] font-bold leading-snug text-duo-text-muted">
              Streak Freeze allows your streak to remain in place for one full
              day of inactivity.
            </p>
          </div>

          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-2xl border-2 border-b-4 border-duo-blue bg-duo-bg-dark px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-duo-blue transition-all active:translate-y-[2px] active:border-b-2"
          >
            Get for:
            <GemIcon className="h-4 w-4" />
            200
          </button>
        </div>
      </div>
    </AppShell>
  );
}
