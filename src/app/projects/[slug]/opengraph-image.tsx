import { ImageResponse } from "next/og";
import { PROJECTS } from "@/content";

/**
 * Branded 1200x630 share card per case study. Social networks render PNG
 * reliably (WebP screenshots are not supported everywhere), and the card
 * keeps the title readable in link previews.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study by Serhii Kushnir";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  const title = project?.subtitle ?? project?.title ?? "Case study";
  const stack = project?.techStack.split(",").slice(0, 5).map((s) => s.trim()) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F9F9F9",
          color: "#171717",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: "#B8FF5B", border: "2px solid #171717" }} />
          <span>Case study · {project?.year}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            {title}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {stack.map((s) => (
              <span
                key={s}
                style={{ fontSize: 24, padding: "8px 18px", border: "2px solid #6E6E6E", borderRadius: 999, color: "#6E6E6E" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30 }}>
          <span style={{ fontWeight: 700 }}>{"<SerhiiKushnir />"}</span>
          <span style={{ background: "#B8FF5B", padding: "10px 22px", borderRadius: 999 }}>
            Full-stack & mobile developer
          </span>
        </div>
      </div>
    ),
    size
  );
}
