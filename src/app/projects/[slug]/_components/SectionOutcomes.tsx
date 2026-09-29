import type { ProjectOutcome } from "../../../../content";
import { SectionHeader } from "./SectionHeader";

type Props = {
  outcome: ProjectOutcome[];
};

// Tailwind can't generate class names from a dynamic count, so the
// possible column counts are enumerated here as static, fully-written classes.
const DESKTOP_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function SectionOutcomes({ outcome }: Props) {
  const cols = Math.min(outcome.length, 4);
  return (
    <section id="outcomes">
      <SectionHeader num="03" title="Outcomes" />
      <div className={`grid grid-cols-2 gap-x-6 gap-y-0 ${DESKTOP_COLS[cols] ?? "md:grid-cols-4"}`}>
        {outcome.map((o) => (
          <div key={o.label} className="min-w-0 py-6 border-t border-grey_300">
            <div className="break-words font-space_grotesk text-[clamp(28px,5vw,56px)] font-medium leading-none tracking-[-0.03em] text-black_900">
              {o.val}
            </div>
            <div className="font-mono text-label uppercase text-grey_400 mt-2">
              {o.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
