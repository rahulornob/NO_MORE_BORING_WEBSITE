import { getWeeklyDrops, getWebsites } from "@/lib/db";
import { WebsiteCard } from "@/components/website-card";
import { Sparkles, Layers } from "lucide-react";

export const metadata = {
  title: "Weekly Drops & Collections",
  description: "Curated playlists of design blueprints grouped by style and focus.",
};

export default function CollectionsPage() {
  const drops = getWeeklyDrops();
  const allSites = getWebsites();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-14 flex flex-col gap-2 max-w-xl">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Layers className="size-8 text-violet-400" />
          Weekly Drops
        </h1>
        <p className="text-sm text-muted">
          Focused design sets assembled by curators. Study how specific brands tackle motion, typography, and product demos.
        </p>
      </div>

      {/* Collections List */}
      <div className="flex flex-col gap-16">
        {drops.map((drop) => {
          // Get the actual website items for the IDs in this drop
          const dropSites = allSites.filter((site) => drop.ids.includes(site.id));

          return (
            <section key={drop.slug} className="border-b border-white/5 pb-12 last:border-0 last:pb-0">
              <div className="mb-6 flex flex-col gap-1 max-w-2xl">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="size-4.5 text-violet-400" />
                  {drop.title}
                </h2>
                <p className="text-xs text-muted leading-relaxed">
                  {drop.description}
                </p>
              </div>

              {/* Horizontal Scroll Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {dropSites.map((site) => (
                  <WebsiteCard key={site.id} site={site} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
