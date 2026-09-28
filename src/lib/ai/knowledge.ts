import { PROJECTS, type Project } from "@/content/projects/projects";
import { services } from "@/content/services/services";
import { contacts } from "@/content/contacts/contacts";
import { BOT_CONFIG } from "@/content/bot/bot";

/**
 * The site's own content IS the knowledge base.
 * Long-form fields (description, build) are intentionally dropped to keep the
 * prompt small — the bot links to the case page when a visitor wants depth.
 */
function projectToText(p: Project): string {
  const lines: string[] = [
    `### ${p.title}`,
    `slug: ${p.slug} (case page: /projects/${p.slug})`,
    `role: ${p.role} | year: ${p.year} | status: ${p.status}`,
  ];

  if (p.client) lines.push(`client: ${p.client}`);
  if (p.duration) lines.push(`duration: ${p.duration}`);
  if (p.team) lines.push(`team: ${p.team}`);
  if (p.url) lines.push(`live url: ${p.url}`);

  lines.push(`stack: ${p.techStack}`);
  lines.push(`summary: ${p.summary}`);

  if (p.problem) lines.push(`problem: ${p.problem}`);
  if (p.approach) lines.push(`approach: ${p.approach}`);
  if (p.outcome?.length) {
    lines.push(
      `results: ${p.outcome.map((o) => `${o.val} ${o.label}`).join(", ")}`
    );
  }

  return lines.join("\n");
}

let cached: string | null = null;

export function buildKnowledge(): string {
  if (cached) return cached;

  const blocks = [
    `## About Serhii\n${BOT_CONFIG.bio}`,
    `## Services\n${services
      .map((s) => `- ${s.service.trim()}: ${s.description}`)
      .join("\n")}`,
    `## Contacts\n${contacts
      .map((c) => `- ${c.service.trim()}: ${c.text.trim()} (${c.url.trim()})`)
      .join("\n")}`,
    `## FAQ\n${BOT_CONFIG.faq.map((f) => `- ${f.q}: ${f.a}`).join("\n")}`,
    `## Projects (${PROJECTS.length})\n${PROJECTS.map(projectToText).join("\n\n")}`,
  ];

  cached = blocks.join("\n\n");
  return cached;
}

/** Valid slugs — used to validate the open_project tool call. */
export const PROJECT_SLUGS = new Set(PROJECTS.map((p) => p.slug));

/** Slug -> minimal info the client needs to render the action card. */
export const PROJECT_INDEX = new Map(
  PROJECTS.map((p) => [p.slug, { title: p.title, href: `/projects/${p.slug}` }])
);
