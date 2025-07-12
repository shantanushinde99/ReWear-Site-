export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          location: string | null
          points: number
          join_date: string
          avatar_url: string | null
          preferred_meeting_place: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          location?: string | null
          points?: number
          join_date?: string
          avatar_url?: string | null
          preferred_meeting_place?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string | null
          points?: number
          join_date?: string
          avatar_url?: string | null
          preferred_meeting_place?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      clothing_items: {
        Row: {
          id: string
          title: string
          description: string
          category: 'women' | 'men' | 'kids' | 'accessories' | 'shoes'
          type: 'men' | 'women' | 'unisex' | 'kids'
          size: string
          condition: 'new' | 'like-new' | 'gently-used' | 'well-worn'
          images: string[]
          tags: string[]
          uploader_id: string
          status: 'pending-approval' | 'available' | 'in-swap' | 'redeemed' | 'rejected'
          points_value: number
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'women' | 'men' | 'kids' | 'accessories' | 'shoes'
          type: 'men' | 'women' | 'unisex' | 'kids'
          size: string
          condition: 'new' | 'like-new' | 'gently-used' | 'well-worn'
          images?: string[]
          tags?: string[]
          uploader_id: string
          status?: 'pending-approval' | 'available' | 'in-swap' | 'redeemed' | 'rejected'
          points_value?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'women' | 'men' | 'kids' | 'accessories' | 'shoes'
          type?: 'men' | 'women' | 'unisex' | 'kids'
          size?: string
          condition?: 'new' | 'like-new' | 'gently-used' | 'well-worn'
          images?: string[]
          tags?: string[]
          uploader_id?: string
          status?: 'pending-approval' | 'available' | 'in-swap' | 'redeemed' | 'rejected'
          points_value?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      swap_requests: {
        Row: {
          id: string
          item_id: string
          requester_id: string
          owner_id: string
          status: 'pending' | 'approved' | 'rejected' | 'completed'
          type: 'direct-swap' | 'points-redemption'
          created_at: string
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          item_id: string
          requester_id: string
          owner_id: string
          status?: 'pending' | 'approved' | 'rejected' | 'completed'
          type: 'direct-swap' | 'points-redemption'
          created_at?: string
          completed_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          item_id?: string
          requester_id?: string
          owner_id?: string
          status?: 'pending' | 'approved' | 'rejected' | 'completed'
          type?: 'direct-swap' | 'points-redemption'
          created_at?: string
          completed_at?: string | null
          updated_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          item_id: string
          seller_id: string
          buyer_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          item_id: string
          seller_id: string
          buyer_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          item_id?: string
          seller_id?: string
          buyer_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          chat_id: string
          sender_id: string
          message: string
          type: 'text' | 'system'
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          sender_id: string
          message: string
          type?: 'text' | 'system'
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          sender_id?: string
          message?: string
          type?: 'text' | 'system'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_points: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      update_user_points: {
        Args: {
          user_id: string
          point_change: number
        }
        Returns: undefined
      }
    }
    Enums: {
      user_role: 'user' | 'admin'
      item_status: 'pending-approval' | 'available' | 'in-swap' | 'redeemed' | 'rejected'
      item_condition: 'new' | 'like-new' | 'gently-used' | 'well-worn'
      item_category: 'women' | 'men' | 'kids' | 'accessories' | 'shoes'
      item_type: 'men' | 'women' | 'unisex' | 'kids'
      swap_status: 'pending' | 'approved' | 'rejected' | 'completed'
      swap_type: 'direct-swap' | 'points-redemption'
      message_type: 'text' | 'system'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
