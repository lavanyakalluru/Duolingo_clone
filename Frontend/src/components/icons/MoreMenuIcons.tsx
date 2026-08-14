export function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <circle cx="23" cy="23" r="20" fill="#58CC02" />
      <path d="M23 12C23 12 14 18 14 28C14 34 18 36 23 36C28 36 32 34 32 28C32 18 23 12 23 12Z" fill="#89E219" />
      <path d="M23 16V32" stroke="#46A302" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <circle cx="23" cy="23" r="20" fill="#1CB0F6" />
      <ellipse cx="23" cy="23" rx="8" ry="18" stroke="white" strokeWidth="2" fill="none" />
      <path d="M3 23H43" stroke="white" strokeWidth="2" />
      <path d="M6 14H40M6 32H40" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

export function PodcastIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 46" fill="none" className={className} aria-hidden="true">
      <circle cx="23" cy="23" r="20" fill="#CE82FF" />
      <rect x="16" y="12" width="14" height="20" rx="7" fill="white" />
      <path d="M13 24C13 28 16 31 23 31C30 31 33 28 33 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M23 31V36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 36H28" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
