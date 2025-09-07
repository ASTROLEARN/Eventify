const { supabase } = require('../config/database');
const { 
  successResponse, 
  errorResponse, 
  createdResponse
} = require('../utils/responses');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Submit contact form
 * POST /api/contact
 */
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  // Create contact entry (bypassing RLS for public submissions)
  const { data: contactEntry, error } = await supabase
    .from('contact_submissions')
    .insert([
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        message: message.trim(),
        created_at: new Date().toISOString()
      }
    ])
    .select('id, name, email, message, created_at')
    .single();

  if (error) {
    console.error('Error creating contact entry:', error);
    return errorResponse(res, 'Failed to submit contact form', 500);
  }

  // In a real application, you might want to:
  // 1. Send an email notification to admins
  // 2. Send a confirmation email to the user
  // 3. Integrate with a CRM or support ticket system

  return createdResponse(res, contactEntry, 'Contact form submitted successfully');
});

/**
 * Get all contact submissions (admin only - would need admin role check)
 * GET /api/contact
 */
const getAllContactSubmissions = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Note: In a real application, this endpoint should be protected
  // and only accessible by admin users
  
  const { data: submissions, error, count } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching contact submissions:', error);
    return errorResponse(res, 'Failed to fetch contact submissions', 500);
  }

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalItems: count,
    itemsPerPage: limit,
    hasNextPage: page < Math.ceil(count / limit),
    hasPrevPage: page > 1
  };

  return successResponse(res, submissions, 'Contact submissions retrieved successfully', 200, pagination);
});

/**
 * Get single contact submission by ID (admin only)
 * GET /api/contact/:id
 */
const getContactSubmissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Note: In a real application, this endpoint should be protected
  // and only accessible by admin users

  const { data: submission, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !submission) {
    return errorResponse(res, 'Contact submission not found', 404);
  }

  return successResponse(res, submission, 'Contact submission retrieved successfully');
});

/**
 * Delete contact submission (admin only)
 * DELETE /api/contact/:id
 */
const deleteContactSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Note: In a real application, this endpoint should be protected
  // and only accessible by admin users

  const { data: existingSubmission, error: findError } = await supabase
    .from('contact_submissions')
    .select('id')
    .eq('id', id)
    .single();

  if (findError || !existingSubmission) {
    return errorResponse(res, 'Contact submission not found', 404);
  }

  const { error: deleteError } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Error deleting contact submission:', deleteError);
    return errorResponse(res, 'Failed to delete contact submission', 500);
  }

  return successResponse(res, null, 'Contact submission deleted successfully');
});

/**
 * Get contact form statistics (admin only)
 * GET /api/contact/stats
 */
const getContactStats = asyncHandler(async (req, res) => {
  // Note: In a real application, this endpoint should be protected
  // and only accessible by admin users

  const { data: submissions, error } = await supabase
    .from('contact_submissions')
    .select('created_at');

  if (error) {
    console.error('Error fetching contact stats:', error);
    return errorResponse(res, 'Failed to fetch contact statistics', 500);
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const statistics = {
    total: submissions.length,
    today: submissions.filter(s => new Date(s.created_at) >= today).length,
    thisWeek: submissions.filter(s => new Date(s.created_at) >= thisWeek).length,
    thisMonth: submissions.filter(s => new Date(s.created_at) >= thisMonth).length
  };

  return successResponse(res, statistics, 'Contact statistics retrieved successfully');
});

module.exports = {
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,
  getContactStats
};