"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HeartsRefillModal } from "@/components/lesson/HeartsRefillModal";
import { LessonCompletion } from "@/components/lesson/LessonCompletion";
import { HeartIcon } from "@/components/icons/LearnIcons";
import { useUser } from "@/components/providers/UserProvider";
import { completeLesson, refillHearts, submitAnswer } from "@/lib/api";
import type { Exercise, LessonCompleteResponse, LessonDetail } from "@/lib/types";

type LessonViewProps = {
  lesson: LessonDetail;
};

type FeedbackState = {
  correct: boolean;
  message: string;
} | null;

const EXERCISE_BADGES: Record<
  string,
  { label: string; dotClass: string; textClass: string }
> = {
  multiple_choice: {
    label: "New word",
    dotClass: "bg-duo-purple",
    textClass: "text-duo-purple",
  },
  translate: {
    label: "Translate",
    dotClass: "bg-duo-blue",
    textClass: "text-duo-blue",
  },
  match_pairs: {
    label: "Match pairs",
    dotClass: "bg-duo-blue",
    textClass: "text-duo-blue",
  },
  fill_blank: {
    label: "Fill in the blank",
    dotClass: "bg-duo-blue",
    textClass: "text-duo-blue",
  },
  type_answer: {
    label: "Write in Spanish",
    dotClass: "bg-duo-blue",
    textClass: "text-duo-blue",
  },
};

function getWordEmoji(word: string): string {
  const key = word.trim().toLowerCase();
  const emojiMap: Record<string, string> = {
    hello: "👋",
    hola: "👋",
    goodbye: "👋",
    "adiós": "👋",
    adios: "👋",
    "thank you": "🙏",
    gracias: "🙏",
    please: "🙂",
    "por favor": "🙂",
    yes: "✅",
    sí: "✅",
    si: "✅",
    "my name is": "🪪",
    "me llamo": "🪪",
    "i am": "🧑",
    soy: "🧑",
    "nice to meet you": "🤝",
    "mucho gusto": "🤝",
    friend: "👥",
    amigo: "👥",
    student: "🎓",
    estudiante: "🎓",
    water: "💧",
    agua: "💧",
    bread: "🍞",
    pan: "🍞",
    milk: "🥛",
    leche: "🥛",
    apple: "🍎",
    manzana: "🍎",
    coffee: "☕",
    café: "☕",
    cafe: "☕",
  };

  return emojiMap[key] ?? "📝";
}

function ExerciseBadge({ type }: { type: string }) {
  const badge = EXERCISE_BADGES[type] ?? EXERCISE_BADGES.multiple_choice;

  return (
    <div className="mb-3 flex items-center gap-2">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${badge.dotClass}`} />
      <span
        className={`text-[12px] font-extrabold uppercase tracking-[0.08em] ${badge.textClass}`}
      >
        {badge.label}
      </span>
    </div>
  );
}

function LessonTopBar({
  progress,
  hearts,
  total,
  current,
}: {
  progress: number;
  hearts: number;
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-5">
      <Link
        href="/learn"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[22px] font-light leading-none text-duo-text-muted transition-colors hover:bg-duo-bg-card hover:text-white"
        aria-label="Exit lesson"
      >
        ×
      </Link>

      <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#37464f]">
        <div
          className="h-full rounded-full bg-duo-blue transition-all duration-300"
          style={{ width: `${Math.max(6, progress * 100)}%` }}
        />
      </div>

      <span className="hidden shrink-0 text-[12px] font-extrabold text-duo-text-muted sm:inline">
        {Math.min(current, total)}/{total}
      </span>

      <div className="flex shrink-0 items-center gap-1">
        <HeartIcon className="h-[18px] w-[18px]" />
        <span className="text-[15px] font-extrabold text-[#ff4b4b]">{hearts}</span>
      </div>
    </div>
  );
}

function MultipleChoiceExercise({
  exercise,
  selected,
  onSelect,
  disabled,
}: {
  exercise: Exercise;
  selected: string | null;
  onSelect: (value: string) => void;
  disabled: boolean;
}) {
  const options = exercise.options ?? [];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (disabled) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < options.length) {
        onSelect(options[index]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, onSelect, options]);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {options.map((option, index) => {
        const isSelected = selected === option;

        return (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option)}
            className={[
              "relative flex min-h-[190px] flex-col rounded-2xl border-2 border-b-4 bg-duo-bg-card px-3 pb-3 pt-5 text-left transition-all",
              isSelected
                ? "border-duo-blue bg-[#1a2c33] ring-2 ring-duo-blue"
                : "border-duo-border hover:bg-[#263840]",
              disabled ? "pointer-events-none opacity-70" : "",
            ].join(" ")}
          >
            <div className="flex flex-1 items-center justify-center text-[60px] leading-none">
              {getWordEmoji(option)}
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-[16px] font-extrabold text-white">{option}</span>
              <span className="rounded-md border border-duo-border px-1.5 py-0.5 text-[11px] font-extrabold text-duo-text-muted">
                {index + 1}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function TranslateExercise({
  wordBank,
  selected,
  onChange,
  disabled,
}: {
  wordBank: string[];
  selected: string[];
  onChange: (words: string[]) => void;
  disabled: boolean;
}) {
  const available = wordBank.filter(
    (word) => selected.filter((item) => item === word).length <
      wordBank.filter((item) => item === word).length,
  );

  return (
    <div className="space-y-5">
      <div className="min-h-[72px] rounded-2xl border-2 border-b-4 border-duo-border bg-duo-bg-card px-4 py-4">
        {selected.length === 0 ? (
          <p className="text-[17px] font-bold text-duo-text-muted">
            Tap words to build your answer
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((word, index) => (
              <button
                key={`${word}-${index}`}
                type="button"
                disabled={disabled}
                onClick={() =>
                  onChange(selected.filter((_, itemIndex) => itemIndex !== index))
                }
                className="rounded-xl border-2 border-b-4 border-duo-border bg-duo-bg-dark px-4 py-2 text-[16px] font-extrabold text-white"
              >
                {word}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-duo-border pt-4">
        {available.map((word, index) => (
          <button
            key={`${word}-${index}`}
            type="button"
            disabled={disabled}
            onClick={() => onChange([...selected, word])}
            className="rounded-xl border-2 border-b-4 border-duo-border bg-duo-bg-card px-4 py-2.5 text-[16px] font-extrabold text-white transition-colors hover:bg-[#263840]"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}

function MatchPairsExercise({
  pairs,
  disabled,
  onCompleteChange,
}: {
  pairs: string[][];
  disabled: boolean;
  onCompleteChange: (complete: boolean) => void;
}) {
  const leftItems = useMemo(() => pairs.map((pair) => pair[0]), [pairs]);
  // Rendering a random order on the server and a different one in the browser
  // causes a hydration mismatch in Next.js, which appears as UI blinking.
  const rightItems = useMemo(
    () => pairs.map((pair) => pair[1]).reverse(),
    [pairs],
  );
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matchedLeft, setMatchedLeft] = useState<number[]>([]);
  const [wrongFlash, setWrongFlash] = useState(false);

  useEffect(() => {
    onCompleteChange(matchedLeft.length === pairs.length);
  }, [matchedLeft.length, onCompleteChange, pairs.length]);

  function tryMatch(leftIndex: number, rightIndex: number) {
    const isMatch = pairs[leftIndex]?.[1] === rightItems[rightIndex];

    if (isMatch) {
      setMatchedLeft((current) => [...current, leftIndex]);
      setSelectedLeft(null);
      setSelectedRight(null);
      return;
    }

    setWrongFlash(true);
    window.setTimeout(() => {
      setWrongFlash(false);
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 450);
  }

  function handleLeftClick(index: number) {
    if (disabled || matchedLeft.includes(index)) return;
    if (selectedLeft === index) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(index);
    if (selectedRight !== null) {
      tryMatch(index, selectedRight);
    }
  }

  function handleRightClick(index: number) {
    if (disabled || matchedLeft.some((leftIndex) => pairs[leftIndex][1] === rightItems[index])) {
      return;
    }
    if (selectedRight === index) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight(index);
    if (selectedLeft !== null) {
      tryMatch(selectedLeft, index);
    }
  }

  function tileClass(selected: boolean, matched: boolean) {
    if (matched) {
      return "border-duo-green bg-[#1a2c22] opacity-50";
    }
    if (wrongFlash && selected) {
      return "border-[#ff4b4b] bg-[#3a2020]";
    }
    if (selected) {
      return "border-duo-blue bg-[#1a2c33] ring-2 ring-duo-blue";
    }
    return "border-duo-border bg-duo-bg-card hover:bg-[#263840]";
  }

  return (
    <div className="mx-auto grid max-w-xl grid-cols-2 gap-3">
      <div className="flex flex-col gap-2.5">
        {leftItems.map((item, index) => {
          const matched = matchedLeft.includes(index);
          const selected = selectedLeft === index;

          return (
            <button
              key={`left-${item}`}
              type="button"
              disabled={disabled || matched}
              onClick={() => handleLeftClick(index)}
              className={[
                "rounded-2xl border-2 border-b-4 px-4 py-4 text-center text-[16px] font-extrabold text-white transition-all",
                tileClass(selected, matched),
              ].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        {rightItems.map((item, index) => {
          const matched = matchedLeft.some(
            (leftIndex) => pairs[leftIndex][1] === item,
          );
          const selected = selectedRight === index;

          return (
            <button
              key={`right-${item}-${index}`}
              type="button"
              disabled={disabled || matched}
              onClick={() => handleRightClick(index)}
              className={[
                "rounded-2xl border-2 border-b-4 px-4 py-4 text-center text-[16px] font-extrabold text-white transition-all",
                tileClass(selected, matched),
              ].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FillBlankExercise({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="rounded-2xl border-2 border-b-4 border-duo-border bg-duo-bg-card p-4">
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type the missing word"
        className="w-full border-b-2 border-duo-border bg-transparent pb-2 text-[24px] font-extrabold text-white outline-none placeholder:text-duo-text-muted focus:border-duo-blue"
      />
    </div>
  );
}

function TypeAnswerExercise({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="rounded-2xl border-2 border-b-4 border-duo-border bg-duo-bg-card p-4">
      <textarea
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type your answer in Spanish"
        rows={3}
        className="w-full resize-none bg-transparent text-[24px] font-extrabold text-white outline-none placeholder:text-duo-text-muted"
      />
    </div>
  );
}

export function LessonView({ lesson }: LessonViewProps) {
  const router = useRouter();
  const { profile, refresh } = useUser();
  const exercises = useMemo(
    () => [...lesson.exercises].sort((a, b) => a.order_index - b.order_index),
    [lesson.exercises],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wordBankAnswer, setWordBankAnswer] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [matchPairsComplete, setMatchPairsComplete] = useState(false);
  const [hearts, setHearts] = useState(profile?.hearts ?? 5);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [refilling, setRefilling] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [checking, setChecking] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completion, setCompletion] = useState<LessonCompleteResponse | null>(null);
  const [completionStage, setCompletionStage] = useState<"summary" | "streak">("summary");

  const currentExercise = exercises[currentIndex];
  const totalQuestions = exercises.length;
  const progress =
    totalQuestions === 0
      ? 0
      : (currentIndex + (feedback?.correct ? 1 : 0)) / totalQuestions;

  useEffect(() => {
    if (profile?.hearts !== undefined) {
      setHearts(profile.hearts);
      if (profile.hearts === 0) {
        setShowRefillModal(true);
      }
    }
  }, [profile?.hearts]);

  const handleRefillHearts = useCallback(async () => {
    setRefilling(true);
    try {
      const result = await refillHearts();
      setHearts(result.hearts);
      setShowRefillModal(false);
      await refresh();
    } catch (err) {
      window.alert(
        err instanceof Error ? err.message : "Could not refill hearts.",
      );
    } finally {
      setRefilling(false);
    }
  }, [refresh]);

  const resetAnswerState = useCallback(() => {
    setSelectedAnswer(null);
    setWordBankAnswer([]);
    setTypedAnswer("");
    setMatchPairsComplete(false);
    setFeedback(null);
  }, []);

  const getSubmitAnswer = useCallback((): string | string[] | null => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case "multiple_choice":
        return selectedAnswer;
      case "translate":
        return wordBankAnswer.length > 0 ? wordBankAnswer : null;
      case "match_pairs":
        return matchPairsComplete ? "all_pairs" : null;
      case "fill_blank":
      case "type_answer":
        return typedAnswer.trim() || null;
      default:
        return typedAnswer.trim() || null;
    }
  }, [
    currentExercise,
    matchPairsComplete,
    selectedAnswer,
    typedAnswer,
    wordBankAnswer,
  ]);

  const canCheck = useMemo(() => {
    if (!currentExercise) return false;

    switch (currentExercise.type) {
      case "multiple_choice":
        return Boolean(selectedAnswer);
      case "translate":
        return wordBankAnswer.length > 0;
      case "match_pairs":
        return matchPairsComplete;
      case "fill_blank":
      case "type_answer":
        return Boolean(typedAnswer.trim());
      default:
        return Boolean(typedAnswer.trim());
    }
  }, [
    currentExercise,
    matchPairsComplete,
    selectedAnswer,
    typedAnswer,
    wordBankAnswer,
  ]);

  const handleCheck = useCallback(async () => {
    if (!currentExercise || checking) return;

    if (hearts === 0) {
      setShowRefillModal(true);
      return;
    }

    const answer = getSubmitAnswer();
    if (answer === null) return;

    setChecking(true);

    try {
      const result = await submitAnswer(lesson.id, currentExercise.id, answer);
      setHearts(result.hearts);
      setFeedback({
        correct: result.correct,
        message: result.message,
      });
      if (result.correct) {
        setCorrectAnswers((count) => count + 1);
      }
      if (result.hearts === 0) {
        setShowRefillModal(true);
      }
      await refresh();
    } catch (err) {
      setFeedback({
        correct: false,
        message:
          err instanceof Error
            ? err.message
            : "Could not submit answer to backend.",
      });
    } finally {
      setChecking(false);
    }
  }, [checking, currentExercise, getSubmitAnswer, hearts, lesson.id, refresh]);

  const handleContinue = useCallback(async () => {
    if (!feedback) return;

    if (currentIndex >= exercises.length - 1) {
      try {
        const result = await completeLesson(
          lesson.id,
          correctAnswers,
          totalQuestions,
        );
        await refresh();
        setCompletion(result);
      } catch (err) {
        setFeedback({
          correct: false,
          message:
            err instanceof Error
              ? err.message
              : "Could not save your completed lesson.",
        });
      }
      return;
    }

    setCurrentIndex((index) => index + 1);
    resetAnswerState();
  }, [
    currentIndex,
    exercises.length,
    feedback,
    lesson.id,
    refresh,
    resetAnswerState,
    router,
  ]);

  if (completion) {
    return (
      <LessonCompletion
        completed={true}
        xpEarned={completion.xp_earned}
        accuracy={Math.round(
          (completion.correct_answers / Math.max(completion.total_questions, 1)) * 100,
        )}
        correctAnswers={completion.correct_answers}
        totalQuestions={completion.total_questions}
        streak={completion.streak}
        stage={completionStage}
        onContinue={() => {
          if (completionStage === "summary") {
            setCompletionStage("streak");
          } else {
            router.push("/learn");
          }
        }}
      />
    );
  }

  if (!currentExercise) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-duo-bg-dark text-white">
        <p>No exercises found for this lesson.</p>
      </div>
    );
  }

  const pairs =
    (currentExercise.data?.pairs as string[][] | undefined) ?? [];
  const wordBank =
    (currentExercise.data?.word_bank as string[] | undefined) ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-duo-bg-dark text-white">
      <HeartsRefillModal
        open={showRefillModal}
        loading={refilling}
        onRefill={handleRefillHearts}
      />

      <LessonTopBar
        progress={progress}
        hearts={hearts}
        total={totalQuestions}
        current={currentIndex + 1}
      />

      <div className="mx-auto flex w-full max-w-[980px] flex-1 flex-col px-4 py-5 sm:px-6">
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.08em] text-duo-text-muted">
          {lesson.title}
        </p>
        <ExerciseBadge type={currentExercise.type} />
        <h1 className="mb-6 max-w-[760px] text-[24px] font-extrabold leading-tight sm:text-[28px]">
          {currentExercise.question}
        </h1>

        {currentExercise.type === "multiple_choice" && (
          <MultipleChoiceExercise
            key={currentExercise.id}
            exercise={currentExercise}
            selected={selectedAnswer}
            onSelect={setSelectedAnswer}
            disabled={Boolean(feedback) || checking}
          />
        )}

        {currentExercise.type === "translate" && (
          <TranslateExercise
            key={currentExercise.id}
            wordBank={wordBank}
            selected={wordBankAnswer}
            onChange={setWordBankAnswer}
            disabled={Boolean(feedback) || checking}
          />
        )}

        {currentExercise.type === "match_pairs" && (
          <MatchPairsExercise
            key={currentExercise.id}
            pairs={pairs}
            disabled={Boolean(feedback) || checking}
            onCompleteChange={setMatchPairsComplete}
          />
        )}

        {currentExercise.type === "fill_blank" && (
          <FillBlankExercise
            key={currentExercise.id}
            value={typedAnswer}
            onChange={setTypedAnswer}
            disabled={Boolean(feedback) || checking}
          />
        )}

        {currentExercise.type === "type_answer" && (
          <TypeAnswerExercise
            key={currentExercise.id}
            value={typedAnswer}
            onChange={setTypedAnswer}
            disabled={Boolean(feedback) || checking}
          />
        )}
      </div>
      <div className="sticky bottom-0 z-30 border-t-2 border-[#263840] bg-[#202f36]">
  <div className="mx-auto flex min-h-[140px] w-full max-w-[1100px] items-center justify-between gap-6 px-6 py-5">

    {feedback ? (
      <div className="flex items-center gap-5">

        {/* Result icon */}
        <div
          className={[
            "flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full",
            feedback.correct
              ? "bg-[#102329]"
              : "bg-[#351f21]",
          ].join(" ")}
        >
          {feedback.correct ? (
            <svg
              viewBox="0 0 40 40"
              className="h-12 w-12"
              fill="none"
            >
              <path
                d="M8 21L16 29L32 11"
                stroke="#78d51b"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 40 40"
              className="h-11 w-11"
              fill="none"
            >
              <path
                d="M11 11L29 29M29 11L11 29"
                stroke="#ff4b4b"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        {/* Feedback content */}
        <div>
          <h2
            className={[
              "text-[28px] font-extrabold leading-none",
              feedback.correct
                ? "text-[#78d51b]"
                : "text-[#ff4b4b]",
            ].join(" ")}
          >
            {feedback.correct ? "Awesome!" : "Incorrect"}
          </h2>

          {/* Feedback options */}
          <div className="mt-4 flex items-center gap-7">

            <button
              type="button"
              className="flex items-center gap-2 text-[14px] font-extrabold uppercase tracking-wide text-[#6fa52d] transition-colors hover:text-[#8acb3b]"
            >
              <span className="text-lg">Z</span>
              <span>Too easy</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 text-[14px] font-extrabold uppercase tracking-wide text-[#6fa52d] transition-colors hover:text-[#8acb3b]"
            >
              <span className="text-xl">△</span>
              <span>Too difficult</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-2 text-[14px] font-extrabold uppercase tracking-wide text-[#6fa52d] transition-colors hover:text-[#8acb3b]"
            >
              <span className="text-xl">⚑</span>
              <span>Report</span>
            </button>

          </div>

          {/* Wrong answer message */}
          {!feedback.correct && feedback.message && (
            <p className="mt-2 text-sm font-bold text-[#ffb3b3]">
              {feedback.message}
            </p>
          )}
        </div>
      </div>
    ) : (
      <div />
    )}

    {/* CHECK / CONTINUE */}
    <button
      type="button"
      disabled={
        feedback
          ? hearts === 0
          : !canCheck || checking || hearts === 0
      }
      onClick={
        feedback
          ? handleContinue
          : handleCheck
      }
      className={[
        "min-w-[200px] rounded-2xl border-2 border-b-[5px]",
        "px-10 py-4",
        "text-[16px] font-extrabold uppercase tracking-wide",
        "transition-all",
        "active:translate-y-[2px]",
        "active:border-b-2",
        "disabled:cursor-not-allowed disabled:opacity-40",

        feedback
          ? feedback.correct
            ? "border-[#79b820] bg-[#a5e92d] text-[#17320b]"
            : "border-[#d93d3d] bg-[#ff4b4b] text-white"
          : canCheck
            ? "border-[#79b820] bg-[#a5e92d] text-[#17320b]"
            : "border-[#37464f] bg-[#37464f] text-[#52656d]",
      ].join(" ")}
    >
      {feedback
        ? currentIndex >= exercises.length - 1
          ? "Finish"
          : "Continue"
        : "Check"}
    </button>

  </div>
</div>

    </div>
  );
}
