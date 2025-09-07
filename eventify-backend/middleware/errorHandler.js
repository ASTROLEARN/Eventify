const { errorResponse } = require('../utils/responses');

/**
 * Global error handling middleware
 * Catches all unhandled errors and returns consistent error responses
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation failed', 400, err.errors);
  }

  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400);
  }

  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  // Handle Supabase errors
  if (err.code === '23505') { // PostgreSQL unique constraint violation
    return errorResponse(res, 'Resource already exists', 409);
  }

  if (err.code === '23503') { // PostgreSQL foreign key constraint violation
    return errorResponse(res, 'Referenced resource does not exist', 400);
  }

  if (err.code === '42P01') { // PostgreSQL table does not exist
    return errorResponse(res, 'Database configuration error', 500);
  }

  // Handle rate limiting errors
  if (err.statusCode === 429) {
    return errorResponse(res, 'Too many requests, please try again later', 429);
  }

  // Default server error
  const statusCode = err.statusCode || err.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message || 'Internal server error';

  return errorResponse(res, message, statusCode);
};

/**
 * 404 handler for unmatched routes
 */
const notFoundHandler = (req, res) => {
  return errorResponse(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
};

/**
 * Async wrapper to catch errors in async route handlers
 * @param {Function} fn - Async function to wrap
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler
};