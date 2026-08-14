import { BookOpen } from "@/components/icons/LearnIcons";

type UnitHeaderProps = {
  section: string;
  unit: string;
  title: string;
  lessonName?: string;
  color?: "green" | "teal" | "purple";
};

const colorStyles = {
  green: {
    bg: "bg-duo-green",
    guidebook: "border-[#419100] bg-duo-green-darker hover:bg-[#46a302] transition-colors",
  },
  teal: {
    bg: "bg-duo-teal",
    guidebook: "border-[#009f7a] bg-[#00b58a] hover:bg-duo-teal-dark transition-colors",
  },
  purple: {
    bg: "bg-duo-purple",
    guidebook: "border-[#a855e8] bg-[#b86ff0] hover:bg-[#b86ff0]/90 transition-colors",
  },
};

export function UnitHeader({
  section,
  unit,
  title,
  color = "green",
}: UnitHeaderProps) {
  const styles = colorStyles[color];

  return (
    <div className={`overflow-hidden rounded-2xl ${styles.bg}`}>
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white/95 hover:text-white transition-colors"
              aria-label="Go back"
            >
              <span className="text-[16px] leading-none">←</span>
              <span>{section}, {unit}</span>
            </button>
          </div>
          <h2 className="mt-1.5 text-[22px] font-extrabold leading-tight text-white">
            {title}
          </h2>
        </div>

        <button
          type="button"
          className={`flex shrink-0 items-center gap-2.5 rounded-2xl border-2 border-b-4 px-4.5 py-3 text-[14px] font-extrabold uppercase tracking-wide text-white transition-all active:translate-y-[2px] active:border-b-2 ${styles.guidebook}`}
        >
          <BookOpen className="h-[18px] w-[18px]" />
          Guidebook
        </button>
      </div>
    </div>
  );
}
