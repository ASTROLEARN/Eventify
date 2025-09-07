const { supabase } = require('../config/database');
const { forbiddenResponse, errorResponse } = require('../utils/responses');

/**
 * Admin authorization middleware
 * Checks if authenticated user has admin privileges
 */
const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return forbiddenResponse(res, 'Authentication required');
    }

    // Check if user has admin role
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Admin check error:', error);
      return errorResponse(res, 'Authorization check failed', 500);
    }

    if (!user || user.role !== 'admin') {
      return forbiddenResponse(res, 'Admin access required');
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return errorResponse(res, 'Authorization failed', 500);
  }
};

module.exports = {
  requireAdmin
};