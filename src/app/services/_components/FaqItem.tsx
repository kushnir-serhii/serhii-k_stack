"use client";

import { useId, useState } from "react";

export interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-grey_300">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-medium text-black_900 focus-ring"
        >
          {question}
          <span
            aria-hidden="true"
            className={`relative size-5 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:-translate-y-1/2 before:bg-black_900 before:content-[''] after:absolute after:left-1/2 after:top-0 after:h-full after:w-0.5 after:-translate-x-1/2 after:bg-black_900 after:transition-transform after:duration-300 after:content-[''] ${
              open ? "after:scale-y-0" : ""
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[680px] pb-6 text-grey_400">{answer}</p>
        </div>
      </div>
    </div>
  );
}
