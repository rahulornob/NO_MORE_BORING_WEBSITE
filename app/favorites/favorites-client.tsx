"use client";

import { useAuth } from "@/context/auth-context";
import { GalleryGrid } from "@/components/gallery-grid";
import type { WebsiteItem } from "@/lib/types";
import { Heart } from "lucide-react";

export function FavoritesClient({ allSites }: { allSites: WebsiteItem[] }) {
  const { user, favorites, setIsSigningIn } = useAuth();

  // Filter sites matching user's favorites
  const favoritedSites = allSites.filter((site) => favorites.includes(site.id));

  if (!user) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex size-20 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white/40">
            <Heart className="size-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Your Saved Favorites</h1>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">
              Sign in with Google to save websites to your personal gallery, rate them, and build your own inspiration board.
            </p>
          </div>
          <button
            onClick={() => setIsSigningIn(true)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/20 hover:bg-white/10 transition duration-200"
          >
            {/* Simple simulated Google icon */}
            <svg className="size-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.636 0-8.4-3.764-8.4-8.4s3.764-8.4 8.4-8.4c2.25 0 4.3.85 5.85 2.4l3.15-3.15C18.1 1.09 15.28 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.82 0 12.24-5.42 12.24-12.24 0-.82-.07-1.6-.2-2.355H12.24z" />
            </svg>
            Sign In with Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <Heart className="size-8 text-red-500 fill-red-500" />
          My Inspiration Board
        </h1>
        <p className="text-sm text-muted">
          Your curated catalog of design styles, layouts, and interaction blueprints.
        </p>
      </div>

      {favoritedSites.length === 0 ? (
        <div className="border border-white/10 rounded-2xl bg-[#111318]/50 py-24 text-center px-4">
          <Heart className="size-12 text-white/20 mx-auto mb-4" />
          <p className="text-lg font-semibold text-white">No favorites saved yet</p>
          <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
            Click the heart button on any website card in the explore page to save it here.
          </p>
        </div>
      ) : (
        <GalleryGrid sites={favoritedSites} />
      )}
    </main>
  );
}
