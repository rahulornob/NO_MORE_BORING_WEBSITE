import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SITE_URL } from "@/lib/config";
import { getPublishedSites, getRelatedSites, getSiteBySlug } from "@/lib/data";
import { breadcrumbJsonLd, siteJsonLd } from "@/lib/seo";
import { slugify } from "@/lib/slug";
import { Chip } from "@/components/chip";
import { GalleryGrid } from "@/components/gallery-grid";
import { JsonLd } from "@/components/json-ld";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const sites = await getPublishedSites();
  // Pre-render the most recent 300 at build time; the rest render on demand
  // and are cached — keeps builds fast even with 10k entries.
  return sites.slice(0, 300).map((site) => ({ slug: site.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) return {};

  const primary = site.categories[0] ?? "Website";
  return {
    title: `${site.title} — ${primary} Website Design`,
    description:
      site.description ||
      `${site.title}: hand-picked ${primary.toLowerCase()} website design inspiration, tagged and explained.`,
    alternates: { canonical: `/site/${site.slug}` },
  };
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params;
  const site = await getSiteBySlug(slug);
  if (!site) notFound();

  const related = await getRelatedSites(site);
  const tags = [
    ...site.categories.map((label) => ({ label, type: "category" })),
    ...site.styles.map((label) => ({ label, type: "style" })),
    ...(site.platform ? [{ label: site.platform, type: "platform" }] : []),
  ];

  return (
    <article className="pt-10 sm:pt-14">
      <JsonLd data={siteJsonLd(site)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Gallery", url: SITE_URL },
          { name: site.title, url: `${SITE_URL}/site/${site.slug}` },
        ])}
      />

      <nav className="text-xs text-muted">
        <Link href="/" className="transition hover:text-ink">
          Gallery
        </Link>
        <span className="mx-2">/</span>
        <span>{site.title}</span>
      </nav>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {site.title}
          </h1>
          {site.description && (
            <p className="mt-4 leading-relaxed text-muted">{site.description}</p>
          )}
        </div>
        {site.url && (
          <a
            href={site.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-85"
          >
            Visit site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </header>

      <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-accent-soft sm:aspect-[16/10]">
        <Image
          src={site.image}
          alt={`${site.title} website design`}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1240px"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div>
          {site.curatorNote && (
            <>
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
                Why it&apos;s not boring
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed">
                {site.curatorNote}
              </p>
            </>
          )}
        </div>
        <aside>
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            Tagged
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Chip
                key={`${tag.type}-${tag.label}`}
                href={`/browse/${slugify(tag.label)}`}
                label={tag.label}
              />
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">
            Added{" "}
            {new Date(site.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-tight">Keep exploring</h2>
          <div className="mt-8">
            <GalleryGrid sites={related} />
          </div>
        </section>
      )}
    </article>
  );
}
