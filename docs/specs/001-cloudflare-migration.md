# 001 — Move hosting from Vercel to Cloudflare Workers

**Status:** in-progress · **Depends on:** — · **Route(s):** all, `/api/chat`, `/api/booking` · **Branch:** `cloudflare-migration` → PR into `main-cloudflare`

## Goal
The site, the chat assistant and calendar booking run on Cloudflare Workers (via the OpenNext adapter) and deploy from `main-cloudflare`, so the site can be used commercially for the business without Vercel Pro ($20/month). Hosting costs $0 (Free) or $5/month (Workers Paid).

## Why
Vercel's Hobby plan is for non-commercial personal use only; "advertising the sale of a product or service" counts as commercial. This site sells services (`/services`, lead capture to Telegram, sales-call booking), so staying on Hobby risks a paused deployment. Cloudflare's free plan has no such restriction.

## Scope
- In:
  - Upgrading Next.js 15.5 → 16 (and `eslint-config-next`, React to the versions Next 16 requires): the OpenNext adapter refuses to build Next 15, whose support ended 2026-10-21.
  - OpenNext adapter (`@opennextjs/cloudflare` ≥ 1.3.0: older versions have an SSRF issue in `/_next/image`) and `wrangler`, with `wrangler.jsonc`, `open-next.config.ts`, `preview` / `deploy` / `cf-typegen` scripts.
  - Removing Vercel-only assumptions in code: `VERCEL_PROJECT_PRODUCTION_URL` in `src/lib/siteUrl.ts`; client IP header in `src/lib/ai/rateLimit.ts`.
  - The `next/image` strategy on Workers.
  - Docs: README deploy section, `.env.example`, `CLAUDE.md` commands, `docs/setup.md` → Cloudflare steps (Workers Builds on `main-cloudflare`, secrets, custom domain, DNS cutover).
- Out:
  - Deploying, setting secrets, DNS changes (the user does these, following `docs/setup.md`).
  - Shared, exact rate limiting (Cloudflare rate-limiting binding / KV): a later spec unless decided otherwise below.
  - Any UI or content change.

## Touches
`package.json`, `package-lock.json`, `next.config.ts`, new `wrangler.jsonc`, `open-next.config.ts`, `cloudflare-env.d.ts`, `.gitignore`, `src/lib/siteUrl.ts`, `src/lib/ai/rateLimit.ts`, possibly `src/components/ProjectItem.tsx`, `src/app/projects/_components/ProjectCard.tsx`, `src/app/projects/[slug]/_components/SectionGallery.tsx` (images), `README.md`, `.env.example`, `CLAUDE.md`, `docs/setup.md`, `docs/conventions.md`.

## What we already know (audit, 2026-11-05)
- No `@vercel/*` packages, Vercel KV / Edge Config, `next/og`, middleware, or Node-only APIs (`fs`, `crypto`, native modules) in `src/`.
- OpenAI (SSE streaming), Telegram and Google Calendar are plain `fetch`: Workers-compatible.
- `/api/chat` streams an NDJSON `ReadableStream`: supported on Workers.
- `/api/booking` uses `after()` from `next/server`: supported by OpenNext (`waitUntil`).
- Both route handlers set `export const runtime = "nodejs"`: correct for OpenNext (edge runtime is not supported); keep it.
- Case-study pages use `generateStaticParams`; `public/` is ~15 MB / 54 files (served as static assets, free).
- `next/image` is used in 3 components.
- In-memory rate limiter and cached Google token are per isolate on Workers (same weakness as per-instance on Vercel).
- Next 15 is out of the adapter's support window (support ended 2026-10-21): `opennextjs-cloudflare build` refuses it.
- Working reference: `C:\Users\serg9\Documents\GitHub\real-estate` (`wrangler.jsonc`, `open-next.config.ts`, `next.config.ts`, `package.json` scripts) already deploys a Next.js app this way.

## Slices

### [x] 1. Next.js 16 + OpenNext adapter build and run locally in workerd
- **Build:** upgrade `next` and `eslint-config-next` to the latest 16.x, `react` / `react-dom` to what Next 16 requires; read the Next 16 upgrade guide in `node_modules/next/dist/docs/` and apply its breaking changes (`next lint` is removed: `lint` script becomes `eslint .`; Turbopack is the default for build). Then install `@opennextjs/cloudflare` (latest 1.x that supports Next 16, ≥ 1.3.0) and `wrangler` (dev). Add `wrangler.jsonc` (`main: .open-next/worker.js`, `assets` → `.open-next/assets` with binding `ASSETS`, `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`, current `compatibility_date`, `observability.enabled`), `open-next.config.ts` (`defineCloudflareConfig()`, no R2/KV cache), `initOpenNextCloudflareForDev()` in `next.config.ts`, scripts `preview`, `deploy`, `cf-typegen`, generated `cloudflare-env.d.ts`. Ignore `.open-next/`, `.wrangler/`, `.dev.vars` in `.gitignore`.
- **Files:** `package.json`, `package-lock.json`, `wrangler.jsonc`, `open-next.config.ts`, `next.config.ts`, `cloudflare-env.d.ts`, `.gitignore`
- **Agent:** backend · **Model:** sonnet
- **Accept:**
  - [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` are green.
  - [x] `npm run preview` builds and serves `/`, `/projects`, a `/projects/<slug>` page, `/services`, `/privacy`, `/terms` and the 404 page in workerd, with images and fonts loading.
  - [x] Without keys in `.dev.vars`, `POST /api/chat` and `GET /api/booking?type=<id>` return their 503 "not configured" JSON (proves both handlers run in workerd).
  - [x] The compressed worker size is recorded in the Log, with a note whether it fits the free plan (3 MiB).
  - [x] `npm run dev` still works.
  - [x] No build flag that bypasses the adapter's Next.js support check.

### [x] 2. Runtime code without Vercel assumptions
- **Build:** `src/lib/siteUrl.ts`: drop the `VERCEL_PROJECT_PRODUCTION_URL` fallback (keep it only if decided below); `BASE_URL` is the source, localhost in dev. `src/lib/ai/rateLimit.ts` → `getClientKey`: `cf-connecting-ip` first, then `x-forwarded-for`, `x-real-ip`. Update the comment that mentions serverless instances. Set `images: { unoptimized: true }` in `next.config.ts` (decided).
- **Files:** `src/lib/siteUrl.ts`, `src/lib/ai/rateLimit.ts`, `next.config.ts` and/or `open-next.config.ts`, maybe the 3 image components
- **Agent:** backend · **Model:** sonnet
- **Accept:**
  - [x] No `VERCEL_` references left in `src/` (unless decided otherwise).
  - [x] Rate-limit key uses `cf-connecting-ip` when present.
  - [x] Case-study galleries and project cards render images in `npm run preview` with no layout shift and no failing `/_next/image` requests.
  - [x] Typecheck, lint, build and preview are green.

### [ ] 3. Docs and deploy handover
- **Build:** README: replace "Deploy on Vercel" with "Deploy on Cloudflare" (scripts, `.dev.vars`, Workers Builds). `.env.example`: drop the Vercel fallback note, explain `BASE_URL` must be set in Cloudflare, mention `.dev.vars` for `npm run preview`. `CLAUDE.md`: commands (`preview`, `deploy`, `cf-typegen`), hosting line, Next.js 16. `docs/conventions.md` → Stack: Next.js 16. `docs/setup.md` → Cloudflare: step-by-step for the user (account and plan, Workers Builds connected to GitHub with production branch `main-cloudflare`, build/deploy commands, every runtime secret, `BASE_URL`, test on `*.workers.dev`, buy a domain in Cloudflare Registrar and attach it to the Worker as a custom domain, update `BASE_URL`, keep Vercel running until the Cloudflare site is verified). Update the Status table.
- **Files:** `README.md`, `.env.example`, `CLAUDE.md`, `docs/setup.md`
- **Model:** haiku
- **Accept:**
  - [ ] Someone following only `docs/setup.md` can deploy `main-cloudflare` and set every secret the code reads (cross-checked against all `process.env.*` in `src/`).
  - [ ] No instructions still point to Vercel as the target, except the cutover steps.

### [ ] 4. Manual smoke test on Cloudflare (user)
- **Build:** nothing to code. After the user deploys `main-cloudflare` to `*.workers.dev` with real secrets: chat streams an answer, `open_project` navigates, `save_lead` reaches Telegram, booking card loads slots and a test booking lands in Google Calendar and Telegram; test in English, Ukrainian and Russian.
- **Accept:**
  - [ ] User confirms each item above; results go into the Log.
  - [ ] Free-plan CPU limit (10 ms) not hit in the Workers dashboard during the test, or the plan is switched to Workers Paid.

## External needs
- Cloudflare account; plan decision: Free ($0, 10 ms CPU/request, 3 MiB worker) or Workers Paid ($5/month, 30 s CPU, 10 MiB).
- Workers Builds connected to the GitHub repo, production branch `main-cloudflare`.
- Runtime secrets in Cloudflare: `OPENAI_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, optional `OPENAI_MODEL`, `GOOGLE_CALENDAR_ID`, `BOOKING_OWNER_EMAIL`, `GOOGLE_BUSY_CALENDAR_IDS`; variable `BASE_URL`.
- Domain: buy one in Cloudflare Registrar and attach it to the Worker as a custom domain; set `BASE_URL` to it.

## Open questions
- **Decided (2026-11-05):** worker name `serhii-k-stack`.
- **Decided:** images use `images.unoptimized: true`. No compression step: the files in `public/images` are already prepared.
- **Decided:** start on the Free plan; switch to Workers Paid ($5/month) if the worker is over 3 MiB or the smoke test hits the CPU limit, before sharing the site with clients.
- **Decided:** remove the `VERCEL_PROJECT_PRODUCTION_URL` fallback on this branch (`main` keeps its own copy).
- **Decided (scope change, 2026-11-05):** upgrade to Next.js 16 in slice 1 instead of bypassing the adapter's support check (`--dangerouslyUseUnsupportedNextVersion`) on Next 15.
- **Decided:** keep the in-memory rate limiter; shared rate limiting is a later spec.
- **Decided:** no current custom domain. A new domain is bought through Cloudflare Registrar (DNS is then on Cloudflare automatically) and attached to the Worker as a custom domain; until then the site runs on `serhii-k-stack.<account>.workers.dev`. No DNS move and no Vercel domain removal.

- Local `npm run preview` on Windows logged "Workers runtime crashed unexpectedly … restarted" twice while pages kept serving (slice 2). The adapter warns Windows is not fully supported (recommends WSL); Workers Builds runs on Linux. Watch for errors in the Workers logs during slice 4; if it repeats there, investigate.
- `npm audit --omit=dev`: 6 issues (5 high, 1 moderate), some inside the adapter's dependencies; `npm audit fix` (non-breaking) is available. Not run: user to decide.
- Next 16's eslint config adds React Compiler rules (`set-state-in-effect`, `use-memo`, `refs`); set to `warn` for now (6 hits in `DigitalClock.tsx`, `BookingCard.tsx`, `ChatWidget.tsx`). Fixing them is a later UI spec.

## Log
| Date | Slice | Result | Notes / files |
| --- | --- | --- | --- |
| 2026-11-05 | 1 | done | Next 15.5.12 → 16.4.5, React 19.3.1, `@opennextjs/cloudflare` ^1.20.16, wrangler ^4.158.0. `npm run preview`: `/`, `/projects`, `/projects/calmisu`, `/services`, `/privacy`, `/terms` 200, `/nope` 404; CSS, JS, font, `/images/*` and `/_next/image` 200. Keys blanked: `/api/chat` and `/api/booking?type=intro` 503. Worker: 5737 KiB, **gzip 1241 KiB (~1.21 MiB) — fits the free plan (3 MiB)**. `lint` is now `eslint .` (flat config without FlatCompat); 3 new React Compiler rules set to `warn` (6 hits in `DigitalClock.tsx`, `BookingCard.tsx`, `ChatWidget.tsx`). `cf-typegen` uses `--include-runtime=false` (runtime types broke DOM `Response.json()`). Files: `package.json`, `package-lock.json`, `wrangler.jsonc`, `open-next.config.ts`, `next.config.ts`, `cloudflare-env.d.ts`, `eslint.config.mjs`, `tsconfig.json` (Next 16 auto-edit), `.gitignore`, `AGENTS.md` (generated by Next 16) |
| 2026-11-05 | 2 | done | `siteUrl.ts`: `BASE_URL` only (no `VERCEL_` left in `src/`). `rateLimit.ts`: `cf-connecting-ip` first, comment per isolate. `next.config.ts`: `images.unoptimized`. Preview: `/`, `/projects`, `/projects/calmisu` 200, no `/_next/image` URLs, `<img>` keep width/height or fill wrapper. |
