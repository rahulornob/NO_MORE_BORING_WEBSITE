export type Category =
  | "Ecommerce"
  | "SaaS"
  | "Animated"
  | "3D"
  | "Webflow"
  | "Framer"
  | "Portfolio"
  | "Agency"
  | "AI"
  | "Experimental";

export type Platform =
  | "Webflow"
  | "Framer"
  | "Shopify"
  | "Custom Code"
  | "WordPress";

export type WebsiteItem = {
  id: string;
  title: string;
  url: string;
  screenshot: string;
  categories: Category[];
  platforms: Platform[];
  styles: string[];
  interactions: string[];
  colors: string[];
  layout: string[];
  industry: string;
  score: {
    taste: number;
    motion: number;
    originality: number;
  };
  curatorNote: string;
  breakdown: string;
  featuredAt?: string;
};

export type SortKey = "newest" | "taste" | "motion" | "originality";
