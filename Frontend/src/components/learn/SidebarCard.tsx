import { type ReactNode } from "react";

export function SidebarCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border-2 border-duo-border bg-duo-bg-dark p-4 ${className}`}
    >
      {children}
    </div>
  );
}
