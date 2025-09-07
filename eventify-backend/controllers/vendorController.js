const { supabase } = require('../config/database');
const { 
  successResponse, 
  errorResponse, 
  createdResponse,
  notFoundResponse,
  generatePagination
} = require('../utils/responses');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Get all vendors with pagination and filtering
 * GET /api/vendors
 */
const getAllVendors = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Build query with filters
    let query = supabase
      .from('vendors')
      .select('*', { count: 'exact' });

    // Apply filters
    if (req.query.category) {
      query = query.ilike('category', `%${req.query.category}%`);
    }

    if (req.query.name) {
      query = query.ilike('name', `%${req.query.name}%`);
    }

    if (req.query.min_rating) {
      query = query.gte('rating', parseFloat(req.query.min_rating));
    }

    // Apply pagination and ordering
    query = query
      .order('rating', { ascending: false })
      .order('name', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data: vendors, error, count } = await query;

    if (error) {
      console.error('Error fetching vendors:', error);
      return errorResponse(res, 'Failed to fetch vendors', 500);
    }

    const pagination = generatePagination(page, limit, count || 0);

    return successResponse(res, vendors || [], 'Vendors retrieved successfully', 200, pagination);
  } catch (error) {
    console.error('Unexpected error fetching vendors:', error);
    return errorResponse(res, 'Failed to fetch vendors', 500);
  }
});

/**
 * Get single vendor by ID
 * GET /api/vendors/:id
 */
const getVendorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: vendor, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching vendor:', error);
    return errorResponse(res, 'Failed to fetch vendor', 500);
  }

  if (!vendor) {
    return notFoundResponse(res, 'Vendor');
  }

  return successResponse(res, vendor, 'Vendor retrieved successfully');
});

/**
 * Create new vendor
 * POST /api/vendors
 */
const createVendor = asyncHandler(async (req, res) => {
  const { 
    name, 
    category, 
    rating = 0, 
    availability = [], 
    image_url, 
    description 
  } = req.body;

  // Validate rating range
  if (rating < 0 || rating > 5) {
    return errorResponse(res, 'Rating must be between 0 and 5', 400);
  }

  const { data: newVendor, error } = await supabase
    .from('vendors')
    .insert([
      {
        name: name.trim(),
        category: category.trim(),
        rating: parseFloat(rating),
        availability: availability,
        image_url: image_url?.trim(),
        description: description?.trim()
      }
    ])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating vendor:', error);
    return errorResponse(res, 'Failed to create vendor', 500);
  }

  return createdResponse(res, newVendor, 'Vendor created successfully');
});

/**
 * Update vendor
 * PUT /api/vendors/:id
 */
const updateVendor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { 
    name, 
    category, 
    rating, 
    availability, 
    image_url, 
    description 
  } = req.body;

  // Check if vendor exists
  const { data: existingVendor, error: findError } = await supabase
    .from('vendors')
    .select('id')
    .eq('id', id)
    .single();

  if (findError || !existingVendor) {
    return notFoundResponse(res, 'Vendor');
  }

  // Validate rating range if provided
  if (rating !== undefined && (rating < 0 || rating > 5)) {
    return errorResponse(res, 'Rating must be between 0 and 5', 400);
  }

  // Build update object with only provided fields
  const updateData = {
    updated_at: new Date().toISOString()
  };

  if (name !== undefined) updateData.name = name.trim();
  if (category !== undefined) updateData.category = category.trim();
  if (rating !== undefined) updateData.rating = parseFloat(rating);
  if (availability !== undefined) updateData.availability = availability;
  if (image_url !== undefined) updateData.image_url = image_url?.trim();
  if (description !== undefined) updateData.description = description?.trim();

  const { data: updatedVendor, error: updateError } = await supabase
    .from('vendors')
    .update(updateData)
    .eq('id', id)
    .select('*')
    .single();

  if (updateError) {
    console.error('Error updating vendor:', updateError);
    return errorResponse(res, 'Failed to update vendor', 500);
  }

  return successResponse(res, updatedVendor, 'Vendor updated successfully');
});

/**
 * Delete vendor
 * DELETE /api/vendors/:id
 */
const deleteVendor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if vendor exists
  const { data: existingVendor, error: findError } = await supabase
    .from('vendors')
    .select('id')
    .eq('id', id)
    .single();

  if (findError || !existingVendor) {
    return notFoundResponse(res, 'Vendor');
  }

  // Check if vendor has active bookings
  const { data: activeBookings, error: bookingError } = await supabase
    .from('bookings')
    .select('id')
    .eq('vendor_id', id)
    .in('status', ['pending', 'confirmed']);

  if (bookingError) {
    console.error('Error checking vendor bookings:', bookingError);
    return errorResponse(res, 'Failed to verify vendor bookings', 500);
  }

  if (activeBookings && activeBookings.length > 0) {
    return errorResponse(res, 'Cannot delete vendor with active bookings', 400);
  }

  const { error: deleteError } = await supabase
    .from('vendors')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Error deleting vendor:', deleteError);
    return errorResponse(res, 'Failed to delete vendor', 500);
  }

  return successResponse(res, null, 'Vendor deleted successfully');
});

/**
 * Get vendors by category
 * GET /api/vendors/category/:category
 */
const getVendorsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { data: vendors, error, count } = await supabase
    .from('vendors')
    .select('*', { count: 'exact' })
    .ilike('category', `%${category}%`)
    .order('rating', { ascending: false })
    .order('name', { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching vendors by category:', error);
    return errorResponse(res, 'Failed to fetch vendors', 500);
  }

  const pagination = generatePagination(page, limit, count);

  return successResponse(res, vendors, `Vendors in ${category} category retrieved successfully`, 200, pagination);
});

/**
 * Get available vendors for a specific date
 * GET /api/vendors/available/:date
 */
const getAvailableVendors = asyncHandler(async (req, res) => {
  const { date } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Validate date format
  const requestDate = new Date(date);
  if (isNaN(requestDate.getTime())) {
    return errorResponse(res, 'Invalid date format', 400);
  }

  // Get vendors that don't have confirmed bookings on this date
  const { data: vendors, error, count } = await supabase
    .from('vendors')
    .select(`
      *,
      bookings!left (
        id,
        status,
        events (
          event_date
        )
      )
    `, { count: 'exact' })
    .order('rating', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching available vendors:', error);
    return errorResponse(res, 'Failed to fetch available vendors', 500);
  }

  // Filter out vendors with confirmed bookings on the requested date
  const availableVendors = vendors.filter(vendor => {
    if (!vendor.bookings || vendor.bookings.length === 0) return true;
    
    return !vendor.bookings.some(booking => {
      if (booking.status !== 'confirmed') return false;
      if (!booking.events || !booking.events.event_date) return false;
      
      const bookingDate = new Date(booking.events.event_date);
      return bookingDate.toDateString() === requestDate.toDateString();
    });
  });

  // Remove bookings data from response
  const cleanVendors = availableVendors.map(vendor => {
    const { bookings, ...vendorData } = vendor;
    return vendorData;
  });

  const pagination = generatePagination(page, limit, cleanVendors.length);

  return successResponse(res, cleanVendors, 'Available vendors retrieved successfully', 200, pagination);
});

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorsByCategory,
  getAvailableVendors
};