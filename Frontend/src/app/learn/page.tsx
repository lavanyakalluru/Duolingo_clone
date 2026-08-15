import { AppShell } from "@/components/learn/AppShell";
import { LearningPath } from "@/components/learn/LearningPath";
import { RightSidebar } from "@/components/learn/RightSidebar";
import { getLearningPath } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LearnPage() {
  const path = await getLearningPath();

  return (
    <AppShell rightSidebar={<RightSidebar />}>
      <LearningPath path={path} />
    </AppShell>
  );
}