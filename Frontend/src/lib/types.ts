export type User = {
  id: number;
  username: string;
  streak: number;
  total_xp: number;
  hearts: number;
  gems: number;
  daily_xp: number;
  daily_goal: number;
  last_activity_date?: string | null;
};

export type PathSkill = {
  id: number;
  title: string;
  description?: string | null;
  status: "locked" | "available" | "completed";
  progress: number;
  crowns: number;
  lesson_count?: number;
  completed_lessons?: number;
  xp_reward: number;
  lessons?: PathLesson[];
};

export type PathLesson = {
  id: number;
  title: string;
  status: "locked" | "available" | "completed";
  progress: number;
  crowns: number;
  lesson_count: number;
  completed_lessons: number;
  xp_reward: number;
};

export type PathUnit = {
  id: number;
  title: string;
  description?: string | null;
  skills: PathSkill[];
};

export type LearningPath = {
  course_id: number;
  course_name: string;
  language: string;
  units: PathUnit[];
};

export type Profile = {
  id: number;
  username: string;
  streak: number;
  total_xp: number;
  hearts: number;
  gems: number;
  daily_xp: number;
  daily_goal: number;
  completed_skills: number;
  completed_lessons: number;
  achievements: unknown[];
};

export type LeaderboardEntry = {
  rank: number;
  user_id: number;
  username: string;
  total_xp: number;
  streak: number;
};

export type LeaderboardResponse = {
  leaderboard: LeaderboardEntry[];
};

export type Exercise = {
  id: number;
  type: string;
  question: string;
  order_index: number;
  options?: string[];
  data?: Record<string, unknown>;
};

export type LessonDetail = {
  id: number;
  title: string;
  skill_id: number;
  xp_reward: number;
  exercise_count: number;
  exercises: Exercise[];
};

export type NextLessonResponse = {
  lesson_id: number;
  title: string;
};

export type AnswerResponse = {
  correct: boolean;
  hearts: number;
  message: string;
};

export type LessonCompleteResponse = {
  lesson_id: number;
  completed: boolean;
  xp_earned: number;
  total_xp: number;
  hearts: number;
  streak: number;
  skill_progress: number;
  skill_completed: boolean;
  next_skill_unlocked: boolean;
  daily_xp: number;
  daily_goal: number;
  correct_answers: number;
  total_questions: number;
};
