/**
 * Absolute origin of the site, used for metadata (canonical/Open Graph URLs).
 * BASE_URL is the only source; it must be set in Cloudflare for both build and
 * runtime. There is no platform fallback, so without it links point at
 * http://localhost:3000.
 */
function resolveSiteUrl(): string {
  return process.env.BASE_URL || "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, "");
