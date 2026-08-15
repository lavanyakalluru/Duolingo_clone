export function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookOpen({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 6C4 4.9 4.9 4 6 4H10V20H6C4.9 20 4 19.1 4 18V6Z" fill="currentColor" />
      <path d="M20 6C20 4.9 19.1 4 18 4H14V20H18C19.1 20 20 19.1 20 18V6Z" fill="currentColor" />
      <path d="M10 4H14V20H10V4Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
    </svg>
  );
}

export function ChestIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="14" width="24" height="14" rx="2" fill="#52656D" />
      <rect x="4" y="10" width="24" height="6" rx="2" fill="#37464F" />
      <rect x="13" y="7" width="6" height="5" rx="1" fill="#37464F" />
      <rect x="12" y="18" width="8" height="4" rx="1" fill="#37464F" />
    </svg>
  );
}

export function DuoOwl({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      className={`duo-owl ${className}`}
      aria-hidden="true"
    >
      {/* Shadow */}
      <ellipse
        cx="60"
        cy="120"
        rx="40"
        ry="8"
        fill="#37464F"
        className="duo-shadow"
      />

      {/* Character */}
      <g className="duo-character">
        {/* LEFT WING */}
        <g className="duo-wing-left">
          <ellipse
            cx="38"
            cy="70"
            rx="18"
            ry="28"
            fill="#58CC02"
          />
        </g>

        {/* RIGHT WING */}
        <g className="duo-wing-right">
          <ellipse
            cx="82"
            cy="70"
            rx="18"
            ry="28"
            fill="#58CC02"
          />
        </g>

        {/* Main body */}
        <ellipse
          cx="60"
          cy="75"
          rx="45"
          ry="50"
          fill="#58CC02"
        />

        {/* Belly */}
        <ellipse
          cx="60"
          cy="80"
          rx="32"
          ry="38"
          fill="#89E219"
        />

        {/* Face */}
        <g className="duo-face">
          {/* Left eye white */}
          <ellipse
            cx="48"
            cy="65"
            rx="14"
            ry="16"
            fill="white"
          />

          {/* Right eye white */}
          <ellipse
            cx="72"
            cy="65"
            rx="14"
            ry="16"
            fill="white"
          />

          {/* Left pupil */}
          <ellipse
            cx="50"
            cy="68"
            rx="7"
            ry="8"
            fill="#4B4B4B"
          />

          {/* Right pupil */}
          <ellipse
            cx="74"
            cy="68"
            rx="7"
            ry="8"
            fill="#4B4B4B"
          />

          {/* Eye highlights */}
          <circle
            cx="52"
            cy="64"
            r="2.5"
            fill="white"
          />

          <circle
            cx="76"
            cy="64"
            r="2.5"
            fill="white"
          />

          {/* Happy closed eyes */}
          <g className="duo-happy-eyes">
            <path
              d="M38 66 Q48 75 58 66"
              stroke="#4B4B4B"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            <path
              d="M62 66 Q72 75 82 66"
              stroke="#4B4B4B"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>

        {/* Beak */}
        <path
          d="M55 88L60 98L65 88Z"
          fill="#FFC800"
          className="duo-beak"
        />

        {/* Left foot */}
        <ellipse
          cx="48"
          cy="108"
          rx="8"
          ry="5"
          fill="#FFC800"
          className="duo-foot-left"
        />

        {/* Right foot */}
        <ellipse
          cx="72"
          cy="108"
          rx="8"
          ry="5"
          fill="#FFC800"
          className="duo-foot-right"
        />
      </g>

      <style>
        {`
          .duo-owl {
            overflow: visible;
          }

          /*
           * MAIN IDLE ANIMATION
           *
           * Duo:
           * - settles down
           * - squashes slightly
           * - jumps upward
           * - stretches
           * - settles again
           */
          .duo-character {
            transform-box: fill-box;
            transform-origin: center bottom;

            animation:
              duo-idle 2.6s ease-in-out infinite;
          }

          /*
           * LEFT WING
           */
          .duo-wing-left {
            transform-box: fill-box;
            transform-origin: right center;

            animation:
              duo-left-wing 2.6s ease-in-out infinite;
          }

          /*
           * RIGHT WING
           */
          .duo-wing-right {
            transform-box: fill-box;
            transform-origin: left center;

            animation:
              duo-right-wing 2.6s ease-in-out infinite;
          }

          /*
           * FACE
           */
          .duo-face {
            transform-box: fill-box;
            transform-origin: center;

            animation:
              duo-face-move 2.6s ease-in-out infinite;
          }

          /*
           * HAPPY CLOSED EYES
           *
           * Normally hidden.
           * They appear briefly during the happy bounce.
           */
          .duo-happy-eyes {
            opacity: 0;

            transform-box: fill-box;
            transform-origin: center;

            animation:
              duo-happy-eyes 2.6s ease-in-out infinite;
          }

          /*
           * BEAK
           */
          .duo-beak {
            transform-box: fill-box;
            transform-origin: center;

            animation:
              duo-beak 2.6s ease-in-out infinite;
          }

          /*
           * FEET
           */
          .duo-foot-left,
          .duo-foot-right {
            transform-box: fill-box;
            transform-origin: center;
          }

          .duo-foot-left {
            animation:
              duo-foot-left 2.6s ease-in-out infinite;
          }

          .duo-foot-right {
            animation:
              duo-foot-right 2.6s ease-in-out infinite;
          }

          /*
           * SHADOW
           */
          .duo-shadow {
            transform-box: fill-box;
            transform-origin: center;

            animation:
              duo-shadow 2.6s ease-in-out infinite;
          }


          /* =========================================
             BODY
             ========================================= */

          @keyframes duo-idle {
            0% {
              transform:
                translateY(0)
                scaleX(1)
                scaleY(1);
            }

            12% {
              transform:
                translateY(2px)
                scaleX(1.025)
                scaleY(0.975);
            }

            25% {
              transform:
                translateY(-7px)
                scaleX(0.97)
                scaleY(1.04);
            }

            38% {
              transform:
                translateY(-9px)
                scaleX(0.95)
                scaleY(1.06);
            }

            52% {
              transform:
                translateY(1px)
                scaleX(1.03)
                scaleY(0.97);
            }

            68% {
              transform:
                translateY(0)
                scaleX(1)
                scaleY(1);
            }

            100% {
              transform:
                translateY(0)
                scaleX(1)
                scaleY(1);
            }
          }


          /* =========================================
             WINGS
             ========================================= */

          @keyframes duo-left-wing {
            0% {
              transform: rotate(0deg) translateX(0);
            }

            12% {
              transform: rotate(-4deg) translateX(-1px);
            }

            25% {
              transform: rotate(-18deg) translateX(-4px);
            }

            38% {
              transform: rotate(-24deg) translateX(-5px);
            }

            52% {
              transform: rotate(-8deg) translateX(-2px);
            }

            68% {
              transform: rotate(0deg) translateX(0);
            }

            100% {
              transform: rotate(0deg) translateX(0);
            }
          }

          @keyframes duo-right-wing {
            0% {
              transform: rotate(0deg) translateX(0);
            }

            12% {
              transform: rotate(4deg) translateX(1px);
            }

            25% {
              transform: rotate(18deg) translateX(4px);
            }

            38% {
              transform: rotate(24deg) translateX(5px);
            }

            52% {
              transform: rotate(8deg) translateX(2px);
            }

            68% {
              transform: rotate(0deg) translateX(0);
            }

            100% {
              transform: rotate(0deg) translateX(0);
            }
          }


          /* =========================================
             FACE
             ========================================= */

          @keyframes duo-face-move {
            0%,
            100% {
              transform: translateY(0);
            }

            25% {
              transform: translateY(-2px);
            }

            40% {
              transform: translateY(-3px);
            }

            55% {
              transform: translateY(0);
            }
          }


          /* =========================================
             HAPPY EYES
             ========================================= */

          @keyframes duo-happy-eyes {
            0%,
            20% {
              opacity: 0;
            }

            27% {
              opacity: 1;
            }

            43% {
              opacity: 1;
            }

            50%,
            100% {
              opacity: 0;
            }
          }


          /* =========================================
             BEAK
             ========================================= */

          @keyframes duo-beak {
            0%,
            100% {
              transform: translateY(0) scale(1);
            }

            27% {
              transform: translateY(-1px) scale(1.05);
            }

            42% {
              transform: translateY(-2px) scale(1.08);
            }

            55% {
              transform: translateY(0) scale(1);
            }
          }


          /* =========================================
             FEET
             ========================================= */

          @keyframes duo-foot-left {
            0%,
            100% {
              transform: rotate(0deg) translateY(0);
            }

            25% {
              transform: rotate(-5deg) translateY(-2px);
            }

            45% {
              transform: rotate(-8deg) translateY(-3px);
            }

            60% {
              transform: rotate(0deg) translateY(0);
            }
          }

          @keyframes duo-foot-right {
            0%,
            100% {
              transform: rotate(0deg) translateY(0);
            }

            25% {
              transform: rotate(5deg) translateY(-2px);
            }

            45% {
              transform: rotate(8deg) translateY(-3px);
            }

            60% {
              transform: rotate(0deg) translateY(0);
            }
          }


          /* =========================================
             SHADOW
             ========================================= */

          @keyframes duo-shadow {
            0%,
            100% {
              transform: scaleX(1);
              opacity: 0.45;
            }

            25% {
              transform: scaleX(0.8);
              opacity: 0.28;
            }

            40% {
              transform: scaleX(0.72);
              opacity: 0.22;
            }

            55% {
              transform: scaleX(0.95);
              opacity: 0.4;
            }
          }


          /* =========================================
             ACCESSIBILITY
             ========================================= */

          @media (prefers-reduced-motion: reduce) {
            .duo-character,
            .duo-wing-left,
            .duo-wing-right,
            .duo-face,
            .duo-happy-eyes,
            .duo-beak,
            .duo-foot-left,
            .duo-foot-right,
            .duo-shadow {
              animation: none;
            }
          }
        `}
      </style>
    </svg>
  );
}

export function FlameIcon({ className = "", active = true }: { className?: string; active?: boolean }) {
  return (
    <svg viewBox="0 0 24 28" fill="none" className={className} aria-hidden="true">
      <path d="M12 2C12 2 6 10 6 16C6 20.4 8.6 24 12 24C15.4 24 18 20.4 18 16C18 10 12 2 12 2Z" fill={active ? "#FF9600" : "#3c4d57"} />
      <path d="M12 10C12 10 9 14 9 17C9 19.2 10.3 21 12 21C13.7 21 15 19.2 15 17C15 14 12 10 12 10Z" fill={active ? "#FFC800" : "#202f36"} />
    </svg>
  );
}

export function GemIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2L20 8V16L12 22L4 16V8L12 2Z" fill="#1CB0F6" />
      <path d="M12 2L4 8H20L12 2Z" fill="#84D8FF" />
      <path d="M4 8L12 22L8 8H4Z" fill="#1899D6" />
      <path d="M20 8L12 22L16 8H20Z" fill="#1899D6" />
    </svg>
  );
}

export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 3 14.5 3 9C3 6 5.5 4 8 4C9.8 4 11.4 5 12 6.5C12.6 5 14.2 4 16 4C18.5 4 21 6 21 9C21 14.5 12 21 12 21Z" fill="#FF4B4B" />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 4L40 10V22C40 32 24 42 24 42C24 42 8 32 8 22V10L24 4Z" fill="#52656D" />
      <path d="M24 14V30M18 22H30" stroke="#37464F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function LightningIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13 2L4 14H11L10 22L20 10H13L13 2Z" fill="#FFC800" />
    </svg>
  );
}

export function FrenchFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" fill="none" className={className} aria-hidden="true">
      <rect width="32" height="24" rx="4" fill="#002395" />
      <rect x="10.67" width="10.67" height="24" fill="white" />
      <rect x="21.33" width="10.67" height="24" fill="#ED2939" />
    </svg>
  );
}

export function SmallChestIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="9" width="16" height="9" rx="1" fill="#52656D" />
      <rect x="2" y="6" width="16" height="4" rx="1" fill="#37464F" />
      <rect x="7" y="4" width="6" height="3" rx="1" fill="#37464F" />
    </svg>
  );
}

export function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 4H18V8C18 11 16 13 14 14H10C8 13 6 11 6 8V4Z" />
      <path d="M10 14V17H14V14" />
      <path d="M8 17H16V19H8V17Z" />
      <path d="M4 4H6V7C6 8.5 5 9.5 4 10V4Z" />
      <path d="M20 4H18V7C18 8.5 19 9.5 20 10V4Z" />
    </svg>
  );
}

export function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5 4C5 3.4 5.4 3 6 3H12V21H6C5.4 21 5 20.6 5 20V4Z" />
      <path d="M19 4C19 3.4 18.6 3 18 3H12V21H18C18.6 21 19 20.6 19 20V4Z" opacity="0.7" />
    </svg>
  );
}

export function FastForwardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M5 5V19L13 12L5 5Z" />
      <path d="M13 5V19L21 12L13 5Z" />
    </svg>
  );
}

export function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="10" width="12" height="10" rx="2" fill="#52656D" />
      <path d="M8 10V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V10" stroke="#52656D" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#FF9600" strokeWidth="2" fill="none" />
      <path d="M10 6V10L13 12" stroke="#FF9600" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function StreakFreezeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 6C24 6 14 16 14 26C14 34 18 38 24 38C30 38 34 34 34 26C34 16 24 6 24 6Z" fill="#84D8FF" />
      <path d="M24 14V30" stroke="#1CB0F6" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 22L24 18L28 22" stroke="#1CB0F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToggleSwitch({ checked = true }: { checked?: boolean }) {
  return (
    <div
      className={[
        "relative h-8 w-14 shrink-0 rounded-full border-2 transition-colors",
        checked ? "border-duo-blue bg-duo-blue" : "border-duo-border bg-duo-border",
      ].join(" ")}
    >
      <div
        className={[
          "absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform",
          checked ? "left-[calc(100%-1.625rem)]" : "left-0.5",
        ].join(" ")}
      />
    </div>
  );
}
