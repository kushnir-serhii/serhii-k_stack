import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "../../../content";
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

type ProjectPageParams = { slug: string };

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return {};

  const title = `${project.subtitle ?? project.title} — Case study · Serhii Kushnir`;
  const description = project.summary;
  const image = project.imgSrcArr[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<ProjectPageParams>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[idx - 1] ?? null;
  const next = PROJECTS[idx + 1] ?? null;

  return (
    <main className="animate-page-in">
      <ScrollProgress />

      <div className="container mx-auto px-4 max-w-[1200px]">
        <ProjectBreadcrumb title={project.subtitle ?? project.title} />
        <ProjectHero project={project} />
        <ProjectMeta project={project} />

        <div className="grid grid-cols-[220px_1fr] max-[900px]:grid-cols-1 gap-16 max-[900px]:gap-8 py-16">
          <ProjectToc />

          <div className="flex flex-col gap-16">
            <SectionOverview
              problem={project.problem}
              approach={project.approach}
            />
            <SectionStack techStack={project.techStack} />
            {project.outcome && project.outcome.length > 0 && (
              <SectionOutcomes outcome={project.outcome} />
            )}
            {project.build && project.build.length > 0 && (
              <SectionBuild build={project.build} />
            )}
            <SectionGallery
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
