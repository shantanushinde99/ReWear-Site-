export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  points: number;
  joinDate: string;
  avatar?: string;
  preferredMeetingPlace?: string;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: 'all' | 'women' | 'men' | 'kids' | 'accessories' | 'shoes';
  type: 'men' | 'women' | 'unisex' | 'kids';
  size: string;
  condition: 'new' | 'like-new' | 'gently-used' | 'well-worn';
  images: string[];
  tags: string[];
  uploaderId: string;
  uploaderName: string;
  status: 'available' | 'in-swap' | 'redeemed' | 'pending-approval';
  pointsValue: number;
  createdAt: string;
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system';
}

export interface Chat {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  createdAt: string;
}

export interface SwapRequest {
  id: string;
  itemId: string;
  requesterId: string;
  ownerId: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  completedAt?: string;
  type: 'direct-swap' | 'points-redemption';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password: string, location: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface Category {
  id: string;
  name: string;
  value: string;
  count: number;
  icon: string;
}