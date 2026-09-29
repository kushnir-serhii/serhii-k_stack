"use client";

import { useReducedMotion } from "motion/react";

/**
 * Thin, named wrapper around motion/react's `useReducedMotion` so call sites
 * outside the `motion/react` animation system (Lottie players, imperative
 * scrollTo calls) read the same OS `prefers-reduced-motion` signal that
 * `MotionConfig` already applies to `motion.*` components. SSR-safe: motion
 * returns `null` until the media query can be read on the client, which is
 * falsy and defaults to full motion.
 */
export function usePrefersReducedMotion(): boolean {
  return Boolean(useReducedMotion());
}
