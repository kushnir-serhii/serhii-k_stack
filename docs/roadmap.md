# Roadmap

The single source of truth for what's next. `/run-implement` walks the **Plan** top to bottom. How specs move: [process.md](process.md).

## Status

| Spec | Title | Status | Depends on | Branch |
| --- | --- | --- | --- | --- |
| [001](specs/001-cloudflare-migration.md) | Move hosting from Vercel to Cloudflare Workers | draft | — | `cloudflare-migration` → PR into `main-cloudflare` |

## Plan

### Wave 1 — hosting
1. **001 — Cloudflare migration.** Build and run the site on Cloudflare Workers (OpenNext), make the runtime code portable, document the deploy and the DNS cutover. Afterwards `main-cloudflare` is the deploy branch.

### Later (not specs yet)
- Exact, shared rate limiting (Cloudflare rate-limiting binding or KV) if the in-memory limiter is not enough.
- Decide whether `main-cloudflare` replaces `main` and retire the Vercel project.
