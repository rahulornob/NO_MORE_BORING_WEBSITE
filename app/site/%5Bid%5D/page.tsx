import { getSiteById, getRelatedSites } from "@/lib/db";
import { SiteDetailClient } from "./site-detail-client";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const site = getSiteById(id);
  if (!site) return {};
  return {
    title: `${site.title} | Curation Inspiration`,
    description: site.curatorNote,
  };
}

export default async function SitePage({ params }: PageProps) {
  const { id } = await params;
  const site = getSiteById(id);
  if (!site) {
    notFound();
  }
  const relatedSites = getRelatedSites(site);

  return <SiteDetailClient site={site} relatedSites={relatedSites} />;
}
