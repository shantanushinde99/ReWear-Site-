export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  points: number;
  joinDate: string;
  avatar?: string;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: 'tops' | 'pants' | 'outerwear' | 'dresses' | 'accessories' | 'shoes';
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
  signup: (name: string, email: string, password: string, location: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}