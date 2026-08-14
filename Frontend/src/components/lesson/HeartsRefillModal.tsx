"use client";

import { DuoOwl, HeartIcon } from "@/components/icons/LearnIcons";

type HeartsRefillModalProps = {
  open: boolean;
  loading?: boolean;
  onRefill: () => void;
};

export function HeartsRefillModal({
  open,
  loading = false,
  onRefill,
}: HeartsRefillModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-[400px] rounded-2xl border-2 border-duo-border bg-[#202f36] px-6 py-8 text-center shadow-2xl">
        <div className="relative mx-auto mb-6 flex h-[130px] w-[130px] items-center justify-center">
          <DuoOwl className="h-[118px] w-[100px]" />
          <div className="absolute bottom-0 right-0 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#202f36]">
            <HeartIcon className="h-[44px] w-[44px]" />
          </div>
        </div>

        <p className="mb-6 text-[19px] font-extrabold leading-snug text-white">
          You ran out of hearts. Have a free refill on us to keep going!
        </p>

        <button
          type="button"
          disabled={loading}
          onClick={onRefill}
          className="w-full rounded-2xl border-2 border-b-4 border-[#1899d6] bg-[#1cb0f6] px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#131f24] transition-all hover:bg-[#2fc3ff] active:translate-y-[2px] active:border-b-2 disabled:opacity-60"
        >
          {loading ? "Refilling…" : "Refill for free"}
        </button>
      </div>
    </div>
  );
}
