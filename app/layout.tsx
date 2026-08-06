import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";
import { websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Hand-Curated Website Design Inspiration`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "website inspiration",
    "web design gallery",
    "design inspiration",
    "curated websites",
    "landing page examples",
    "portfolio inspiration",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Hand-Curated Website Design Inspiration`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <JsonLd data={websiteJsonLd()} />
        <SiteHeader />
        <main className="mx-auto w-full max-w-site flex-1 px-5">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
