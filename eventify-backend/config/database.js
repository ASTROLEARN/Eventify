const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName] || process.env[varName].includes('your-project-ref'));

if (missingEnvVars.length > 0) {
  console.warn(`⚠️  Warning: Supabase not configured properly. Missing or invalid variables: ${missingEnvVars.join(', ')}`);
  console.warn('Please set up your Supabase database before using the API');
}

// Create Supabase client (with fallback for demo purposes)
let supabase = null;

try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && 
      !process.env.SUPABASE_URL.includes('your-project-ref')) {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
  } else {
    console.warn('🔧 Supabase client not initialized - please configure your environment variables');
  }
} catch (error) {
  console.error('Error creating Supabase client:', error.message);
}

// Database connection test
const testConnection = async () => {
  try {
    if (!supabase) {
      console.warn('⚠️  Supabase not configured - skipping database connection test');
      return false;
    }

    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection test failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection test error:', error.message);
    return false;
  }
};

module.exports = {
  supabase,
  testConnection
};