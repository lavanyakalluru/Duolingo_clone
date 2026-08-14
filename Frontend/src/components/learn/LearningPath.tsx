import { LearningPathView } from "@/components/learn/LearningPathView";
import type { LearningPath as LearningPathData } from "@/lib/types";

type LearningPathProps = {
  path: LearningPathData;
};

export function LearningPath({ path }: LearningPathProps) {
  return (
    <div className="relative">
      <LearningPathView path={path} />
    </div>
  );
}
