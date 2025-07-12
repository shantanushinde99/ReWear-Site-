import { User, ClothingItem, SwapRequest } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    location: 'San Francisco, CA',
    points: 150,
    joinDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    location: 'Portland, OR',
    points: 85,
    joinDate: '2024-02-20',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
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

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Beautiful vintage denim jacket in excellent condition. Perfect for layering and has that authentic worn-in feel that looks great with everything.',
    category: 'outerwear',
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
    category: 'dresses',
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
    category: 'tops',
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