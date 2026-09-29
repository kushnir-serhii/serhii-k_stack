import type { Metadata } from "next";
import {
  PROJECTS,
  services,
  workProcess,
  engagementModels,
  servicesFaq,
} from "@/content";
import { ContactCta } from "@/components/ContactCta";
import { ProjectBreadcrumb } from "../projects/[slug]/_components/ProjectBreadcrumb";
import { ServiceRow } from "./_components/ServiceRow";

export const metadata: Metadata = {
  title: "Services — Serhii Kushnir",
  description:
    "Websites, mobile apps, AI assistants and automation for businesses and founders — from idea to release. Clear scope, fixed price or hourly, free intro call.",
};

const CHIP =
  "inline-flex items-center rounded-full border border-grey_300 px-3 py-1.5 font-mono text-label uppercase text-grey_400 transition-colors hover:border-black_900 hover:text-black_900 focus-ring";

export default function ServicesPage() {
  return (
    <main className="animate-page-in">
      <div className="container mx-auto max-w-[1200px] px-4 pb-24">
        <ProjectBreadcrumb
          title="Services"
          parent={{ label: "Home", href: "/" }}
        />

        <div className="border-b border-grey_300 pb-12">
          <h1 className="mb-4 text-page-title text-black_900">
            Services
          </h1>
          <p className="mt-4 max-w-[640px] text-lg leading-[1.55] text-grey_400">
            I help businesses and founders launch websites, mobile apps and AI
            tools — from idea to release. Working solo or together with an
            experienced designer.
          </p>
          <nav aria-label="Services" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className={CHIP}>
                    {s.service}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          {services.map((s, i) => {
            const related = (s.relatedProjects ?? [])
              .map((slug) => PROJECTS.find((p) => p.slug === slug))
              .filter((p): p is (typeof PROJECTS)[number] => Boolean(p))
              .map((p) => ({ slug: p.slug, label: p.subtitle ?? p.title }));
            return (
              <ServiceRow
                key={s.slug}
                index={i}
                slug={s.slug}
                iconId={s.iconId}
                service={s.service}
                details={s.details}
                deliverables={s.deliverables}
                stack={s.stack}
                related={related}
              />
            );
          })}
        </div>

        <section aria-labelledby="process-title" className="py-16">
          <h2
            id="process-title"
            className="mb-10 text-section-title text-black_900"
          >
            How I work
          </h2>
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {workProcess.map((w) => (
              <li key={w.step} className="flex flex-col gap-3 border-t border-grey_300 pt-5">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-green_500" />
                  <span className="font-mono text-4xl leading-none text-black_900">
                    {w.step}
                  </span>
                </span>
                <h3 className="text-lg font-bold text-black_900">{w.title}</h3>
                <p className="text-grey_400">{w.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="models-title" className="pb-16">
          <h2
            id="models-title"
            className="mb-10 text-section-title text-black_900"
          >
            Ways to work together
          </h2>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {engagementModels.map((m) => (
              <li
                key={m.title}
                className="flex flex-col gap-4 rounded-[20px] bg-white p-6"
              >
                <h3 className="text-lg font-bold text-black_900">{m.title}</h3>
                <p className="text-grey_400">{m.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-title" className="pb-16">
          <h2
            id="faq-title"
            className="mb-10 text-section-title text-black_900"
          >
            FAQ
          </h2>
          <div className="max-w-[820px] border-t border-grey_300">
            {servicesFaq.map((f) => (
              <details
                key={f.q}
                className="group border-b border-grey_300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium text-black_900 focus-ring">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="relative size-5 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:-translate-y-1/2 before:bg-black_900 before:content-[''] after:absolute after:left-1/2 after:top-0 after:h-full after:w-0.5 after:-translate-x-1/2 after:bg-black_900 after:transition-transform after:duration-200 after:content-[''] group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-[680px] pb-6 text-grey_400">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <ContactCta id="contact" />
      </div>
    </main>
  );
}
