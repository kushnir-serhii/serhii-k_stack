This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## AI assistant (`/api/chat`)

A streaming chat widget backed by the OpenAI API (`gpt-4.1-mini` by default, override with `OPENAI_MODEL`). The site's own content is the
knowledge base — `PROJECTS`, `services` and `contacts` are serialised into the
system prompt, so a new case study is available to the bot the moment it is added.

**Tool calling.** The model can act on the page, not just answer:

| Tool | Effect |
| --- | --- |
| `open_project` | Validates the slug server-side and navigates the visitor to that case study |
| `save_lead` | Sends name / contact / task to a private Telegram chat |

**Files**

```
src/content/bot/bot.ts        persona, greeting, quick replies, FAQ  (edit this)
src/lib/ai/knowledge.ts       site content -> knowledge base
src/lib/ai/systemPrompt.ts    system prompt assembly
src/lib/ai/openai.ts          REST SSE client, no SDK dependency
src/lib/ai/tools.ts           function declarations
src/lib/ai/telegram.ts        lead delivery
src/lib/ai/rateLimit.ts       per-IP sliding window
src/app/api/chat/route.ts     streaming route + tool loop
src/components/chat/          widget UI and streaming hook
```

**Setup.** Copy `.env.example` to `.env.local` and fill in the keys.

**Guards.** 12 requests/min per IP, 1000 chars per message, 30 messages per
request, 25 user messages per session, 3 tool rounds per turn.

## Calendar booking (`/api/booking`)

A "book a call" flow backed by Google Calendar. The chat bot calls the
`show_booking_slots` tool when the visitor wants to talk, which renders an
interactive card in the widget; the actual booking is submitted from that
card straight to `/api/booking`, not through the model. Every rule (working
hours, buffers, notice period, daily cap) is re-checked server-side right
before the event is created — the LLM and the client are never trusted with
timing.

**Files**

```
src/content/bot/booking.ts    hours, buffers, meeting types, limits  (edit this)
src/lib/calendar/slots.ts     pure slot-generation + validation engine
src/lib/calendar/google.ts    OAuth refresh-token flow + Calendar REST calls
src/app/api/booking/route.ts  GET availability, POST to book
src/components/chat/BookingCard.tsx  day/time picker + booking form
scripts/google-auth.mjs       one-time script to obtain a refresh token
```

**Setup.** See the Google Calendar block in `.env.example` for the full
walkthrough (Cloud project, OAuth consent screen, OAuth client, then
`node scripts/google-auth.mjs`). Without `GOOGLE_CLIENT_ID` /
`GOOGLE_CLIENT_SECRET` / `GOOGLE_REFRESH_TOKEN` set, `/api/booking` returns
503 and the bot falls back to `save_lead`.

**Guards.** Slot lookup shares the chat rate limit; booking itself is capped
at 5 requests/min per IP. A hidden honeypot field silently no-ops bot
submissions. Bookings are capped at `maxBookingsPerDay` per calendar day.
