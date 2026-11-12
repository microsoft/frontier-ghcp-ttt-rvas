// Returns a list of error messages. An empty list means the input is valid.
function validateNote(input, { partial = false } = {}) {
  const errors = [];

  if (!partial || input.title !== undefined) {
    if (typeof input.title !== 'string' || input.title.trim() === '') {
      errors.push('title is required');
    } else if (input.title.length > 100) {
      errors.push('title must be 100 characters or fewer');
    }
  }

  if (input.body !== undefined && typeof input.body !== 'string') {
    errors.push('body must be a string');
  }

  return errors;
}

module.exports = { validateNote };
