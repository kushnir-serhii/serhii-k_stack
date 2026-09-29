import type { Project } from "../../../../content";

const LABEL =
  "block font-mono text-label tracking-[0.12em] uppercase text-grey_400 mb-2";
const VALUE =
  "text-xl md:text-2xl lg:text-3xl font-space_grotesk font-medium leading-[1.35] text-black_900";

// Tailwind can't generate class names from a dynamic count, so the
// possible field counts are enumerated here as static, fully-written classes.
const FIELD_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 md:grid-cols-3",
  4: "sm:grid-cols-2 md:grid-cols-4",
};

export function ProjectMeta({ project }: { project: Project }) {
  const fieldCount =
    1 + Number(!!project.duration) + Number(!!project.team) + Number(!!project.url);

  return (
    <div
      className={`grid grid-cols-2 gap-8 max-sm:gap-6 pt-12 border-t border-grey_300 mb-16
        ${FIELD_COLS[fieldCount] ?? "sm:grid-cols-2 md:grid-cols-4"}`}
    >
      <div className="min-w-0">
        <span className={LABEL}>Role</span>
        <span className={`${VALUE} break-words`}>{project.role}</span>
      </div>
      {project.duration && (
        <div className="min-w-0">
          <span className={LABEL}>Duration</span>
          <span className={`${VALUE} break-words`}>{project.duration}</span>
        </div>
      )}
      {project.team && (
        <div className="min-w-0">
          <span className={LABEL}>Team</span>
          <span className={`${VALUE} break-words`}>{project.team}</span>
        </div>
      )}
      {project.url && (
        <div className="min-w-0">
          <span className={LABEL}>Live</span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${VALUE} break-words underline underline-offset-4 hover:opacity-70 transition-opacity rounded-sm focus-ring`}
          >
            Visit site ↗
          </a>
        </div>
      )}
    </div>
  );
}
