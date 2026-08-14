import { HeroCharacters } from "@/components/landing/HeroCharacters";
import { DuoButton } from "@/components/ui/DuoButton";

export function HeroSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1140px] flex-1 flex-col items-center gap-8 px-6 pb-16 pt-4 md:px-10 lg:flex-row lg:items-center lg:justify-center lg:gap-4 lg:px-16 lg:pb-24">
      <div className="flex w-full max-w-[560px] flex-shrink-0 items-center justify-center lg:w-1/2">
        <HeroCharacters className="h-auto w-full max-w-[520px]" />
      </div>

      <div className="flex w-full max-w-[330px] flex-col items-center lg:w-1/2 lg:items-start">
        <h1 className="mb-8 text-center text-[32px] font-extrabold leading-[1.25] text-duo-text lg:text-left lg:text-[36px]">
          The most fun way to learn languages, chess, and more!
        </h1>

        <div className="flex w-full flex-col gap-3">
          <DuoButton variant="primary" href="/learn">
            Get started
          </DuoButton>
          <DuoButton variant="secondary">I already have an account</DuoButton>
        </div>
      </div>
    </section>
  );
}
