const jwt = require('jsonwebtoken');
const { supabase } = require('../config/database');
const { unauthorizedResponse, errorResponse } = require('../utils/responses');

/**
 * Authentication middleware to verify JWT tokens
 * Extracts user information and adds it to request object
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return unauthorizedResponse(res, 'Access token is required');
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database to ensure user still exists
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, created_at')
      .eq('id', decoded.userId)
      .maybeSingle();

    if (error) {
      console.error('User lookup error in auth middleware:', error);
      return unauthorizedResponse(res, 'Authentication failed');
    }

    if (!user) {
      return unauthorizedResponse(res, 'Invalid or expired token');
    }

    // Add user information to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return unauthorizedResponse(res, 'Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      return unauthorizedResponse(res, 'Token expired');
    } else {
      console.error('Authentication middleware error:', error);
      return errorResponse(res, 'Authentication failed', 500);
    }
  }
};

/**
 * Optional authentication middleware
 * Adds user info to request if token is valid, but doesn't block access
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, created_at')
        .eq('id', decoded.userId)
        .maybeSingle();

      if (!error && user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
};

/**
 * Generate JWT token for user
 * @param {Object} user - User object containing id and other details
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    auth_uid: user.id, // Required for Supabase RLS compatibility
    email: user.email,
    iat: Math.floor(Date.now() / 1000)
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

module.exports = {
  authenticateToken,
  optionalAuth,
  generateToken
};