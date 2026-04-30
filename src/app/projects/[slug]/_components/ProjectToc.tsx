import { TOC_ITEMS } from "./useScrollTracker";

const BASE =
  "font-mono text-[11px] uppercase tracking-[0.06em] no-underline block whitespace-nowrap transition-colors duration-200 py-2 pl-3.5 border-l max-[900px]:border-l-0 max-[900px]:border-b max-[900px]:py-1.5 max-[900px]:px-2";

export function ProjectToc({ activeSection }: { activeSection: string }) {
  return (
    <nav className="sticky top-24 self-start flex flex-col gap-0.5 max-[900px]:static max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:gap-1">
      {TOC_ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={
            activeSection === id
              ? `${BASE} text-textDark border-black_900`
              : `${BASE} text-textGrey border-grey_300 hover:text-textDark`
          }
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
