import type { WebsiteItem } from "@/lib/types";
import { WebsiteCard } from "@/components/website-card";

type GalleryGridProps = {
  sites: WebsiteItem[];
};

export function GalleryGrid({ sites }: GalleryGridProps) {
  if (!sites.length) {
    return (
      <div className="border-y border-line py-20 text-center">
        <p className="text-xl font-semibold text-ink">No sites found.</p>
        <p className="mt-2 text-sm text-muted">
          Try clearing a filter or searching for a broader style.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {sites.map((site) => (
        <WebsiteCard key={site.id} site={site} />
      ))}
    </div>
  );
}
