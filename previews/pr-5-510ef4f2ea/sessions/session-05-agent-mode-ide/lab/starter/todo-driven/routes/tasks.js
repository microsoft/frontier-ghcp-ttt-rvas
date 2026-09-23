const express = require('express');
const router = express.Router();
const { validateTask, validateTaskUpdate } = require('../utils/validator');

// In-memory task store
const tasks = [];
let nextId = 1;

// TODO: Implement GET / — list all tasks
// Support query parameters:
//   ?status=pending|in-progress|completed — filter by status
//   ?priority=low|medium|high — filter by priority
//   ?sort=createdAt|priority — sort results (default: createdAt descending)
// Return the full list if no filters are provided


// TODO: Implement GET /:id — get a single task by ID
// Return 404 with a structured error if the task doesn't exist


// TODO: Implement POST / — create a new task
// Use the validateTask middleware before the handler
// Required fields: title (string, 1-200 chars)
// Optional fields: description (string), priority (low|medium|high, default: medium), 
//   status (pending|in-progress|completed, default: pending)
// Auto-generate: id, createdAt, updatedAt
// Return 201 with the created task


// TODO: Implement PUT /:id — update an existing task
// Use the validateTaskUpdate middleware before the handler
// Allow partial updates (only update fields that are provided)
// Update the updatedAt timestamp
// Return 404 if task doesn't exist, 200 with the updated task otherwise


// TODO: Implement DELETE /:id — delete a task
// Return 404 if task doesn't exist
// Return 200 with the deleted task (so the client knows what was removed)


module.exports = router;
