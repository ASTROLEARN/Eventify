/**
 * Supabase Authentication Middleware
 * Replaces custom JWT authentication with Supabase's native auth
 */

const { createClient } = require('@supabase/supabase-js');
const { errorResponse, unauthorizedResponse } = require('../utils/responseHelpers');

// Initialize Supabase client for server-side operations
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration. Please check environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Middleware to authenticate requests using Supabase JWT tokens
 */
const authenticateSupabaseToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return unauthorizedResponse(res, 'Access token is required');
    }

    // Verify JWT token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Token verification error:', error);
      return unauthorizedResponse(res, 'Invalid or expired token');
    }

    if (!user) {
      return unauthorizedResponse(res, 'User not found');
    }

    // Fetch user profile from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Profile lookup error:', profileError);
      return errorResponse(res, 'Failed to get user profile', 500);
    }

    // Add user information to request object
    req.user = {
      id: user.id,
      email: user.email,
      email_verified: user.email_confirmed_at !== null,
      provider: user.app_metadata?.provider || 'email',
      created_at: user.created_at,
      profile: profile || null
    };

    // Set up RLS context for database queries
    req.supabase = createClient(supabaseUrl, supabaseServiceKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return errorResponse(res, 'Authentication failed', 500);
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 */
const optionalAuthentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (!error && user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        req.user = {
          id: user.id,
          email: user.email,
          email_verified: user.email_confirmed_at !== null,
          provider: user.app_metadata?.provider || 'email',
          created_at: user.created_at,
          profile: profile || null
        };

        req.supabase = createClient(supabaseUrl, supabaseServiceKey, {
          global: {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        });
      }
    }

    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next();
  }
};

/**
 * Middleware to check if user has admin privileges
 */
const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return unauthorizedResponse(res, 'Authentication required');
  }

  // Check if user has admin role in their profile
  if (!req.user.profile || req.user.profile.role !== 'admin') {
    return unauthorizedResponse(res, 'Admin privileges required');
  }

  next();
};

/**
 * Middleware to check if user has vendor privileges
 */
const requireVendor = async (req, res, next) => {
  if (!req.user) {
    return unauthorizedResponse(res, 'Authentication required');
  }

  // Check if user has vendor role or is a vendor
  if (!req.user.profile || !['vendor', 'admin'].includes(req.user.profile.account_type)) {
    return unauthorizedResponse(res, 'Vendor privileges required');
  }

  next();
};

/**
 * Get Supabase client instance for server operations
 */
const getSupabaseClient = () => supabase;

module.exports = {
  authenticateSupabaseToken,
  optionalAuthentication,
  requireAdmin,
  requireVendor,
  getSupabaseClient
};