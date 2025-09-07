const express = require('express');
const router = express.Router();
const {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorsByCategory,
  getAvailableVendors
} = require('../controllers/vendorController');
const { authenticateToken } = require('../middleware/auth');
const {
  validateVendor,
  validateUUIDParam,
  validatePagination,
  handleValidation
} = require('../middleware/validation');
const { param } = require('express-validator');

/**
 * @route   GET /api/vendors
 * @desc    Get all vendors with pagination and filtering
 * @access  Public
 */
router.get('/', validatePagination, getAllVendors);

/**
 * @route   GET /api/vendors/category/:category
 * @desc    Get vendors by category
 * @access  Public
 */
router.get('/category/:category', [
  param('category')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Category must be between 1 and 100 characters'),
  validatePagination,
  handleValidation
], getVendorsByCategory);

/**
 * @route   GET /api/vendors/available/:date
 * @desc    Get available vendors for a specific date
 * @access  Public
 */
router.get('/available/:date', [
  param('date')
    .isISO8601()
    .withMessage('Please provide a valid date in ISO format'),
  validatePagination,
  handleValidation
], getAvailableVendors);

/**
 * @route   GET /api/vendors/:id
 * @desc    Get single vendor by ID
 * @access  Public
 */
router.get('/:id', validateUUIDParam('id'), getVendorById);

/**
 * @route   POST /api/vendors
 * @desc    Create new vendor
 * @access  Private
 */
router.post('/', [
  authenticateToken,
  validateVendor
], createVendor);

/**
 * @route   PUT /api/vendors/:id
 * @desc    Update vendor
 * @access  Private
 */
router.put('/:id', [
  authenticateToken,
  validateUUIDParam('id'),
  validateVendor
], updateVendor);

/**
 * @route   DELETE /api/vendors/:id
 * @desc    Delete vendor
 * @access  Private
 */
router.delete('/:id', [
  authenticateToken,
  validateUUIDParam('id')
], deleteVendor);

module.exports = router;