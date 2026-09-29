import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F9F9F9",
        grey_100: "#F3F4F6",
        grey_300: "#D1D1D1",
        grey_400: "#6E6E6E",
        grey_500: "#454545",
        white: "#FFFFFF",
        black_900: "#171717",
        black: "#000000",
        green_600: "#9BEF2D",
        green_500: "#B8FF5B",
        error_300: "#FCA5A5",
        error_400: "#F87171",
        error_500: "#EF4444",
        error_700: "#B91C1C",
        error_900: "#7F1D1D",
      },
      fontFamily: {
        space_grotesk: "var(--font-space-grotesk), sans-serif",
        // technology: "var(--font-technology), sans-serif",
        advancedPixel: "var(--font-advanced-pixel-lcd), sans-serif",
      },
      fontSize: {
        display: [
          "clamp(3rem, 7vw, 7rem)",
          { lineHeight: "1", fontWeight: "700" },
        ],
        headline: [
          "clamp(2.25rem, 6vw, 3.75rem)",
          { lineHeight: "1", fontWeight: "700" },
        ],
        title: [
          "1.875rem",
          { lineHeight: "50px", fontWeight: "700" },
        ],
        "page-title": [
          "clamp(2rem, 5vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "500" },
        ],
        "section-title": [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        label: [
          "0.625rem",
          { lineHeight: "1.2", letterSpacing: "0.06em", fontWeight: "500" },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
