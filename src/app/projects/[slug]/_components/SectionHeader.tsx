export function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="font-mono text-label text-grey_400">{num}</span>
      <h2 className="text-2xl font-medium tracking-[-0.015em] text-black_900">{title}</h2>
    </div>
  );
}
