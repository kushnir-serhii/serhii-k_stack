export function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="font-mono text-[11px] text-grey_300 tracking-[0.08em]">{num}</span>
      <h2 className="text-[24px] font-medium tracking-[-0.015em] text-textDark">{title}</h2>
    </div>
  );
}
