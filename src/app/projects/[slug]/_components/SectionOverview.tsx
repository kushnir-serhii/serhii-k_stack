import { SectionHeader } from "./SectionHeader";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  problem?: string;
  approach?: string;
};

export function SectionOverview({ sectionRef, problem, approach }: Props) {
  return (
    <section ref={sectionRef} id="overview">
      <SectionHeader num="01" title="Overview" />
      {problem && (
        <div className="mb-6">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-grey_300 mb-2">
            Problem
          </p>
          <p className="text-[16px] leading-[1.65] text-textDark">{problem}</p>
        </div>
      )}
      {approach && (
        <div className="mt-7 p-5 pl-6 border border-grey_300 border-l-[3px] border-l-accentGreen bg-accentGreen/5 rounded-r">
          <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-grey_300 mb-2">
            Approach
          </p>
          <p className="text-[16px] leading-[1.65] text-textDark">{approach}</p>
        </div>
      )}
    </section>
  );
}
