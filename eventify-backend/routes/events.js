const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents
} = require('../controllers/eventController');
const { authenticateSupabaseToken, optionalAuthentication } = require('../middleware/supabaseAuth');
const {
  validateEvent,
  validateUUIDParam,
  validatePagination,
  validateEventFilters
} = require('../middleware/validation');

/**
 * @route   GET /api/events
 * @desc    Get all events with pagination and filtering
 * @access  Public
 */
router.get('/', [
  validatePagination,
  validateEventFilters
], getAllEvents);

/**
 * @route   GET /api/events/my-events
 * @desc    Get events created by current user
 * @access  Private
 */
router.get('/my-events', [
  authenticateSupabaseToken,
  validatePagination
], getMyEvents);

/**
 * @route   GET /api/events/:id
 * @desc    Get single event by ID
 * @access  Public
 */
router.get('/:id', validateUUIDParam('id'), getEventById);

/**
 * @route   POST /api/events
 * @desc    Create new event
 * @access  Private
 */
router.post('/', [
  authenticateSupabaseToken,
  validateEvent
], createEvent);

/**
 * @route   PUT /api/events/:id
 * @desc    Update event
 * @access  Private (owner only)
 */
router.put('/:id', [
  authenticateSupabaseToken,
  validateUUIDParam('id'),
  validateEvent
], updateEvent);

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete event
 * @access  Private (owner only)
 */
router.delete('/:id', [
  authenticateSupabaseToken,
  validateUUIDParam('id')
], deleteEvent);

module.exports = router;