import { supabase } from '../lib/supabase';
import { ClothingItem } from '../types';
import type { Database } from '../types/database';

type ItemRow = Database['public']['Tables']['clothing_items']['Row'];
type ItemInsert = Database['public']['Tables']['clothing_items']['Insert'];
type ItemUpdate = Database['public']['Tables']['clothing_items']['Update'];

// Convert database item to app item type
const convertDbItemToItem = (dbItem: ItemRow, uploaderName?: string): ClothingItem => ({
  id: dbItem.id,
  title: dbItem.title,
  description: dbItem.description,
  category: dbItem.category as ClothingItem['category'],
  type: dbItem.type as ClothingItem['type'],
  size: dbItem.size,
  condition: dbItem.condition as ClothingItem['condition'],
  images: dbItem.images,
  tags: dbItem.tags,
  uploaderId: dbItem.uploader_id,
  uploaderName: uploaderName || 'Unknown',
  status: dbItem.status as ClothingItem['status'],
  pointsValue: dbItem.points_value,
  createdAt: dbItem.created_at,
  featured: dbItem.featured || false
});

export const itemService = {
  // Get all available items
  async getAvailableItems(category?: string): Promise<ClothingItem[]> {
    try {
      let query = supabase
        .from('clothing_items')
        .select(`
          *,
          users!clothing_items_uploader_id_fkey(name)
        `)
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching items:', error);
        return [];
      }

      return data.map(item => convertDbItemToItem(item, item.users?.name));
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  },

  // Get featured items
  async getFeaturedItems(): Promise<ClothingItem[]> {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .select(`
          *,
          users!clothing_items_uploader_id_fkey(name)
        `)
        .eq('status', 'available')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching featured items:', error);
        return [];
      }

      return data.map(item => convertDbItemToItem(item, item.users?.name));
    } catch (error) {
      console.error('Error fetching featured items:', error);
      return [];
    }
  },

  // Get item by ID
  async getItemById(itemId: string): Promise<ClothingItem | null> {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .select(`
          *,
          users!clothing_items_uploader_id_fkey(name)
        `)
        .eq('id', itemId)
        .single();

      if (error) {
        console.error('Error fetching item:', error);
        return null;
      }

      return convertDbItemToItem(data, data.users?.name);
    } catch (error) {
      console.error('Error fetching item:', error);
      return null;
    }
  },

  // Get items by user ID
  async getItemsByUserId(userId: string): Promise<ClothingItem[]> {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .select(`
          *,
          users!clothing_items_uploader_id_fkey(name)
        `)
        .eq('uploader_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user items:', error);
        return [];
      }

      return data.map(item => convertDbItemToItem(item, item.users?.name));
    } catch (error) {
      console.error('Error fetching user items:', error);
      return [];
    }
  },

  // Create new item
  async createItem(item: Omit<ItemInsert, 'id' | 'created_at' | 'updated_at'>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .insert(item)
        .select('id')
        .single();

      if (error) {
        console.error('Error creating item:', error);
        return null;
      }

      return data.id;
    } catch (error) {
      console.error('Error creating item:', error);
      return null;
    }
  },

  // Update item
  async updateItem(itemId: string, updates: Partial<ItemUpdate>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('clothing_items')
        .update(updates)
        .eq('id', itemId);

      if (error) {
        console.error('Error updating item:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating item:', error);
      return false;
    }
  },

  // Delete item
  async deleteItem(itemId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('clothing_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error deleting item:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  },

  // Get pending items (admin only)
  async getPendingItems(): Promise<ClothingItem[]> {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .select(`
          *,
          users!clothing_items_uploader_id_fkey(name)
        `)
        .eq('status', 'pending-approval')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching pending items:', error);
        return [];
      }

      return data.map(item => convertDbItemToItem(item, item.users?.name));
    } catch (error) {
      console.error('Error fetching pending items:', error);
      return [];
    }
  },

  // Approve item (admin only)
  async approveItem(itemId: string): Promise<boolean> {
    return this.updateItem(itemId, { status: 'available' });
  },

  // Reject item (admin only)
  async rejectItem(itemId: string): Promise<boolean> {
    return this.updateItem(itemId, { status: 'rejected' });
  },

  // Search items
  async searchItems(query: string, category?: string): Promise<ClothingItem[]> {
    try {
      let supabaseQuery = supabase
        .from('clothing_items')
        .select(`
          *,
          users!clothing_items_uploader_id_fkey(name)
        `)
        .eq('status', 'available')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        supabaseQuery = supabaseQuery.eq('category', category);
      }

      const { data, error } = await supabaseQuery;

      if (error) {
        console.error('Error searching items:', error);
        return [];
      }

      return data.map(item => convertDbItemToItem(item, item.users?.name));
    } catch (error) {
      console.error('Error searching items:', error);
      return [];
    }
  }
};
