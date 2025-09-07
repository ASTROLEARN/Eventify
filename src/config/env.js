/**
 * Environment configuration for Supabase and API
 * This file handles environment variables for both development and production
 */

// Get Replit domain for API calls
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // In Replit, use the current domain but change port to 3001 for backend
    const currentHost = window.location.hostname;
    if (currentHost.includes('.replit.dev')) {
      // Use the Replit domain with port 3001
      return `https://${currentHost.replace('.replit.dev', '')}-3001.replit.dev`;
    }
  }
  // Fallback for local development
  return 'http://localhost:3001';
};

// Environment configuration for multiple platforms
const envConfig = {
  SUPABASE_URL: window.ENV?.SUPABASE_URL || 
    process?.env?.SUPABASE_URL,
  SUPABASE_ANON_KEY: window.ENV?.SUPABASE_ANON_KEY || 
    process?.env?.SUPABASE_ANON_KEY,
  API_BASE_URL: getApiBaseUrl()
};

export const env = envConfig;

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