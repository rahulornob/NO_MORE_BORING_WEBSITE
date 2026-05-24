"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/filter-bar";
import { GalleryGrid } from "@/components/gallery-grid";
import type { Category, Platform, SortKey, WebsiteItem } from "@/lib/types";

type Filters = {
  category: Category | "All";
  platform: Platform | "All";
  style: string;
  interaction: string;
  color: string;
  layout: string;
  query: string;
  sort: SortKey;
};

const initialFilters: Filters = {
  category: "All",
  platform: "All",
  style: "All",
  interaction: "All",
  color: "All",
  layout: "All",
  query: "",
  sort: "newest",
};

function searchable(site: WebsiteItem) {
  return [
    site.title,
    site.url,
    site.industry,
    site.curatorNote,
    site.breakdown,
    ...site.categories,
    ...site.platforms,
    ...site.styles,
    ...site.interactions,
    ...site.colors,
    ...site.layout,
  ]
    .join(" ")
    .toLowerCase();
}

export function GalleryExplorer({ sites }: { sites: WebsiteItem[] }) {
  const [filters, setFilters] = useState(initialFilters);

  const filteredSites = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return sites
      .filter((site) => {
        const matchesCategory =
          filters.category === "All" || site.categories.includes(filters.category);
        const matchesPlatform =
          filters.platform === "All" || site.platforms.includes(filters.platform);
        const matchesStyle = filters.style === "All" || site.styles.includes(filters.style);
        const matchesInteraction =
          filters.interaction === "All" || site.interactions.includes(filters.interaction);
        const matchesColor = filters.color === "All" || site.colors.includes(filters.color);
        const matchesLayout = filters.layout === "All" || site.layout.includes(filters.layout);
        const matchesQuery = !query || searchable(site).includes(query);

        return (
          matchesCategory &&
          matchesPlatform &&
          matchesStyle &&
          matchesInteraction &&
          matchesColor &&
          matchesLayout &&
          matchesQuery
        );
      })
      .sort((a, b) => {
        if (filters.sort === "taste") return b.score.taste - a.score.taste;
        if (filters.sort === "motion") return b.score.motion - a.score.motion;
        if (filters.sort === "originality") return b.score.originality - a.score.originality;

        return (
          new Date(b.featuredAt ?? "2025-01-01").getTime() -
          new Date(a.featuredAt ?? "2025-01-01").getTime()
        );
      });
  }, [filters, sites]);

  return (
    <>
      <FilterBar filters={filters} onChange={setFilters} resultCount={filteredSites.length} />
      <main className="w-full px-4 py-6 sm:px-6 lg:px-6">
        <GalleryGrid sites={filteredSites} />
      </main>
    </>
  );
}
