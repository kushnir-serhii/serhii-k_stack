import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/content";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, refs } from "@/lib/seo";
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

  // OG/Twitter images come from the sibling opengraph-image.tsx.
  return pageMetadata({
    title: `${project.subtitle ?? project.title} — Case Study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
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
  const pageUrl = absoluteUrl(`/projects/${project.slug}`);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${pageUrl}#work`,
      name: project.title,
      headline: project.subtitle ?? project.title,
      abstract: project.summary,
      description: project.approach ?? project.summary,
      url: pageUrl,
      image: project.imgSrcArr.map((src) => absoluteUrl(src)),
      dateCreated: project.year,
      creator: { "@id": refs.PERSON_ID },
      author: { "@id": refs.PERSON_ID },
      keywords: project.techStack,
      inLanguage: "en",
      ...(project.url ? { sameAs: project.url } : {}),
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.subtitle ?? project.title, path: `/projects/${project.slug}` },
    ]),
  ];

  return (
    <main className="animate-page-in">
      <JsonLd data={jsonLd} />
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
