"use client";

import { useEffect, useState } from "react";
import { TOC_ITEMS } from "./tocItems";

const BASE =
  "font-mono text-label uppercase no-underline block whitespace-nowrap transition-colors duration-200 py-2 pl-3.5 border-l max-[900px]:border-l-0 max-[900px]:border-b max-[900px]:py-1.5 max-[900px]:px-2 rounded-sm focus-ring";

export function ProjectToc() {
  const [activeSection, setActiveSection] = useState(TOC_ITEMS[0]?.id ?? "");

  useEffect(() => {
    const ids = TOC_ITEMS.map((t) => t.id);
    let rafId: number | null = null;

    const updateActiveSection = () => {
      rafId = null;
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <nav className="sticky top-24 self-start flex flex-col gap-0.5 max-[900px]:static max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:gap-1">
      {TOC_ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={
            activeSection === id
              ? `${BASE} text-black_900 border-black_900`
              : `${BASE} text-grey_400 border-grey_300 hover:text-black_900`
          }
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
