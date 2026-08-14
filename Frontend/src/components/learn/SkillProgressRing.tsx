type SkillProgressRingProps = {
  progress: number;
  crowns: number;
  lessonCount: number;
  status: "active" | "locked" | "completed";
  size: number;
  children: React.ReactNode;
};

const RING_COLORS = {
  active: "#58CC02",
  completed: "#FFC800",
  locked: "#37464F",
  track: "#293B43",
};

export function SkillProgressRing({
  progress,
  crowns,
  lessonCount,
  status,
  size,
  children,
}: SkillProgressRingProps) {
  /*
   * The supplied `size` represents the size of the
   * lesson/node content.
   *
   * The ring sits slightly outside it.
   */
  const ringSize = size + 20;

  const strokeWidth = 5;

  const center = ringSize / 2;

  const radius = (ringSize - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  /*
   * Clamp progress so invalid backend values
   * don't break the SVG.
   */
  const normalizedProgress = Math.min(
    100,
    Math.max(0, progress),
  );

  const fillPercent =
    status === "completed"
      ? 100
      : status === "active"
        ? normalizedProgress
        : 0;

  const strokeDashoffset =
    circumference * (1 - fillPercent / 100);

  const ringColor =
    status === "completed"
      ? RING_COLORS.completed
      : status === "active"
        ? RING_COLORS.active
        : RING_COLORS.locked;

  const showCrownBadge =
    crowns > 0 || status === "completed";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: ringSize,
        height: ringSize,
      }}
    >
      {/* =====================================================
          PROGRESS RING
      ===================================================== */}

      <svg
        className="absolute inset-0"
        width={ringSize}
        height={ringSize}
        viewBox={`0 0 ${ringSize} ${ringSize}`}
        aria-hidden="true"
      >
        {/* Background ring */}

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={RING_COLORS.track}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}

        {fillPercent > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${center} ${center})`}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        )}
      </svg>

      {/* =====================================================
          LESSON SEGMENT
      ===================================================== */}

      {lessonCount > 1 && (
        <svg
          className="pointer-events-none absolute inset-0"
          width={ringSize}
          height={ringSize}
          viewBox={`0 0 ${ringSize} ${ringSize}`}
          aria-hidden="true"
        >
          {Array.from({
            length: lessonCount,
          }).map((_, index) => {
            const angle =
              (360 / lessonCount) * index;

            return (
              <line
                key={index}
                x1={center}
                y1={strokeWidth / 2}
                x2={center}
                y2={strokeWidth / 2 + 7}
                stroke={RING_COLORS.track}
                strokeWidth={2}
                strokeLinecap="round"
                transform={`rotate(${angle} ${center} ${center})`}
              />
            );
          })}
        </svg>
      )}

      {/* =====================================================
          NODE CONTENT
      ===================================================== */}

      <div className="relative z-10">
        {children}
      </div>

      {/* =====================================================
          CROWN BADGE
      ===================================================== */}

      {showCrownBadge && (
        <div
          className={[
            "absolute",
            "-bottom-2",
            "left-1/2",
            "z-20",
            "-translate-x-1/2",
            "flex",
            "items-center",
            "gap-1",
            "rounded-full",
            "border-2",
            "px-2",
            "py-[3px]",
            "shadow-sm",
            "whitespace-nowrap",

            status === "completed"
              ? [
                  "border-[#d99d00]",
                  "bg-[#FFC800]",
                ].join(" ")
              : [
                  "border-[#419100]",
                  "bg-[#58CC02]",
                ].join(" "),
          ].join(" ")}
        >
          <CrownIcon
            className={[
              "h-[14px]",
              "w-[14px]",
              status === "completed"
                ? "text-[#8a5700]"
                : "text-white",
            ].join(" ")}
          />

          <span
            className={[
              "text-[11px]",
              "font-extrabold",
              "leading-none",

              status === "completed"
                ? "text-[#8a5700]"
                : "text-white",
            ].join(" ")}
          >
            {crowns}/{lessonCount}
          </span>
        </div>
      )}
    </div>
  );
}

function CrownIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12H14V13H2V12ZM3 5L5 8L8 3L11 8L13 5L12 11H4L3 5Z" />
    </svg>
  );
}