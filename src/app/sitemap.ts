import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content";
import { absoluteUrl } from "@/lib/seo";

/** Generated from content — new case studies are listed automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const projects: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
    images: p.imgSrcArr.map((src) => absoluteUrl(src)),
  }));

  const legal: MetadataRoute.Sitemap = ["/privacy", "/terms"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return [...pages, ...projects, ...legal];
}
