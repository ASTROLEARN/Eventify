/**
 * Environment configuration for Supabase
 * This file handles environment variables for both development and production
 */

// Environment configuration for Replit
const envConfig = {
  SUPABASE_URL: window.ENV?.SUPABASE_URL || 'https://kduqigxfckhkoesghbct.supabase.co',
  SUPABASE_ANON_KEY: window.ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkdXFpZ3hmY2toa29lc2doYmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNDQyMzEsImV4cCI6MjA3MjgyMDIzMX0.98kfcPWk7XDsBlYQTYcag4ZwCNLrLPo2RMBJs9fnSK0'
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