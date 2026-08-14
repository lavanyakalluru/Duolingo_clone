"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border-2 border-b-4 border-duo-blue-dark bg-duo-blue text-white shadow-lg transition-transform hover:scale-105 active:translate-y-[2px] active:border-b-2 lg:bottom-8 lg:right-[calc(50%-280px)]"
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M12 4L4 14H9V20H15V14H20L12 4Z" />
      </svg>
    </button>
  );
}
