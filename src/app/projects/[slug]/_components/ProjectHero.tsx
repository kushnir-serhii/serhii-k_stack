import type { Project } from "../../../../content";

const CHIP = "inline-flex items-center gap-2 px-3 py-1.5 border border-grey_300 rounded-full font-mono text-[11px] tracking-[0.06em] uppercase text-textGrey";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="pb-12 border-b border-grey_300">
      <div className="flex flex-wrap gap-3 mb-6">
        <span
          className={`${CHIP}${
            project.status === "live"
              ? " before:content-[''] before:block before:w-1.5 before:h-1.5 before:rounded-full before:bg-accentGreen before:shrink-0 before:shadow-[0_0_0_3px_rgba(184,255,91,0.3)]"
              : ""
          }`}
        >
          {project.status}
        </span>
        <span className={CHIP}>{project.year}</span>
        {project.client && <span className={CHIP}>{project.client}</span>}
      </div>

      <h1 className="text-[clamp(32px,5vw,72px)] font-medium leading-[1.02] tracking-[-0.03em] text-textDark mb-4">
        {project.subtitle ?? project.title}
      </h1>

      {project.summary && (
        <p className="text-[18px] leading-[1.55] text-textGrey max-w-[640px] mt-4">
          {project.summary}
        </p>
      )}
    </div>
  );
}
