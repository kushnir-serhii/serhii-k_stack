# Accounts, keys and hosting

What is connected and what the user does by hand. Agents never do these steps; they add to this file when a spec needs a new account, key, secret or dashboard step.

## Status

| Service | Status | Env | Needed by |
| --- | --- | --- | --- |
| Vercel | production on `main` until cutover | set in the Vercel dashboard | until the Cloudflare cutover (001) |
| Cloudflare Workers | configured in the repo (spec 001); account not connected yet | — | 001 |
| OpenAI | connected | `OPENAI_API_KEY`, optional `OPENAI_MODEL` | chat |
| Telegram bot | connected | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | leads and booking alerts |
| Google Calendar | connected (optional: without it `/api/booking` returns 503 and the bot falls back to `save_lead`) | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, optional `GOOGLE_CALENDAR_ID`, `BOOKING_OWNER_EMAIL`, `GOOGLE_BUSY_CALENDAR_IDS` | booking |
| Site URL | `BASE_URL`, required, no fallback (build and runtime variable on Cloudflare) | `BASE_URL` | canonical and OG URLs |

How to get each key: comments in [.env.example](../.env.example).

## Local env

- `npm run dev` reads `.env.local`.
- `npm run preview` (production build running in workerd) reads `.dev.vars`. Same keys, never committed. Values in `.dev.vars` override `.env.local`. On Windows it may log harmless "Workers runtime crashed ... restarted" messages; WSL is recommended.

## Cloudflare Workers (spec 001)

Written by spec 001 slice 3. The Worker is named `serhii-k-stack` (`wrangler.jsonc`). Do the steps in order.

1. **Account and plan.** Create a Cloudflare account. Start on Workers Free ($0: 100k requests/day, 10 ms CPU per request, 3 MiB Worker). Switch to Workers Paid ($5/month: 30 s CPU, 10 MiB) under Workers & Pages → Plans if the CPU limit is hit or before sharing the site with clients.
2. **Connect the repo (Workers Builds).** Workers & Pages → Create → Import a repository → GitHub repo `kushnir-serhii/serhii-k_stack`. Settings:
   - Project name: `serhii-k-stack` (must match `name` in `wrangler.jsonc`)
   - Production branch: `main-cloudflare`
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx opennextjs-cloudflare deploy`
   - Optional: enable non-production branch builds for PR previews.
3. **Build variable.** Worker → Settings → Build → Variables and secrets: add `BASE_URL` (`https://<domain>` once you have a domain, or `https://serhii-k-stack.<account-subdomain>.workers.dev` until then).
4. **Runtime variables and secrets.** Worker → Settings → Variables and Secrets. Add every key below. "Secret" means type Secret. Values come from your `.env.local` (or from the service named in the comments of `.env.example`).

   | Variable | Type | Where the value comes from |
   | --- | --- | --- |
   | `BASE_URL` | build and runtime variable (required) | `.env.example`: `https://<domain>`, no trailing slash |
   | `OPENAI_API_KEY` | secret (required for chat) | `.env.local`; OpenAI API keys page |
   | `OPENAI_MODEL` | secret (optional) | `.env.example`; default `gpt-4.1-mini` |
   | `TELEGRAM_BOT_TOKEN` | secret (required for leads) | `.env.local`; @BotFather |
   | `TELEGRAM_CHAT_ID` | secret (required for leads) | `.env.local`; Telegram `getUpdates` (see `.env.example`) |
   | `GOOGLE_CLIENT_ID` | secret (optional: booking) | `.env.local`; Google Cloud OAuth client (`.env.example` steps 1–4) |
   | `GOOGLE_CLIENT_SECRET` | secret (optional: booking) | `.env.local`; same OAuth client |
   | `GOOGLE_REFRESH_TOKEN` | secret (optional: booking) | `.env.local`; printed by `node scripts/google-auth.mjs` |
   | `GOOGLE_CALENDAR_ID` | secret (optional) | `.env.example`; default `primary` |
   | `BOOKING_OWNER_EMAIL` | secret (optional) | `.env.example`; your Google account email |
   | `GOOGLE_BUSY_CALENDAR_IDS` | secret (optional) | `.env.example`; comma-separated calendar IDs |

   Without the Google variables, `/api/booking` returns 503 and the bot falls back to `save_lead`.
5. **First deploy.** Merge the spec PR into `main-cloudflare`. Workers Builds runs the build and deploy. When it finishes, open the `https://serhii-k-stack.<account-subdomain>.workers.dev` URL.
6. **Smoke test** (spec 001 slice 4):
   - The chat streams replies.
   - `open_project` navigates to a case study.
   - `save_lead` reaches the Telegram chat.
   - The booking card loads slots, and a test booking lands in Google Calendar and in Telegram.
   - Test in English, Ukrainian and Russian.
   - Worker → Metrics: check CPU time per request. Worker → Logs: check for errors.
7. **Domain.** Buy the domain in Cloudflare Registrar (Domain Registration → Register Domains). DNS is then on Cloudflare automatically. Attach it: Worker → Settings → Domains & Routes → Add → Custom domain. Set `BASE_URL` to `https://<domain>` as both build and runtime variable, then redeploy.
8. **Vercel.** Keep Vercel running until the Cloudflare site is verified. Afterwards, decide about `main` vs `main-cloudflare` and about the Vercel project.

**Manual deploy from your machine (you only, never an agent):** `npx wrangler login`, once. Then `npm run deploy`. This builds with OpenNext and deploys the Worker.
