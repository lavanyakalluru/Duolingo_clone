export function LearnIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="22" width="30" height="18" rx="3" fill="#FFC800" />
      <path d="M23 8L38 22H8L23 8Z" fill="#FF4B4B" />
      <rect x="20" y="28" width="6" height="12" rx="1" fill="#CE82FF" />
    </svg>
  );
}

export function LeaderboardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <path d="M23 6L28 16H38L30 23L33 34L23 28L13 34L16 23L8 16H18L23 6Z" fill="#FFC800" />
      <circle cx="23" cy="23" r="8" fill="#FFD900" stroke="#CE82FF" strokeWidth="2" />
    </svg>
  );
}

export function QuestsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="18" width="26" height="20" rx="3" fill="#FFC800" />
      <rect x="10" y="14" width="26" height="8" rx="2" fill="#FF9600" />
      <rect x="18" y="10" width="10" height="6" rx="2" fill="#FF9600" />
      <rect x="14" y="24" width="18" height="3" rx="1" fill="#CE82FF" />
    </svg>
  );
}

export function ShopIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="20" width="30" height="20" rx="2" fill="#CE82FF" />
      <path d="M8 20L12 10H34L38 20" fill="#FF4B4B" />
      <rect x="20" y="28" width="6" height="12" fill="#89E219" />
    </svg>
  );
}

export function ProfileIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <circle cx="23" cy="18" r="10" fill="#FFD4A8" />
      <path d="M10 38C10 30 16 26 23 26C30 26 36 30 36 38" fill="#CE82FF" />
      <circle cx="30" cy="12" r="4" fill="#FF4B4B" />
    </svg>
  );
}

export function MoreIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <circle cx="23" cy="23" r="16" fill="#CE82FF" />
      <circle cx="16" cy="23" r="2.5" fill="white" />
      <circle cx="23" cy="23" r="2.5" fill="white" />
      <circle cx="30" cy="23" r="2.5" fill="white" />
    </svg>
  );
}
