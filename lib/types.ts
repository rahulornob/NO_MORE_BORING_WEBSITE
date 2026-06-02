export interface Website {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  category?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BulkImportItem {
  title: string;
  url: string;
  imageUrl: string;
  category?: string;
  description?: string;
}
