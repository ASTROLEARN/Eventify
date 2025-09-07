/**
 * Supabase Authentication Routes
 * Replaces custom JWT authentication with Supabase native auth
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import Supabase auth middleware
const { 
  authenticateSupabaseToken, 
  optionalAuthentication,
  requireAdmin 
} = require('../middleware/supabaseAuth');

// Import controllers
const { 
  getProfile, 
  updateProfile, 
  refreshSession,
  deleteAccount,
  getAllUsers,
  getAuthStats
} = require('../controllers/supabaseAuthController');

// Import validation middleware
const { handleValidation } = require('../middleware/validation');

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', authenticateSupabaseToken, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', [
  authenticateSupabaseToken,
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Company name must be less than 255 characters'),
  body('website')
    .optional()
    .trim()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('account_type')
    .optional()
    .isIn(['seeker', 'vendor', 'admin'])
    .withMessage('Account type must be seeker, vendor, or admin'),
  handleValidation
], updateProfile);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh user session
 * @access  Private
 */
router.post('/refresh', authenticateSupabaseToken, refreshSession);

/**
 * @route   DELETE /api/auth/account
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/account', authenticateSupabaseToken, deleteAccount);

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin
 */
router.get('/users', [
  authenticateSupabaseToken,
  requireAdmin
], getAllUsers);

/**
 * @route   GET /api/auth/stats
 * @desc    Get authentication statistics (admin only)
 * @access  Private/Admin
 */
router.get('/stats', [
  authenticateSupabaseToken,
  requireAdmin
], getAuthStats);

/**
 * @route   GET /api/auth/session
 * @desc    Check if user session is valid
 * @access  Public
 */
router.get('/session', optionalAuthentication, (req, res) => {
  const { successResponse } = require('../utils/responses');
  
  if (req.user) {
    return successResponse(res, {
      authenticated: true,
      user: req.user,
      profile: req.user.profile
    }, 'Session is valid');
  } else {
    return successResponse(res, {
      authenticated: false,
      user: null,
      profile: null
    }, 'No active session');
  }
});

/**
 * @route   POST /api/auth/webhook
 * @desc    Handle Supabase auth webhooks
 * @access  Public (but secured with webhook secret)
 */
router.post('/webhook', async (req, res) => {
  const { successResponse, errorResponse } = require('../utils/responses');
  
  try {
    // Verify webhook secret
    const webhookSecret = req.headers['authorization'];
    const expectedSecret = `Bearer ${process.env.SUPABASE_WEBHOOK_SECRET}`;
    
    if (!webhookSecret || webhookSecret !== expectedSecret) {
      return errorResponse(res, 'Unauthorized webhook', 401);
    }

    const { type, table, record, old_record } = req.body;
    
    console.log('Supabase webhook received:', { type, table });
    
    // Handle different webhook events
    switch (type) {
      case 'INSERT':
        if (table === 'auth.users') {
          console.log('New user signed up:', record.email);
        }
        break;
        
      case 'DELETE':
        if (table === 'auth.users') {
          console.log('User deleted:', old_record.email);
        }
        break;
        
      default:
        console.log('Unhandled webhook type:', type);
    }
    
    return successResponse(res, null, 'Webhook processed successfully');
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    return errorResponse(res, 'Webhook processing failed', 500);
  }
});

module.exports = router;