---
name: Serhii Kushnir — Full Stack Dev Portfolio
description: A developer's own terminal, dressed for clients — lime signal on black consoles, set inside a calm off-white page.
colors:
  green_500: "#B8FF5B" # signal lime accent
  green_600: "#9BEF2D" # signal lime, deepened (hover/active)
  bg: "#F9F9F9" # paper
  black: "#000000" # void
  black_900: "#171717" # console surface
  grey_500: "#454545" # steel 500
  grey_400: "#6E6E6E" # steel 400
  grey_300: "#D1D1D1" # steel 300
  grey_100: "#F3F4F6" # digital clock's ghost "88" digit placeholders
  white: "#FFFFFF"
  error_300: "#FCA5A5" # error state — hover text on dark surfaces
  error_400: "#F87171" # error state — helper/ring text
  error_500: "#EF4444" # error state — focus ring
  error_700: "#B91C1C" # error state — resting ring
  error_900: "#7F1D1D" # error state — ring on dark surfaces
typography:
  display:
    fontFamily: "var(--font-space-grotesk), sans-serif"
    fontSize: "clamp(3rem, 7vw, 7rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "var(--font-space-grotesk), sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  title:
    fontFamily: "var(--font-space-grotesk), sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: "50px"
    letterSpacing: "normal"
  body:
    fontFamily: "var(--font-space-grotesk), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  signature:
    fontFamily: "var(--font-advanced-pixel-lcd), sans-serif"
    fontSize: "clamp(1rem, 6vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  chip: "8px"
  input: "12px"
  card: "16px"
  panel: "20px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "100px"
components:
  button-primary:
    backgroundColor: "{colors.green_500}"
    textColor: "{colors.black_900}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.green_600}"
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "52px"
  button-secondary-dark-hover:
    textColor: "{colors.green_500}"
  input-field:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    height: "44px"
    padding: "0 16px"
  chat-bubble-user:
    backgroundColor: "{colors.green_500}"
    textColor: "{colors.black}"
    rounded: "{rounded.card}"
    padding: "10px 16px"
  chat-bubble-assistant:
    backgroundColor: "{colors.black_900}"
    textColor: "{colors.grey_300}"
    rounded: "{rounded.card}"
    padding: "10px 16px"
  card-service:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: Serhii Kushnir — Full Stack Dev Portfolio

## Overview

**Creative North Star: "The Terminal Signal"**

This is a developer's own workbench, made presentable to clients: an off-white page (`bg`) that behaves like paper, interrupted by black console panels (`black_900`) — the project showcase, the contact CTA, the chat sheet — where a single lime signal color (`green_500`) does all the talking. The lime isn't decoration; it reads like a terminal cursor or a status LED, precise and technical rather than playful. It shows up sparingly — one button, one active state, one accent chip — and its rarity is what makes it register as "live."

Type carries the same logic. Space Grotesk, a geometric sans, is the one voice for everything a visitor reads: headlines, body copy, labels, buttons. A second, pixel-LCD monospace font is held in reserve as a signature — it only appears on the digital clock's numerals and the chat assistant's name ("Sonia"), like a device display glimpsed through the interface, never used for real content. Monospace labels (breadcrumbs, service index numbers, tech-stack chips) supply the "console" texture without needing a second typeface.

Surfaces are flat by default — no drop shadows, no gradients-as-depth, no glassmorphism beyond the header's backdrop blur. Depth comes from color contrast (`bg` vs. `black_900` vs. `black`) and from generous rounding: pill buttons, 16–20px card radii, circular avatars. The rounding is deliberate softness laid over an otherwise technical, grid-and-monospace base — approachable despite the terminal framing. The one place a shadow is allowed to exist is as a hover response on the service cards, never at rest.

**Key Characteristics:**
- One accent color (lime), used sparingly against black consoles and an off-white page — never a second or third hue.
- Space Grotesk for everything read; the pixel-LCD font is a rare signature, confined to the clock and the bot's name.
- Flat at rest everywhere; the sole shadow appears only as a hover response on service cards.
- Pill buttons and 16–20px card radii soften an otherwise monospace/technical, grid-driven structure.
- Dark console panels (project showcase, contact CTA, chat sheet) interrupt an otherwise light, paper-toned page.

## Colors

Two backgrounds and one signal color: an off-white page, black console panels, and lime lighting up the one thing that matters on each screen.

### Primary
- **`green_500`** (`#B8FF5B`, the signal lime accent): the one accent. CTAs (`Book a free call`, chat send/launch button, selected day/time chips, active nav-menu items), focus rings across the whole site, and the chat bot's avatar fill. Deepens to **`green_600`** (`#9BEF2D`, the signal lime deep) on hover/active for filled buttons and the scrollbar thumb.

### Neutral
- **`bg`** (`#F9F9F9`, the paper tone): the default page background — the "light" register of the site (home, services, project list, headers on light sections).
- **`black`** (`#000000`, the void): true black — footer background, chat composer input fields, digital-clock CET/Warsaw labels' contrast, favicon-level black.
- **`black_900`** (`#171717`, the console surface): the dark panel surface — project showcase background, contact CTA card, chat sheet body, chat bubble (assistant) background. Distinct from `black`: it's the "surface" black, `black` is the "abyss" black (void).
- **`grey_500`** (`#454545`, steel 500): borders and dividers on dark surfaces (chat panel rules, footer divider, ring around assistant chat bubbles).
- **`grey_400`** (`#6E6E6E`, steel 400): secondary/muted text on light surfaces, placeholder text, footer copyright line.
- **`grey_300`** (`#D1D1D1`, steel 300): body text on dark surfaces (footer nav links, chat assistant bubble text, contact-CTA supporting copy).
- **`white`** (`#FFFFFF`): headline text on console/void surfaces, primary text inside dark cards and the footer wordmark.

### Named Rules
**The One Signal Rule.** The `green_500` signal lime appears on at most one interactive element's resting state per view (one primary button, one active chip) — everything else is neutral until it's hovered, focused, or selected. It is a status indicator, not a brand wash.

## Typography

**Display / Body Font:** Space Grotesk (weights 300–700), with system sans-serif fallback.
**Signature Font:** Advanced Pixel LCD (local, weight 400) — reserved for the digital clock digits and the chat assistant's name.
**Label Font:** monospace (system stack) — breadcrumbs, index numbers, tech-stack tags.

**Character:** Space Grotesk's slightly geometric, faintly technical letterforms do all the reading work at every size, from 96px hero headlines down to 14px UI copy — confident without needing decoration. Monospace labels and the pixel-LCD signature are used exactly where a real device would show them: index counters, tags, and a clock face.

### Hierarchy
- **Display** (bold 700, `clamp(3rem, 7vw, 7rem)`, leading 1): hero name and footer wordmark; always uppercase.
- **Headline** (bold, `text-4xl` → `text-6xl` responsive, uppercase): default `h2` — section titles ("Services", "Let's connect").
- **Title** (bold, `text-3xl` → `text-4xl`, leading 50px): `h3` — project titles inside the dark showcase.
- **Body** (regular 400, 16–18px, leading 1.5): paragraph copy; body default is `text-lg` (18px), the reusable `p` reset is 16px.
- **Label** (medium 500, 10–12px, tracking `0.06em`, uppercase): breadcrumbs, service index numbers (`01`, `02`…), tech-stack chips, "Suggested questions" menu header.

### Named Rules
**The One Voice Rule.** Space Grotesk carries every heading, paragraph, button, and form field on the site. The pixel-LCD font never appears in a sentence — only as numerals (clock) or a proper name (the bot's identity in the chat header).

## Layout

Content sits inside a shared `.container`: `max-w-[1440px]`, full width, with responsive side padding (`px-4` mobile → `px-10` tablet → `px-20` desktop). Sections stack vertically with generous rhythm — `gap-10` between a section's title and its content is typical, and the dark project showcase gives each entry `py-12` (mobile) to `py-[100px]` (desktop) of breathing room. Grids collapse from 3 columns (services, desktop) to 2 (tablet) to 1 (mobile); the two-column contact/clock layout reverses to stack the clock below the text on small screens. The header is `sticky top-0` with a translucent blurred background so page content scrolls underneath it; the mobile nav opens as a full-width panel sliding down from behind the header rather than a drawer.

## Elevation & Depth

Flat by design, not by omission: there is no ambient shadow system anywhere in the base styles. Depth is conveyed by stacking three background tones (`bg` → `black_900` → `black`) and by rounding corners generously enough that surfaces read as distinct "objects" without needing a shadow to lift them. The single exception is interaction feedback: service cards gain `shadow-lg` and lift `-translate-y-1` only on hover, confirming that any shadow present is a response to state, never a resting property.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest everywhere. A shadow may appear only as a hover/focus response (service cards); it never describes a resting state, and no drop shadows, glassmorphism, or gradient-as-depth are used elsewhere (the header's `backdrop-blur` is translucency, not elevation).

## Shapes

Two registers, deployed deliberately: pill buttons (`rounded-full`) for every clickable CTA and chip toggle, and large soft-square radii (16–20px) for cards, panels, and images. Icon chips (service icons, bot avatar) sit in small `rounded-lg` (8px) squares/circles. Borders are hairline (`0.5–1px`) and low-contrast (`grey_500` on dark, `grey_300` on light) — used to separate zones (chat panel border, footer divider, service-row bottom rule) rather than to frame content. Nothing is sharp-cornered by default; the rounding is what keeps the otherwise technical, monospace-and-grid language feeling approachable.

## Components

### Buttons
- **Shape:** pill (`rounded-full`, `border-radius: 9999px`), fixed `52px` height, `min-width: 144px` for the shared `.buttonOrLink` utility; smaller inline actions (chat send, menu toggle) use `44px` circular icon buttons.
- **Primary:** `green_500` (signal lime) background, `black_900` (console) text, bold; hover deepens to `green_600` (signal lime deep, filled) or scales up slightly (`hover:scale-[1.03]`) for CTA buttons like "Book a free call".
- **Secondary (dark surfaces):** transparent background, `grey_500` border, white/`grey_300` text; hover swaps both border and text to `green_500`.
- **Ghost (light surfaces):** transparent background, `black_900` border; hover inverts to filled `black_900` background with light text ("All services").
- **Focus:** every interactive control gets a 2px `green_500` focus ring with offset — the accessibility system reuses the same signal color as the accent, so focus never looks like a separate design language. Implemented as three shared utilities: `.focus-ring` (light surfaces — a two-tone ring pairing a dark `black_900` ring with a lime `green_500/70` outline halo for contrast on `bg`), `.focus-ring-dark` (console surfaces — single-tone `green_500` ring on `black_900`), and `.focus-ring-black` (void surfaces — single-tone `green_500` ring on `black`).

### Cards / Containers
- **Service card** (light): white background, `20px` radius, `24px` padding, icon chip top-left, arrow icon top-right that translates on hover; flat at rest, `shadow-lg` + `-translate-y-1` on hover.
- **Console panels** (dark): `black_900` (`#171717`) background, `20px` radius on discrete cards (contact CTA), unrounded on the full-bleed project showcase; white/`grey_300` text throughout.
- **Chat bubbles:** `rounded-2xl` with one corner squared toward the speaker (`rounded-br-md` for the visitor, `rounded-bl-md` for the assistant) — `green_500` + `black_900` text for the visitor, `black_900` background + `grey_300` text with a hairline `grey_500` ring for the assistant.

### Inputs / Fields
- **Style:** `black` (`#000000`, the void) background, `rounded-full` for the chat composer, `rounded-xl` (12px) for booking form fields; 1px `grey_500` ring at rest.
- **Focus:** ring swaps to 2px `green_500`.
- **Error:** ring and helper text switch to `error_700`/`error_400`; never reuses `green_500` for error states.

### Navigation
- **Style:** Space Grotesk, regular weight, no underlines by default; the header is sticky with a `bg-bg/50 backdrop-blur-md` translucent scrim. Mobile nav opens as a full-width panel that slides down from behind the sticky header, with a blurred scrim over the page beneath it.

### Digital Clock (signature component)
A white rounded (`20px`) card is the one place the pixel-LCD signature font appears at scale: ghost "88" digit placeholders sit behind the live time in `grey_100`, with the live digits in `black_900` (console) text overlaid — a deliberate nod to a physical LCD display's dead segments. CET/Warsaw labels below render in `green_500` (signal lime), bold, large — the clock is themed as a piece of hardware, not a web widget.

## Do's and Don'ts

### Do:
- **Do** keep `green_500` signal lime (`#B8FF5B`) to one resting-state element per screen; use hover/active/selected states to let it appear more than once, never two simultaneous primary CTAs.
- **Do** build every new panel from the three-tone stack (`bg` `#F9F9F9` / `black_900` `#171717` / `black` `#000000`) rather than introducing a fourth background tone.
- **Do** default every new surface to flat; only add a shadow as a hover or focus response, and only on card-like elements that already lift (`-translate-y-1` pattern).
- **Do** use pill shape (`rounded-full`) for every button and chip; reserve `16–20px` radii for cards, panels, and images.
- **Do** keep the pixel-LCD font confined to numerals or the bot's proper name; every sentence of real content stays in Space Grotesk.

### Don't:
- **Don't** introduce a second or third accent hue — the palette is `green_500` as the one signal color plus neutrals, by design.
- **Don't** add drop shadows, glassmorphism, or gradients as a resting-state depth cue anywhere in the system.
- **Don't** set the pixel-LCD font as body or heading text; it reads as a display glitch outside the clock/bot-name context it was chosen for.
- **Don't** sharpen corners on buttons or cards to less than the established radii — sharp corners break the soft-geometry-on-technical-base read that holds the system together.
