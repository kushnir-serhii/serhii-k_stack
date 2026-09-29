# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospective clients evaluating Serhii Kushnir for freelance or contract development work: founders and small businesses that need a website, MVP, mobile app, backend/integration work, an AI assistant, or help rescuing/speeding up an existing product. They land on the site to judge his skills and fit, browse projects and services, and either chat with the AI assistant ("Sonia") or book an intro call.

## Product Purpose

A personal portfolio and lead-generation site for Serhii Kushnir, a full-stack + mobile developer based near Poznań, Poland, working solo or in a small duo with a designer. Its job is to demonstrate credibility (project case studies, service breadth) and convert visitor interest into a booked call or a captured lead, via an AI chat assistant and an integrated Google Calendar booking flow. Success is a qualified lead: a booked call or a saved contact detail.

## Positioning

Not an agency — a single senior full-stack/mobile developer who takes on both product work and one-off builds, pairs with an experienced UI/UX designer when a project needs design from scratch, and offers fixed-price, hourly/contract, or ongoing support engagement models. Differentiator: an on-site AI assistant (trained on his own project/services/contact content) that answers visitor questions 24/7, qualifies leads, and books meetings directly into his calendar — in whichever language the visitor uses.

## Operating Context

- Routes: home (hero, services, projects), `/projects`, `/projects/[slug]` (case studies), `/services`, plus `/api/chat` and `/api/booking`.
- AI chat widget ("Sonia"): streaming OpenAI-backed assistant with a knowledge base built from the projects/services/contacts content. Can navigate a visitor to a project case study (`open_project`), capture a lead to Telegram (`save_lead`), and offer calendar slots (`show_booking_slots`) via an interactive booking card.
- Booking flow: visitor picks a slot in the chat's booking card; the booking itself posts directly to `/api/booking`, which re-validates hours/buffers/notice/daily cap against Google Calendar. Falls back to lead capture if Google OAuth isn't configured.
- Engagement models offered: fixed-price project, hourly/contract, and support & maintenance.
- Standard sales funnel steps shown on `/services`: intro call → plan & estimate → design & build (weekly demos) → launch & support.
- Working languages: English, Ukrainian, Russian — the assistant and site copy match whichever language the visitor uses.

## Capabilities and Constraints

- Stack shown to visitors: React, Next.js, TypeScript, Node.js, React Native/Expo, Supabase, Strapi, Sanity, Tailwind CSS, some AWS; also mentions OpenAI/Claude, Telegram Bot API, PostgreSQL, Express, Socket.io, n8n/Make, Webflow/Framer depending on service.
- Services offered: websites & web apps, mobile apps (iOS/Android via React Native), backend & integrations, AI assistants & chatbots, AI automation, SEO & visibility, speed & code improvement (legacy rescue), no-code/low-code MVPs.
- Chat assistant guardrails: speaks as Serhii's assistant in third person, never impersonates Serhii; rate-limited (12 requests/min/IP, 25 user messages/session).
- Booking flow constraint: availability, buffers, notice period and daily cap are enforced server-side against the real calendar, not just the UI.

## Brand Commitments

- Name/handle: Serhii Kushnir, rendered in code as `<SerhiiKushnir />` (short form `<SK>`); site metadata title "Full Stack Dev Serhii Kushnir".
- AI assistant name: "Sonia" — friendly, concise, concrete tone (2–4 sentences per answer unless more detail is asked for).
- Contact channels: email `serhiy.kushnir.dev@gmail.com`, Telegram `@SerhiyKushnir`, LinkedIn `/in/serhiikushnir/`, GitHub `github.com/kushnir-serhii`.
- Nav surfaces: Projects, Services, GitHub, CV download, Contacts.

## Evidence on Hand

No client testimonials, case studies, press mentions, or performance benchmarks exist yet — confirmed with the user. Future work must not fabricate these; the only real evidence on hand is the project case studies already in the codebase (e.g. CloudBitPay, Catoshi, Beans, Calmisu, Reel Reveal, Meme Academy, Apeing AI, Betski, Nuance) and the services/process/engagement copy described above.

## Product Principles

- Credibility over volume: the site should read as one skilled developer with real project depth, not an agency pretending to be bigger than it is.
- Every path should lead to a lead: browsing services or projects should make booking a call or leaving contact info the obvious next step.
- The assistant is a funnel, not a gimmick: "Sonia" exists to answer real questions, qualify fit, and book/capture leads — not to feel like a chatbot for its own sake.
- Multilingual by default: English, Ukrainian, and Russian visitors should get an equally fluent experience, not an English-first site with translation bolted on.
- Don't invent proof: without real testimonials or case-study metrics, credibility must come from the work itself (project detail, process clarity, technical specificity), never fabricated social proof.

## Accessibility & Inclusion

Follow general web accessibility best practices (WCAG 2.1 AA as the working baseline) — no additional product-specific user need beyond that was identified. Current implementation has some `aria-label`/`aria-labelledby` coverage on nav, logo, and CTA links, but lacks skip-links, documented focus states, and live-region announcements for the streaming chat widget; these are gaps to close in a dedicated accessibility pass, not requirements invented here.
