export function ScrollProgress({ width }: { width: number }) {
  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-accentGreen z-[60] transition-[width] duration-100 ease-linear pointer-events-none"
      style={{ width: `${width}%` }}
    />
  );
}
