import type { SiteStatus, Website } from "@/lib/types";
import { slugify } from "@/lib/slug";

/**
 * Google Sheets adapter (read-only in v1 — edit the sheet itself to make
 * changes; the admin panel's Sync button pulls them in).
 *
 * Expected header row (case-insensitive, order doesn't matter):
 *   Title | URL | Description | Image | Categories | Styles | Platform |
 *   Featured | Status | Published | Curator Note | Slug
 *
 * Categories/Styles are comma-separated. Featured is TRUE/FALSE. Status is
 * Published / Draft / Submitted / Rejected (empty = Published).
 */

export function sheetsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SHEETS_API_KEY);
}

function parseStatus(value: string): SiteStatus {
  const v = value.toLowerCase().trim();
  if (v === "" || v === "published" || v === "live") return "published";
  if (v === "submitted") return "submitted";
  if (v === "rejected") return "rejected";
  return "draft";
}

function splitList(value: string): string[] {
  return value
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function fetchAllSheets(): Promise<Website[]> {
  const range = process.env.GOOGLE_SHEETS_RANGE ?? "Sites";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_ID}/values/${encodeURIComponent(range)}?key=${process.env.GOOGLE_SHEETS_API_KEY}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google Sheets API ${res.status}: ${body.slice(0, 300)}`);
  }

  const data: { values?: string[][] } = await res.json();
  const [header, ...rows] = data.values ?? [];
  if (!header) return [];

  const col = (name: string) =>
    header.findIndex((h) => h.toLowerCase().trim() === name);
  const cell = (row: string[], index: number) =>
    index >= 0 ? (row[index] ?? "").trim() : "";

  const columns = {
    title: col("title"),
    url: col("url"),
    description: col("description"),
    image: col("image"),
    categories: col("categories"),
    styles: col("styles"),
    platform: col("platform"),
    featured: col("featured"),
    status: col("status"),
    published: col("published"),
    note: col("curator note"),
    slug: col("slug"),
  };

  const seen = new Map<string, number>();

  return rows
    .filter((row) => cell(row, columns.title) || cell(row, columns.url))
    .map((row, index) => {
      const title = cell(row, columns.title) || "Untitled";
      let slug = cell(row, columns.slug) || slugify(title);
      const count = (seen.get(slug) ?? 0) + 1;
      seen.set(slug, count);
      if (count > 1) slug = `${slug}-${count}`;

      return {
        id: `row-${index + 2}`,
        slug,
        title,
        url: cell(row, columns.url),
        description: cell(row, columns.description),
        image: cell(row, columns.image) || "/samples/placeholder.svg",
        categories: splitList(cell(row, columns.categories)),
        styles: splitList(cell(row, columns.styles)),
        platform: cell(row, columns.platform),
        featured: cell(row, columns.featured).toLowerCase() === "true",
        status: parseStatus(cell(row, columns.status)),
        publishedAt: cell(row, columns.published) || "1970-01-01",
        curatorNote: cell(row, columns.note),
      };
    });
}
