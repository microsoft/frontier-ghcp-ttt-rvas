/**
 * API Routes
 * ==========
 * This file has an intentional bug that prevents the server from starting.
 * Can you find it with Copilot Chat and @terminal?
 */

const express = require("express");
const router = express.Router();

// In-memory data store
let items = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Mouse", price: 29.99 },
  { id: 3, name: "Keyboard", price: 79.99 },
];

// BUG: 'nextId' is referenced before declaration (used 'const' in a way
// that causes a runtime error when the module loads)
const nextId = items.length + 1;

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get all items
router.get("/items", (req, res) => {
  res.json(items);
});

// Get item by ID
router.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

// Create new item — BUG: nextId never increments because it's a const
router.post("/items", (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  const newItem = { id: nextId++, name, price };  // BUG: can't increment a const
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;
