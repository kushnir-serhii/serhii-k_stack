import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { MotionProvider } from "@/components/MotionProvider";
import { SITE_URL } from "@/lib/siteUrl";
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
  title: "Full Stack Dev Serhii Kushnir",
  description:
    "Hi, I'm a full-stack developer with an engineering background, specializing in scalable and efficient solutions for both team and individual projects.",
  icons: {
    icon: { url: "/icons/favicon.svg", type: "image/svg+xml" },
  },
  openGraph: {
    title: "Full Stack Dev Serhii Kushnir",
    description:
      "Hi, I'm a full-stack developer with an engineering background, specializing in scalable and efficient solutions for both team and individual projects.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/full_stack_dev_serhii_kushnir.png",
        width: 1200,
        height: 630,
        alt: "Full Stack Dev Serhii Kushnir",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${advanced_pixel_lcd.variable} ${spaceGrotesk.variable} antialiased`}>
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
