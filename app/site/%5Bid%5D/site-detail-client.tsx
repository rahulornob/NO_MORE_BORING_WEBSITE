"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { ScreenshotPreview } from "@/components/screenshot-preview";
import { GalleryGrid } from "@/components/gallery-grid";
import type { WebsiteItem } from "@/lib/types";
import { Heart, ExternalLink, ArrowLeft, Calendar } from "lucide-react";

type SiteDetailClientProps = {
  site: WebsiteItem;
  relatedSites: WebsiteItem[];
};

export function SiteDetailClient({ site, relatedSites }: SiteDetailClientProps) {
  const { user, favorites, toggleFavorite, setIsSigningIn } = useAuth();
  const isFavorited = favorites.includes(site.id);

  const handleFavoriteToggle = async () => {
    if (!user) {
      setIsSigningIn(true);
      return;
    }
    await toggleFavorite(site.id);
  };

  const avgScore = ((site.score.taste + site.score.motion + site.score.originality) / 3).toFixed(1);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted hover:text-white transition duration-200 mb-8">
        <ArrowLeft className="size-4" /> Back to gallery
      </Link>

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-bold text-violet-400 uppercase tracking-widest border border-violet-500/20">
              {site.industry}
            </span>
            {site.featuredAt && (
              <span className="flex items-center gap-1 text-xs text-muted">
                <Calendar className="size-3.5" /> Featured {site.featuredAt}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 sm:text-5xl">{site.title}</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleFavoriteToggle}
            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
              isFavorited
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : "bg-white/5 border-white/10 text-white hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <Heart className={`size-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
            {isFavorited ? "Saved to Favorites" : "Add to Favorites"}
          </button>

          <a
            href={site.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-white/90 transition"
          >
            Open Live Site <ExternalLink className="size-4" />
          </a>
        </div>
      </div>

      {/* Grid Layout: Screenshot + Metadata */}
      <div className="grid gap-12 lg:grid-cols-[1fr_360px] items-start mb-20">
        
        {/* Left Side: Large Screenshot Preview */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#08090a] shadow-2xl">
          <ScreenshotPreview screenshotUrl={site.screenshot} title={site.title} large />
        </div>

        {/* Right Side: Editorial Notes & Breakdown */}
        <div className="flex flex-col gap-8">
          
          {/* Detailed Scores */}
          <div className="rounded-2xl border border-white/10 bg-[#111318] p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">Curation Review</h3>
              <div className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-300 border border-violet-500/20">
                ★ {avgScore} Overall
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: "Taste & Curation", val: site.score.taste, color: "from-pink-500 to-rose-500" },
                { label: "Motion & Interaction", val: site.score.motion, color: "from-violet-500 to-indigo-500" },
                { label: "Originality & Craft", val: site.score.originality, color: "from-emerald-500 to-teal-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-white/70">{item.label}</span>
                    <span className="text-white font-mono">{item.val.toFixed(1)}/10</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.val * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Curator Note */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Curator Note</h3>
            <p className="text-sm text-white/80 leading-relaxed italic border-l-2 border-violet-500 pl-4">
              "{site.curatorNote}"
            </p>
          </div>

          {/* Design Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Analysis</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {site.breakdown}
            </p>
          </div>
        </div>
      </div>

      {/* Tags section */}
      <section className="border-t border-white/10 py-12 mb-20">
        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Design Blueprint</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Categories", data: site.categories },
            { title: "Platforms", data: site.platforms },
            { title: "Styles & Aesthetic", data: site.styles },
            { title: "Interactions & Motion", data: site.interactions },
          ].map((col) => (
            <div key={col.title} className="rounded-xl border border-white/5 bg-[#111318]/30 p-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-3">{col.title}</h4>
              <div className="flex flex-wrap gap-1.5">
                {col.data.map((tag) => (
                  <span key={tag} className="rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related sites */}
      {relatedSites.length > 0 && (
        <section className="border-t border-white/10 pt-12">
          <h3 className="text-xl font-bold text-white mb-8 tracking-tight">Studied in Similar Codebases</h3>
          <GalleryGrid sites={relatedSites} />
        </section>
      )}
    </main>
  );
}
