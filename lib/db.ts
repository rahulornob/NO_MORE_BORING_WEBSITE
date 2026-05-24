import fs from "fs";
import path from "path";
import type { WebsiteItem } from "./types";

const dbPath = path.join(process.cwd(), "lib/sites_db.json");

type UserProfile = {
  favorites: string[];
};

type DBStructure = {
  websites: WebsiteItem[];
  weeklyDrops: {
    slug: string;
    title: string;
    description: string;
    ids: string[];
  }[];
  users?: Record<string, UserProfile>;
};

function readDb(): DBStructure {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    const parsed = JSON.parse(data);
    if (!parsed.users) {
      parsed.users = {};
    }
    return parsed;
  } catch (error) {
    console.error("Error reading database file:", error);
    return { websites: [], weeklyDrops: [], users: {} };
  }
}

function writeDb(data: DBStructure) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database file:", error);
  }
}

export function getWebsites(): WebsiteItem[] {
  return readDb().websites;
}

export function getWeeklyDrops() {
  return readDb().weeklyDrops;
}

export function getSiteById(id: string): WebsiteItem | undefined {
  return getWebsites().find((site) => site.id === id);
}

export function addWebsite(site: WebsiteItem): boolean {
  const db = readDb();
  if (db.websites.some((w) => w.id === site.id)) {
    return false; // ID already exists
  }
  db.websites.unshift(site); // Add to the beginning
  writeDb(db);
  return true;
}

export function updateWebsite(updatedSite: WebsiteItem): boolean {
  const db = readDb();
  const index = db.websites.findIndex((w) => w.id === updatedSite.id);
  if (index === -1) {
    return false; // Not found
  }
  db.websites[index] = { ...db.websites[index], ...updatedSite };
  writeDb(db);
  return true;
}

export function deleteWebsite(id: string): boolean {
  const db = readDb();
  const initialLength = db.websites.length;
  db.websites = db.websites.filter((w) => w.id !== id);
  if (db.websites.length === initialLength) {
    return false; // Not found
  }
  writeDb(db);
  return true;
}

// User favorites
export function getUserFavorites(email: string): string[] {
  const db = readDb();
  return db.users?.[email]?.favorites || [];
}

export function toggleUserFavorite(email: string, siteId: string): string[] {
  const db = readDb();
  if (!db.users) {
    db.users = {};
  }
  if (!db.users[email]) {
    db.users[email] = { favorites: [] };
  }

  const favorites = db.users[email].favorites;
  const index = favorites.indexOf(siteId);

  if (index === -1) {
    favorites.push(siteId);
  } else {
    favorites.splice(index, 1);
  }

  writeDb(db);
  return favorites;
}

export function getRelatedSites(site: WebsiteItem, limit = 3): WebsiteItem[] {
  return getWebsites()
    .filter((item) => item.id !== site.id)
    .map((item) => {
      const overlap =
        item.categories.filter((tag) => site.categories.includes(tag)).length * 3 +
        item.platforms.filter((tag) => site.platforms.includes(tag)).length * 2 +
        item.styles.filter((tag) => site.styles.includes(tag)).length;

      return { item, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap || b.item.score.taste - a.item.score.taste)
    .slice(0, limit)
    .map(({ item }) => item);
}
