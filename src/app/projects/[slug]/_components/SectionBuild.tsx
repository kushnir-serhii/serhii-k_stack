import type { ProjectBuild } from "../../../../content";
import { SectionHeader } from "./SectionHeader";

type Props = {
  build: ProjectBuild[];
};

export function SectionBuild({ build }: Props) {
  return (
    <section id="build">
      <SectionHeader num="04" title="Build" />
      {build.map((item, i) => (
        <div
          key={item.title}
          className="grid grid-cols-[100px_1fr] max-sm:grid-cols-1 gap-10 max-sm:gap-1.5 py-7 border-t border-grey_300 last:border-b"
        >
          <span className="font-mono text-label text-grey_400 pt-0.5">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="font-space_grotesk text-3xl font-medium tracking-[-0.01em] mb-1.5 text-black_900">
              {item.title}
            </div>
            <div className="font-space_grotesk text-sm leading-[1.6] text-grey_400">
              {item.body}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
