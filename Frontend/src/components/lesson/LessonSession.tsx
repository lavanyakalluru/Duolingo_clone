"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LessonView } from "@/components/lesson/LessonView";
import { getLesson } from "@/lib/api";
import type { LessonDetail } from "@/lib/types";

type LessonSessionProps = {
  lessonId: number;
};

export function LessonSession({ lessonId }: LessonSessionProps) {
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLesson() {
      setLoading(true);
      setError(null);

      try {
        const data = await getLesson(lessonId);
        if (!cancelled) {
          setLesson(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load lesson from backend.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLesson();

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-duo-bg-dark text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-duo-border border-t-duo-green" />
        <p className="text-[15px] font-bold text-duo-text-muted">
          Loading lesson from backend…
        </p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-duo-bg-dark px-6 text-center text-white">
        <p className="text-[22px] font-extrabold">Backend not connected</p>
        <p className="max-w-md text-[15px] font-bold text-duo-text-muted">
          {error ??
            "Could not load questions. Make sure the backend is running on http://localhost:8000"}
        </p>
        <Link
          href="/learn"
          className="rounded-2xl border-2 border-b-4 border-duo-green-dark bg-duo-green px-6 py-3 text-[13px] font-extrabold uppercase tracking-wide text-white"
        >
          Back to learn
        </Link>
      </div>
    );
  }

  return <LessonView lesson={lesson} />;
}
