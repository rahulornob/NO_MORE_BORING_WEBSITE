import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://nomoreboringwebsites.com"),
  title: {
    default: "No More Boring Websites",
    template: "%s | No More Boring Websites",
  },
  description:
    "An extremely curated website inspiration gallery for designers who care about taste, motion, and modern web craft.",
  openGraph: {
    title: "No More Boring Websites",
    description:
      "No generic templates. No filler. Only websites worth studying.",
    url: "https://nomoreboringwebsites.com",
    siteName: "No More Boring Websites",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "No More Boring Websites",
    description:
      "The most curated website inspiration feed for designers who care about taste.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
