const VALID_PRIORITIES = ['low', 'medium', 'high'];
const VALID_STATUSES = ['pending', 'in-progress', 'completed'];

function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '').trim();
}

function validateTask(req, res, next) {
  const errors = [];
  let { title, description, priority, status } = req.body;

  // Sanitize string inputs
  if (title !== undefined) req.body.title = sanitizeInput(title);
  if (description !== undefined) req.body.description = sanitizeInput(description);

  // Validate title (required)
  if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.length === 0) {
    errors.push('title is required and must be a non-empty string');
  } else if (req.body.title.length > 200) {
    errors.push('title must be 200 characters or fewer');
  }

  // Validate description (optional)
  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string');
  } else if (description !== undefined && description.length > 1000) {
    errors.push('description must be 1000 characters or fewer');
  }

  // Validate priority (optional)
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }

  // Validate status (optional)
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: errors
      }
    });
  }

  next();
}

function validateTaskUpdate(req, res, next) {
  const allowedFields = ['title', 'description', 'priority', 'status'];
  const providedFields = Object.keys(req.body).filter(k => allowedFields.includes(k));

  if (providedFields.length === 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'No fields to update'
      }
    });
  }

  // Reuse the same validation logic, but skip the "required" check for title
  const errors = [];
  const { title, description, priority, status } = req.body;

  if (title !== undefined) req.body.title = sanitizeInput(title);
  if (description !== undefined) req.body.description = sanitizeInput(description);

  if (title !== undefined && (typeof title !== 'string' || req.body.title.length === 0 || req.body.title.length > 200)) {
    errors.push('title must be a string between 1 and 200 characters');
  }
  if (description !== undefined && (typeof description !== 'string' || description.length > 1000)) {
    errors.push('description must be a string of 1000 characters or fewer');
  }
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
  }
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: errors
      }
    });
  }

  next();
}

module.exports = { validateTask, validateTaskUpdate, sanitizeInput };
