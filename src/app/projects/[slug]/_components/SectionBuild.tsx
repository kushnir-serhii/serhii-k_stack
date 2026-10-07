import type { ProjectBuild } from "../../../../content";
import { SectionHeader } from "./SectionHeader";

type Props = {
  build: ProjectBuild[];
};

export function SectionBuild({ build }: Props) {
  return (
    <section id="build" className="scroll-mt-28">
      <SectionHeader num="04" title="Build" />
      {build.map((item, i) => (
        <div
          key={item.title}
          className="grid grid-cols-[100px_1fr] max-sm:grid-cols-1 gap-10 max-sm:gap-1.5 py-7 border-t border-grey_300 last:border-b"
        >
          <span className="font-mono text-[13px] tabular-nums text-grey_400 pt-1.5">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="font-space_grotesk text-2xl font-medium leading-tight tracking-[-0.01em] mb-2 text-black_900">
              {item.title}
            </div>
            <div className="font-space_grotesk text-base leading-[1.6] text-grey_500 max-w-[72ch]">
              {item.body}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
