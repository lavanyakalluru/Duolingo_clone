type DuolingoLogoProps = {
  className?: string;
};

export function DuolingoLogo({ className = "" }: DuolingoLogoProps) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Duolingo"
    >
      {/* Duo owl icon */}
      <ellipse cx="20" cy="22" rx="16" ry="18" fill="#58CC02" />
      <ellipse cx="20" cy="23" rx="11" ry="13" fill="#89E219" />
      <ellipse cx="14" cy="18" rx="5" ry="6" fill="white" />
      <ellipse cx="26" cy="18" rx="5" ry="6" fill="white" />
      <ellipse cx="14.5" cy="19" rx="2.5" ry="3" fill="#4B4B4B" />
      <ellipse cx="26.5" cy="19" rx="2.5" ry="3" fill="#4B4B4B" />
      <path d="M17 26L20 30L23 26Z" fill="#FFC800" />
      <ellipse cx="13" cy="36" rx="4" ry="2.5" fill="#FFC800" />
      <ellipse cx="27" cy="36" rx="4" ry="2.5" fill="#FFC800" />

      {/* duolingo wordmark */}
      <text
        x="44"
        y="28"
        fill="#58CC02"
        style={{
          fontFamily: "var(--font-nunito), Nunito, sans-serif",
          fontWeight: 800,
          fontSize: "22px",
          letterSpacing: "-0.5px",
        }}
      >
        duolingo
      </text>
    </svg>
  );
}
