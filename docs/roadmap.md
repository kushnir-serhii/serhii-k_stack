# Roadmap

The single source of truth for what's next. `/run-implement` walks the **Plan** top to bottom. How specs move: [process.md](process.md).

## Status

| Spec | Title | Status | Depends on | Branch |
| --- | --- | --- | --- | --- |
| [001](specs/001-cloudflare-migration.md) | Move hosting from Vercel to Cloudflare Workers | in-progress (slices 1–3 done; slice 4 is the user's smoke test) | — | `cloudflare-migration` → PR into `main-cloudflare` |
| [002](specs/002-react-compiler-lint.md) | Fix the React Compiler lint rules (clock, chat, booking card) | draft | 001 slice 1 (done) | `spec/002-react-compiler-lint` (from `cloudflare-migration`) → PR into `main-cloudflare` |

## Plan

### Wave 1 — hosting
1. **001 — Cloudflare migration.** Build and run the site on Cloudflare Workers (OpenNext), make the runtime code portable, document the deploy and the DNS cutover. Afterwards `main-cloudflare` is the deploy branch.

### Wave 2 — code health
2. **002 — React Compiler lint rules.** Fix the 6 hits of the rules `eslint-config-next` 16 added (`DigitalClock.tsx`, `ChatWidget.tsx`, `BookingCard.tsx`) and set the rules back to `error`. Needs only 001 slice 1, so it doesn't wait for the Cloudflare smoke test.

### Later (not specs yet)
- Exact, shared rate limiting (Cloudflare rate-limiting binding or KV) if the in-memory limiter is not enough.
- Decide whether `main-cloudflare` replaces `main` and retire the Vercel project.
