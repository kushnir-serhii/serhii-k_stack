"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { animationSection } from "@/variables";

export interface ServiceRowProps {
  index: number;
  slug: string;
  iconId: string;
  service: string;
  details: string;
  deliverables: string[];
  stack: string[];
  related: { slug: string; label: string }[];
}

export function ServiceRow({
  index,
  slug,
  iconId,
  service,
  details,
  deliverables,
  stack,
  related,
}: ServiceRowProps) {
  return (
    <motion.article
      {...animationSection}
      id={slug}
      className="grid scroll-mt-24 grid-cols-1 gap-8 border-b border-grey_300 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
    >
      <div className="flex flex-col gap-5">
        <span className="font-mono text-xs tracking-[0.06em] text-textGrey">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex size-12 items-center justify-center rounded-lg bg-accentGreen">
          <Icon id={iconId} width={26} height={26} className="text-textDark" />
        </div>
        <h2 className="!text-[clamp(24px,3vw,36px)] !normal-case font-medium leading-[1.1] tracking-[-0.02em] text-textDark">
          {service}
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-[18px] leading-[1.55] text-textGrey">{details}</p>

        <ul className="flex flex-col gap-3">
          {deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-textDark">
              <span
                aria-hidden="true"
                className="mt-[9px] size-2 shrink-0 rounded-full bg-accentGreen ring-1 ring-green_600"
              />
              {d}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {stack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-grey_300 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-textGrey"
            >
              {t}
            </li>
          ))}
        </ul>

        {related.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-textGrey">
              Related work
            </span>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/projects/${r.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-textDark underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-green_600"
              >
                {r.label}
                <Icon
                  id="icon-arrow-up-right"
                  width={12}
                  height={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
