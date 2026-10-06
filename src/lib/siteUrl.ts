/**
 * Absolute origin of the site, used for metadata (canonical/Open Graph URLs).
 * BASE_URL wins; on Vercel it falls back to the project's production domain,
 * which Vercel injects at build time, so a missing env var never ships
 * localhost links to production.
 */
function resolveSiteUrl(): string {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl().replace(/\/+$/, "");
