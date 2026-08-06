export const SITE_NAME = "No More Boring Websites";

export const SITE_TAGLINE =
  "Website inspiration for designers who refuse to ship boring.";

export const SITE_DESCRIPTION =
  "No More Boring Websites is a hand-curated gallery of exceptional web design — minimal portfolios, bold ecommerce, SaaS landing pages and experimental interfaces. Every pick is chosen, tagged and explained by a human curator.";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

/** Gallery items per page on public pages. */
export const PAGE_SIZE = 24;

/** Library rows per page in the admin panel. */
export const ADMIN_PAGE_SIZE = 50;

/** How often cached content is refreshed from the data source (seconds). */
export const REVALIDATE_SECONDS = 300;
