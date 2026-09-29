# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js (App Router) portfolio + lead-generation site for Serhii Kushnir, a freelance full-stack/mobile developer. It showcases project case studies and services, and converts visitors via an AI chat assistant ("Sonia") that can navigate the site, capture leads, and book calls on a real Google Calendar. See `PRODUCT.md` for product positioning/context and `README.md` for feature-level docs on the chat and booking systems.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint (ESLint, flat config extending next/core-web-vitals + next/typescript)
```

There is no test suite configured in this repo (no test runner, no test files).

One-off script: `node scripts/google-auth.mjs` — obtains a Google OAuth refresh token for calendar booking (run once during setup; see `.env.example`).

## Environment

Copy `.env.example` to `.env.local`. Required keys: `OPENAI_API_KEY` (chat), `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` (lead delivery), `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REFRESH_TOKEN` (calendar booking — optional; without these `/api/booking` returns 503 and the bot falls back to `save_lead`).

## Architecture

### Content-driven site

Site content (projects, services, contacts, bot persona/copy) lives under `src/content/` as typed TS modules, not a CMS or MDX. These modules are the single source of truth consumed both by page components and by the AI assistant's knowledge base — adding a case study to `src/content/projects/projects.ts` makes it available on `/projects/[slug]` *and* to the chat bot's answers simultaneously, with no separate sync step.

- `src/content/projects/projects.ts` — case studies
- `src/content/services/services.ts` — service catalogue
- `src/content/contacts/contacts.ts` — contact channels
- `src/content/bot/bot.ts` — Sonia's persona, greeting, quick replies, FAQ
- `src/content/bot/booking.ts` — working hours, buffers, meeting types, booking limits

### AI chat assistant (`/api/chat`)

Streaming (SSE) chat backed directly by the OpenAI REST API — no SDK dependency. Flow: `src/lib/ai/knowledge.ts` serializes the content modules above into a knowledge base → `src/lib/ai/systemPrompt.ts` assembles the system prompt → `src/app/api/chat/route.ts` runs the streaming request and the tool-calling loop → `src/lib/ai/openai.ts` is the raw SSE client.

The model can act on the page via function calling (`src/lib/ai/tools.ts` has the declarations):
- `open_project` — server validates the slug, then navigates the visitor to that case study
- `save_lead` — sends name/contact/task to a private Telegram chat (`src/lib/ai/telegram.ts`)
- `show_booking_slots` — renders the interactive booking card (see below)

Guardrails enforced server-side in the route: 12 requests/min/IP (`src/lib/ai/rateLimit.ts`, sliding window), 1000 chars/message, 30 messages/request, 25 user messages/session, 3 tool rounds/turn.

UI lives in `src/components/chat/` (widget + streaming hook `useChatBot.ts`).

### Calendar booking (`/api/booking`)

The chat's `show_booking_slots` tool renders `BookingCard.tsx`, but the actual booking submission bypasses the LLM entirely and posts straight to `/api/booking`. Every scheduling rule (working hours, buffers, notice period, daily cap — all defined in `src/content/bot/booking.ts`) is re-validated server-side against Google Calendar right before creating the event; the model and client are never trusted with timing.

- `src/lib/calendar/slots.ts` — pure slot-generation + validation engine (no I/O, easy to reason about independently)
- `src/lib/calendar/google.ts` — OAuth refresh-token flow + Calendar REST calls
- `src/app/api/booking/route.ts` — `GET` availability, `POST` to book

Guards: shares the chat rate limit for slot lookups; booking itself capped at 5 req/min/IP; hidden honeypot field silently no-ops bot submissions; bookings capped at `maxBookingsPerDay` per calendar day.

### Pages

App Router structure under `src/app/`: home (`page.tsx`), `/projects` and `/projects/[slug]` (case study detail, components in `_components/`), `/services` (components in `_components/`). Shared UI in `src/components/` (`ui/` for generic primitives, `chat/` for the assistant widget).

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`).

## Multilingual behavior

The chat assistant and site copy are expected to match whichever language the visitor uses (English, Ukrainian, Russian are the primary working languages) — this is a product requirement, not just a nice-to-have, when touching bot prompts or copy in `src/content/`.
