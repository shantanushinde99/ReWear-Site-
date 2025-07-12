import { useState, useEffect } from 'react';
import { ClothingItem, User } from '../types';
import { itemService, userService } from '../services';
import { useAuth } from '../contexts/AuthContext';

export const useAdminItems = () => {
  const [pendingItems, setPendingItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPendingItems = async () => {
    if (!user) {
      setPendingItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Check if user is admin
      const isAdmin = await userService.isAdmin(user.id);
      if (!isAdmin) {
        setError('Access denied: Admin privileges required');
        setLoading(false);
        return;
      }

      const items = await itemService.getPendingItems();
      setPendingItems(items);
    } catch (err) {
      setError('Failed to fetch pending items');
      console.error('Error fetching pending items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingItems();
  }, [user]);

  const approveItem = async (itemId: string): Promise<boolean> => {
    try {
      const success = await itemService.approveItem(itemId);
      if (success) {
        // Remove from pending items
        setPendingItems(prev => prev.filter(item => item.id !== itemId));
      }
      return success;
    } catch (error) {
      console.error('Error approving item:', error);
      return false;
    }
  };

  const rejectItem = async (itemId: string): Promise<boolean> => {
    try {
      const success = await itemService.rejectItem(itemId);
      if (success) {
        // Remove from pending items
        setPendingItems(prev => prev.filter(item => item.id !== itemId));
      }
      return success;
    } catch (error) {
      console.error('Error rejecting item:', error);
      return false;
    }
  };

  const deleteItem = async (itemId: string): Promise<boolean> => {
    try {
      const success = await itemService.deleteItem(itemId);
      if (success) {
        // Remove from pending items
        setPendingItems(prev => prev.filter(item => item.id !== itemId));
      }
      return success;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  };

  const refetch = () => {
    fetchPendingItems();
  };

  return { 
    pendingItems, 
    loading, 
    error, 
    approveItem, 
    rejectItem, 
    deleteItem, 
    refetch 
  };
};

export const useAdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUsers = async () => {
    if (!user) {
      setUsers([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Check if user is admin
      const isAdmin = await userService.isAdmin(user.id);
      if (!isAdmin) {
        setError('Access denied: Admin privileges required');
        setLoading(false);
        return;
      }

      const allUsers = await userService.getAllUsers();
      setUsers(allUsers);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const refetch = () => {
    fetchUsers();
  };

  return { users, loading, error, refetch };
};

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const adminStatus = await userService.isAdmin(user.id);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
};
