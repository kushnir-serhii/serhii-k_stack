/**
 * In-memory sliding-window rate limiter.
 *
 * Note: serverless instances do not share memory, so the effective limit is
 * per warm instance. That is fine for portfolio traffic — it stops a single
 * visitor hammering the endpoint. Swap for Upstash Redis if this ever needs
 * to be exact.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;

const hits = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  maxRequests: number = MAX_REQUESTS
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= maxRequests) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    hits.set(key, recent);
    return { ok: false, retryAfter };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return { ok: true, retryAfter: 0 };
}

export function getClientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
