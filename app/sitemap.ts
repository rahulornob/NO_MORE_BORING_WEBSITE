import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getAllTags, getPublishedSites } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sites, tags] = await Promise.all([getPublishedSites(), getAllTags()]);

  return [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/submit`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...tags.map((tag) => ({
      url: `${SITE_URL}/browse/${tag.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...sites.map((site) => ({
      url: `${SITE_URL}/site/${site.slug}`,
      lastModified: site.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
