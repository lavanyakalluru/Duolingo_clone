"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  GlobeIcon,
  LeafIcon,
  PodcastIcon,
} from "@/components/icons/MoreMenuIcons";

type MoreMenuProps = {
  open: boolean;
  onClose: () => void;
  desktopAnchorRef: React.RefObject<HTMLButtonElement | null>;
  mobileAnchorRef: React.RefObject<HTMLButtonElement | null>;
};

const topItems = [
  { label: "Duolingo English Test", icon: LeafIcon },
  { label: "Schools", icon: GlobeIcon },
  { label: "Podcast", icon: PodcastIcon },
];

const bottomItems = [
  { label: "Create a profile", href: "#" },
  { label: "Settings", href: "/settings" },
  { label: "Help", href: "#" },
  { label: "Sign in", href: "/" },
];

function getAnchorElement(
  desktopAnchorRef: React.RefObject<HTMLButtonElement | null>,
  mobileAnchorRef: React.RefObject<HTMLButtonElement | null>,
) {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const anchor = isDesktop ? desktopAnchorRef.current : mobileAnchorRef.current;
  if (!anchor || anchor.getBoundingClientRect().width === 0) return null;
  return anchor;
}

export function MoreMenu({
  open,
  onClose,
  desktopAnchorRef,
  mobileAnchorRef,
}: MoreMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 256 });

  useLayoutEffect(() => {
    if (!open) return;

    function updatePosition() {
      const anchor = getAnchorElement(desktopAnchorRef, mobileAnchorRef);
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 0;
      const top = Math.max(8, rect.bottom - menuHeight);

      setPosition({ top, left: rect.right + 8 });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, desktopAnchorRef, mobileAnchorRef]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("[data-more-trigger]")) return;
      if (menuRef.current?.contains(target)) return;
      onClose();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        ref={menuRef}
        className="fixed z-50 hidden w-[300px] overflow-hidden rounded-2xl border-2 border-duo-border bg-duo-bg-dark shadow-2xl lg:block"
        style={{ top: position.top, left: position.left }}
      >
        <MenuContent onClose={onClose} />
      </div>

      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute bottom-[72px] left-4 right-4 overflow-hidden rounded-2xl border-2 border-duo-border bg-duo-bg-dark shadow-xl">
          <MenuContent onClose={onClose} />
        </div>
      </div>
    </>
  );
}

function MenuContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="py-1">
        {topItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] font-extrabold uppercase tracking-wide text-duo-text-muted transition-colors hover:bg-[#1a2c33] hover:text-white"
          >
            <Icon className="h-[46px] w-[46px] shrink-0" />
            {label}
          </button>
        ))}
      </div>

      <div className="mx-4 border-t-2 border-duo-border" />

      <div className="py-1">
        {bottomItems.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={onClose}
            className="block w-full px-4 py-2.5 text-[15px] font-extrabold uppercase tracking-wide text-duo-text-muted transition-colors hover:bg-[#1a2c33] hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
