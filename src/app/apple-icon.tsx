import { ImageResponse } from "next/og";

/** PNG home-screen icon (iOS ignores SVG), drawn from the favicon's <> mark. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#B8FF5B",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 24 24">
          <path
            d="M10.3655 15.8649L3.18351 13.4367V10.7691L10.3655 8.34089V10.3929L5.26971 11.949V12.2568L10.3655 13.8129V15.8649ZM13.7875 15.8649V13.8129L18.8833 12.2568V11.949L13.7875 10.3929V8.34089L20.9695 10.7691V13.4367L13.7875 15.8649Z"
            fill="#171717"
          />
        </svg>
      </div>
    ),
    size
  );
}
