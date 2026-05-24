import { getWebsites } from "@/lib/db";
import { FavoritesClient } from "./favorites-client";

export const metadata = {
  title: "My Favorites",
  description: "Curated design board of saved websites.",
};

export default function FavoritesPage() {
  const allSites = getWebsites();
  return <FavoritesClient allSites={allSites} />;
}
