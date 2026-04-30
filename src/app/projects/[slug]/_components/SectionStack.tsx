import { SectionHeader } from "./SectionHeader";

type Props = {
  sectionRef: (el: HTMLElement | null) => void;
  techStack: string;
};

export function SectionStack({ sectionRef, techStack }: Props) {
  const items = techStack.split(",").map((s) => s.trim());

  return (
    <section ref={sectionRef} id="stack">
      <SectionHeader num="02" title="Stack" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] border-t border-l border-grey_300">
        {items.map((tech, i) => (
          <div
            key={tech}
            className="p-[18px] border-r border-b border-grey_300"
          >
            <span className="font-mono text-[10px] tracking-[0.1em] text-grey_300 uppercase mb-1.5 block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-xl font-medium font-space_grotesk text-textDark">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
