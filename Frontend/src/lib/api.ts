import type {
  AnswerResponse,
  LeaderboardResponse,
  LearningPath,
  LessonCompleteResponse,
  LessonDetail,
  NextLessonResponse,
  Profile,
  User,
} from "@/lib/types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(path: string, status: number, detail?: string) {
    super(detail ?? `API ${path} failed: ${status}`);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let detail: string | undefined;
    try {
      const body = (await res.json()) as { detail?: string | { msg?: string }[] };
      if (typeof body.detail === "string") {
        detail = body.detail;
      } else if (Array.isArray(body.detail) && body.detail[0]?.msg) {
        detail = body.detail[0].msg;
      }
    } catch {
      detail = await res.text().catch(() => undefined);
    }

    throw new ApiError(path, res.status, detail);
  }

  return res.json() as Promise<T>;
}

export function getUser() {
  return apiFetch<User>("/api/user");
}

export function getLearningPath() {
  return apiFetch<LearningPath>("/api/path");
}

export function getProfile() {
  return apiFetch<Profile>("/api/profile");
}

export function getLeaderboard() {
  return apiFetch<LeaderboardResponse>("/api/leaderboard");
}

export function getLesson(lessonId: number) {
  return apiFetch<LessonDetail>(`/api/lessons/${lessonId}`);
}

export function getNextLessonForSkill(skillId: number) {
  return apiFetch<NextLessonResponse>(`/api/skills/${skillId}/next-lesson`);
}

export function submitAnswer(
  lessonId: number,
  exerciseId: number,
  answer: string | string[],
) {
  return apiFetch<AnswerResponse>(`/api/lessons/${lessonId}/answer`, {
    method: "POST",
    body: JSON.stringify({ exercise_id: exerciseId, answer }),
  });
}

export function completeLesson(
  lessonId: number,
  correctAnswers: number,
  totalQuestions: number,
) {
  return apiFetch<LessonCompleteResponse>(`/api/lessons/${lessonId}/complete`, {
    method: "POST",
    body: JSON.stringify({
      correct_answers: correctAnswers,
      total_questions: totalQuestions,
    }),
  });
}

export function refillHearts() {
  return apiFetch<{ hearts: number; message: string }>("/api/hearts/refill", {
    method: "POST",
  });
}

export const LEADERBOARD_UNLOCK_LESSONS = 3;
