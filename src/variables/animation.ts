// The hero h1 is the LCP candidate, so it must be visible at first paint —
// this animates the entrance offset only, never opacity.
export const animationHeroTitle = {
  initial: { y: 40 },
  animate: { y: 0 },
  transition: { duration: 1, ease: "easeInOut" },
  viewport: { once: true },
};

export const animationHeroComponent = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeInOut", delay: 0.5 },
  viewport: { once: true },
};
export const animationTitleSection = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeInOut", delay: 0.3 },
  viewport: { once: true },
};


export const animationProjectImage = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
  viewport: { once: true },
};

export const animationSection = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
  viewport: { once: true },
};