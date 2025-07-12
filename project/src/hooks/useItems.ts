import { useState, useEffect } from 'react';
import { ClothingItem } from '../types';
import { itemService } from '../services';

export const useItems = (category?: string) => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await itemService.getAvailableItems(category);
      setItems(fetchedItems);
    } catch (err) {
      setError('Failed to fetch items');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category]);

  const refetch = () => {
    fetchItems();
  };

  return { items, loading, error, refetch };
};

export const useFeaturedItems = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await itemService.getFeaturedItems();
      setItems(fetchedItems);
    } catch (err) {
      setError('Failed to fetch featured items');
      console.error('Error fetching featured items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  const refetch = () => {
    fetchFeaturedItems();
  };

  return { items, loading, error, refetch };
};

export const useUserItems = (userId?: string) => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserItems = async () => {
    if (!userId) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await itemService.getItemsByUserId(userId);
      setItems(fetchedItems);
    } catch (err) {
      setError('Failed to fetch user items');
      console.error('Error fetching user items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, [userId]);

  const refetch = () => {
    fetchUserItems();
  };

  return { items, loading, error, refetch };
};

export const useSearchItems = (query: string, category?: string) => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchItems = async () => {
    if (!query.trim()) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await itemService.searchItems(query, category);
      setItems(searchResults);
    } catch (err) {
      setError('Failed to search items');
      console.error('Error searching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchItems();
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(debounceTimer);
  }, [query, category]);

  return { items, loading, error };
};
