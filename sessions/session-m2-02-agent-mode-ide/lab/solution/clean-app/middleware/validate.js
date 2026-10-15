// FIX: Centralized validation middleware — reusable across routes
function validateRequired(fields) {
  return (req, res, next) => {
    const errors = [];
    for (const field of fields) {
      if (!req.body[field]) {
        errors.push(`${field} is required`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    next();
  };
}

function validateStringLength(field, min, max) {
  return (req, res, next) => {
    const value = req.body[field];
    if (value !== undefined && (typeof value !== 'string' || value.length < min || value.length > max)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: [`${field} must be a string between ${min} and ${max} characters`]
      });
    }
    next();
  };
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (email !== undefined && (!email.includes('@') || !email.includes('.'))) {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['Invalid email format']
    });
  }
  next();
}

function validatePositiveNumber(field) {
  return (req, res, next) => {
    const value = req.body[field];
    if (value !== undefined && (typeof value !== 'number' || value < 0)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: [`${field} must be a non-negative number`]
      });
    }
    next();
  };
}

module.exports = { validateRequired, validateStringLength, validateEmail, validatePositiveNumber };
