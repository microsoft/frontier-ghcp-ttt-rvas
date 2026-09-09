// TODO: Implement validateTask middleware
// Validate the request body for creating a new task:
//   - title: required, string, 1-200 characters
//   - description: optional, string, max 1000 characters
//   - priority: optional, must be one of: "low", "medium", "high"
//   - status: optional, must be one of: "pending", "in-progress", "completed"
// If validation fails, return 400 with: { "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }
// If validation passes, call next()
function validateTask(req, res, next) {
  // TODO: Implement this
}

// TODO: Implement validateTaskUpdate middleware
// Same as validateTask, but all fields are optional (partial update)
// At least one field must be provided
// If the body is empty, return 400 with: { "error": { "code": "VALIDATION_ERROR", "message": "No fields to update" } }
function validateTaskUpdate(req, res, next) {
  // TODO: Implement this
}

// TODO: Implement sanitizeInput helper function
// Strip HTML tags from string inputs to prevent XSS
// Trim whitespace from strings
// Export it for use in the validators above
function sanitizeInput(str) {
  // TODO: Implement this
}

module.exports = { validateTask, validateTaskUpdate, sanitizeInput };
