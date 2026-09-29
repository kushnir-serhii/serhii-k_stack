"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Matches the source JSON's w/h so the reserved box has the right aspect
// ratio and there's no layout shift once the animation loads in.
const ANIMATION_ASPECT_RATIO = "538 / 234";
const ANIMATION_SRC = "/animation/github2.json";

export const GitAnime = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetch(ANIMATION_SRC)
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled) setAnimationData(data);
        })
        .catch(() => {});
    };

    // Defer the fetch off the main thread until the browser is idle, so the
    // decorative animation never competes with the initial render.
    const idleId =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback(load)
        : window.setTimeout(load, 200);

    return () => {
      cancelled = true;
      if (typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  return (
    <div className="w-full" style={{ aspectRatio: ANIMATION_ASPECT_RATIO }}>
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={!prefersReducedMotion}
          width={"100px"}
          height={"100px"}
          onDOMLoaded={() => {
            // Reduced motion: skip the entrance and hold the final frame instead
            // of not rendering anything.
            if (prefersReducedMotion) {
              const duration = lottieRef.current?.getDuration(true) ?? 0;
              lottieRef.current?.goToAndStop(Math.max(duration - 1, 0), true);
            }
          }}
        />
      )}
    </div>
  );
};
