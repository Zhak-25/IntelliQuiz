// middleware/errorHandler.js
// Centralized error handling middleware for IntelliQuiz backend

/**
 * Attach this LAST in server.js after all routes.
 * Any route that calls next(err) will land here.
 */
const errorHandler = (err, req, res, next) => {
  // Log the full error server-side for debugging
  console.error('🔴  Error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Determine status code
  let statusCode = err.statusCode || 500;
  let message    = err.message    || 'Internal Server Error';

  // ── MySQL-specific errors ──────────────────────────────────────────────────
  if (err.code === 'ER_NO_SUCH_TABLE') {
    statusCode = 500;
    message    = 'Database table not found. Please run the SQL setup script.';
  } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
    statusCode = 500;
    message    = 'Database access denied. Check your .env credentials.';
  } else if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    message    = 'Cannot connect to MySQL. Make sure XAMPP MySQL is running.';
  } else if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message    = 'Duplicate entry — record already exists.';
  }

  // ── Validation / request errors ────────────────────────────────────────────
  if (err.type === 'validation') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};

/**
 * 404 handler — attach BEFORE the main errorHandler but AFTER all routes.
 */
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

module.exports = { errorHandler, notFound };
