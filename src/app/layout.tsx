import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { MotionProvider } from "@/components/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/siteUrl";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  KEYWORDS,
  OG_IMAGE,
  PERSON_NAME,
  SITE_NAME,
  siteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500",  "600", "700"],
});

const advanced_pixel_lcd = localFont({
  src: [
    {
      path: "../../public/fonts/advanced_pixel/advanced_pixel_lcd-7.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-advanced-pixel-lcd",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s · ${PERSON_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
    icon: { url: "/icons/favicon.svg", type: "image/svg+xml" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F9F9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${advanced_pixel_lcd.variable} ${spaceGrotesk.variable} antialiased`}>
        <JsonLd data={siteJsonLd()} />
        <MotionProvider>
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </MotionProvider>
      </body>
    </html>
  );
}
