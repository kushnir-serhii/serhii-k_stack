"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { PROJECTS } from "../../../content";
import { useScrollTracker } from "./_components/useScrollTracker";
import { ScrollProgress } from "./_components/ScrollProgress";
import { ProjectBreadcrumb } from "./_components/ProjectBreadcrumb";
import { ProjectHero } from "./_components/ProjectHero";
import { ProjectMeta } from "./_components/ProjectMeta";
import { ProjectToc } from "./_components/ProjectToc";
import { SectionOverview } from "./_components/SectionOverview";
import { SectionStack } from "./_components/SectionStack";
import { SectionOutcomes } from "./_components/SectionOutcomes";
import { SectionBuild } from "./_components/SectionBuild";
import { SectionGallery } from "./_components/SectionGallery";
import { ProjectNav } from "./_components/ProjectNav";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  const { activeSection, scrollWidth, setRef } = useScrollTracker();

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[idx - 1] ?? null;
  const next = PROJECTS[idx + 1] ?? null;

  return (
    <main className="animate-page-in">
      <ScrollProgress width={scrollWidth} />

      <div className="container mx-auto px-4 max-w-[1200px]">
        <ProjectBreadcrumb title={project.subtitle ?? project.title} />
        <ProjectHero project={project} />
        <ProjectMeta project={project} />

        <div className="grid grid-cols-[220px_1fr] max-[900px]:grid-cols-1 gap-16 max-[900px]:gap-8 py-16">
          <ProjectToc activeSection={activeSection} />

          <div className="flex flex-col gap-16">
            <SectionOverview
              sectionRef={setRef("overview")}
              problem={project.problem}
              approach={project.approach}
            />
            <SectionStack
              sectionRef={setRef("stack")}
              techStack={project.techStack}
            />
            {project.outcome && project.outcome.length > 0 && (
              <SectionOutcomes
                sectionRef={setRef("outcomes")}
                outcome={project.outcome}
              />
            )}
            {project.build && project.build.length > 0 && (
              <SectionBuild
                sectionRef={setRef("build")}
                build={project.build}
              />
            )}
            <SectionGallery
              sectionRef={setRef("gallery")}
              imgSrcArr={project.imgSrcArr}
              title={project.title}
            />
          </div>
        </div>

        <ProjectNav prev={prev} next={next} />
      </div>
    </main>
  );
}
