import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/config";
import { getSiteBySlug } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Website design inspiration";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);

  const title = site?.title ?? "Website design inspiration";
  const meta = site
    ? [site.platform, ...site.categories.slice(0, 2)].filter(Boolean).join(" · ")
    : "";

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
          backgroundColor: "#141412",
          color: "#FAFAF7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#B6B6AE",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {meta && (
            <div style={{ display: "flex", fontSize: 28, color: "#B6B6AE" }}>
              {meta}
            </div>
          )}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#71716A" }}>
          Why it&apos;s not boring → the curator&apos;s note is on the page
        </div>
      </div>
    ),
    size
  );
}
