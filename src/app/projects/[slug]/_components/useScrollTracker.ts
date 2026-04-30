"use client";

import { useEffect, useRef, useState } from "react";

export const TOC_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "stack", label: "Stack" },
  { id: "outcomes", label: "Outcomes" },
  { id: "build", label: "Build" },
  { id: "gallery", label: "Gallery" },
];

const TOC_IDS = TOC_ITEMS.map((t) => t.id);

export function useScrollTracker() {
  const [activeSection, setActiveSection] = useState("overview");
  const [scrollWidth, setScrollWidth] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const progress =
        (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
      setScrollWidth(Math.min(progress, 100));

      for (const id of [...TOC_IDS].reverse()) {
        const el = sectionRefs.current[id];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return { activeSection, scrollWidth, setRef };
}
