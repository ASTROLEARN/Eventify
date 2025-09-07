/**
 * User login endpoint for Vercel deployment
 */
import { handleCors, successResponse, errorResponse, supabase } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (handleCors(req, res)) return;

  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, 'Email and password are required', 400);
      }

      // Login user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.error('Login error:', authError);
        return errorResponse(res, authError.message, 401, authError);
      }

      return successResponse(res, {
        user: authData.user,
        session: authData.session
      }, 'Login successful');

    } catch (error) {
      console.error('Login endpoint error:', error);
      return errorResponse(res, 'Internal server error', 500, error);
    }
  }

  return errorResponse(res, 'Method not allowed', 405);
}