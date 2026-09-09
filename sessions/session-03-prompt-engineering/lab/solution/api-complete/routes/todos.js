/**
 * Todo Routes — Solution
 * =======================
 * Complete CRUD implementation.
 */

const express = require("express");
const router = express.Router();

let todos = [
  { id: 1, title: "Learn GitHub Copilot", status: "completed", createdAt: new Date().toISOString() },
  { id: 2, title: "Practice prompt engineering", status: "pending", createdAt: new Date().toISOString() },
  { id: 3, title: "Build a REST API", status: "in-progress", createdAt: new Date().toISOString() },
];
let nextId = 4;

// GET / — Return all todos, optional ?status= filter
router.get("/", (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtered = todos.filter((t) => t.status === status);
    return res.json(filtered);
  }
  res.json(todos);
});

// GET /:id — Return a single todo by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(todo);
});

// POST / — Create a new todo
router.post("/", (req, res) => {
  const { title, status } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    status: status || "pending",
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /:id — Update a todo
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  const { title, status } = req.body;
  if (title !== undefined) todo.title = title.trim();
  if (status !== undefined) todo.status = status;
  res.json(todo);
});

// DELETE /:id — Delete a todo
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
