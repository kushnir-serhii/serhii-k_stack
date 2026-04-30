import type { ProjectOutcome } from "../../../../content";
import { SectionHeader } from "./SectionHeader";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  outcome: ProjectOutcome[];
};

export function SectionOutcomes({ sectionRef, outcome }: Props) {
  return (
    <section ref={sectionRef} id="outcomes">
      <SectionHeader num="03" title="Outcomes" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(outcome.length, 4)}, 1fr)`,
        }}
      >
        {outcome.map((o) => (
          <div key={o.label} className="py-6 border-t border-grey_300">
            <div className="font-space_grotesk text-[clamp(36px,5vw,56px)] font-medium leading-none tracking-[-0.03em] text-textDark">
              {o.val}
            </div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-textGrey mt-2">
              {o.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
