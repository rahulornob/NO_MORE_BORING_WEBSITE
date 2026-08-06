export type SiteStatus = "published" | "draft" | "submitted" | "rejected";

export type Website = {
  /** Source record id (Notion page id, sheet row key, or slug for demo data). */
  id: string;
  slug: string;
  title: string;
  url: string;
  description: string;
  image: string;
  categories: string[];
  styles: string[];
  platform: string;
  featured: boolean;
  status: SiteStatus;
  /** ISO date string. */
  publishedAt: string;
  curatorNote: string;
  /** Deep link to edit this record at the source (e.g. the Notion page). */
  editUrl?: string;
};

export type TagType = "category" | "style" | "platform";

export type Tag = {
  slug: string;
  label: string;
  type: TagType;
  count: number;
};

export type DataSourceName = "notion" | "sheets" | "sample";

export type SubmissionInput = {
  url: string;
  title: string;
  email: string;
  note: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
};
