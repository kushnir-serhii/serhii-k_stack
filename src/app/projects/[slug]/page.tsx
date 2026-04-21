"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { PROJECTS } from "../../content";
import "../project-detail.css";

const TOC_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "stack", label: "Stack" },
  { id: "outcomes", label: "Outcomes" },
  { id: "build", label: "Build" },
  { id: "gallery", label: "Gallery" },
];

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  const [activeSection, setActiveSection] = useState("overview");
  const [scrollWidth, setScrollWidth] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const progress =
        (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollWidth(Math.min(progress, 100));

      for (const { id } of [...TOC_ITEMS].reverse()) {
        const el = sectionRefs.current[id];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[idx - 1] ?? null;
  const next = PROJECTS[idx + 1] ?? null;

  const stackItems = project.techStack.split(",").map((s) => s.trim());

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <main className="project-detail">
      <div
        className="pd-scroll-progress"
        style={{ width: `${scrollWidth}%` }}
      />

      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link href="/#projects">Work</Link>
          <span>/</span>
          <span>{project.subtitle ?? project.title}</span>
        </nav>

        {/* Hero */}
        <div className="pb-12 border-b border-[#E5E5E5]">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`pd-chip ${project.status === "live" ? "pd-chip-live" : ""}`}>
              {project.status}
            </span>
            <span className="pd-chip">{project.year}</span>
            {project.client && <span className="pd-chip">{project.client}</span>}
          </div>

          <h1
            className="text-[clamp(32px,5vw,72px)] font-medium leading-[1.02] tracking-[-0.03em] text-[#171717] mb-4"
          >
            {project.subtitle ?? project.title}
          </h1>

          {project.summary && (
            <p className="text-[18px] leading-[1.55] text-[#6E6E6E] max-w-[640px] mt-4">
              {project.summary}
            </p>
          )}
        </div>

        {/* Meta strip */}
        <div className="pd-meta-grid mt-0 mb-16">
          <div>
            <span className="pd-meta-label">Role</span>
            <span className="pd-meta-value">{project.role}</span>
          </div>
          {project.duration && (
            <div>
              <span className="pd-meta-label">Duration</span>
              <span className="pd-meta-value">{project.duration}</span>
            </div>
          )}
          {project.team && (
            <div>
              <span className="pd-meta-label">Team</span>
              <span className="pd-meta-value">{project.team}</span>
            </div>
          )}
          {project.url && (
            <div>
              <span className="pd-meta-label">Live</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-meta-value underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Visit site ↗
              </a>
            </div>
          )}
        </div>

        {/* Case body: TOC + content */}
        <div className="pd-case-body">
          {/* TOC */}
          <nav className="pd-toc">
            {TOC_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`pd-toc-item${activeSection === id ? " active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Content */}
          <div className="flex flex-col gap-16">
            {/* Overview */}
            <section ref={setRef("overview")} id="overview">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="pd-section-num">01</span>
                <h2 className="text-[24px] font-medium tracking-[-0.015em] text-[#171717]">
                  Overview
                </h2>
              </div>
              {project.problem && (
                <div className="mb-6">
                  <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#A8A8A8] mb-2">
                    Problem
                  </p>
                  <p className="text-[16px] leading-[1.65] text-[#171717]">
                    {project.problem}
                  </p>
                </div>
              )}
              {project.approach && (
                <div className="pd-approach-callout">
                  <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#A8A8A8] mb-2">
                    Approach
                  </p>
                  <p className="text-[16px] leading-[1.65] text-[#171717]">
                    {project.approach}
                  </p>
                </div>
              )}
            </section>

            {/* Stack */}
            <section ref={setRef("stack")} id="stack">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="pd-section-num">02</span>
                <h2 className="text-[24px] font-medium tracking-[-0.015em] text-[#171717]">
                  Stack
                </h2>
              </div>
              <div className="pd-stack-grid">
                {stackItems.map((tech, i) => (
                  <div key={tech} className="pd-stack-item">
                    <span className="pd-stack-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pd-stack-name">{tech}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Outcomes */}
            {project.outcome && project.outcome.length > 0 && (
              <section ref={setRef("outcomes")} id="outcomes">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="pd-section-num">03</span>
                  <h2 className="text-[24px] font-medium tracking-[-0.015em] text-[#171717]">
                    Outcomes
                  </h2>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(project.outcome.length, 4)}, 1fr)`,
                  }}
                >
                  {project.outcome.map((o) => (
                    <div key={o.label} className="pd-metric">
                      <div className="pd-metric-val">{o.val}</div>
                      <div className="pd-metric-label">{o.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Build */}
            {project.build && project.build.length > 0 && (
              <section ref={setRef("build")} id="build">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="pd-section-num">04</span>
                  <h2 className="text-[24px] font-medium tracking-[-0.015em] text-[#171717]">
                    Build
                  </h2>
                </div>
                {project.build.map((item, i) => (
                  <div key={item.title} className="pd-build-item">
                    <span className="pd-build-idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="pd-build-title">{item.title}</div>
                      <div className="pd-build-body">{item.body}</div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Gallery */}
            <section ref={setRef("gallery")} id="gallery">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="pd-section-num">05</span>
                <h2 className="text-[24px] font-medium tracking-[-0.015em] text-[#171717]">
                  Gallery
                </h2>
              </div>
              <div className="pd-gallery">
                {project.imgSrcArr.map((src, i) => (
                  <div key={src} className="relative overflow-hidden rounded-lg border border-[#E5E5E5]">
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Prev / Next nav */}
        <div className="pd-project-nav">
          {prev ? (
            <Link href={`/projects/${prev.slug}`}>
              <div className="pd-np-dir">← Previous</div>
              <div className="pd-np-title">{prev.subtitle ?? prev.title}</div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}`}>
              <div className="pd-np-dir">Next →</div>
              <div className="pd-np-title">{next.subtitle ?? next.title}</div>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}
