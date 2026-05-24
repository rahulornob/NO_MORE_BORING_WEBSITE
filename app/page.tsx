import { GalleryExplorer } from "@/components/gallery-explorer";
import { ScrollHero } from "@/components/scroll-hero";
import { websites } from "@/lib/sites";

export default function Home() {
  return (
    <>
      <ScrollHero />
      <GalleryExplorer sites={websites} />
    </>
  );
}
