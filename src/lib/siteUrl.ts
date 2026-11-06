/**
 * Absolute origin of the site, used for metadata (canonical/Open Graph URLs,
 * sitemap, robots, JSON-LD). BASE_URL wins; otherwise it falls back to the
 * production domain the host injects (Vercel at build time, Railway at
 * runtime), so a missing env var never ships localhost links to production.
 */
function resolveSiteUrl(): string {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, "");
