"use client";

import { MotionConfig } from "motion/react";

/**
 * Applies the OS-level `prefers-reduced-motion` preference to every
 * `motion/react` animation on the site. With `reducedMotion="user"`, motion
 * drops transform-based movement (the y-translate entrances in
 * src/variables/animation.ts) but keeps opacity — content still fades in
 * gently instead of sliding, so the reveal still reads as intentional.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
