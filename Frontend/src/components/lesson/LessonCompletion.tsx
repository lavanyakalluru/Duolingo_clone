"use client";

import Link from "next/link";

type CompletionProps = {
  completed: boolean;
  xpEarned: number;
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  streak: number;
  stage: "summary" | "streak";
  onContinue: () => void;
};

function DuoCelebration({ streak = false }: { streak?: boolean }) {
  return (
    <svg
      viewBox="0 0 300 210"
      className="h-[190px] w-[270px] sm:h-[220px] sm:w-[310px]"
      role="img"
      aria-label={
        streak
          ? "Duo celebrating a streak"
          : "Duo celebrating lesson completion"
      }
    >
      {!streak && (
        <g
          fill="none"
          stroke="#ffcc00"
          strokeLinecap="round"
          strokeWidth="7"
        >
          <path d="M150 11v24" />
          <path d="M109 25l12 20" />
          <path d="M190 25l-12 20" />
          <path d="M78 58l22 12" />
          <path d="M222 58l-22 12" />
          <path d="M68 100l25 4" />
          <path d="M232 100l-25 4" />
        </g>
      )}

      <path
        d="M73 171h154"
        stroke="#42545c"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <ellipse
        cx="128"
        cy="120"
        rx="49"
        ry="56"
        fill="#58cc02"
      />

      <path
        d="M95 105C76 66 118 55 130 83C154 51 179 74 161 107"
        fill="#58cc02"
      />

      <ellipse
        cx="111"
        cy="109"
        rx="18"
        ry="22"
        fill="white"
      />

      <ellipse
        cx="144"
        cy="109"
        rx="18"
        ry="22"
        fill="white"
      />

      <ellipse
        cx="115"
        cy="113"
        rx="7"
        ry="11"
        fill="#38464d"
      />

      <ellipse
        cx="141"
        cy="113"
        rx="7"
        ry="11"
        fill="#38464d"
      />

      <path
        d="M122 130l8-5 8 5-8 8z"
        fill="#ff9600"
      />

      <path
        d="M116 146q13 12 27 0"
        fill="none"
        stroke="#46a302"
        strokeLinecap="round"
        strokeWidth="5"
      />

      <path
        d="M98 161l-9 15M151 160l11 15"
        stroke="#ff9600"
        strokeLinecap="round"
        strokeWidth="12"
      />

      {streak ? (
        <>
          <path
            d="M194 61c20 18 10 43-5 53 4-19-13-25-3-48 3 15 10 16 8-5z"
            fill="#ff9600"
          />

          <path
            d="M194 75c8 12 3 24-5 29-2-11-8-15-2-26z"
            fill="#ffcc00"
          />

          <path
            d="M184 155l24 13-9-24z"
            fill="#9b5a37"
          />
        </>
      ) : (
        <>
          <circle
            cx="209"
            cy="143"
            r="6"
            fill="#ff4b4b"
          />

          <path
            d="M218 143h12"
            stroke="#58cc02"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M227 143l5-5M227 143l5 5"
            stroke="#58cc02"
            strokeWidth="3"
          />
        </>
      )}
    </svg>
  );
}

function FailedIllustration() {
  return (
    <svg
      viewBox="0 0 300 210"
      className="h-[190px] w-[270px] sm:h-[220px] sm:w-[310px]"
      role="img"
      aria-label="Lesson failed"
    >
      <path
        d="M73 171h154"
        stroke="#42545c"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Body */}
      <ellipse
        cx="128"
        cy="120"
        rx="49"
        ry="56"
        fill="#58cc02"
      />

      {/* Hair */}
      <path
        d="M95 105C76 66 118 55 130 83C154 51 179 74 161 107"
        fill="#58cc02"
      />

      {/* Eyes */}
      <ellipse
        cx="111"
        cy="109"
        rx="18"
        ry="22"
        fill="white"
      />

      <ellipse
        cx="144"
        cy="109"
        rx="18"
        ry="22"
        fill="white"
      />

      <ellipse
        cx="115"
        cy="113"
        rx="7"
        ry="11"
        fill="#38464d"
      />

      <ellipse
        cx="141"
        cy="113"
        rx="7"
        ry="11"
        fill="#38464d"
      />

      {/* Beak */}
      <path
        d="M122 130l8-5 8 5-8 8z"
        fill="#ff9600"
      />

      {/* Sad mouth */}
      <path
        d="M116 151q13-12 27 0"
        fill="none"
        stroke="#46a302"
        strokeLinecap="round"
        strokeWidth="5"
      />

      {/* Feet */}
      <path
        d="M98 161l-9 15M151 160l11 15"
        stroke="#ff9600"
        strokeLinecap="round"
        strokeWidth="12"
      />

      {/* Broken heart */}
      <path
        d="M205 80
           C190 64 165 75 171 96
           C176 112 205 127 205 127
           C205 127 234 112 239 96
           C245 75 220 64 205 80Z"
        fill="#ff4b4b"
      />

      <path
        d="M204 78l-8 22 10 8-8 18"
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BottomActions({
  onContinue,
  failed = false,
}: {
  onContinue: () => void;
  failed?: boolean;
}) {
  return (
    <footer className="mt-auto flex w-full items-center justify-between border-t-2 border-duo-border px-5 py-5 sm:px-10">
      <Link
        href="/learn"
        className="rounded-2xl border-2 border-[#52656d] px-5 py-3 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#71838d] transition-colors hover:border-[#71838d] hover:text-white"
      >
        {failed ? "Back to path" : "Review lesson"}
      </Link>

      <button
        type="button"
        onClick={onContinue}
        className={`rounded-2xl border-2 border-b-4 px-8 py-3 text-[14px] font-extrabold uppercase tracking-[0.08em] transition-transform active:translate-y-[2px] active:border-b-2 ${
          failed
            ? "border-[#d93d3d] bg-[#ff4b4b] text-white"
            : "border-[#79b820] bg-[#a5e92d] text-[#17320b]"
        }`}
      >
        {failed ? "Try Again" : "Continue"}
      </button>
    </footer>
  );
}

export function LessonCompletion({
  completed,
  xpEarned,
  accuracy,
  correctAnswers,
  totalQuestions,
  streak,
  stage,
  onContinue,
}: CompletionProps) {
  const today = new Date();

  const weekStart = new Date(today);

  weekStart.setHours(0, 0, 0, 0);

  weekStart.setDate(
    today.getDate() - today.getDay(),
  );

  const currentWeek = Array.from(
    { length: 7 },
    (_, index) => {
      const day = new Date(weekStart);

      day.setDate(
        weekStart.getDate() + index,
      );

      return {
        label: day.toLocaleDateString(
          "en-US",
          {
            weekday: "narrow",
          },
        ),

        isToday:
          day.toDateString() ===
          today.toDateString(),

        isTomorrow:
          day.toDateString() ===
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1,
          ).toDateString(),
      };
    },
  );

  // =========================================================
  // FAILED LESSON
  // =========================================================

  if (!completed) {
    return (
      <main className="flex min-h-screen flex-col bg-duo-bg-dark text-white">
        <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 pb-10 text-center">
          <FailedIllustration />

          <h1 className="mt-1 text-[36px] font-extrabold tracking-tight text-[#ff4b4b] sm:text-[44px]">
            Lesson Failed
          </h1>

          <p className="mt-3 max-w-md text-[17px] font-bold leading-relaxed text-[#aebbc1]">
            You need at least 80% to complete this lesson.
            Keep practicing and try again!
          </p>

          <div className="mt-7 grid w-full max-w-[540px] grid-cols-2 gap-4">
            {/* SCORE */}
            <div className="overflow-hidden rounded-[24px] border-2 border-[#ff4b4b] bg-duo-bg-card">
              <p className="bg-[#ff4b4b] py-2 text-[13px] font-extrabold uppercase text-white">
                Your Score
              </p>

              <p className="py-7 text-[29px] font-extrabold text-[#ff4b4b]">
                {correctAnswers}/{totalQuestions}
              </p>
            </div>

            {/* ACCURACY */}
            <div className="overflow-hidden rounded-[24px] border-2 border-[#52656d] bg-duo-bg-card">
              <p className="bg-[#52656d] py-2 text-[13px] font-extrabold uppercase text-white">
                Accuracy
              </p>

              <p className="py-7 text-[29px] font-extrabold text-white">
                {accuracy}%
              </p>
            </div>
          </div>

          {/* XP */}
          <div className="mt-4 rounded-2xl border-2 border-[#42545c] bg-duo-bg-card px-8 py-4">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#71838d]">
              XP Earned
            </p>

            <p className="mt-1 text-2xl font-extrabold text-[#71838d]">
              +0 XP
            </p>
          </div>

          {/* IMPORTANT */}
          <p className="mt-5 text-sm font-bold text-[#71838d]">
            Your streak is unchanged.
          </p>
        </section>

        <BottomActions
          onContinue={onContinue}
          failed
        />
      </main>
    );
  }

  // =========================================================
  // STREAK SCREEN
  // =========================================================

  if (stage === "streak") {
    return (
      <main className="flex min-h-screen flex-col bg-duo-bg-dark text-white">
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 pb-10 text-center">
          <DuoCelebration streak />

          <div className="mt-5 w-full max-w-[510px] overflow-hidden rounded-2xl border-2 border-[#42545c] bg-duo-bg-card">
            <div className="grid grid-cols-7 gap-2 border-b-2 border-[#42545c] px-4 pb-5 pt-4">
              {currentWeek.map(
                (day, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className={`text-[14px] font-extrabold ${
                        day.isToday
                          ? "text-[#ff9600]"
                          : "text-[#71838d]"
                      }`}
                    >
                      {day.label}
                    </span>

                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-[20px] ${
                        day.isToday
                          ? "bg-[#ffb020] text-[#14313a]"
                          : day.isTomorrow
                            ? "border-2 border-dashed border-[#ffb020]"
                            : "bg-[#42545c]"
                      }`}
                    >
                      {day.isToday ? "✓" : ""}
                    </span>
                  </div>
                ),
              )}
            </div>

            <p className="px-6 py-5 text-[18px] font-bold leading-snug text-white">
              {streak > 1
                ? `Amazing — you are on a ${streak}-day streak!`
                : "Tip: Practice tomorrow to prevent your streak from resetting!"}
            </p>
          </div>
        </section>

        <BottomActions
          onContinue={onContinue}
        />
      </main>
    );
  }

  // =========================================================
  // SUCCESS / LESSON COMPLETE
  // =========================================================

  return (
    <main className="flex min-h-screen flex-col bg-duo-bg-dark text-white">
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 pb-10 text-center">
        <DuoCelebration />

              <h1
        className={[
          "mt-1 text-[36px] font-extrabold tracking-tight sm:text-[44px]",
          accuracy >= 80
            ? "text-[#ffcc00]"
            : "text-[#ff4b4b]",
        ].join(" ")}
      >
        {accuracy >= 80
          ? "Lesson Complete!"
          : "Lesson Not Passed"}
      </h1>
      {accuracy < 80 && (
        <div className="mt-5 w-full max-w-[540px] rounded-2xl border-2 border-[#ff4b4b] bg-[#351f21] px-6 py-4">
          <p className="text-lg font-extrabold text-[#ff4b4b]">
            You didn't pass this lesson.
          </p>

          <p className="mt-1 text-sm font-bold text-[#ffb3b3]">
            You need at least 80% accuracy to pass.
          </p>
        </div>
      )}

        <p className="mt-2 text-[16px] font-bold text-[#aebbc1]">
          Great job! Keep your learning streak going.
        </p>

        <div className="mt-6 grid w-full max-w-[540px] grid-cols-2 gap-4">
          {/* XP */}
          <div className="overflow-hidden rounded-[24px] border-2 border-[#ffcc00] bg-duo-bg-card">
            <p className="bg-[#ffcc00] py-2 text-[13px] font-extrabold uppercase text-[#17320b]">
              Total XP
            </p>

            <p className="py-7 text-[29px] font-extrabold text-[#ffcc00]">
              ⚡ {xpEarned}
            </p>
          </div>

          {/* ACCURACY */}
          <div className="overflow-hidden rounded-[24px] border-2 border-[#89d42a] bg-duo-bg-card">
            <p className="bg-[#89d42a] py-2 text-[13px] font-extrabold uppercase text-[#17320b]">
              Good
            </p>

            <p className="py-7 text-[29px] font-extrabold text-[#89d42a]">
              ◎ {accuracy}%
            </p>

            <span className="sr-only">
              {correctAnswers} out of{" "}
              {totalQuestions} answers correct
            </span>
          </div>
        </div>

        {/* SCORE */}
        <div className="mt-4 rounded-2xl border-2 border-[#42545c] bg-duo-bg-card px-8 py-3">
          <span className="text-sm font-bold text-[#71838d]">
            Score
          </span>

          <span className="ml-3 text-lg font-extrabold text-white">
            {correctAnswers}/{totalQuestions}
          </span>
        </div>

        {/* STREAK */}
        <p className="mt-4 text-sm font-bold text-[#ff9600]">
          🔥 {streak} day streak
        </p>
      </section>

      <BottomActions
        onContinue={onContinue}
      />
    </main>
  );
}