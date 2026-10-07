export function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-8">
      <span className="font-mono text-[13px] font-medium tracking-[0.04em] tabular-nums text-grey_400 shrink-0">
        {num} /
      </span>
      <h2 className="text-section-title text-black_900">{title}</h2>
    </div>
  );
}
