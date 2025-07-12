import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to convert Supabase user to our User type
  const convertSupabaseUser = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    try {
      console.log('Converting user:', supabaseUser.id, supabaseUser.email);

      let { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        console.error('Error details:', error);

        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('User profile not found, creating one...');
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: supabaseUser.id,
              name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
              location: '',
              points: 50
            });

          if (insertError) {
            console.error('Error creating user profile:', insertError);
            return null;
          }

          // Fetch the newly created profile
          const { data: newProfile, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();

          if (fetchError) {
            console.error('Error fetching new profile:', fetchError);
            return null;
          }

          userProfile = newProfile;
        } else {
          return null;
        }
      }

      console.log('User profile found/created:', userProfile);

      return {
        id: userProfile.id,
        name: userProfile.name,
        email: supabaseUser.email || '',
        location: userProfile.location || '',
        points: userProfile.points,
        joinDate: userProfile.join_date,
        avatar: userProfile.avatar_url || undefined,
        preferredMeetingPlace: userProfile.preferred_meeting_place || undefined
      };
    } catch (error) {
      console.error('Error converting user:', error);
      return null;
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userProfile = await convertSupabaseUser(session.user);
        setUser(userProfile);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const userProfile = await convertSupabaseUser(session.user);
          setUser(userProfile);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      console.log('Attempting login for:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        console.error('Error details:', error);
        setIsLoading(false);
        return false;
      }

      console.log('Login successful, user data:', data.user);

      if (data.user) {
        const userProfile = await convertSupabaseUser(data.user);
        console.log('User profile:', userProfile);
        setUser(userProfile);
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('Google login error:', error.message);
        setIsLoading(false);
        return false;
      }

      // The actual user setting will happen in the auth state change listener
      // when the user is redirected back from Google
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, location: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            location
          }
        }
      });

      if (error) {
        console.error('Signup error:', error.message);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        // The trigger should automatically create the user profile
        // But let's ensure it exists and update it with additional info
        const { error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (fetchError && fetchError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              name,
              location,
              points: 50 // Welcome bonus
            });

          if (insertError) {
            console.error('Profile creation error:', insertError.message);
          }
        } else if (!fetchError) {
          // Profile exists, update it with additional info
          const { error: updateError } = await supabase
            .from('users')
            .update({
              name,
              location
            })
            .eq('id', data.user.id);

          if (updateError) {
            console.error('Profile update error:', updateError.message);
          }
        }

        const userProfile = await convertSupabaseUser(data.user);
        setUser(userProfile);
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message);
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};