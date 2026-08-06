import type { SiteStatus, SubmissionInput, Website } from "@/lib/types";
import { slugify } from "@/lib/slug";

/**
 * Demo content so the whole product works before a real data source is
 * connected. Everything here is fictional. Once NOTION_TOKEN and
 * NOTION_DATABASE_ID are set, this file is no longer used.
 */
const seed: Website[] = [
  {
    id: "mono-journal",
    slug: "mono-journal",
    title: "Mono Journal",
    url: "https://monojournal.example",
    description:
      "An editorial site stripped to its bones — one typeface, two colors, zero decoration. Reading feels like the only feature, because it is.",
    image: "/samples/mono-journal.svg",
    categories: ["Editorial"],
    styles: ["Minimal", "Monochrome"],
    platform: "Custom Code",
    featured: true,
    status: "published",
    publishedAt: "2026-08-03",
    curatorNote:
      "Proof that restraint is a flex. The entire identity is carried by type scale and spacing — no imagery above the fold, and it still feels rich. Steal the discipline, not the palette.",
  },
  {
    id: "aurora-grid",
    slug: "aurora-grid",
    title: "Aurora Grid",
    url: "https://auroragrid.example",
    description:
      "A SaaS analytics landing page where the product demo is a live, slowly-rotating 3D scene instead of the usual screenshot carousel.",
    image: "/samples/aurora-grid.svg",
    categories: ["SaaS"],
    styles: ["3D", "Dark Mode"],
    platform: "Framer",
    featured: true,
    status: "published",
    publishedAt: "2026-07-30",
    curatorNote:
      "3D used as evidence, not garnish — the scene is the actual dashboard, so the wow factor doubles as a product tour. Note how scroll speed stays normal; the motion never taxes the reader.",
  },
  {
    id: "field-and-form",
    slug: "field-and-form",
    title: "Field & Form",
    url: "https://fieldandform.example",
    description:
      "A homeware store that shops like a magazine: full-bleed photography, essays between product rows, and a checkout that stays out of the way.",
    image: "/samples/field-and-form.svg",
    categories: ["Ecommerce"],
    styles: ["Editorial", "Warm"],
    platform: "Shopify",
    featured: false,
    status: "published",
    publishedAt: "2026-07-27",
    curatorNote:
      "Ecommerce that trusts the product. Prices appear on hover only, which sounds risky but makes browsing feel like leafing through a lookbook instead of scanning a spreadsheet.",
  },
  {
    id: "studio-ochre",
    slug: "studio-ochre",
    title: "Studio Ochre",
    url: "https://studioochre.example",
    description:
      "A design agency portfolio with no about page, no services list — just eleven case studies and a phone number.",
    image: "/samples/studio-ochre.svg",
    categories: ["Agency", "Portfolio"],
    styles: ["Minimal"],
    platform: "Webflow",
    featured: true,
    status: "published",
    publishedAt: "2026-07-22",
    curatorNote:
      "The confidence move: let the work do all the talking. The single-column case study layout with sticky project metadata is worth borrowing for any portfolio.",
  },
  {
    id: "loop-and-line",
    slug: "loop-and-line",
    title: "Loop & Line",
    url: "https://loopline.example",
    description:
      "A motion studio site where every element — cursor, headings, page transitions — is a tiny animation reel. The site is the showreel.",
    image: "/samples/loop-and-line.svg",
    categories: ["Portfolio", "Motion"],
    styles: ["Playful"],
    platform: "Custom Code",
    featured: false,
    status: "published",
    publishedAt: "2026-07-18",
    curatorNote:
      "Every interaction demonstrates the craft they sell. The trick is budget: only one thing moves at a time, so it reads as choreography rather than chaos.",
  },
  {
    id: "paper-plane",
    slug: "paper-plane",
    title: "Paper Plane",
    url: "https://paperplane.example",
    description:
      "An email client landing page that explains the product in six short scenes, each one a folded-paper illustration that unfolds as you scroll.",
    image: "/samples/paper-plane.svg",
    categories: ["SaaS"],
    styles: ["Minimal", "Playful"],
    platform: "Framer",
    featured: false,
    status: "published",
    publishedAt: "2026-07-14",
    curatorNote:
      "Scrollytelling with an actual story arc — setup, problem, payoff. Most scroll-driven pages animate for the sake of it; this one uses each scene to retire one objection.",
  },
  {
    id: "basalt",
    slug: "basalt",
    title: "Basalt",
    url: "https://basalt.example",
    description:
      "A developer's personal site in raw HTML aesthetics: system fonts, visible borders, table layouts — executed with complete precision.",
    image: "/samples/basalt.svg",
    categories: ["Portfolio"],
    styles: ["Brutalist", "Monochrome"],
    platform: "Custom Code",
    featured: false,
    status: "published",
    publishedAt: "2026-07-09",
    curatorNote:
      "Brutalism done right is a typography exam. Look at the rhythm of the borders and the perfect table alignment — this is harder to pull off than a glossy gradient hero.",
  },
  {
    id: "nectar-market",
    slug: "nectar-market",
    title: "Nectar Market",
    url: "https://nectarmarket.example",
    description:
      "A grocery delivery brand that replaces stock food photography with hand-drawn produce, and makes the cart a character in the interface.",
    image: "/samples/nectar-market.svg",
    categories: ["Ecommerce"],
    styles: ["Playful", "Warm"],
    platform: "Shopify",
    featured: false,
    status: "published",
    publishedAt: "2026-07-03",
    curatorNote:
      "Illustration as a moat — competitors can copy the layout but not the hand. The add-to-cart micro-interaction (the bag visibly gains weight) is a tiny detail with outsized charm.",
  },
  {
    id: "orbit-type",
    slug: "orbit-type",
    title: "Orbit Type",
    url: "https://orbittype.example",
    description:
      "A type foundry where specimens float in zero gravity — drag a glyph and the whole alphabet reacts. Equal parts store and toy.",
    image: "/samples/orbit-type.svg",
    categories: ["Typography"],
    styles: ["Experimental", "Dark Mode"],
    platform: "Custom Code",
    featured: true,
    status: "published",
    publishedAt: "2026-06-26",
    curatorNote:
      "The rare experimental site that still sells. Playing with the glyphs is the product demo — you learn the typeface's personality through touch, then the buy button is right there.",
  },
  {
    id: "calm-ledger",
    slug: "calm-ledger",
    title: "Calm Ledger",
    url: "https://calmledger.example",
    description:
      "A fintech product page that swaps the genre's navy-and-lightning-bolts for sage green, serif headings and sentences a human would say.",
    image: "/samples/calm-ledger.svg",
    categories: ["SaaS", "Fintech"],
    styles: ["Minimal", "Warm"],
    platform: "Webflow",
    featured: false,
    status: "published",
    publishedAt: "2026-06-19",
    curatorNote:
      "Positioning through design: everything competitors do loudly, this does quietly, and the product feels trustworthy because of it. The copy deserves its own case study.",
  },
  {
    id: "wildframe",
    slug: "wildframe",
    title: "Wildframe",
    url: "https://wildframe.example",
    description:
      "A wildlife photographer's portfolio that is 95% photograph, 5% interface — navigation appears only when the cursor moves.",
    image: "/samples/wildframe.svg",
    categories: ["Portfolio", "Photography"],
    styles: ["Dark Mode", "Minimal"],
    platform: "Webflow",
    featured: false,
    status: "published",
    publishedAt: "2026-06-12",
    curatorNote:
      "Interface that knows when to disappear. The auto-hiding chrome would be a gimmick anywhere else; for full-bleed photography it's exactly right.",
  },
  {
    id: "neon-praxis",
    slug: "neon-praxis",
    title: "Neon Praxis",
    url: "https://neonpraxis.example",
    description:
      "An agency site in permanent beta: visible grid lines, changelog in the footer, and case studies presented as versioned releases.",
    image: "/samples/neon-praxis.svg",
    categories: ["Agency"],
    styles: ["Experimental", "Brutalist"],
    platform: "Custom Code",
    featured: false,
    status: "published",
    publishedAt: "2026-06-05",
    curatorNote:
      "A whole brand built from one honest idea — 'we ship and iterate' — expressed through the interface itself. Concept-first design at its most committed.",
  },
  {
    id: "quiet-coffee",
    slug: "quiet-coffee",
    title: "Quiet Coffee",
    url: "https://quietcoffee.example",
    description:
      "Submitted via the site form: a specialty coffee subscription with a single-page checkout and lovely bag-designing configurator.",
    image: "/samples/quiet-coffee.svg",
    categories: ["Ecommerce"],
    styles: ["Minimal", "Warm"],
    platform: "Shopify",
    featured: false,
    status: "submitted",
    publishedAt: "2026-08-04",
    curatorNote: "",
  },
];

let records: Website[] = seed.map((s) => ({ ...s }));

export function fetchAllSample(): Website[] {
  return records.map((r) => ({ ...r }));
}

export function setFeaturedSample(id: string, featured: boolean): void {
  const record = records.find((r) => r.id === id);
  if (record) record.featured = featured;
}

export function setStatusSample(id: string, status: SiteStatus): void {
  const record = records.find((r) => r.id === id);
  if (record) record.status = status;
}

export function deleteSample(id: string): void {
  records = records.filter((r) => r.id !== id);
}

export function createSubmissionSample(input: SubmissionInput): void {
  const slug = slugify(input.title);
  records.unshift({
    id: `${slug}-${records.length + 1}`,
    slug: `${slug}-${records.length + 1}`,
    title: input.title,
    url: input.url,
    description: input.note,
    image: "/samples/placeholder.svg",
    categories: [],
    styles: [],
    platform: "",
    featured: false,
    status: "submitted",
    publishedAt: new Date().toISOString().slice(0, 10),
    curatorNote: input.email ? `Submitted by ${input.email}` : "",
  });
}
