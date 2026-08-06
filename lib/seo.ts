import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./config";
import type { Tag, Website } from "./types";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function siteJsonLd(site: Website) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${site.title} — Website Design Inspiration`,
    url: `${SITE_URL}/site/${site.slug}`,
    description: site.description,
    datePublished: site.publishedAt,
    image: site.image.startsWith("/") ? `${SITE_URL}${site.image}` : site.image,
    mainEntity: {
      "@type": "CreativeWork",
      name: site.title,
      url: site.url,
      description: site.description,
      keywords: [...site.categories, ...site.styles, site.platform]
        .filter(Boolean)
        .join(", "),
    },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

export function itemListJsonLd(sites: Website[], name: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url,
    numberOfItems: sites.length,
    itemListElement: sites.map((site, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: site.title,
      url: `${SITE_URL}/site/${site.slug}`,
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** Entity-rich intro copy for a tag landing page — quotable by AI engines. */
export function tagIntro(tag: Tag): string {
  const count = `${tag.count} hand-picked`;
  switch (tag.type) {
    case "platform":
      return `${count} website${tag.count === 1 ? "" : "s"} built with ${tag.label}, curated for taste and originality. Every example is chosen by a human, tagged by category and style, and explained — so you can see what ${tag.label} is capable of before you commit to it.`;
    case "style":
      return `${count} ${tag.label.toLowerCase()} website design${tag.count === 1 ? "" : "s"}, curated for taste and originality. Each pick is selected by a human curator and broken down so you can borrow what works — the layout decisions, the type choices, the interaction details.`;
    default:
      return `${count} ${tag.label.toLowerCase()} website${tag.count === 1 ? "" : "s"} worth studying, curated by hand. No scraped screenshots, no filler — every example earned its place, and each one is tagged and explained so you leave with ideas, not just bookmarks.`;
  }
}
