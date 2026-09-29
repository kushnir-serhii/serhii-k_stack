import { SectionHeader } from "./SectionHeader";

type Props = {
  problem?: string;
  approach?: string;
};

export function SectionOverview({ problem, approach }: Props) {
  return (
    <section id="overview">
      <SectionHeader num="01" title="Overview" />
      {problem && (
        <div className="mb-6">
          <p className="text-sm font-medium tracking-[0.08em] uppercase text-grey_400 mb-2">
            Problem
          </p>
          <p className="text-[16px] leading-[1.65] text-black_900">{problem}</p>
        </div>
      )}
      {approach && (
        <div className="mt-7 p-5 pl-6 border border-grey_300 border-l-[3px] border-l-green_500 bg-green_500/5 rounded-r">
          <p className="text-sm font-medium tracking-[0.08em] uppercase text-grey_400 mb-2">
            Approach
          </p>
          <p className="text-[16px] leading-[1.65] text-black_900">{approach}</p>
        </div>
      )}
    </section>
  );
}
