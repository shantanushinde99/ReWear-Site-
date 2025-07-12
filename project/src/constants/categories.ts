import { Category } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', value: 'all', count: 0, icon: '🏷️' },
  { id: 'women', name: "Women's Fashion", value: 'women', count: 0, icon: '👗' },
  { id: 'men', name: "Men's Fashion", value: 'men', count: 0, icon: '👔' },
  { id: 'kids', name: 'Kids & Baby', value: 'kids', count: 0, icon: '👶' },
  { id: 'accessories', name: 'Accessories', value: 'accessories', count: 0, icon: '👜' },
  { id: 'shoes', name: 'Shoes', value: 'shoes', count: 0, icon: '👟' }
];

export const itemConditions = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'gently-used', label: 'Gently Used' },
  { value: 'well-worn', label: 'Well Worn' }
];

export const itemTypes = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'kids', label: 'Kids' }
];

export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'points-low', label: 'Points: Low to High' },
  { value: 'points-high', label: 'Points: High to Low' },
  { value: 'popular', label: 'Most Popular' }
];
