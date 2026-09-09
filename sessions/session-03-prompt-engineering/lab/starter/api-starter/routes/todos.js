/**
 * Todo Routes — Comment-Driven Development Exercise
 * ===================================================
 * 
 * YOUR TASK: Let Copilot generate the implementation for each endpoint
 * using ONLY the comments as prompts. Position your cursor after each
 * comment block and let Copilot suggest the code.
 * 
 * Tips:
 * - If the first suggestion isn't right, add more detail to the comment
 * - Try adding examples: "// Example: GET /todos?status=completed → [{...}]"
 * - Specify error responses: "// Return 404 with {error: 'Not found'}"
 */

const express = require("express");
const router = express.Router();

// In-memory data store — seed with sample data
let todos = [
  { id: 1, title: "Learn GitHub Copilot", status: "completed", createdAt: new Date().toISOString() },
  { id: 2, title: "Practice prompt engineering", status: "pending", createdAt: new Date().toISOString() },
  { id: 3, title: "Build a REST API", status: "in-progress", createdAt: new Date().toISOString() },
];
let nextId = 4;


// GET / — Return all todos as JSON array
// Support optional query parameter: ?status=pending|completed|in-progress
// If status is provided, filter todos by that status
// If no status filter, return all todos
// Response: 200 with array of todo objects


// GET /:id — Return a single todo by its ID
// Parse the ID from the URL parameter (it will be a string, convert to number)
// If the todo exists, return it with status 200
// If the todo doesn't exist, return status 404 with { error: "Todo not found" }


// POST / — Create a new todo
// Read 'title' from the request body (required)
// Read 'status' from the request body (optional, default to "pending")
// Validate: if title is missing or empty, return 400 with { error: "Title is required" }
// Create the todo with: auto-incremented id, the title, the status, and createdAt timestamp
// Return the created todo with status 201


// PUT /:id — Update an existing todo
// Parse the ID from the URL parameter
// Read updated fields from the request body (title, status — both optional)
// If the todo doesn't exist, return 404 with { error: "Todo not found" }
// Update only the fields that were provided in the request body
// Return the updated todo with status 200


// DELETE /:id — Delete a todo
// Parse the ID from the URL parameter
// If the todo doesn't exist, return 404 with { error: "Todo not found" }
// Remove the todo from the array
// Return status 204 (no content)


module.exports = router;
