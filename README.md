# No More Boring Websites

A hand-curated web design inspiration gallery. Minimal by design, built to
stay fast at 10k visitors and 10k entries.

## How it works

```
You edit content in Notion (or Google Sheets)
        │
        ▼
Sync layer (cached, refreshes every 5 min or on "Sync now")
        │
        ▼
Pre-rendered pages served from the CDN  ←  visitors (never touch Notion)
```

- **Content lives in Notion** — the site pulls it into a cache and renders
  static pages from it. Visitors never hit the Notion API, so traffic can
  spike without rate limits or slowdowns.
- **The admin panel** (`/admin`) shows a review queue for submissions,
  quick actions (publish, feature, archive — written back to Notion), and a
  "Sync now" button that refreshes the whole site in seconds.
- **Works with zero setup** — until Notion credentials are added, the site
  runs on built-in demo data so you can develop and preview everything.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Gallery with search, tag chips and pagination |
| `/site/[slug]` | One page per site: screenshot, curator note, tags, related |
| `/browse/[tag]` | SEO landing page per category/style/platform |
| `/about` | Manifesto + curation rules |
| `/submit` | Public submissions → review queue (honeypot spam protection) |
| `/admin` | Password-protected control room |

Plus `sitemap.xml`, `robots.txt`, `llms.txt` (a map of the site for AI
crawlers), and auto-generated Open Graph images for every page.

## Quick start (local)

```bash
npm install
npm run dev
```

The site runs on demo data. To use real content, copy `.env.example` to
`.env.local` and fill it in (see below).

## Connect Notion (~5 minutes)

1. **Create the database.** In Notion, create a full-page database with
   these properties (names and types matter):

   | Property | Type | Notes |
   | --- | --- | --- |
   | `Name` | Title | Site name |
   | `URL` | URL | Link to the live site |
   | `Description` | Text | 1–2 sentences, used for SEO descriptions |
   | `Image` | Files & media | Drag-drop a screenshot (or use `Image URL`) |
   | `Image URL` | URL | Optional alternative: any public image link |
   | `Category` | Multi-select | e.g. Portfolio, SaaS, Ecommerce, Agency |
   | `Style` | Multi-select | e.g. Minimal, Brutalist, 3D, Dark Mode |
   | `Platform` | Select | e.g. Webflow, Framer, Shopify, Custom Code |
   | `Featured` | Checkbox | Featured sites sort first |
   | `Status` | Select | Options: `Published`, `Draft`, `Submitted`, `Rejected` |
   | `Published` | Date | Controls sort order |
   | `Curator Note` | Text | "Why it's not boring" — shown on the site page |
   | `Slug` | Text | Optional; auto-generated from Name if empty |
   | `Submitted By` | Email | Optional; filled by the public submit form |

2. **Create an integration.** Go to
   [notion.so/my-integrations](https://www.notion.so/my-integrations) →
   *New integration* (internal). Copy the secret — that's `NOTION_TOKEN`.

3. **Share the database with it.** On the database page: `•••` →
   *Connections* → add your integration.

4. **Get the database id.** Copy the database URL — the 32-character hex
   string after the workspace name (before any `?`) is `NOTION_DATABASE_ID`.

5. **Set the env vars** in `.env.local` (and in your hosting dashboard for
   production), then restart / redeploy. The admin panel header will switch
   from "Demo data" to "Notion connected".

Only rows with Status `Published` appear on the site. Edit anything in
Notion, press **Sync now** in `/admin`, and the site updates.

## Google Sheets (optional alternative)

Read-only in v1. Create a sheet with a tab named `Sites` and the header row:

```
Title | URL | Description | Image | Categories | Styles | Platform | Featured | Status | Published | Curator Note | Slug
```

Set `GOOGLE_SHEETS_ID` (from the sheet URL) and `GOOGLE_SHEETS_API_KEY`
(a Google Cloud API key with the Sheets API enabled; the sheet must be
link-viewable). `Categories`/`Styles` are comma-separated; `Featured` is
`TRUE`/`FALSE`; dates are `YYYY-MM-DD`.

## Environment variables

See `.env.example`. Minimum for production: `ADMIN_PASSWORD`,
`NEXT_PUBLIC_SITE_URL`, `NOTION_TOKEN`, `NOTION_DATABASE_ID`.

## SEO

- Server-rendered pages with unique titles, descriptions and canonical URLs
- JSON-LD structured data: `WebSite` (+ SearchAction), `ItemList` on gallery
  pages, `WebPage`/`CreativeWork` + breadcrumbs on site pages
- Programmatic landing pages per tag (`/browse/[tag]`) with entity-rich copy
- `llms.txt` + open crawling policy for AI engines (ChatGPT, Perplexity,
  Google AI Overviews)
- Auto-generated Open Graph images, chunk-free single sitemap (fine up to
  50k URLs), `robots.txt` blocking only `/admin`

## Scaling notes

Cached reads + static rendering carry this architecture comfortably to
thousands of entries and any realistic traffic level. Past ~5k Notion rows,
consider snapshotting the sync into a store (e.g. Vercel Blob/KV or a small
database) so the periodic refresh stops re-reading the whole Notion database;
the adapter interface in `lib/data/` is where that slots in without touching
any page code.
