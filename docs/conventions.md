# Conventions

Every slice is checked against these rules. They describe how the code is written today. If a rule gets in the way, raise it in the spec's open questions instead of breaking it quietly.

## Stack (don't add libraries without asking)
Next.js 16 (App Router) · React 19.3 · TypeScript (strict) · Tailwind 3 · `motion` · `lottie-react` · npm · ESLint flat config (`eslint .`). Hosting: Cloudflare Workers via `@opennextjs/cloudflare` + `wrangler` (spec 001). External services are called with plain `fetch`: no OpenAI, Telegram or Google SDKs.

## Files and folders

| What | Where |
| --- | --- |
| Route | `src/app/<route>/page.tsx` (route-only components in `_components/` next to it) |
| API | `src/app/api/<name>/route.ts` |
| Shared component | `src/components/<Name>.tsx`; generic primitives in `src/components/ui/`; chat in `src/components/chat/` |
| Content (single source of truth for pages **and** the chat bot) | `src/content/<area>/<area>.ts`, re-exported from `src/content/index.ts` |
| Server logic and external clients | `src/lib/<area>/` (`ai/`, `calendar/`) |
| Animation constants | `src/variables/` |
| Static files | `public/` |

- Component files are `PascalCase.tsx`, named after their main export. Hooks are `useSomething.ts`. Other modules are `camelCase.ts`.
- Components are named function exports (`export function ProjectCard(...)`); pages and layouts use default exports (Next.js).
- Props types are `interface <Component>Props`, next to the component.
- Import through the `@/` alias. No deep relative paths.

## TypeScript
- No `any`. Use `unknown` and narrow; validate every request body in route handlers by hand-written type guards (as `/api/chat` and `/api/booking` do).
- `import type` for type-only imports.
- No `as` casts without a comment saying why.

## Next.js
- Server Components by default. `'use client'` only where interactivity needs it, pushed to the leaves.
- Public pages are static where possible (`generateStaticParams` for case studies).
- Metadata via `metadata` / `generateMetadata`; canonical and Open Graph URLs come from `SITE_URL` (`src/lib/siteUrl.ts`).
- Images: `next/image` with `sizes`; no layout shift.

## Runtime (Cloudflare Workers, from spec 001)
- Request code runs in workerd with `nodejs_compat`: no `fs`, `child_process`, native modules or `sharp` in route handlers or anything they import. Check every new dependency for Workers compatibility.
- Edge runtime (`export const runtime = "edge"`) is not supported by OpenNext; route handlers stay on the Node.js runtime.
- Module-level state (rate-limit map, cached Google token) lives per isolate: fine as a best-effort cache, never as the only guard for something that must be exact.
- Background work after the response uses `after()` from `next/server`.
- Client IP: `cf-connecting-ip` first, then `x-forwarded-for`.
- The worker bundle has a size limit (3 MiB on the free plan, 10 MiB on paid, compressed). A change that grows it noticeably needs a reason in the spec.

## Integrations and security
- One client per service in `src/lib/<area>/` (`openai.ts`, `telegram.ts`, `google.ts`), typed, reading env lazily inside functions.
- A failed notification (Telegram) never breaks the visitor's flow: return `false`, don't throw.
- Booking timing is never trusted from the model or the client: re-validated server-side against `src/content/bot/booking.ts` and the calendar right before creating the event.
- Guardrails in the chat and booking routes (rate limits, message size and count caps, tool-round cap, honeypot) are not loosened without a spec saying why.
- Secrets only on the server. Never log secrets or full personal data.

## Styling
- Tailwind utilities from the tokens in `tailwind.config.ts` and `src/app/globals.css`; no raw hex colors in components. New tokens go there first.
- Follow [DESIGN.md](../DESIGN.md). Mobile-first. Respect `prefers-reduced-motion` (`motion-reduce:` utilities, `usePrefersReducedMotion`).

## Copy and locale
- Site copy is English. The chat assistant answers in the visitor's language (English, Ukrainian, Russian are primary): a product requirement whenever bot prompts or content change.

## Accessibility
- WCAG 2.1 AA contrast, visible focus (`focus-ring`), labels on all inputs.
- Touch targets ≥ 44px; icon-only buttons have `aria-label`.
- Chat and form results and errors are announced (`role="status"` / `role="alert"`).
