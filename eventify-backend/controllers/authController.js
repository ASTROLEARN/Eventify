const bcrypt = require('bcryptjs');
const { supabase } = require('../config/database');
const { generateToken } = require('../middleware/auth');
const { 
  successResponse, 
  errorResponse, 
  createdResponse,
  unauthorizedResponse 
} = require('../utils/responses');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Register a new user
 * POST /api/auth/register
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return errorResponse(res, 'User with this email already exists', 409);
  }

  // Hash password
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create user
  const { data: newUser, error: createError } = await supabase
    .from('users')
    .insert([
      {
        name: name.trim(),
        email: email.toLowerCase(),
        password_hash: passwordHash
      }
    ])
    .select('id, name, email, created_at')
    .single();

  if (createError) {
    console.error('User creation error:', createError);
    return errorResponse(res, 'Failed to create user account', 500);
  }

  // Generate JWT token
  const token = generateToken(newUser);

  return createdResponse(res, {
    user: newUser,
    token
  }, 'User registered successfully');
});

/**
 * User login
 * POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const { data: user, error: findError } = await supabase
    .from('users')
    .select('id, name, email, password_hash, created_at')
    .eq('email', email.toLowerCase())
    .single();

  if (findError || !user) {
    return unauthorizedResponse(res, 'Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return unauthorizedResponse(res, 'Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken(user);

  // Remove password hash from response
  const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at
  };

  return successResponse(res, {
    user: userResponse,
    token
  }, 'Login successful');
});

/**
 * Get user profile
 * GET /api/auth/profile
 */
const getProfile = asyncHandler(async (req, res) => {
  // User information is already available from auth middleware
  return successResponse(res, {
    user: req.user
  }, 'Profile retrieved successfully');
});

/**
 * Update user profile
 * PUT /api/auth/profile
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  // Update user profile
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({
      name: name.trim(),
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select('id, name, email, created_at')
    .single();

  if (updateError) {
    console.error('Profile update error:', updateError);
    return errorResponse(res, 'Failed to update profile', 500);
  }

  return successResponse(res, {
    user: updatedUser
  }, 'Profile updated successfully');
});

/**
 * Change user password
 * PUT /api/auth/change-password
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  // Get current password hash
  const { data: user, error: findError } = await supabase
    .from('users')
    .select('password_hash')
    .eq('id', userId)
    .single();

  if (findError || !user) {
    return errorResponse(res, 'User not found', 404);
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
  if (!isCurrentPasswordValid) {
    return unauthorizedResponse(res, 'Current password is incorrect');
  }

  // Hash new password
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  const { error: updateError } = await supabase
    .from('users')
    .update({
      password_hash: newPasswordHash,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (updateError) {
    console.error('Password update error:', updateError);
    return errorResponse(res, 'Failed to update password', 500);
  }

  return successResponse(res, null, 'Password changed successfully');
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};