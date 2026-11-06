import { PROJECTS } from "@/content/projects/projects";
import { services, servicesFaq, engagementModels, workProcess } from "@/content/services/services";
import { contacts } from "@/content/contacts/contacts";
import { BOT_CONFIG } from "@/content/bot/bot";
import { absoluteUrl, DEFAULT_DESCRIPTION, PERSON_NAME } from "@/lib/seo";

/**
 * llms.txt (https://llmstxt.org): a Markdown map of the site for AI
 * assistants. Built from the same content modules as the pages and the chat
 * bot, so it never drifts out of date.
 */
const header = () =>
  [
    `# ${PERSON_NAME} — Freelance Full-Stack & Mobile Developer`,
    "",
    `> ${DEFAULT_DESCRIPTION}`,
    "",
    BOT_CONFIG.bio,
    "",
    "Engagement: fixed-price projects, hourly/contract work, or ongoing support. Works solo or with an experienced UI/UX designer. A free 30-minute intro call can be booked through the AI assistant on the site.",
  ].join("\n");

const contactLines = () =>
  contacts.map((c) => `- ${c.service.trim()}: ${c.url.trim()}`).join("\n");

export function buildLlmsTxt(): string {
  return [
    header(),
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")}): Overview, featured projects and services, contacts`,
    `- [Services](${absoluteUrl("/services")}): What I build, process, engagement models, FAQ`,
    `- [Projects](${absoluteUrl("/projects")}): All case studies`,
    `- [Full content for LLMs](${absoluteUrl("/llms-full.txt")}): Every service and case study in one file`,
    "",
    "## Services",
    ...services.map(
      (s) => `- [${s.service.trim()}](${absoluteUrl(`/services#${s.slug}`)}): ${s.description}`
    ),
    "",
    "## Case studies",
    ...PROJECTS.map(
      (p) => `- [${p.subtitle ?? p.title}](${absoluteUrl(`/projects/${p.slug}`)}): ${p.summary}`
    ),
    "",
    "## Contact",
    contactLines(),
    "",
    "## Optional",
    `- [CV (PDF)](${absoluteUrl("/cv/serhii_kushnir_fullstack_developer.pdf")})`,
    `- [Privacy policy](${absoluteUrl("/privacy")})`,
    `- [Terms of service](${absoluteUrl("/terms")})`,
    "",
  ].join("\n");
}

export function buildLlmsFullTxt(): string {
  const serviceBlocks = services.map((s) =>
    [
      `### ${s.service.trim()}`,
      `URL: ${absoluteUrl(`/services#${s.slug}`)}`,
      "",
      s.details,
      "",
      "Deliverables:",
      ...s.deliverables.map((d) => `- ${d}`),
      "",
      `Stack: ${s.stack.join(", ")}`,
    ].join("\n")
  );

  const projectBlocks = PROJECTS.map((p) => {
    const lines = [
      `### ${p.title}`,
      `URL: ${absoluteUrl(`/projects/${p.slug}`)}`,
      `Role: ${p.role} | Year: ${p.year} | Status: ${p.status}`,
    ];
    if (p.url) lines.push(`Live: ${p.url}`);
    if (p.client) lines.push(`Client: ${p.client}`);
    if (p.team) lines.push(`Team: ${p.team}`);
    lines.push(`Stack: ${p.techStack}`, "", p.summary);
    if (p.problem) lines.push("", `Problem: ${p.problem}`);
    if (p.approach) lines.push("", `Approach: ${p.approach}`);
    if (p.outcome?.length) {
      lines.push("", "Results:", ...p.outcome.map((o) => `- ${o.val} — ${o.label}`));
    }
    if (p.build?.length) {
      lines.push("", "What was built:", ...p.build.map((b) => `- ${b.title}: ${b.body}`));
    }
    return lines.join("\n");
  });

  return [
    header(),
    "",
    "## Services",
    "",
    serviceBlocks.join("\n\n"),
    "",
    "## How I work",
    ...workProcess.map((w) => `${w.step}. ${w.title} — ${w.text}`),
    "",
    "## Ways to work together",
    ...engagementModels.map((m) => `- ${m.title}: ${m.text}`),
    "",
    "## FAQ",
    ...servicesFaq.map((f) => `- Q: ${f.q}\n  A: ${f.a}`),
    "",
    `## Case studies (${PROJECTS.length})`,
    "",
    projectBlocks.join("\n\n"),
    "",
    "## Contact",
    contactLines(),
    "",
  ].join("\n");
}
