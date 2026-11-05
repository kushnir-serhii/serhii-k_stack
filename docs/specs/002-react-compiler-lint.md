# 002 — Fix the React Compiler lint rules (clock, chat, booking card)

**Status:** draft · **Depends on:** 001 slice 1 (Next.js 16 and its ESLint config) · **Route(s):** `/` (clock), every page (chat widget), chat booking card · **Branch:** `spec/002-react-compiler-lint` (from `cloudflare-migration`) → PR into `main-cloudflare`

## Goal
The code follows the three React rules that `eslint-config-next` 16 added, so they can go back from `warn` to `error` and new code is held to them. Visitors notice nothing: the clock, the chat widget and the booking card behave exactly as before, with fewer extra re-renders.

## Why
Spec 001 set `react-hooks/set-state-in-effect`, `react-hooks/use-memo` and `react-hooks/refs` to `warn` so the migration didn't turn into UI work. While they stay warnings, new violations slip in unnoticed. The patterns they flag (setting state inside effects, writing refs during render) cause extra renders and stale-value bugs, and they block the React Compiler from optimizing these components.

## Scope
- In: the 6 hits listed below; removing the three `warn` overrides from `eslint.config.mjs`.
- Out: the other lint warnings (about 94, from other rules); turning on the React Compiler (`reactCompiler` in `next.config.ts`); any visual or copy change.

## Touches
`src/components/DigitalClock.tsx`, `src/components/chat/ChatWidget.tsx`, `src/components/chat/BookingCard.tsx`, `eslint.config.mjs`. Possibly `src/components/chat/useChatBot.ts` (slice 2, if the announcement moves there).

## The hits (2026-11-05)

| # | File:line | Rule | Code |
| --- | --- | --- | --- |
| 1 | `DigitalClock.tsx:68` | set-state-in-effect | `setParts(getClockParts(new Date()))` on mount, so the server renders the placeholder and the client fills in the time |
| 2 | `ChatWidget.tsx:68` | refs | `sendRef.current = send` during render (latest `send` for the `open-chat` window listener) |
| 3 | `ChatWidget.tsx:69` | refs | `streamingRef.current = isStreaming` during render (same listener) |
| 4 | `ChatWidget.tsx:117` | set-state-in-effect | `useEffect(() => { if (!open) setMenuOpen(false) }, [open])` |
| 5 | `ChatWidget.tsx:130` | set-state-in-effect | `setAnnouncement(lastReply.content)` when streaming ends (screen-reader live region) |
| 6 | `BookingCard.tsx:63` | use-memo | `useMemo(visitorTimezone, [])`: the rule wants an inline function |

## Slices

### [ ] 1. Digital clock without set-state-in-effect
- **Build:** read the time through `useSyncExternalStore`: a small clock store that ticks every second, with `getServerSnapshot` returning `null` so the server and the first client render still show the current placeholder (no hydration mismatch). Keep `getClockParts`, the markup, the `aria` labels and the 1-second tick.
- **Files:** `src/components/DigitalClock.tsx`
- **Agent:** designer · **Model:** sonnet
- **Accept:**
  - [ ] No `set-state-in-effect` hit in `DigitalClock.tsx`.
  - [ ] No hydration warning in the browser console on `/`; the placeholder shows on the server render and the time appears after hydration, as before.
  - [ ] The clock ticks every second, shows Warsaw time, date and zone label; the screen-reader label still updates.
  - [ ] The interval is cleared when the component unmounts (no timer left running after navigating away).

### [ ] 2. Chat widget: refs and effects
- **Build:**
  - Hits 2–3: replace the render-time ref writes with `useEffectEvent` (stable in React 19.2+) for the `open-chat` listener, so it always sees the latest `send` and `isStreaming`.
  - Hit 4: close the suggestions menu where the sheet closes (the close button, Escape, backdrop and every other `setOpen(false)` path), or render the menu as `open && menuOpen`. Drop the effect.
  - Hit 5: derive the announcement without an effect: either set it in `useChatBot` when a stream finishes, or use the "adjust state when a value changes" render pattern (keep the previous `isStreaming` in state). The live region still announces each finished reply once, never on every token.
- **Files:** `src/components/chat/ChatWidget.tsx`, maybe `src/components/chat/useChatBot.ts`
- **Agent:** designer · **Model:** sonnet
- **Accept:**
  - [ ] No `refs` or `set-state-in-effect` hits in `ChatWidget.tsx`.
  - [ ] "Open chat" buttons on the site (`openChat()` with and without a message) open the widget and send the message once, not while a reply is streaming.
  - [ ] Closing the chat (button, Escape, backdrop) also closes the suggestions menu; reopening shows it closed. Escape still closes the menu first, then the sheet.
  - [ ] A screen reader hears each finished assistant reply once (`role="status"` live region), not token by token.
  - [ ] Auto-scroll, focus on open and the focus trap behave as before.

### [ ] 3. Booking card `use-memo`
- **Build:** `useMemo(() => visitorTimezone(), [])`, or a `useState` lazy initializer, since the timezone never changes during a visit.
- **Files:** `src/components/chat/BookingCard.tsx`
- **Model:** haiku
- **Accept:**
  - [ ] No `use-memo` hit in `BookingCard.tsx`.
  - [ ] Slots are still grouped by the visitor's local date.

### [ ] 4. Rules back to error
- **Build:** remove the three `warn` overrides (and their comment) from `eslint.config.mjs`.
- **Files:** `eslint.config.mjs`
- **Model:** haiku
- **Accept:**
  - [ ] `npm run lint` has 0 errors with the rules at their default (error) level.
  - [ ] `npx tsc --noEmit`, `npm run build` and `npm run preview` are green.

## UI check (end of spec)
Routes: `/` (clock, chat), `/projects`, `/services` at 375px and 1280px: no console errors or hydration warnings, no horizontal scroll. Open the chat, send a message, close it with Escape, reopen it.

## External needs
- To exercise the chat and the booking card for real, `OPENAI_API_KEY` (and the Google keys for slots) must be in `.env.local`. The user runs that check; agents never call OpenAI or Google with real keys.

## Open questions
- **Testing the chat without keys:** the chat and booking card only show real content with an OpenAI key, and agents may not use real keys. Options: (a) the user checks those flows by hand after the agent's work (recommended, no new code); (b) add a dev-only fixture mode to `/api/chat` that answers with a canned reply and a booking card (new code, a bigger spec).
- **Announcement (hit 5):** move the logic into `useChatBot` (recommended: the hook knows when a stream ends) or keep it in `ChatWidget` with the render-time pattern.
- **Order:** run this spec now on top of `cloudflare-migration`, or after 001 is merged and verified on Cloudflare.

## Log
| Date | Slice | Result | Notes / files |
| --- | --- | --- | --- |
