import Link from "next/link";
import type { Project } from "../../../../content";

export function ProjectNav({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  return (
    <div className="grid grid-cols-2 border-t border-black_900 mt-20">
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="group block py-10 no-underline transition-opacity duration-200 hover:opacity-70 pr-6 border-r border-grey_300"
        >
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-textGrey mb-2.5">
            ← Previous
          </div>
          <div className="text-[clamp(20px,2.8vw,32px)] font-medium tracking-[-0.02em] leading-[1.05] text-textDark transition-transform duration-300 group-hover:-translate-x-1">
            {prev.subtitle ?? prev.title}
          </div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="group block py-10 no-underline transition-opacity duration-200 hover:opacity-70 pl-6 text-right"
        >
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-textGrey mb-2.5">
            Next →
          </div>
          <div className="text-[clamp(20px,2.8vw,32px)] font-medium tracking-[-0.02em] leading-[1.05] text-textDark transition-transform duration-300 group-hover:translate-x-1">
            {next.subtitle ?? next.title}
          </div>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
