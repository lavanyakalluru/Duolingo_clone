import { LessonSession } from "@/components/lesson/LessonSession";

type LessonPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const lessonId = Number(id);

  if (Number.isNaN(lessonId)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-duo-bg-dark px-6 text-white">
        <p>Invalid lesson.</p>
      </div>
    );
  }

  return <LessonSession lessonId={lessonId} />;
}
