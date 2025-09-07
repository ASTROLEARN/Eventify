/**
 * User registration endpoint for Vercel deployment
 */
import { handleCors, successResponse, errorResponse, supabase } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (handleCors(req, res)) return;

  if (req.method === 'POST') {
    try {
      const { email, password, full_name, account_type } = req.body;

      if (!email || !password) {
        return errorResponse(res, 'Email and password are required', 400);
      }

      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            account_type: account_type || 'user'
          }
        }
      });

      if (authError) {
        console.error('Registration error:', authError);
        return errorResponse(res, authError.message, 400, authError);
      }

      return successResponse(res, {
        user: authData.user,
        session: authData.session
      }, 'User registered successfully', 201);

    } catch (error) {
      console.error('Register endpoint error:', error);
      return errorResponse(res, 'Internal server error', 500, error);
    }
  }

  return errorResponse(res, 'Method not allowed', 405);
}