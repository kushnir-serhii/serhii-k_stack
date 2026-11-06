import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/siteUrl";

/**
 * Visibility is the goal, so search engines AND AI assistants are welcome.
 * AI crawlers are listed explicitly: some only crawl when named, and it
 * documents the intent. Only API routes are off-limits.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_CRAWLERS, allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
