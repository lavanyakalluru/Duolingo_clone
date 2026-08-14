"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { DuolingoLogo } from "@/components/icons/DuolingoLogo";
import {
  LearnIcon,
  LeaderboardIcon,
  MoreIcon,
  ProfileIcon,
  QuestsIcon,
  ShopIcon,
} from "@/components/icons/NavIcons";
import { MoreMenu } from "@/components/learn/MoreMenu";

const navItems = [
  { label: "Learn", href: "/learn", icon: LearnIcon },
  { label: "Leaderboards", href: "/leaderboards", icon: LeaderboardIcon },
  { label: "Quests", href: "/quests", icon: QuestsIcon },
  { label: "Shop", href: "/shop", icon: ShopIcon },
  { label: "Profile", href: "/profile", icon: ProfileIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const desktopMoreRef = useRef<HTMLButtonElement>(null);
  const mobileMoreRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[256px] flex-col overflow-visible border-r-2 border-duo-border bg-duo-bg-dark lg:flex">
        <div className="px-6 pb-2 pt-6">
          <Link href="/">
            <DuolingoLogo className="h-[36px] w-[180px]" />
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-visible px-3">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMoreOpen(false)}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-extrabold uppercase tracking-wide transition-colors",
                  isActive
                    ? "border-2 border-duo-blue bg-[#18282f] text-duo-blue"
                    : "border-2 border-transparent text-duo-text-muted hover:bg-[#1a2c33]",
                ].join(" ")}
              >
                <Icon className="h-[46px] w-[46px] shrink-0" />
                {label}
              </Link>
            );
          })}

          <button
            ref={desktopMoreRef}
            type="button"
            data-more-trigger
            onClick={() => setMoreOpen((prev) => !prev)}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-extrabold uppercase tracking-wide transition-colors",
              moreOpen
                ? "border-2 border-transparent bg-[#1a2c33] text-duo-text-muted"
                : "border-2 border-transparent text-duo-text-muted hover:bg-[#1a2c33]",
            ].join(" ")}
          >
            <MoreIcon className="h-[46px] w-[46px] shrink-0" />
            More
          </button>
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t-2 border-duo-border bg-duo-bg-dark lg:hidden">
        {[...navItems, { label: "More", href: "#more", icon: MoreIcon }].map(
          ({ label, href, icon: Icon }) => {
            const isMore = label === "More";
            const isActive = isMore ? moreOpen : pathname === href;

            if (isMore) {
              return (
                <button
                  key={label}
                  ref={mobileMoreRef}
                  type="button"
                  data-more-trigger
                  onClick={() => setMoreOpen((prev) => !prev)}
                  className={[
                    "flex flex-1 flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-extrabold uppercase",
                    isActive ? "text-duo-blue" : "text-duo-text-muted",
                  ].join(" ")}
                >
                  <Icon className="h-[32px] w-[32px]" />
                  More
                </button>
              );
            }

            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMoreOpen(false)}
                className={[
                  "flex flex-1 flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-extrabold uppercase",
                  isActive ? "text-duo-blue" : "text-duo-text-muted",
                ].join(" ")}
              >
                <Icon className="h-[32px] w-[32px]" />
                {label.split(" ")[0]}
              </Link>
            );
          },
        )}
      </nav>

      <MoreMenu
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        desktopAnchorRef={desktopMoreRef}
        mobileAnchorRef={mobileMoreRef}
      />
    </>
  );
}
