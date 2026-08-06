import type { Website } from "@/lib/types";
import { WebsiteCard } from "./website-card";

export function GalleryGrid({ sites }: { sites: Website[] }) {
  if (sites.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line px-6 py-16 text-center text-sm text-muted">
        Nothing here yet. Try a different search or browse another tag.
      </p>
    );
  }

  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <WebsiteCard key={site.slug} site={site} />
      ))}
    </div>
  );
}
