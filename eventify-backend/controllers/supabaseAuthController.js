/**
 * Supabase Authentication Controller
 * Handles profile management and auth-related operations
 */

const { getSupabaseClient } = require('../middleware/supabaseAuth');
const { 
  successResponse, 
  errorResponse, 
  createdResponse, 
  notFoundResponse 
} = require('../utils/responses');
const asyncHandler = require('express-async-handler');

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return errorResponse(res, 'User not authenticated', 401);
  }

  // Return the profile from the middleware
  return successResponse(res, {
    user: req.user,
    profile: req.user.profile
  }, 'Profile retrieved successfully');
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return errorResponse(res, 'User not authenticated', 401);
  }

  const { name, phone, bio, company, website, social_links, account_type } = req.body;
  const userId = req.user.id;

  // Prepare update data
  const updateData = {
    updated_at: new Date().toISOString()
  };

  if (name !== undefined) updateData.name = name.trim();
  if (phone !== undefined) updateData.phone = phone.trim();
  if (bio !== undefined) updateData.bio = bio.trim();
  if (company !== undefined) updateData.company = company.trim();
  if (website !== undefined) updateData.website = website.trim();
  if (social_links !== undefined) updateData.social_links = social_links;
  if (account_type !== undefined) updateData.account_type = account_type;

  try {
    const supabase = getSupabaseClient();
    
    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    let result;
    
    if (checkError && checkError.code === 'PGRST116') {
      // Profile doesn't exist, create it
      const profileData = {
        id: userId,
        email: req.user.email,
        name: name || req.user.email.split('@')[0],
        account_type: account_type || 'seeker',
        created_at: new Date().toISOString(),
        ...updateData
      };

      result = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();
    } else if (checkError) {
      throw checkError;
    } else {
      // Profile exists, update it
      result = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();
    }

    if (result.error) {
      console.error('Profile update error:', result.error);
      return errorResponse(res, 'Failed to update profile', 500);
    }

    return successResponse(res, {
      profile: result.data
    }, 'Profile updated successfully');

  } catch (error) {
    console.error('Profile update error:', error);
    return errorResponse(res, 'Failed to update profile', 500);
  }
});

/**
 * @route   POST /api/auth/refresh-session
 * @desc    Refresh user session
 * @access  Private
 */
const refreshSession = asyncHandler(async (req, res) => {
  if (!req.user) {
    return errorResponse(res, 'User not authenticated', 401);
  }

  // With Supabase, session refresh is handled client-side
  // This endpoint just confirms the current session is valid
  return successResponse(res, {
    user: req.user,
    session_valid: true
  }, 'Session is valid');
});

/**
 * @route   DELETE /api/auth/account
 * @desc    Delete user account
 * @access  Private
 */
const deleteAccount = asyncHandler(async (req, res) => {
  if (!req.user) {
    return errorResponse(res, 'User not authenticated', 401);
  }

  const userId = req.user.id;

  try {
    const supabase = getSupabaseClient();

    // Delete user's profile and related data
    // Note: This doesn't delete the auth user - that requires admin privileges
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.error('Profile deletion error:', profileError);
      return errorResponse(res, 'Failed to delete account data', 500);
    }

    return successResponse(res, null, 'Account data deleted successfully. Please contact support to fully delete your authentication account.');

  } catch (error) {
    console.error('Account deletion error:', error);
    return errorResponse(res, 'Failed to delete account', 500);
  }
});

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search = '', account_type = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
    const supabase = getSupabaseClient();
    
    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (account_type) {
      query = query.eq('account_type', account_type);
    }

    const { data: users, error, count } = await query;

    if (error) {
      console.error('Users fetch error:', error);
      return errorResponse(res, 'Failed to fetch users', 500);
    }

    return successResponse(res, {
      users,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(count / limit),
        total_count: count,
        page_size: limit
      }
    }, 'Users retrieved successfully');

  } catch (error) {
    console.error('Users fetch error:', error);
    return errorResponse(res, 'Failed to fetch users', 500);
  }
});

/**
 * @route   GET /api/auth/stats
 * @desc    Get authentication statistics (admin only)
 * @access  Private/Admin
 */
const getAuthStats = asyncHandler(async (req, res) => {
  try {
    const supabase = getSupabaseClient();

    // Get user counts by account type
    const { data: accountTypeStats, error: statsError } = await supabase
      .from('profiles')
      .select('account_type')
      .not('account_type', 'is', null);

    if (statsError) {
      console.error('Stats fetch error:', statsError);
      return errorResponse(res, 'Failed to fetch statistics', 500);
    }

    // Process statistics
    const stats = accountTypeStats.reduce((acc, profile) => {
      const type = profile.account_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Get total user count
    const { count: totalUsers, error: countError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Count fetch error:', countError);
      return errorResponse(res, 'Failed to fetch user count', 500);
    }

    // Get recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: recentUsers, error: recentError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (recentError) {
      console.error('Recent users fetch error:', recentError);
      return errorResponse(res, 'Failed to fetch recent user count', 500);
    }

    return successResponse(res, {
      total_users: totalUsers,
      recent_users: recentUsers,
      account_types: stats,
      generated_at: new Date().toISOString()
    }, 'Statistics retrieved successfully');

  } catch (error) {
    console.error('Auth stats error:', error);
    return errorResponse(res, 'Failed to fetch statistics', 500);
  }
});

module.exports = {
  getProfile,
  updateProfile,
  refreshSession,
  deleteAccount,
  getAllUsers,
  getAuthStats
};