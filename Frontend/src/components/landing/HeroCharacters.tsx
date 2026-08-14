export function HeroCharacters({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 580 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Coins */}
      <circle cx="120" cy="60" r="14" fill="#FFC800" />
      <circle cx="140" cy="45" r="10" fill="#FFC800" />
      <circle cx="420" cy="80" r="12" fill="#FFC800" />
      <circle cx="480" cy="55" r="16" fill="#FFC800" />

      {/* Character 1 - purple hair girl */}
      <ellipse cx="95" cy="280" rx="28" ry="8" fill="#E5E5E5" opacity="0.5" />
      <rect x="78" y="220" width="34" height="50" rx="8" fill="#CE82FF" />
      <circle cx="95" cy="200" r="22" fill="#FFD4A8" />
      <path d="M73 188C73 175 82 168 95 168C108 168 117 175 117 188" fill="#CE82FF" />
      <rect x="70" y="250" width="14" height="30" rx="6" fill="#1CB0F6" />
      <rect x="106" y="250" width="14" height="30" rx="6" fill="#1CB0F6" />

      {/* Character 2 - green shirt boy */}
      <ellipse cx="180" cy="310" rx="26" ry="7" fill="#E5E5E5" opacity="0.5" />
      <rect x="165" y="255" width="30" height="45" rx="8" fill="#58CC02" />
      <circle cx="180" cy="238" r="20" fill="#FFD4A8" />
      <path d="M165 228C165 218 172 212 180 212C188 212 195 218 195 228" fill="#4B4B4B" />
      <rect x="158" y="285" width="12" height="25" rx="5" fill="#4B4B4B" />
      <rect x="190" y="285" width="12" height="25" rx="5" fill="#4B4B4B" />

      {/* Character 3 - orange hair */}
      <ellipse cx="500" cy="290" rx="28" ry="8" fill="#E5E5E5" opacity="0.5" />
      <rect x="483" y="235" width="34" height="48" rx="8" fill="#FF9600" />
      <circle cx="500" cy="215" r="21" fill="#FFD4A8" />
      <path d="M479 203C479 192 488 185 500 185C512 185 521 192 521 203" fill="#FF9600" />
      <rect x="475" y="265" width="13" height="28" rx="5" fill="#CE82FF" />
      <rect x="512" y="265" width="13" height="28" rx="5" fill="#CE82FF" />

      {/* Character 4 - blue shirt */}
      <ellipse cx="540" cy="250" rx="24" ry="7" fill="#E5E5E5" opacity="0.5" />
      <rect x="527" y="200" width="26" height="40" rx="7" fill="#1CB0F6" />
      <circle cx="540" cy="185" r="18" fill="#FFD4A8" />
      <path d="M525 175C525 167 531 162 540 162C549 162 555 167 555 175" fill="#4B4B4B" />

      {/* Character 5 - pink */}
      <ellipse cx="60" cy="180" rx="22" ry="6" fill="#E5E5E5" opacity="0.5" />
      <rect x="48" y="135" width="24" height="38" rx="7" fill="#FF4B4B" />
      <circle cx="60" cy="122" r="16" fill="#FFD4A8" />
      <path d="M48 113C48 106 53 102 60 102C67 102 72 106 72 113" fill="#FF9600" />

      {/* Character 6 - yellow */}
      <ellipse cx="450" cy="200" rx="24" ry="7" fill="#E5E5E5" opacity="0.5" />
      <rect x="437" y="155" width="26" height="38" rx="7" fill="#FFC800" />
      <circle cx="450" cy="142" r="17" fill="#FFD4A8" />
      <path d="M436 133C436 126 442 122 450 122C458 122 464 126 464 133" fill="#4B4B4B" />

      {/* Duo the owl - main character */}
      <ellipse cx="310" cy="360" rx="80" ry="12" fill="#E5E5E5" opacity="0.4" />
      <ellipse cx="310" cy="280" rx="75" ry="85" fill="#58CC02" />
      <ellipse cx="310" cy="290" rx="55" ry="65" fill="#89E219" />
      {/* Wings */}
      <ellipse cx="230" cy="270" rx="35" ry="50" fill="#58CC02" transform="rotate(-20 230 270)" />
      <ellipse cx="390" cy="270" rx="35" ry="50" fill="#58CC02" transform="rotate(20 390 270)" />
      {/* Eyes */}
      <ellipse cx="285" cy="250" rx="22" ry="26" fill="white" />
      <ellipse cx="335" cy="250" rx="22" ry="26" fill="white" />
      <ellipse cx="290" cy="255" rx="12" ry="14" fill="#4B4B4B" />
      <ellipse cx="340" cy="255" rx="12" ry="14" fill="#4B4B4B" />
      <circle cx="294" cy="250" r="4" fill="white" />
      <circle cx="344" cy="250" r="4" fill="white" />
      {/* Beak */}
      <path d="M305 280L310 295L315 280Z" fill="#FFC800" />
      {/* Feet */}
      <ellipse cx="290" cy="350" rx="12" ry="8" fill="#FFC800" />
      <ellipse cx="330" cy="350" rx="12" ry="8" fill="#FFC800" />
      {/* Eyebrows */}
      <path d="M265 230C275 220 295 222 300 235" stroke="#46A302" strokeWidth="4" strokeLinecap="round" />
      <path d="M355 235C360 222 380 220 390 230" stroke="#46A302" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
