"use client";

import { useState } from "react";
import { ImageIcon, Loader2 } from "lucide-react";

type ScreenshotPreviewProps = {
  screenshotUrl?: string;
  title?: string;
  large?: boolean;
};

export function ScreenshotPreview({ screenshotUrl, title, large }: ScreenshotPreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#050608] overflow-hidden">
      {/* Loading Skeleton Spinner */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#08090c]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skeleton-shimmer" />
          <Loader2 className="size-6 animate-spin text-white/20" />
        </div>
      )}

      {/* Fallback Icon */}
      {(!screenshotUrl || error) ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-white/5 border border-white/10 sm:size-16">
            <ImageIcon className={large ? "size-7 text-white/60" : "size-6 text-white/60"} strokeWidth={1.5} />
          </div>
          {large && <span className="text-xs text-muted">Screenshot preview unavailable</span>}
        </div>
      ) : (
        <img
          src={screenshotUrl}
          alt={title ? `${title} Screenshot` : "Website Screenshot"}
          className={`h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}
