import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PAGE_SIZE, SITE_URL } from "@/lib/config";
import { getAllTags, getSitesByTag, getTagBySlug, paginate } from "@/lib/data";
import { breadcrumbJsonLd, itemListJsonLd, tagIntro } from "@/lib/seo";
import { Chip } from "@/components/chip";
import { GalleryGrid } from "@/components/gallery-grid";
import { JsonLd } from "@/components/json-ld";
import { Pagination } from "@/components/pagination";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

type Props = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = await getTagBySlug(tagSlug);
  if (!tag) return {};

  return {
    title: `Best ${tag.label} Websites — ${tag.count} Hand-Picked Examples`,
    description: tagIntro(tag),
    alternates: { canonical: `/browse/${tag.slug}` },
  };
}

export default async function BrowsePage({ params, searchParams }: Props) {
  const [{ tag: tagSlug }, { page: pageParam }] = await Promise.all([
    params,
    searchParams,
  ]);
  const tag = await getTagBySlug(tagSlug);
  if (!tag) notFound();

  const sites = await getSitesByTag(tag.slug);
  const { items, page, totalPages } = paginate(
    sites,
    Math.max(1, Number(pageParam) || 1),
    PAGE_SIZE
  );
  const siblings = (await getAllTags())
    .filter((t) => t.type === tag.type)
    .slice(0, 10);

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          items,
          `Best ${tag.label} Websites`,
          `${SITE_URL}/browse/${tag.slug}`
        )}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Gallery", url: SITE_URL },
          { name: `${tag.label} websites`, url: `${SITE_URL}/browse/${tag.slug}` },
        ])}
      />

      <section className="pb-10 pt-14 sm:pt-20">
        <nav className="text-xs text-muted">
          <Link href="/" className="transition hover:text-ink">
            Gallery
          </Link>
          <span className="mx-2">/</span>
          <span>{tag.label}</span>
        </nav>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          {tag.label} websites
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {tagIntro(tag)}
        </p>
      </section>

      <section className="flex flex-wrap gap-2 pb-10">
        {siblings.map((sibling) => (
          <Chip
            key={sibling.slug}
            href={`/browse/${sibling.slug}`}
            label={sibling.label}
            active={sibling.slug === tag.slug}
            count={sibling.count}
          />
        ))}
      </section>

      <GalleryGrid sites={items} />

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath={`/browse/${tag.slug}`}
      />
    </>
  );
}
