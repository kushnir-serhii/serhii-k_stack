import type { Metadata } from "next";
import { PROJECTS } from "@/content";
import { ProjectBreadcrumb } from "./[slug]/_components/ProjectBreadcrumb";
import { ProjectCard } from "./_components/ProjectCard";

export const metadata: Metadata = {
  title: "All Projects — Serhii Kushnir",
  description:
    "Client projects in fintech, Web3, and SaaS, plus demo sites for small businesses — built end to end, with a full case study for each.",
};

export default function AllProjectsPage() {
  return (
    <main className="animate-page-in">
      <div className="container mx-auto max-w-[1200px] px-4">
        <ProjectBreadcrumb title="All Projects" />

        <div className="border-b border-grey_300 pb-12">
          <h1 className="mb-4 text-page-title text-black_900">
            Selected Projects
          </h1>
          <p className="mt-4 max-w-[640px] text-lg leading-[1.55] text-grey_400">
            {PROJECTS.length} projects: client work in fintech, Web3, and SaaS,
            plus demo sites that show what I can build for your business. Pick a
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
