'use client';

import { useState } from 'react';
import Image from 'next/image';

interface WebsiteCardProps {
  title: string;
  url: string;
  imageUrl: string;
  category?: string;
}

export function WebsiteCard({ title, url, imageUrl, category }: WebsiteCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative h-80 rounded-lg overflow-hidden card-hover"
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-bg-secondary">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              isImageLoading ? 'blur-sm' : 'blur-0'
            }`}
            onLoadingComplete={() => setIsImageLoading(false)}
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-all duration-500 group-hover:from-black/90" />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

      {/* Content area - reveal on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="space-y-3">
          {category && (
            <span className="inline-block text-xs text-text-secondary uppercase tracking-widest">
              {category}
            </span>
          )}
          <h3 className="text-2xl font-bold text-text-primary line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-text-secondary truncate">
            {new URL(url).hostname.replace('www.', '')}
          </p>
        </div>
      </div>

      {/* Static info - visible always */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end group-hover:opacity-0 transition-opacity duration-300">
        <div>
          <h3 className="text-lg font-bold text-text-primary line-clamp-1">
            {title}
          </h3>
        </div>
      </div>

      {/* Border effect on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-lg transition-colors duration-300" />
    </a>
  );
}
