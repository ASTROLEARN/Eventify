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
 * Get all events with pagination and filtering
 * GET /api/events
 */
const getAllEvents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Build query with filters
    let query = supabase
      .from('events')
      .select(`
        id,
        title,
        description,
        event_date,
        location,
        category,
        created_at,
        updated_at,
        created_by,
        profiles!created_by (
          id,
          name,
          email
        )
      `, { count: 'exact' });

    // Apply filters
    if (req.query.category) {
      query = query.ilike('category', `%${req.query.category}%`);
    }

    if (req.query.location) {
      query = query.ilike('location', `%${req.query.location}%`);
    }

    if (req.query.date_from) {
      query = query.gte('event_date', req.query.date_from);
    }

    if (req.query.date_to) {
      query = query.lte('event_date', req.query.date_to);
    }

    // Apply pagination and ordering
    query = query
      .order('event_date', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data: events, error, count } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      return errorResponse(res, 'Failed to fetch events', 500);
    }

    const pagination = generatePagination(page, limit, count || 0);

    return successResponse(res, events || [], 'Events retrieved successfully', 200, pagination);
  } catch (error) {
    console.error('Unexpected error fetching events:', error);
    return errorResponse(res, 'Failed to fetch events', 500);
  }
});

/**
 * Get single event by ID
 * GET /api/events/:id
 */
const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { data: event, error } = await supabase
    .from('events')
    .select(`
      id,
      title,
      description,
      event_date,
      location,
      category,
      created_at,
      updated_at,
      created_by,
      profiles!created_by (
        id,
        name,
        email
      )
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching event:', error);
    return errorResponse(res, 'Failed to fetch event', 500);
  }

  if (!event) {
    return notFoundResponse(res, 'Event');
  }

  return successResponse(res, event, 'Event retrieved successfully');
});

/**
 * Create new event
 * POST /api/events
 */
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, event_date, location, category } = req.body;
  const userId = req.user.id;

  // Validate event date is in the future
  const eventDate = new Date(event_date);
  const now = new Date();
  
  if (eventDate <= now) {
    return errorResponse(res, 'Event date must be in the future', 400);
  }

  const { data: newEvent, error } = await supabase
    .from('events')
    .insert([
      {
        title: title.trim(),
        description: description?.trim(),
        event_date: eventDate.toISOString(),
        location: location.trim(),
        category: category?.trim(),
        created_by: userId
      }
    ])
    .select(`
      id,
      title,
      description,
      event_date,
      location,
      category,
      created_at,
      updated_at,
      profiles:created_by (
        id,
        name,
        email
      )
    `)
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return errorResponse(res, 'Failed to create event', 500);
  }

  return createdResponse(res, newEvent, 'Event created successfully');
});

/**
 * Update event
 * PUT /api/events/:id
 */
const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, event_date, location, category } = req.body;
  const userId = req.user.id;

  // Check if event exists and user owns it
  const { data: existingEvent, error: findError } = await supabase
    .from('events')
    .select('id, created_by')
    .eq('id', id)
    .single();

  if (findError || !existingEvent) {
    return notFoundResponse(res, 'Event');
  }

  if (existingEvent.created_by !== userId) {
    return forbiddenResponse(res, 'You can only update your own events');
  }

  // Validate event date is in the future
  const eventDate = new Date(event_date);
  const now = new Date();
  
  if (eventDate <= now) {
    return errorResponse(res, 'Event date must be in the future', 400);
  }

  const { data: updatedEvent, error: updateError } = await supabase
    .from('events')
    .update({
      title: title.trim(),
      description: description?.trim(),
      event_date: eventDate.toISOString(),
      location: location.trim(),
      category: category?.trim(),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select(`
      id,
      title,
      description,
      event_date,
      location,
      category,
      created_at,
      updated_at,
      profiles:created_by (
        id,
        name,
        email
      )
    `)
    .single();

  if (updateError) {
    console.error('Error updating event:', updateError);
    return errorResponse(res, 'Failed to update event', 500);
  }

  return successResponse(res, updatedEvent, 'Event updated successfully');
});

/**
 * Delete event
 * DELETE /api/events/:id
 */
const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Check if event exists and user owns it
  const { data: existingEvent, error: findError } = await supabase
    .from('events')
    .select('id, created_by')
    .eq('id', id)
    .single();

  if (findError || !existingEvent) {
    return notFoundResponse(res, 'Event');
  }

  if (existingEvent.created_by !== userId) {
    return forbiddenResponse(res, 'You can only delete your own events');
  }

  const { error: deleteError } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Error deleting event:', deleteError);
    return errorResponse(res, 'Failed to delete event', 500);
  }

  return successResponse(res, null, 'Event deleted successfully');
});

/**
 * Get events created by current user
 * GET /api/events/my-events
 */
const getMyEvents = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { data: events, error, count } = await supabase
    .from('events')
    .select(`
      id,
      title,
      description,
      event_date,
      location,
      category,
      created_at,
      updated_at
    `, { count: 'exact' })
    .eq('created_by', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching user events:', error);
    return errorResponse(res, 'Failed to fetch your events', 500);
  }

  const pagination = generatePagination(page, limit, count);

  return successResponse(res, events, 'Your events retrieved successfully', 200, pagination);
});

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents
};