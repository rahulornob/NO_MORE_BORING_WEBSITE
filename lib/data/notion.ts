import type { SiteStatus, SubmissionInput, Website } from "@/lib/types";
import { slugify } from "@/lib/slug";

/**
 * Notion adapter. Uses the raw Notion REST API (no SDK dependency).
 *
 * Expected database properties (see README for the full template):
 *   Name (title), URL (url), Description (rich text), Image (files) or
 *   Image URL (url), Category (multi-select), Style (multi-select),
 *   Platform (select), Featured (checkbox), Status (select:
 *   Published / Draft / Submitted / Rejected), Published (date),
 *   Curator Note (rich text), Slug (rich text, optional),
 *   Submitted By (email, optional).
 *
 * Reading is forgiving about property names and types; writing assumes the
 * canonical names above.
 */

const NOTION_VERSION = "2022-06-28";

export function notionConfigured(): boolean {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);
}

async function notionFetch(path: string, init?: RequestInit): Promise<Record<string, unknown>> {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API ${res.status} on ${path}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type NotionPage = {
  id: string;
  url: string;
  created_time: string;
  cover?: any;
  properties: Record<string, any>;
};

function prop(page: NotionPage, ...names: string[]): any {
  const entries = Object.entries(page.properties ?? {});
  for (const name of names) {
    const hit = entries.find(([key]) => key.toLowerCase() === name.toLowerCase());
    if (hit) return hit[1];
  }
  return undefined;
}

function plain(rich?: { plain_text?: string }[]): string {
  return (rich ?? [])
    .map((r) => r.plain_text ?? "")
    .join("")
    .trim();
}

function fileUrl(file?: any): string {
  if (!file) return "";
  return file.file?.url ?? file.external?.url ?? "";
}

function mapStatus(page: NotionPage): SiteStatus {
  const property = prop(page, "Status");
  // No Status property at all -> treat everything as published so a
  // minimal database works out of the box.
  if (!property) return "published";
  const name: string = (property.select?.name ?? property.status?.name ?? "")
    .toLowerCase()
    .trim();
  if (name === "published" || name === "live") return "published";
  if (name === "submitted") return "submitted";
  if (name === "rejected") return "rejected";
  return "draft";
}

function mapPage(page: NotionPage): Website {
  const title = plain(prop(page, "Name", "Title")?.title) || "Untitled";
  const image =
    fileUrl(prop(page, "Image", "Screenshot")?.files?.[0]) ||
    prop(page, "Image URL", "Screenshot URL")?.url ||
    fileUrl(page.cover) ||
    "/samples/placeholder.svg";

  return {
    id: page.id,
    slug: plain(prop(page, "Slug")?.rich_text) || slugify(title),
    title,
    url: prop(page, "URL", "Link", "Website")?.url ?? "",
    description: plain(prop(page, "Description")?.rich_text),
    image,
    categories: (prop(page, "Category", "Categories")?.multi_select ?? []).map(
      (o: { name: string }) => o.name
    ),
    styles: (prop(page, "Style", "Styles")?.multi_select ?? []).map(
      (o: { name: string }) => o.name
    ),
    platform: prop(page, "Platform")?.select?.name ?? "",
    featured: Boolean(prop(page, "Featured")?.checkbox),
    status: mapStatus(page),
    publishedAt:
      prop(page, "Published", "Date", "Added")?.date?.start ??
      page.created_time.slice(0, 10),
    curatorNote: plain(prop(page, "Curator Note", "Note", "Notes")?.rich_text),
    editUrl: page.url,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function fetchAllNotion(): Promise<Website[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const body: Record<string, unknown> = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const data = await notionFetch(
      `databases/${process.env.NOTION_DATABASE_ID}/query`,
      { method: "POST", body: JSON.stringify(body) }
    );
    pages.push(...((data.results as NotionPage[]) ?? []));
    cursor = data.has_more ? (data.next_cursor as string) : undefined;
  } while (cursor);

  // Map and de-duplicate slugs (append -2, -3, ... on collision).
  const seen = new Map<string, number>();
  return pages.map((page) => {
    const site = mapPage(page);
    const count = (seen.get(site.slug) ?? 0) + 1;
    seen.set(site.slug, count);
    return count > 1 ? { ...site, slug: `${site.slug}-${count}` } : site;
  });
}

export async function setFeaturedNotion(id: string, featured: boolean): Promise<void> {
  await notionFetch(`pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: { Featured: { checkbox: featured } } }),
  });
}

export async function setStatusNotion(id: string, status: SiteStatus): Promise<void> {
  const name = status.charAt(0).toUpperCase() + status.slice(1);
  await notionFetch(`pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ properties: { Status: { select: { name } } } }),
  });
}

/** Archives the page in Notion (recoverable from Notion's trash). */
export async function archiveNotion(id: string): Promise<void> {
  await notionFetch(`pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ archived: true }),
  });
}

export async function createSubmissionNotion(input: SubmissionInput): Promise<void> {
  const base = {
    parent: { database_id: process.env.NOTION_DATABASE_ID },
    properties: {
      Name: { title: [{ text: { content: input.title } }] },
      URL: { url: input.url },
      Status: { select: { name: "Submitted" } },
    } as Record<string, unknown>,
  };

  const withExtras = {
    ...base,
    properties: {
      ...base.properties,
      Description: { rich_text: [{ text: { content: input.note.slice(0, 1900) } }] },
      ...(input.email
        ? { "Submitted By": { email: input.email } }
        : {}),
    },
  };

  try {
    await notionFetch("pages", { method: "POST", body: JSON.stringify(withExtras) });
  } catch {
    // The database may not have the optional properties — retry with the
    // minimal set so a submission is never lost to a schema mismatch.
    await notionFetch("pages", { method: "POST", body: JSON.stringify(base) });
  }
}
