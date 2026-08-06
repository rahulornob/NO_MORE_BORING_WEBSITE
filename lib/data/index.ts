import { unstable_cache } from "next/cache";
import { REVALIDATE_SECONDS } from "@/lib/config";
import type { DataSourceName, Paginated, Tag, TagType, Website } from "@/lib/types";
import { slugify } from "@/lib/slug";
import { fetchAllNotion, notionConfigured } from "./notion";
import { fetchAllSheets, sheetsConfigured } from "./sheets";
import { fetchAllSample } from "./sample";

/**
 * Cached data access layer.
 *
 * The content source (Notion / Sheets) is only ever hit inside
 * `getAllRecords`, which is cached and tagged. Visitors read from the cache;
 * the cache refreshes in the background every REVALIDATE_SECONDS, or
 * instantly when the admin presses "Sync now" (revalidateTag("sites")).
 * This is what keeps the site fast no matter how much traffic arrives.
 */

export function activeSource(): DataSourceName {
  const forced = process.env.DATA_SOURCE;
  if (forced === "notion" || forced === "sheets" || forced === "sample") {
    return forced;
  }
  if (notionConfigured()) return "notion";
  if (sheetsConfigured()) return "sheets";
  return "sample";
}

async function fetchAll(): Promise<Website[]> {
  switch (activeSource()) {
    case "notion":
      return fetchAllNotion();
    case "sheets":
      return fetchAllSheets();
    default:
      return fetchAllSample();
  }
}

/** Every record from the source, all statuses. Cached under the "sites" tag. */
export const getAllRecords = unstable_cache(fetchAll, ["nmbw-records-v1"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["sites"],
});

/** Published sites: featured first, then newest. */
export async function getPublishedSites(): Promise<Website[]> {
  const all = await getAllRecords();
  return all
    .filter((site) => site.status === "published")
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.publishedAt.localeCompare(a.publishedAt);
    });
}

export async function getSiteBySlug(slug: string): Promise<Website | undefined> {
  const sites = await getPublishedSites();
  return sites.find((site) => site.slug === slug);
}

export async function getAllTags(): Promise<Tag[]> {
  const sites = await getPublishedSites();
  const tags = new Map<string, Tag>();

  const add = (label: string, type: TagType) => {
    const clean = label.trim();
    if (!clean) return;
    const slug = slugify(clean);
    const existing = tags.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      tags.set(slug, { slug, label: clean, type, count: 1 });
    }
  };

  for (const site of sites) {
    site.categories.forEach((c) => add(c, "category"));
    site.styles.forEach((s) => add(s, "style"));
    add(site.platform, "platform");
  }

  return [...tags.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label)
  );
}

export async function getTagBySlug(slug: string): Promise<Tag | undefined> {
  const tags = await getAllTags();
  return tags.find((tag) => tag.slug === slug);
}

export async function getSitesByTag(tagSlug: string): Promise<Website[]> {
  const sites = await getPublishedSites();
  return sites.filter((site) =>
    [...site.categories, ...site.styles, site.platform].some(
      (label) => slugify(label) === tagSlug
    )
  );
}

export function searchSites(sites: Website[], query: string): Website[] {
  const q = query.toLowerCase().trim();
  if (!q) return sites;
  return sites.filter((site) =>
    [
      site.title,
      site.description,
      site.curatorNote,
      site.platform,
      ...site.categories,
      ...site.styles,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export async function getRelatedSites(site: Website, limit = 3): Promise<Website[]> {
  const sites = await getPublishedSites();
  return sites
    .filter((other) => other.slug !== site.slug)
    .map((other) => {
      const overlap =
        other.categories.filter((c) => site.categories.includes(c)).length * 3 +
        other.styles.filter((s) => site.styles.includes(s)).length * 2 +
        (other.platform && other.platform === site.platform ? 1 : 0);
      return { other, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(({ other }) => other);
}

export function paginate<T>(items: T[], page: number, size: number): Paginated<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((current - 1) * size, current * size),
    page: current,
    totalPages,
    total,
  };
}
