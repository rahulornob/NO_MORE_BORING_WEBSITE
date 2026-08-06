import type { Metadata } from "next";
import Link from "next/link";
import { PAGE_SIZE, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/config";
import {
  getAllTags,
  getPublishedSites,
  paginate,
  searchSites,
} from "@/lib/data";
import { itemListJsonLd } from "@/lib/seo";
import { Chip } from "@/components/chip";
import { GalleryGrid } from "@/components/gallery-grid";
import { JsonLd } from "@/components/json-ld";
import { Pagination } from "@/components/pagination";
import { SearchInput } from "@/components/search-input";

export const revalidate = 300;

type Props = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  if (q) {
    return {
      title: `Search: ${q}`,
      robots: { index: false, follow: true },
    };
  }
  return { alternates: { canonical: "/" } };
}

export default async function HomePage({ searchParams }: Props) {
  const { q = "", page: pageParam } = await searchParams;
  const requestedPage = Math.max(1, Number(pageParam) || 1);

  const [sites, tags] = await Promise.all([getPublishedSites(), getAllTags()]);
  const filtered = q ? searchSites(sites, q) : sites;
  const { items, page, totalPages, total } = paginate(filtered, requestedPage, PAGE_SIZE);
  const topCategories = tags.filter((tag) => tag.type === "category").slice(0, 8);

  return (
    <>
      <JsonLd data={itemListJsonLd(items, SITE_NAME, SITE_URL)} />

      <section className="pb-10 pt-16 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {SITE_TAGLINE}
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Every site here is hand-picked, tagged and explained — so you leave
          with ideas, not just screenshots.
        </p>
        <div className="mt-8 max-w-md">
          <SearchInput defaultValue={q} />
        </div>
      </section>

      <section className="flex flex-wrap gap-2 pb-10">
        <Chip href="/" label="All" active={!q} count={sites.length} />
        {topCategories.map((tag) => (
          <Chip
            key={tag.slug}
            href={`/browse/${tag.slug}`}
            label={tag.label}
            count={tag.count}
          />
        ))}
      </section>

      {q && (
        <p className="pb-8 text-sm text-muted">
          {total} result{total === 1 ? "" : "s"} for “{q}” ·{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-ink">
            Clear search
          </Link>
        </p>
      )}

      <GalleryGrid sites={items} />

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath="/"
        query={q ? { q } : {}}
      />
    </>
  );
}
