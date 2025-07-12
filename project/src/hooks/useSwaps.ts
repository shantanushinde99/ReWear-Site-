import { useState, useEffect } from 'react';
import { SwapRequest } from '../types';
import { swapService } from '../services';

export const useSwapRequests = (userId?: string) => {
  const [swaps, setSwaps] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSwaps = async () => {
    if (!userId) {
      setSwaps([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedSwaps = await swapService.getAllSwapRequestsForUser(userId);
      setSwaps(fetchedSwaps);
    } catch (err) {
      setError('Failed to fetch swap requests');
      console.error('Error fetching swaps:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, [userId]);

  const refetch = () => {
    fetchSwaps();
  };

  return { swaps, loading, error, refetch };
};

export const useSwapRequestsByRequester = (userId?: string) => {
  const [swaps, setSwaps] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSwaps = async () => {
    if (!userId) {
      setSwaps([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedSwaps = await swapService.getSwapRequestsByRequester(userId);
      setSwaps(fetchedSwaps);
    } catch (err) {
      setError('Failed to fetch swap requests');
      console.error('Error fetching swaps:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, [userId]);

  const refetch = () => {
    fetchSwaps();
  };

  return { swaps, loading, error, refetch };
};

export const useSwapRequestsByOwner = (userId?: string) => {
  const [swaps, setSwaps] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSwaps = async () => {
    if (!userId) {
      setSwaps([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const fetchedSwaps = await swapService.getSwapRequestsByOwner(userId);
      setSwaps(fetchedSwaps);
    } catch (err) {
      setError('Failed to fetch swap requests');
      console.error('Error fetching swaps:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, [userId]);

  const refetch = () => {
    fetchSwaps();
  };

  return { swaps, loading, error, refetch };
};
