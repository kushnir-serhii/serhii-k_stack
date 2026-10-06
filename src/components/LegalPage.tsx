import { contacts } from "@/content";
import type { LegalDocument } from "@/content/legal/legal";
import { ProjectBreadcrumb } from "@/app/projects/[slug]/_components/ProjectBreadcrumb";

const email = contacts.find((c) => c.service === "Email");

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <main className="animate-page-in">
      <div className="container mx-auto max-w-[1200px] px-4 pb-24">
        <ProjectBreadcrumb title={doc.title} parent={{ label: "Home", href: "/" }} />

        <article className="max-w-[720px]">
          <header className="border-b border-grey_300 pb-10">
            <h1 className="mb-4 text-page-title text-black_900">{doc.title}</h1>
            <p className="font-mono text-xs uppercase tracking-[0.04em] text-grey_400">
              Last updated {doc.updated}
            </p>
            <p className="mt-6 text-lg leading-[1.55] text-grey_400">{doc.intro}</p>
          </header>

          {doc.sections.map((s) => (
            <section
              key={s.id}
              aria-labelledby={s.id}
              className="flex flex-col gap-4 border-b border-grey_300 py-10"
            >
              <h2 id={s.id} className="text-2xl font-bold normal-case text-black_900">
                {s.title}
              </h2>
              {s.items && (
                <ul className="flex flex-col gap-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-[1.6] text-grey_400">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-green_500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.paragraphs?.map((p) => (
                <p key={p} className="leading-[1.6] text-grey_400">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {email && (
            <section aria-labelledby="contact" className="flex flex-col gap-4 py-10">
              <h2 id="contact" className="text-2xl font-bold normal-case text-black_900">
                Contact
              </h2>
              <p className="leading-[1.6] text-grey_400">
                Questions or requests about this page:{" "}
                <a
                  href={email.url}
                  className="rounded-sm text-black_900 underline underline-offset-4 focus-ring"
                >
                  {email.text}
                </a>
              </p>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
