"use client";

import { UserProvider } from "@/components/providers/UserProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
