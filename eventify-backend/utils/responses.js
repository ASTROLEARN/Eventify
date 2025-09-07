/**
 * Standard response formatter for consistent API responses
 */

/**
 * Success response formatter
 * @param {Object} res - Express response object
 * @param {Object} data - Data to send in response
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {Object} pagination - Pagination metadata for list endpoints
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200, pagination = null) => {
  const response = {
    success: true,
    message,
    data
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

/**
 * Error response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {Object} errors - Detailed error information
 */
const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  // Log error for debugging (exclude client errors)
  if (statusCode >= 500) {
    console.error(`[${new Date().toISOString()}] Error ${statusCode}: ${message}`, errors);
  }

  return res.status(statusCode).json(response);
};

/**
 * Validation error response formatter
 * @param {Object} res - Express response object
 * @param {Array} validationErrors - Array of validation errors from express-validator
 */
const validationErrorResponse = (res, validationErrors) => {
  const errors = validationErrors.map(error => ({
    field: error.path || error.param,
    message: error.msg,
    value: error.value
  }));

  return errorResponse(res, 'Validation failed', 400, errors);
};

/**
 * Not found response formatter
 * @param {Object} res - Express response object
 * @param {string} resource - Name of the resource that was not found
 */
const notFoundResponse = (res, resource = 'Resource') => {
  return errorResponse(res, `${resource} not found`, 404);
};

/**
 * Unauthorized response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Custom unauthorized message
 */
const unauthorizedResponse = (res, message = 'Unauthorized access') => {
  return errorResponse(res, message, 401);
};

/**
 * Forbidden response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Custom forbidden message
 */
const forbiddenResponse = (res, message = 'Access forbidden') => {
  return errorResponse(res, message, 403);
};

/**
 * Created response formatter
 * @param {Object} res - Express response object
 * @param {Object} data - Created resource data
 * @param {string} message - Success message
 */
const createdResponse = (res, data, message = 'Resource created successfully') => {
  return successResponse(res, data, message, 201);
};

/**
 * Generate pagination metadata
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} totalItems - Total number of items
 */
const generatePagination = (page, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null
  };
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  createdResponse,
  generatePagination
};