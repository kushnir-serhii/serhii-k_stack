import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content";
import { Icon } from "@/components/ui/Icon";

const CHIP =
  "inline-flex items-center gap-2 px-3 py-1 border border-grey_300 rounded-full font-mono text-[10px] tracking-[0.06em] uppercase text-textGrey";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { slug, title, subtitle, role, year, status, techStack, imgSrcArr, summary } =
    project;

  const tags = techStack.split(",").map((tech) => tech.trim());
  const visibleTags = tags.slice(0, 4);
  const extraTagsCount = tags.length - visibleTags.length;

  return (
    <Link
      href={`/projects/${slug}`}
      aria-label={`Case study: ${title}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-grey_300 bg-bg">
        <Image
          src={imgSrcArr[0]}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-black_900/70 px-2 py-1 font-mono text-[11px] text-textLight backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`${CHIP}${
              status === "live"
                ? " before:content-[''] before:block before:w-1.5 before:h-1.5 before:rounded-full before:bg-accentGreen before:shrink-0"
                : ""
            }`}
          >
            {status}
          </span>
          <span className={CHIP}>{year}</span>
        </div>

        <h4 className="text-textDark leading-snug">{subtitle ?? title}</h4>
        <p className="text-sm text-textGrey">{role}</p>

        {summary && (
          <p className="line-clamp-2 text-sm leading-[1.5] text-textGrey">{summary}</p>
        )}

        <div className="mt-1 flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-grey_300 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.04em] text-textGrey"
            >
              {tag}
            </span>
          ))}
          {extraTagsCount > 0 && (
            <span className="px-2 py-1 font-mono text-[10px] uppercase tracking-[0.04em] text-textGrey">
              +{extraTagsCount}
            </span>
          )}
        </div>

        <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accentGreen">
          Case study
          <Icon
            id="icon-arrow-up-right"
            width={12}
            height={12}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
