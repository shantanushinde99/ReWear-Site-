import { User, ClothingItem, SwapRequest, Chat, ChatMessage, Category } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    location: 'San Francisco, CA',
    points: 150,
    joinDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    preferredMeetingPlace: 'Downtown Coffee Shop'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    location: 'Portland, OR',
    points: 85,
    joinDate: '2024-02-20',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    preferredMeetingPlace: 'Central Park Mall'
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@rewear.com',
    location: 'System',
    points: 0,
    joinDate: '2024-01-01'
  }
];

export const mockCategories: Category[] = [
  { id: 'all', name: 'All Categories', value: 'all', count: 1234, icon: '🏷️' },
  { id: 'women', name: "Women's Fashion", value: 'women', count: 567, icon: '👗' },
  { id: 'men', name: "Men's Fashion", value: 'men', count: 432, icon: '👔' },
  { id: 'kids', name: 'Kids & Baby', value: 'kids', count: 234, icon: '👶' },
  { id: 'accessories', name: 'Accessories', value: 'accessories', count: 345, icon: '👜' },
  { id: 'shoes', name: 'Shoes', value: 'shoes', count: 189, icon: '👟' }
];

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Beautiful vintage denim jacket in excellent condition. Perfect for layering and has that authentic worn-in feel that looks great with everything.',
    category: 'women',
    type: 'unisex',
    size: 'M',
    condition: 'gently-used',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
    ],
    tags: ['vintage', 'denim', 'casual', 'layering'],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    status: 'available',
    pointsValue: 45,
    createdAt: '2024-12-20',
    featured: true
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Light and airy summer dress with beautiful floral print. Perfect for warm weather and special occasions.',
    category: 'women',
    type: 'women',
    size: 'S',
    condition: 'like-new',
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg'
    ],
    tags: ['floral', 'summer', 'dress', 'feminine'],
    uploaderId: '2',
    uploaderName: 'Mike Chen',
    status: 'available',
    pointsValue: 35,
    createdAt: '2024-12-19',
    featured: true
  },
  {
    id: '3',
    title: 'Classic White Button-Up',
    description: 'Timeless white button-up shirt that works for both professional and casual settings. High-quality cotton blend.',
    category: 'men',
    type: 'unisex',
    size: 'L',
    condition: 'gently-used',
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
    ],
    tags: ['classic', 'professional', 'cotton', 'versatile'],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    status: 'available',
    pointsValue: 25,
    createdAt: '2024-12-18'
  },
  {
    id: '4',
    title: 'Black Leather Boots',
    description: 'Stylish black leather boots in great condition. Perfect for fall and winter styling.',
    category: 'shoes',
    type: 'women',
    size: '8',
    condition: 'gently-used',
    images: [
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg'
    ],
    tags: ['leather', 'boots', 'black', 'fall'],
    uploaderId: '2',
    uploaderName: 'Mike Chen',
    status: 'pending-approval',
    pointsValue: 55,
    createdAt: '2024-12-21'
  },
  {
    id: '5',
    title: 'Designer Handbag',
    description: 'Elegant designer handbag in pristine condition. Perfect for special occasions.',
    category: 'accessories',
    type: 'women',
    size: 'One Size',
    condition: 'like-new',
    images: [
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg'
    ],
    tags: ['designer', 'handbag', 'elegant', 'luxury'],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    status: 'available',
    pointsValue: 75,
    createdAt: '2024-12-17'
  },
  {
    id: '6',
    title: 'Kids Rainbow T-Shirt',
    description: 'Colorful rainbow t-shirt for kids. Soft cotton material, perfect for playtime.',
    category: 'kids',
    type: 'kids',
    size: '4T',
    condition: 'gently-used',
    images: [
      'https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg'
    ],
    tags: ['kids', 'colorful', 'cotton', 'playful'],
    uploaderId: '2',
    uploaderName: 'Mike Chen',
    status: 'available',
    pointsValue: 15,
    createdAt: '2024-12-16'
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    itemId: '1',
    itemTitle: 'Vintage Denim Jacket',
    itemImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    sellerId: '1',
    sellerName: 'Sarah Johnson',
    buyerId: '2',
    buyerName: 'Mike Chen',
    lastMessage: 'Is this still available?',
    lastMessageTime: '2024-12-21T10:30:00Z',
    unreadCount: 1,
    createdAt: '2024-12-21T10:00:00Z'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    chatId: '1',
    senderId: 'system',
    senderName: 'System',
    message: 'Chat started for Vintage Denim Jacket',
    timestamp: '2024-12-21T10:00:00Z',
    type: 'system'
  },
  {
    id: '2',
    chatId: '1',
    senderId: '2',
    senderName: 'Mike Chen',
    message: 'Hi! I\'m interested in your vintage denim jacket. Is it still available?',
    timestamp: '2024-12-21T10:30:00Z',
    type: 'text'
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    itemId: '1',
    requesterId: '2',
    ownerId: '1',
    status: 'pending',
    createdAt: '2024-12-21',
    type: 'direct-swap'
  },
  {
    id: '2',
    itemId: '2',
    requesterId: '1',
    ownerId: '2',
    status: 'approved',
    createdAt: '2024-12-20',
    type: 'points-redemption'
  }
];