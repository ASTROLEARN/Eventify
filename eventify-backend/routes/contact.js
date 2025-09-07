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
 * @access  Private
 * @note    In a real application, this should be protected with admin role check
 */
router.get('/', [
  authenticateToken, // Add admin role check here in real app
  validatePagination
], getAllContactSubmissions);

/**
 * @route   GET /api/contact/stats
 * @desc    Get contact form statistics (admin only)
 * @access  Private
 * @note    In a real application, this should be protected with admin role check
 */
router.get('/stats', [
  authenticateToken // Add admin role check here in real app
], getContactStats);

/**
 * @route   GET /api/contact/:id
 * @desc    Get single contact submission by ID (admin only)
 * @access  Private
 * @note    In a real application, this should be protected with admin role check
 */
router.get('/:id', [
  authenticateToken, // Add admin role check here in real app
  validateUUIDParam('id')
], getContactSubmissionById);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete contact submission (admin only)
 * @access  Private
 * @note    In a real application, this should be protected with admin role check
 */
router.delete('/:id', [
  authenticateToken, // Add admin role check here in real app
  validateUUIDParam('id')
], deleteContactSubmission);

module.exports = router;