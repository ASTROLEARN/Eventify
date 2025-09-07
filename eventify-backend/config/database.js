const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Create Supabase client for regular operations
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
);

// Create admin client for bypassing RLS when needed (using service role if available)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
);

// Database connection test with retry logic
const testConnection = async (retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔍 Testing database connection (attempt ${attempt}/${retries})...`);
      
      // Test profiles table instead of users
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error(`Database connection test failed (attempt ${attempt}):`, error.message);
        
        if (attempt === retries) {
          console.error('❌ All connection attempts failed');
          console.error('Common fixes:');
          console.error('- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct');
          console.error('- Check that profiles table exists in your Supabase database');
          console.error('- Ensure Row Level Security policies allow access');
          return false;
        }
        
        // Wait before retrying
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      console.log('✅ Database connection successful');
      console.log(`📊 Connected to profiles table with ${data?.length || 0} test records`);
      return true;
      
    } catch (error) {
      console.error(`Database connection error (attempt ${attempt}):`, error.message);
      
      if (attempt === retries) {
        console.error('❌ Database connection completely failed after', retries, 'attempts');
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return false;
};

module.exports = {
  supabase,
  supabaseAdmin,
  testConnection
};