"use server";

import { revalidatePath } from "next/cache";
import * as db from "@/lib/db";
import type { WebsiteItem } from "@/lib/types";

export async function getWebsitesAction() {
  return db.getWebsites();
}

export async function toggleFavoriteAction(email: string, siteId: string) {
  const result = db.toggleUserFavorite(email, siteId);
  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath(`/site/${siteId}`);
  return result;
}

export async function getUserFavoritesAction(email: string) {
  return db.getUserFavorites(email);
}

export async function addWebsiteAction(site: WebsiteItem) {
  const result = db.addWebsite(site);
  if (result) {
    revalidatePath("/");
    revalidatePath("/collections");
  }
  return result;
}

export async function updateWebsiteAction(site: WebsiteItem) {
  const result = db.updateWebsite(site);
  if (result) {
    revalidatePath("/");
    revalidatePath("/collections");
    revalidatePath(`/site/${site.id}`);
  }
  return result;
}

export async function deleteWebsiteAction(id: string) {
  const result = db.deleteWebsite(id);
  if (result) {
    revalidatePath("/");
    revalidatePath("/collections");
    revalidatePath(`/site/${id}`);
  }
  return result;
}
