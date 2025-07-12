import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error.message);
          navigate('/auth?error=auth_failed');
          return;
        }

        if (data.session?.user) {
          // Check if user profile exists, if not create it
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)
            .single();

          if (profileError && profileError.code === 'PGRST116') {
            // User profile doesn't exist, create it
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: data.session.user.id,
                name: data.session.user.user_metadata?.name || data.session.user.email?.split('@')[0] || 'User',
                location: '',
                points: 50 // Welcome bonus
              });

            if (insertError) {
              console.error('Error creating user profile:', insertError);
            }
          }

          // User is authenticated, redirect to dashboard
          navigate('/dashboard');
        } else {
          // No session, redirect to auth page
          navigate('/auth');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/auth?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
