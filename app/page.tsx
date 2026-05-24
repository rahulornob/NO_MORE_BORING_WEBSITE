import { GalleryExplorer } from "@/components/gallery-explorer";
import { ScrollHero } from "@/components/scroll-hero";
import { getWebsites } from "@/lib/db";

export default function Home() {
  const sites = getWebsites();
  return (
    <>
      <ScrollHero />
      <GalleryExplorer sites={sites} />
    </>
  );
}
