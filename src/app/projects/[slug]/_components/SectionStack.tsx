import { SectionHeader } from "./SectionHeader";

type Props = {
  techStack: string;
};

export function SectionStack({ techStack }: Props) {
  const items = techStack.split(",").map((s) => s.trim());

  return (
    <section id="stack">
      <SectionHeader num="02" title="Stack" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] border-t border-l border-grey_300">
        {items.map((tech, i) => (
          <div
            key={tech}
            className="p-[18px] border-r border-b border-grey_300"
          >
            <span className="font-mono text-label text-grey_400 uppercase mb-1.5 block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-xl font-medium font-space_grotesk text-black_900">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
