const VALID_STATUSES = ['pending', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function validate(operation) {
  return (req, res, next) => {
    const errors = [];
    const { title, description, status, priority } = req.body;

    if (operation === 'create') {
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        errors.push('title is required');
      }
    }

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0 || title.length > 200) {
        errors.push('title must be a string between 1 and 200 characters');
      }
    }

    if (description !== undefined && typeof description !== 'string') {
      errors.push('description must be a string');
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
      errors.push(`priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }

    next();
  };
}

module.exports = { validate };
