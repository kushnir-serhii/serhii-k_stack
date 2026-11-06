import type { Metadata } from "next";
import { contacts } from "@/content/contacts/contacts";
import { services } from "@/content/services/services";
import { githubUrl } from "@/constants/navLinks";
import { SITE_URL } from "@/lib/siteUrl";

/**
 * Single source of truth for SEO. Everything here is derived from, or kept
 * consistent with, the content modules — never invent claims (reviews,
 * ratings, metrics) that don't exist on the page.
 */
export const SITE_NAME = "Serhii Kushnir — Full-Stack & Mobile Developer";
export const PERSON_NAME = "Serhii Kushnir";
export const DEFAULT_TITLE = "Serhii Kushnir — Freelance Full-Stack & Mobile Developer";
export const DEFAULT_DESCRIPTION =
  "Freelance full-stack and mobile developer near Poznań, Poland. I build websites, web apps, iOS/Android apps, AI assistants and integrations with React, Next.js, Node.js and React Native — remote, in English, Ukrainian or Russian.";
export const OG_IMAGE = {
  url: "/images/full_stack_dev_serhii_kushnir.png",
  width: 1440,
  height: 752,
  alt: "Serhii Kushnir — full-stack developer",
};

export const KEYWORDS = [
  "Serhii Kushnir",
  "freelance full-stack developer",
  "React Native developer",
  "Next.js developer",
  "React developer",
  "Node.js developer",
  "mobile app developer",
  "AI chatbot developer",
  "MVP development",
  "web developer Poland",
  "web developer Poznań",
  "remote developer for hire",
];

const email = contacts.find((c) => c.service === "Email")?.text;
const sameAs = [
  githubUrl,
  ...contacts.filter((c) => c.url.startsWith("http")).map((c) => c.url),
];

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * Per-page metadata with canonical + matching OG/Twitter fields.
 * Child pages set only what differs; the root layout provides the rest.
 */
export function pageMetadata({
  title,
  description,
  path,
  images = [OG_IMAGE],
}: {
  title: string;
  description: string;
  path: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      // Child openGraph replaces the parent's wholesale, so repeat the image.
      // File-based opengraph-image.tsx routes still take priority over this.
      images,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Site-wide entity graph: who Serhii is, the site, and the service business. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PERSON_NAME,
        url: SITE_URL,
        image: absoluteUrl(OG_IMAGE.url),
        jobTitle: "Full-Stack & Mobile Developer",
        description: DEFAULT_DESCRIPTION,
        ...(email ? { email: `mailto:${email}` } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Poznań",
          addressCountry: "PL",
        },
        knowsLanguage: ["en", "uk", "ru"],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "React Native",
          "Expo",
          "Supabase",
          "PostgreSQL",
          "Tailwind CSS",
          "AI assistants",
          "Technical SEO",
        ],
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        url: SITE_URL,
        image: absoluteUrl(OG_IMAGE.url),
        description: DEFAULT_DESCRIPTION,
        founder: { "@id": PERSON_ID },
        ...(email ? { email } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Poznań",
          addressCountry: "PL",
        },
        areaServed: "Worldwide",
        availableLanguage: ["English", "Ukrainian", "Russian"],
        knowsLanguage: ["en", "uk", "ru"],
        sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Development services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.service.trim(),
              description: s.description,
              url: absoluteUrl(`/services#${s.slug}`),
            },
          })),
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const refs = { PERSON_ID, WEBSITE_ID, BUSINESS_ID };
