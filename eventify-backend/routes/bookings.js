const express = require('express');
const router = express.Router();
const {
  getUserBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getBookingStats
} = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/auth');
const {
  validateBooking,
  validateBookingStatusUpdate,
  validateUUIDParam,
  validatePagination
} = require('../middleware/validation');

/**
 * @route   GET /api/bookings
 * @desc    Get user's bookings with pagination
 * @access  Private
 */
router.get('/', [
  authenticateToken,
  validatePagination
], getUserBookings);

/**
 * @route   GET /api/bookings/stats
 * @desc    Get booking statistics for user
 * @access  Private
 */
router.get('/stats', authenticateToken, getBookingStats);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get single booking by ID
 * @access  Private (owner only)
 */
router.get('/:id', [
  authenticateToken,
  validateUUIDParam('id')
], getBookingById);

/**
 * @route   POST /api/bookings
 * @desc    Create new booking
 * @access  Private
 */
router.post('/', [
  authenticateToken,
  validateBooking
], createBooking);

/**
 * @route   PUT /api/bookings/:id
 * @desc    Update booking status
 * @access  Private (event owner only)
 */
router.put('/:id', [
  authenticateToken,
  validateUUIDParam('id'),
  validateBookingStatusUpdate
], updateBookingStatus);

/**
 * @route   DELETE /api/bookings/:id
 * @desc    Cancel/delete booking
 * @access  Private (event owner only)
 */
router.delete('/:id', [
  authenticateToken,
  validateUUIDParam('id')
], cancelBooking);

module.exports = router;