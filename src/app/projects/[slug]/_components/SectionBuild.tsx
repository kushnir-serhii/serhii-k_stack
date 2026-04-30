import type { ProjectBuild } from "../../../../content";
import { SectionHeader } from "./SectionHeader";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  build: ProjectBuild[];
};

export function SectionBuild({ sectionRef, build }: Props) {
  return (
    <section ref={sectionRef} id="build">
      <SectionHeader num="04" title="Build" />
      {build.map((item, i) => (
        <div
          key={item.title}
          className="grid grid-cols-[100px_1fr] max-sm:grid-cols-1 gap-10 max-sm:gap-1.5 py-7 border-t border-grey_300 last:border-b"
        >
          <span className="font-mono text-[11px] text-grey_300 tracking-[0.08em] pt-0.5">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="font-space_grotesk text-3xl font-medium tracking-[-0.01em] mb-1.5 text-textDark">
              {item.title}
            </div>
            <div className="font-space_grotesk text-[15px] leading-[1.6] text-textGrey">
              {item.body}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
