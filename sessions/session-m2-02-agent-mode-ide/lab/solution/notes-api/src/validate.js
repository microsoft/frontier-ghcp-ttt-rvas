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

  if (input.tags !== undefined) {
    if (!Array.isArray(input.tags) || input.tags.length > 5) {
      errors.push('tags must be an array of at most 5 strings');
    } else if (input.tags.some((t) => typeof t !== 'string' || !/^[a-z0-9-]{1,20}$/.test(t))) {
      errors.push('each tag must be 1 to 20 lowercase letters, digits, or hyphens');
    }
  }

  return errors;
}

module.exports = { validateNote };
