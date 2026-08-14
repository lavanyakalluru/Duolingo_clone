"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "@/components/icons/ChevronDown";
import { ToggleSwitch } from "@/components/icons/LearnIcons";
import { AppShell } from "@/components/learn/AppShell";
import { SidebarCard } from "@/components/learn/SidebarCard";

const lessonSettings = [
  "Sound effects",
  "Animations",
  "Motivational messages",
  "Listening exercises",
];

const accountLinks = [
  { label: "Account", href: "/settings/account" },
  { label: "Preferences", href: "/settings" },
  { label: "Privacy settings", href: "/settings/privacy" },
];

const supportLinks = [
  { label: "Support", href: "#" },
  { label: "Help Center", href: "#" },
];

function SettingsNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col gap-3 lg:flex">
      <SidebarCard>
        <nav className="flex flex-col">
          {accountLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={[
                "py-2 text-[15px] font-extrabold transition-colors",
                pathname === href ? "text-duo-blue" : "text-white hover:text-duo-blue",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>
      </SidebarCard>

      <SidebarCard>
        <nav className="flex flex-col">
          {supportLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="py-2 text-[15px] font-extrabold text-white transition-colors hover:text-duo-blue"
            >
              {label}
            </Link>
          ))}
        </nav>
      </SidebarCard>
    </aside>
  );
}

export default function SettingsPage() {
  return (
    <AppShell rightSidebar={<SettingsNav />}>
      <h1 className="mb-6 text-[28px] font-extrabold text-white">Preferences</h1>

      <section className="mb-8">
        <h2 className="mb-3 border-b-2 border-duo-border pb-3 text-[19px] font-extrabold text-white">
          Lesson experience
        </h2>
        <div className="flex flex-col">
          {lessonSettings.map((setting) => (
            <div
              key={setting}
              className="flex items-center justify-between border-b-2 border-duo-border py-4"
            >
              <span className="text-[17px] font-bold text-white">{setting}</span>
              <ToggleSwitch checked />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 border-b-2 border-duo-border pb-3 text-[19px] font-extrabold text-white">
          Appearance
        </h2>
        <p className="mb-3 text-[17px] font-bold text-white">Dark mode</p>
        <button
          type="button"
          className="flex w-full max-w-[400px] items-center justify-between rounded-2xl border-2 border-duo-border bg-duo-bg-dark px-4 py-3 text-[15px] font-extrabold uppercase tracking-wide text-white"
        >
          System default
          <ChevronDown className="h-3 w-3" />
        </button>
      </section>
    </AppShell>
  );
}
