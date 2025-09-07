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
const { authenticateToken, optionalAuth } = require('../middleware/auth');
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
  authenticateToken,
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
  authenticateToken,
  validateEvent
], createEvent);

/**
 * @route   PUT /api/events/:id
 * @desc    Update event
 * @access  Private (owner only)
 */
router.put('/:id', [
  authenticateToken,
  validateUUIDParam('id'),
  validateEvent
], updateEvent);

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete event
 * @access  Private (owner only)
 */
router.delete('/:id', [
  authenticateToken,
  validateUUIDParam('id')
], deleteEvent);

module.exports = router;