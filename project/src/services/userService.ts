import { supabase } from '../lib/supabase';
import { User } from '../types';
import type { Database } from '../types/database';

type UserRow = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

// Convert database user to app user type
const convertDbUserToUser = (dbUser: UserRow): User => ({
  id: dbUser.id,
  name: dbUser.name,
  email: '', // Email comes from auth.users, not our users table
  location: dbUser.location || '',
  points: dbUser.points,
  joinDate: dbUser.join_date,
  avatar: dbUser.avatar_url || undefined,
  preferredMeetingPlace: dbUser.preferred_meeting_place || undefined
});

export const userService = {
  // Get user profile by ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        return null;
      }

      // Get email from auth.users
      const { data: authUser } = await supabase.auth.getUser();
      const user = convertDbUserToUser(data);
      if (authUser.user && authUser.user.id === userId) {
        user.email = authUser.user.email || '';
      }

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  // Update user profile
  async updateUser(userId: string, updates: Partial<UserUpdate>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Error updating user:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  },

  // Get user points
  async getUserPoints(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_points', { user_id: userId });

      if (error) {
        console.error('Error fetching user points:', error);
        return 0;
      }

      return data || 0;
    } catch (error) {
      console.error('Error fetching user points:', error);
      return 0;
    }
  },

  // Update user points
  async updateUserPoints(userId: string, pointChange: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .rpc('update_user_points', { 
          user_id: userId, 
          point_change: pointChange 
        });

      if (error) {
        console.error('Error updating user points:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating user points:', error);
      return false;
    }
  },

  // Check if user is admin
  async isAdmin(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return data.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },

  // Get all users (admin only)
  async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all users:', error);
        return [];
      }

      return data.map(convertDbUserToUser);
    } catch (error) {
      console.error('Error fetching all users:', error);
      return [];
    }
  }
};
