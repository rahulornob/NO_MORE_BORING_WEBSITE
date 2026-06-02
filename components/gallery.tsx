'use client';

import { WebsiteCard } from './website-card';

interface Website {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  category?: string;
}

interface GalleryProps {
  websites: Website[];
}

export function Gallery({ websites }: GalleryProps) {
  if (websites.length === 0) {
    return (
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-secondary">No websites to display yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Gallery
          </h2>
          <p className="text-text-secondary">
            {websites.length} {websites.length === 1 ? 'website' : 'websites'} in our collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <WebsiteCard
              key={website.id}
              {...website}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
