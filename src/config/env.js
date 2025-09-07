/**
 * Environment configuration for Supabase
 * This file handles environment variables for both development and production
 */

// Default configuration
const defaultConfig = {
  SUPABASE_URL: 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY: 'placeholder-anon-key'
};

// Get environment variables
const getEnvVars = () => {
  // In development, check for global variables
  if (typeof window !== 'undefined') {
    return {
      SUPABASE_URL: window.SUPABASE_URL || window.ENV?.SUPABASE_URL || defaultConfig.SUPABASE_URL,
      SUPABASE_ANON_KEY: window.SUPABASE_ANON_KEY || window.ENV?.SUPABASE_ANON_KEY || defaultConfig.SUPABASE_ANON_KEY
    };
  }
  
  // In Node.js environment
  return {
    SUPABASE_URL: process.env.SUPABASE_URL || defaultConfig.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || defaultConfig.SUPABASE_ANON_KEY
  };
};

export const env = getEnvVars();

// Validation
export const validateEnvVars = () => {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = required.filter(key => !env[key] || env[key].includes('placeholder'));
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    return false;
  }
  
  return true;
};

// Initialize environment variables in browser
export const initializeEnv = () => {
  if (typeof window !== 'undefined' && !window.ENV) {
    // Set up global ENV object for backward compatibility
    window.ENV = env;
    window.SUPABASE_URL = env.SUPABASE_URL;
    window.SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;
  }
};