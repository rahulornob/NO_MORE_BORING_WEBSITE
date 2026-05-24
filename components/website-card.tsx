"use client";

import Link from "next/link";
import type { WebsiteItem } from "@/lib/types";
import { ScreenshotPreview } from "@/components/screenshot-preview";
import { useAuth } from "@/context/auth-context";
import { Heart, ExternalLink } from "lucide-react";

type WebsiteCardProps = {
  site: WebsiteItem;
};

export function WebsiteCard({ site }: WebsiteCardProps) {
  const { user, favorites, toggleFavorite, setIsSigningIn } = useAuth();
  const isFavorited = favorites.includes(site.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      setIsSigningIn(true);
      return;
    }
    await toggleFavorite(site.id);
  };

  // Average score
  const avgScore = ((site.score.taste + site.score.motion + site.score.originality) / 3).toFixed(1);

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-[#111318] p-1.5 shadow-[0_18px_46px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.08] transition-all duration-300 hover:-translate-y-1.5 hover:ring-white/[0.18]">
      
      {/* Card Click navigates to Detail page */}
      <Link href={`/site/${site.id}`} className="block">
        <div className="relative aspect-[9/12] overflow-hidden rounded-xl bg-[#08090a]">
          
          {/* Screenshot */}
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <ScreenshotPreview screenshotUrl={site.screenshot} title={site.title} />
          </div>

          {/* Interactive Hover Gradients and Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Top Overlays: Favorites Button and Score badge */}
          <div className="absolute inset-x-3 top-3 flex items-center justify-between z-10">
            {/* Score Indicator Badge */}
            <div className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/5 tracking-wider uppercase">
              ★ {avgScore}
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className={`rounded-full p-2 backdrop-blur-md border transition-all duration-300 ${
                isFavorited
                  ? "bg-red-500/25 border-red-500/40 text-red-500 scale-110"
                  : "bg-black/60 border-white/5 text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              <Heart className={`size-4 ${isFavorited ? "fill-red-500" : ""}`} />
            </button>
          </div>

          {/* Bottom Overlay: Quick stats & tags on Hover */}
          <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
            <div className="flex flex-wrap gap-1">
              {site.categories.slice(0, 2).map((cat) => (
                <span key={cat} className="rounded bg-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white border border-white/5">
                  {cat}
                </span>
              ))}
              <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-violet-300 border border-violet-500/10">
                {site.industry}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-white/50 font-medium">
              <span>{site.platforms[0]}</span>
              <span>•</span>
              <span className="truncate">{site.styles.slice(0, 2).join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between h-12 px-2.5">
          <h2 className="truncate text-sm font-medium leading-none text-white/80 transition-colors duration-200 group-hover:text-white">
            {site.title}
          </h2>
          <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors flex items-center gap-1 font-mono uppercase tracking-widest">
            View <ExternalLink className="size-3" />
          </span>
        </div>
      </Link>
    </article>
  );
}
