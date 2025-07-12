import { supabase } from '../lib/supabase';
import { SwapRequest } from '../types';
import type { Database } from '../types/database';

type SwapRow = Database['public']['Tables']['swap_requests']['Row'];
type SwapInsert = Database['public']['Tables']['swap_requests']['Insert'];
type SwapUpdate = Database['public']['Tables']['swap_requests']['Update'];

// Convert database swap to app swap type
const convertDbSwapToSwap = (dbSwap: SwapRow): SwapRequest => ({
  id: dbSwap.id,
  itemId: dbSwap.item_id,
  requesterId: dbSwap.requester_id,
  ownerId: dbSwap.owner_id,
  status: dbSwap.status as SwapRequest['status'],
  type: dbSwap.type as SwapRequest['type'],
  createdAt: dbSwap.created_at,
  completedAt: dbSwap.completed_at || undefined
});

export const swapService = {
  // Create swap request
  async createSwapRequest(swapData: Omit<SwapInsert, 'id' | 'created_at' | 'updated_at'>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('swap_requests')
        .insert(swapData)
        .select('id')
        .single();

      if (error) {
        console.error('Error creating swap request:', error);
        return null;
      }

      return data.id;
    } catch (error) {
      console.error('Error creating swap request:', error);
      return null;
    }
  },

  // Get swap requests by user ID (as requester)
  async getSwapRequestsByRequester(userId: string): Promise<SwapRequest[]> {
    try {
      const { data, error } = await supabase
        .from('swap_requests')
        .select('*')
        .eq('requester_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching swap requests:', error);
        return [];
      }

      return data.map(convertDbSwapToSwap);
    } catch (error) {
      console.error('Error fetching swap requests:', error);
      return [];
    }
  },

  // Get swap requests by user ID (as owner)
  async getSwapRequestsByOwner(userId: string): Promise<SwapRequest[]> {
    try {
      const { data, error } = await supabase
        .from('swap_requests')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching swap requests:', error);
        return [];
      }

      return data.map(convertDbSwapToSwap);
    } catch (error) {
      console.error('Error fetching swap requests:', error);
      return [];
    }
  },

  // Get all swap requests for a user (both as requester and owner)
  async getAllSwapRequestsForUser(userId: string): Promise<SwapRequest[]> {
    try {
      const { data, error } = await supabase
        .from('swap_requests')
        .select('*')
        .or(`requester_id.eq.${userId},owner_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching swap requests:', error);
        return [];
      }

      return data.map(convertDbSwapToSwap);
    } catch (error) {
      console.error('Error fetching swap requests:', error);
      return [];
    }
  },

  // Get swap request by ID
  async getSwapRequestById(swapId: string): Promise<SwapRequest | null> {
    try {
      const { data, error } = await supabase
        .from('swap_requests')
        .select('*')
        .eq('id', swapId)
        .single();

      if (error) {
        console.error('Error fetching swap request:', error);
        return null;
      }

      return convertDbSwapToSwap(data);
    } catch (error) {
      console.error('Error fetching swap request:', error);
      return null;
    }
  },

  // Update swap request status
  async updateSwapStatus(swapId: string, status: SwapRequest['status']): Promise<boolean> {
    try {
      const updates: Partial<SwapUpdate> = { status };
      
      // If completing the swap, set completed_at timestamp
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('swap_requests')
        .update(updates)
        .eq('id', swapId);

      if (error) {
        console.error('Error updating swap status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating swap status:', error);
      return false;
    }
  },

  // Approve swap request
  async approveSwap(swapId: string): Promise<boolean> {
    return this.updateSwapStatus(swapId, 'approved');
  },

  // Reject swap request
  async rejectSwap(swapId: string): Promise<boolean> {
    return this.updateSwapStatus(swapId, 'rejected');
  },

  // Complete swap request
  async completeSwap(swapId: string): Promise<boolean> {
    try {
      // Get the swap request details
      const swap = await this.getSwapRequestById(swapId);
      if (!swap) {
        return false;
      }

      // Start a transaction-like operation
      const { error: swapError } = await supabase
        .from('swap_requests')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', swapId);

      if (swapError) {
        console.error('Error completing swap:', swapError);
        return false;
      }

      // Update item status to redeemed
      const { error: itemError } = await supabase
        .from('clothing_items')
        .update({ status: 'redeemed' })
        .eq('id', swap.itemId);

      if (itemError) {
        console.error('Error updating item status:', itemError);
        return false;
      }

      // If it's a points redemption, deduct points from requester
      if (swap.type === 'points-redemption') {
        // Get item points value
        const { data: item, error: itemFetchError } = await supabase
          .from('clothing_items')
          .select('points_value')
          .eq('id', swap.itemId)
          .single();

        if (itemFetchError) {
          console.error('Error fetching item points:', itemFetchError);
          return false;
        }

        // Deduct points from requester
        const { error: pointsError } = await supabase
          .rpc('update_user_points', {
            user_id: swap.requesterId,
            point_change: -item.points_value
          });

        if (pointsError) {
          console.error('Error updating points:', pointsError);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error completing swap:', error);
      return false;
    }
  },

  // Get swap requests for an item
  async getSwapRequestsForItem(itemId: string): Promise<SwapRequest[]> {
    try {
      const { data, error } = await supabase
        .from('swap_requests')
        .select('*')
        .eq('item_id', itemId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching item swap requests:', error);
        return [];
      }

      return data.map(convertDbSwapToSwap);
    } catch (error) {
      console.error('Error fetching item swap requests:', error);
      return [];
    }
  },

  // Check if user has already requested this item
  async hasUserRequestedItem(userId: string, itemId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('swap_requests')
        .select('id')
        .eq('requester_id', userId)
        .eq('item_id', itemId)
        .in('status', ['pending', 'approved']);

      if (error) {
        console.error('Error checking existing request:', error);
        return false;
      }

      return data.length > 0;
    } catch (error) {
      console.error('Error checking existing request:', error);
      return false;
    }
  }
};
