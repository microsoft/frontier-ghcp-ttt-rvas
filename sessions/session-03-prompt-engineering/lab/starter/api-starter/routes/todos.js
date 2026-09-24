const express = require("express");
const { TodoStore } = require("../lib/todo-store");

const router = express.Router();
const store = new TodoStore([
  { id: 1, title: "Review a prompt", status: "pending", priority: "normal" },
]);

// GET /todos
// Return all todos. Support an optional status query filter.
// Return 400 with { error: message } when the status value is invalid.
// The later change request adds priority filtering.

// GET /todos/:id
// Return one todo. Return 404 with { error: "Todo not found" } when absent.

// POST /todos
// Create a todo from JSON input.
// Return 201 on success and 400 with { error: message } for invalid input.

// PUT /todos/:id
// Update only fields supplied in the request body.
// Return 404 when the ID is absent and 400 for invalid input.

// DELETE /todos/:id
// Delete the todo and return 204. Return 404 when the ID is absent.

module.exports = router;
