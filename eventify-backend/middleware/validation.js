const { body, param, query, validationResult } = require('express-validator');
const { validationErrorResponse } = require('../utils/responses');

/**
 * Middleware to handle validation results
 * Returns formatted validation errors if any exist
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrorResponse(res, errors.array());
  }
  next();
};

/**
 * User registration validation rules
 */
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidation
];

/**
 * User login validation rules
 */
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidation
];

/**
 * Event creation/update validation rules
 */
const validateEvent = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Event title must be between 3 and 255 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('event_date')
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date in ISO format'),
  
  body('location')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Location must be between 3 and 255 characters'),
  
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category cannot exceed 100 characters'),
  
  handleValidation
];

/**
 * Vendor creation/update validation rules
 */
const validateVendor = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Vendor name must be between 2 and 255 characters'),
  
  body('category')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Category must be between 2 and 100 characters'),
  
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  
  body('availability')
    .optional()
    .isArray()
    .withMessage('Availability must be an array'),
  
  body('image_url')
    .optional()
    .isURL()
    .withMessage('Please provide a valid URL for the image'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  handleValidation
];

/**
 * Booking creation validation rules
 */
const validateBooking = [
  body('event_id')
    .isUUID()
    .withMessage('Please provide a valid event ID'),
  
  body('vendor_id')
    .isUUID()
    .withMessage('Please provide a valid vendor ID'),
  
  handleValidation
];

/**
 * Booking status update validation rules
 */
const validateBookingStatusUpdate = [
  body('status')
    .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
    .withMessage('Status must be one of: pending, confirmed, cancelled, completed'),
  
  handleValidation
];

/**
 * Contact form validation rules
 */
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  handleValidation
];

/**
 * UUID parameter validation
 */
const validateUUIDParam = (paramName = 'id') => [
  param(paramName)
    .isUUID()
    .withMessage(`Please provide a valid ${paramName}`),
  
  handleValidation
];

/**
 * Pagination query validation
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidation
];

/**
 * Event filtering validation
 */
const validateEventFilters = [
  query('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category filter cannot exceed 100 characters'),
  
  query('location')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Location filter cannot exceed 255 characters'),
  
  query('date_from')
    .optional()
    .isISO8601()
    .withMessage('Date from must be in ISO format'),
  
  query('date_to')
    .optional()
    .isISO8601()
    .withMessage('Date to must be in ISO format'),
  
  handleValidation
];

module.exports = {
  handleValidation,
  validateUserRegistration,
  validateUserLogin,
  validateEvent,
  validateVendor,
  validateBooking,
  validateBookingStatusUpdate,
  validateContact,
  validateUUIDParam,
  validatePagination,
  validateEventFilters
};