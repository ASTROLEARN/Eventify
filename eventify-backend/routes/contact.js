const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,
  getContactStats
} = require('../controllers/contactController');
const { authenticateToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/adminAuth');
const {
  validateContact,
  validateUUIDParam,
  validatePagination
} = require('../middleware/validation');

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post('/', validateContact, submitContactForm);

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions (admin only)
 * @access  Private (Admin only)
 */
router.get('/', [
  authenticateToken,
  requireAdmin,
  validatePagination
], getAllContactSubmissions);

/**
 * @route   GET /api/contact/stats
 * @desc    Get contact form statistics (admin only)
 * @access  Private (Admin only)
 */
router.get('/stats', [
  authenticateToken,
  requireAdmin
], getContactStats);

/**
 * @route   GET /api/contact/:id
 * @desc    Get single contact submission by ID (admin only)
 * @access  Private (Admin only)
 */
router.get('/:id', [
  authenticateToken,
  requireAdmin,
  validateUUIDParam('id')
], getContactSubmissionById);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete contact submission (admin only)
 * @access  Private (Admin only)
 */
router.delete('/:id', [
  authenticateToken,
  requireAdmin,
  validateUUIDParam('id')
], deleteContactSubmission);

module.exports = router;