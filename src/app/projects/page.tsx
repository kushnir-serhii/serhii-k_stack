import type { Metadata } from "next";
import { PROJECTS } from "@/content";
import { ProjectBreadcrumb } from "./[slug]/_components/ProjectBreadcrumb";
import { ProjectCard } from "./_components/ProjectCard";

export const metadata: Metadata = {
  title: "All Projects — Serhii Kushnir",
  description:
    "Every shipped project — fintech, Web3, and SaaS platforms built end to end. Full case studies for each.",
};

export default function AllProjectsPage() {
  return (
    <main className="animate-page-in">
      <div className="container mx-auto max-w-[1200px] px-4">
        <ProjectBreadcrumb title="All Projects" />

        <div className="border-b border-grey_300 pb-12">
          <h1 className="mb-4 text-[clamp(32px,5vw,72px)] font-medium leading-[1.02] tracking-[-0.03em] text-textDark">
            All Projects
          </h1>
          <p className="mt-4 max-w-[640px] text-[18px] leading-[1.55] text-textGrey">
            {PROJECTS.length} shipped projects across fintech, Web3, and SaaS — pick a
            case study below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
