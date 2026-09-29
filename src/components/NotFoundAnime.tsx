"use client";

import { useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import notFound from "../../public/animation/notFound.json";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export const NotFoundAnime: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={notFound}
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
  );
};
