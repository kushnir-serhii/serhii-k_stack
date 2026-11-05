# Accounts, keys and hosting

What is connected and what the user does by hand. Agents never do these steps; they add to this file when a spec needs a new account, key, secret or dashboard step.

## Status

| Service | Status | Env | Needed by |
| --- | --- | --- | --- |
| Vercel | production today (`main`) | set in the Vercel dashboard | until the Cloudflare cutover (001) |
| Cloudflare Workers | not connected | — | 001 |
| OpenAI | connected | `OPENAI_API_KEY`, optional `OPENAI_MODEL` | chat |
| Telegram bot | connected | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | leads and booking alerts |
| Google Calendar | connected (optional: without it `/api/booking` returns 503 and the bot falls back to `save_lead`) | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, optional `GOOGLE_CALENDAR_ID`, `BOOKING_OWNER_EMAIL`, `GOOGLE_BUSY_CALENDAR_IDS` | booking |
| Site URL | `BASE_URL` (on Vercel falls back to the production domain) | `BASE_URL` | canonical and OG URLs |

How to get each key: comments in [.env.example](../.env.example).

## Local env

- `npm run dev` reads `.env.local`.
- `npm run preview` (workerd, from spec 001) reads `.dev.vars`. Same keys, never committed.

## Cloudflare (spec 001)

Filled in by spec 001 slice 4. Outline of what the user will do:

1. Cloudflare account; choose the plan (Free, or Workers Paid $5/month; see the spec).
2. Workers & Pages → create the Worker from the GitHub repo (Workers Builds), production branch **`main-cloudflare`**, build command `npx opennextjs-cloudflare build`, deploy command `npx opennextjs-cloudflare deploy`.
3. Set the runtime secrets (every key from the table above) and `BASE_URL`.
4. Test on the `*.workers.dev` URL.
5. Custom domain: move DNS to Cloudflare, attach the domain to the Worker, then remove it from Vercel.
