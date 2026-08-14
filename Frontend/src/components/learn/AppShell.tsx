import { type ReactNode } from "react";
import { Sidebar } from "@/components/learn/Sidebar";

type AppShellProps = {
  children: ReactNode;
  rightSidebar?: ReactNode;
};

export function AppShell({ children, rightSidebar }: AppShellProps) {
  return (
    <div className="min-h-screen bg-duo-bg-dark text-white">
      <Sidebar />

      <div className="flex min-h-screen flex-col pb-[72px] lg:ml-[256px] lg:pb-0">
        <div className="mx-auto flex w-full max-w-[980px] flex-1 justify-center gap-10 px-6 py-8">
          <main className="w-full max-w-[560px] flex-1">{children}</main>
          {rightSidebar}
        </div>
      </div>
    </div>
  );
}
