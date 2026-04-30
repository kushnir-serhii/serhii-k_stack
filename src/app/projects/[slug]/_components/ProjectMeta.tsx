import type { Project } from "../../../../content";

const LABEL =
  "block font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-textGrey mb-2";
const VALUE =
  "text-3xl font-space_grotesk font-medium leading-[1.35] text-textDark";

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div
      className={`grid grid-cols-4 max-sm:grid-cols-2 gap-8 max-sm:gap-6 pt-12 border-t border-grey_300 mb-16 
        ${project.url ? "grid-cols-4" : "grid-cols-3"}`}
    >
      <div>
        <span className={LABEL}>Role</span>
        <span className={VALUE}>{project.role}</span>
      </div>
      {project.duration && (
        <div>
          <span className={LABEL}>Duration</span>
          <span className={VALUE}>{project.duration}</span>
        </div>
      )}
      {project.team && (
        <div>
          <span className={LABEL}>Team</span>
          <span className={VALUE}>{project.team}</span>
        </div>
      )}
      {project.url && (
        <div>
          <span className={LABEL}>Live</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${VALUE} underline underline-offset-4 hover:opacity-70 transition-opacity`}
          >
            Visit site ↗
          </a>
        </div>
      )}
    </div>
  );
}
