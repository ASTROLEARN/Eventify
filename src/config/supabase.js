/**
 * Supabase client configuration for frontend
 */
import { createClient } from '@supabase/supabase-js';

import { env, validateEnvVars, initializeEnv } from './env.js';

// Initialize environment variables
initializeEnv();

// Validate configuration
if (!validateEnvVars()) {
  console.error('Supabase configuration is incomplete. Please check your environment variables.');
}

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Auth helper functions
export const auth = {
  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  // Get current session
  getCurrentSession: () => {
    return supabase.auth.getSession();
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Reset password
  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
    return { data, error };
  },

  // Update password
  updatePassword: async (password) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    });
    return { data, error };
  }
};

// User profile helpers
export const profiles = {
  // Get user profile
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Create user profile
  createProfile: async (userId, profileData) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ id: userId, ...profileData }])
      .select()
      .single();
    return { data, error };
  }
};

export default supabase;