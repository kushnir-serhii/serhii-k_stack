"use client";

import { contacts } from "@/content";
import { openChat } from "@/lib/openChat";
import { Icon } from "./ui/Icon";

export const ContactCta: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <section
      id={id}
      aria-labelledby="contact-cta-title"
      className="scroll-mt-24 rounded-[20px] bg-bgProject p-6 text-textLight md:p-12"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="flex max-w-[560px] flex-col gap-3">
          <h2
            id="contact-cta-title"
            className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.05] tracking-[-0.02em] text-textLight"
          >
            Have a project in mind?
          </h2>
          <p className="text-grey_300">
            Tell me about it — I reply within 24 hours.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openChat("Book a call with Serhii")}
              className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-accentGreen px-6 font-medium text-textDark transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-accentGreen focus-visible:ring-offset-2 focus-visible:ring-offset-bgProject"
            >
              Book a free call
            </button>
            <button
              type="button"
              onClick={() => openChat()}
              className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full border border-grey_400 px-6 font-medium text-textLight transition-colors hover:border-accentGreen hover:text-accentGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-accentGreen focus-visible:ring-offset-2 focus-visible:ring-offset-bgProject"
            >
              Ask my AI assistant
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-5 sm:flex-row sm:flex-wrap lg:shrink-0 lg:flex-col lg:items-start">
          {contacts.map((c) => {
            const isMail = c.url.startsWith("mailto:");
            return (
              <li key={c.service} className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-grey_400">
                  {c.service}
                </span>
                <a
                  href={c.url}
                  {...(!isMail && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  aria-label={`${c.service}: ${c.text}`}
                  className="group inline-flex items-center gap-2 font-bold [overflow-wrap:anywhere] text-textLight transition-colors hover:text-accentGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-accentGreen"
                >
                  {c.text}
                  <Icon
                    id="icon-arrow-up-right"
                    width={12}
                    height={12}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
