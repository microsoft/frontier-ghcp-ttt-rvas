// FIX: Centralized error handler — consistent error responses
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: 'Validation failed',
    details: [statusCode === 500 ? 'Internal server error' : err.message]
  });
}

module.exports = errorHandler;
