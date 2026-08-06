import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;

export default function OpengraphImage() {
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
          backgroundColor: "#FAFAF7",
          color: "#141412",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#71716A" }}>
          Hand-curated web design gallery · Curated by humans
        </div>
      </div>
    ),
    size
  );
}
