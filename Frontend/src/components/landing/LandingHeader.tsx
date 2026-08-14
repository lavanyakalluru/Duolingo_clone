import Link from "next/link";
import { DuolingoLogo } from "@/components/icons/DuolingoLogo";

export function LandingHeader() {
  return (
    <header className="mx-auto flex h-[70px] w-full max-w-[1140px] items-center justify-between px-6 md:px-10 lg:px-16">
      <Link href="/">
        <DuolingoLogo className="h-[36px] w-[180px]" />
      </Link>
      <button
        type="button"
        className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.04em] text-duo-text-muted transition-colors hover:text-duo-text-light"
      >
        Site language: English
        <svg viewBox="0 0 12 8" className="h-2 w-3 fill-current" aria-hidden="true">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </header>
  );
}
