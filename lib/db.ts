import { supabase } from './supabase';
import { Website, BulkImportItem } from './types';

// Get all websites
export async function getWebsites(): Promise<Website[]> {
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error fetching websites:', error);
    return [];
  }

  return data || [];
}

// Get website by ID
export async function getWebsiteById(id: string): Promise<Website | null> {
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching website:', error);
    return null;
  }

  return data;
}

// Add single website
export async function addWebsite(website: Omit<Website, 'id' | 'createdAt' | 'updatedAt'>): Promise<Website | null> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('websites')
    .insert({
      ...website,
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding website:', error);
    return null;
  }

  return data;
}

// Update website
export async function updateWebsite(id: string, updates: Partial<Website>): Promise<Website | null> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('websites')
    .update({
      ...updates,
      updatedAt: now,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating website:', error);
    return null;
  }

  return data;
}

// Delete website
export async function deleteWebsite(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('websites')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting website:', error);
    return false;
  }

  return true;
}

// Bulk import websites
export async function bulkImportWebsites(websites: BulkImportItem[]): Promise<{ success: number; failed: number }> {
  const now = new Date().toISOString();
  const websitesToInsert = websites.map((w, index) => ({
    id: `website-${Date.now()}-${index}`,
    title: w.title,
    url: w.url,
    imageUrl: w.imageUrl,
    category: w.category,
    description: w.description,
    createdAt: now,
    updatedAt: now,
  }));

  const { error } = await supabase
    .from('websites')
    .insert(websitesToInsert);

  if (error) {
    console.error('Error bulk importing websites:', error);
    return { success: 0, failed: websites.length };
  }

  return { success: websites.length, failed: 0 };
}
