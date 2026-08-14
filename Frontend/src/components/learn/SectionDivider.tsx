type SectionDividerProps = {
  label: string;
};

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative my-8 flex w-full items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 h-[2px] bg-duo-border" />
      <span className="relative bg-duo-bg-dark px-4 text-[13px] font-extrabold uppercase tracking-[0.06em] text-duo-text-muted">
        {label}
      </span>
    </div>
  );
}
