/**
 * Contact form endpoint for Vercel deployment
 */
import { handleCors, successResponse, errorResponse, supabase } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (handleCors(req, res)) return;

  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return errorResponse(res, 'All fields are required', 400);
      }

      // Insert contact form submission
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name,
            email,
            subject,
            message,
            submitted_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Contact submission error:', error);
        return errorResponse(res, 'Failed to submit contact form', 500, error);
      }

      return successResponse(res, null, 'Contact form submitted successfully', 201);
    } catch (error) {
      console.error('Contact endpoint error:', error);
      return errorResponse(res, 'Internal server error', 500, error);
    }
  }

  return errorResponse(res, 'Method not allowed', 405);
}