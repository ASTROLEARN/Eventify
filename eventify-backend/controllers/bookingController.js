const { supabase } = require('../config/database');
const { 
  successResponse, 
  errorResponse, 
  createdResponse,
  notFoundResponse,
  forbiddenResponse,
  generatePagination
} = require('../utils/responses');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Get user's bookings with pagination
 * GET /api/bookings
 */
const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Filter by status if provided
  let query = supabase
    .from('bookings')
    .select(`
      id,
      status,
      created_at,
      updated_at,
      events (
        id,
        title,
        description,
        event_date,
        location,
        category
      ),
      vendors (
        id,
        name,
        category,
        rating,
        image_url
      )
    `, { count: 'exact' })
    .eq('user_id', userId);

  if (req.query.status) {
    query = query.eq('status', req.query.status);
  }

  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const { data: bookings, error, count } = await query;

  if (error) {
    console.error('Error fetching user bookings:', error);
    return errorResponse(res, 'Failed to fetch bookings', 500);
  }

  const pagination = generatePagination(page, limit, count);

  return successResponse(res, bookings, 'Bookings retrieved successfully', 200, pagination);
});

/**
 * Get single booking by ID
 * GET /api/bookings/:id
 */
const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      id,
      status,
      created_at,
      updated_at,
      events (
        id,
        title,
        description,
        event_date,
        location,
        category,
        profiles:created_by (
          id,
          name,
          email
        )
      ),
      vendors (
        id,
        name,
        category,
        rating,
        image_url,
        description
      )
    `)
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error || !booking) {
    return notFoundResponse(res, 'Booking');
  }

  return successResponse(res, booking, 'Booking retrieved successfully');
});

/**
 * Create new booking
 * POST /api/bookings
 */
const createBooking = asyncHandler(async (req, res) => {
  const { event_id, vendor_id } = req.body;
  const userId = req.user.id;

  // Verify event exists and user owns it
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('id, title, event_date, created_by')
    .eq('id', event_id)
    .single();

  if (eventError || !event) {
    return errorResponse(res, 'Event not found', 404);
  }

  if (event.created_by !== userId) {
    return forbiddenResponse(res, 'You can only create bookings for your own events');
  }

  // Verify vendor exists
  const { data: vendor, error: vendorError } = await supabase
    .from('vendors')
    .select('id, name')
    .eq('id', vendor_id)
    .single();

  if (vendorError || !vendor) {
    return errorResponse(res, 'Vendor not found', 404);
  }

  // Check if booking already exists for this event and vendor
  const { data: existingBooking, error: checkError } = await supabase
    .from('bookings')
    .select('id')
    .eq('event_id', event_id)
    .eq('vendor_id', vendor_id)
    .single();

  if (existingBooking) {
    return errorResponse(res, 'Booking already exists for this event and vendor', 409);
  }

  // Check if vendor is already booked for the same date
  const eventDate = new Date(event.event_date);
  const { data: conflictingBookings, error: conflictError } = await supabase
    .from('bookings')
    .select(`
      id,
      events (
        event_date
      )
    `)
    .eq('vendor_id', vendor_id)
    .eq('status', 'confirmed');

  if (conflictError) {
    console.error('Error checking booking conflicts:', conflictError);
    return errorResponse(res, 'Failed to verify booking availability', 500);
  }

  const hasConflict = conflictingBookings.some(booking => {
    const bookingDate = new Date(booking.events.event_date);
    return bookingDate.toDateString() === eventDate.toDateString();
  });

  if (hasConflict) {
    return errorResponse(res, 'Vendor is not available on this date', 409);
  }

  // Create booking
  const { data: newBooking, error: createError } = await supabase
    .from('bookings')
    .insert([
      {
        user_id: userId,
        event_id: event_id,
        vendor_id: vendor_id,
        status: 'pending'
      }
    ])
    .select(`
      id,
      status,
      created_at,
      updated_at,
      events (
        id,
        title,
        description,
        event_date,
        location,
        category
      ),
      vendors (
        id,
        name,
        category,
        rating,
        image_url
      )
    `)
    .single();

  if (createError) {
    console.error('Error creating booking:', createError);
    return errorResponse(res, 'Failed to create booking', 500);
  }

  return createdResponse(res, newBooking, 'Booking created successfully');
});

/**
 * Update booking status
 * PUT /api/bookings/:id
 */
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  // Check if booking exists and user owns the event
  const { data: booking, error: findError } = await supabase
    .from('bookings')
    .select(`
      id,
      status,
      events (
        created_by
      )
    `)
    .eq('id', id)
    .single();

  if (findError || !booking) {
    return notFoundResponse(res, 'Booking');
  }

  if (booking.events.created_by !== userId) {
    return forbiddenResponse(res, 'You can only update bookings for your own events');
  }

  // Validate status transition
  const validTransitions = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['completed', 'cancelled'],
    'cancelled': [], // Cannot change from cancelled
    'completed': [] // Cannot change from completed
  };

  if (!validTransitions[booking.status].includes(status)) {
    return errorResponse(res, `Cannot change booking status from ${booking.status} to ${status}`, 400);
  }

  const { data: updatedBooking, error: updateError } = await supabase
    .from('bookings')
    .update({
      status: status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select(`
      id,
      status,
      created_at,
      updated_at,
      events (
        id,
        title,
        description,
        event_date,
        location,
        category
      ),
      vendors (
        id,
        name,
        category,
        rating,
        image_url
      )
    `)
    .single();

  if (updateError) {
    console.error('Error updating booking:', updateError);
    return errorResponse(res, 'Failed to update booking status', 500);
  }

  return successResponse(res, updatedBooking, 'Booking status updated successfully');
});

/**
 * Cancel/Delete booking
 * DELETE /api/bookings/:id
 */
const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Check if booking exists and user owns the event
  const { data: booking, error: findError } = await supabase
    .from('bookings')
    .select(`
      id,
      status,
      events (
        created_by
      )
    `)
    .eq('id', id)
    .single();

  if (findError || !booking) {
    return notFoundResponse(res, 'Booking');
  }

  if (booking.events.created_by !== userId) {
    return forbiddenResponse(res, 'You can only cancel bookings for your own events');
  }

  // Check if booking can be cancelled
  if (booking.status === 'completed') {
    return errorResponse(res, 'Cannot cancel a completed booking', 400);
  }

  // Either delete the booking or update status to cancelled based on current status
  if (booking.status === 'pending') {
    // Delete pending bookings
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting booking:', deleteError);
      return errorResponse(res, 'Failed to cancel booking', 500);
    }

    return successResponse(res, null, 'Booking cancelled successfully');
  } else {
    // Update confirmed bookings to cancelled status
    const { data: cancelledBooking, error: updateError } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        id,
        status,
        created_at,
        updated_at,
        events (
          id,
          title,
          description,
          event_date,
          location,
          category
        ),
        vendors (
          id,
          name,
          category,
          rating,
          image_url
        )
      `)
      .single();

    if (updateError) {
      console.error('Error cancelling booking:', updateError);
      return errorResponse(res, 'Failed to cancel booking', 500);
    }

    return successResponse(res, cancelledBooking, 'Booking cancelled successfully');
  }
});

/**
 * Get booking statistics for user
 * GET /api/bookings/stats
 */
const getBookingStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Get booking counts by status
  const { data: stats, error } = await supabase
    .from('bookings')
    .select('status')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching booking stats:', error);
    return errorResponse(res, 'Failed to fetch booking statistics', 500);
  }

  const statistics = {
    total: stats.length,
    pending: stats.filter(b => b.status === 'pending').length,
    confirmed: stats.filter(b => b.status === 'confirmed').length,
    completed: stats.filter(b => b.status === 'completed').length,
    cancelled: stats.filter(b => b.status === 'cancelled').length
  };

  return successResponse(res, statistics, 'Booking statistics retrieved successfully');
});

module.exports = {
  getUserBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getBookingStats
};