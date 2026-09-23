/**
 * API Routes (Solution)
 * ======================
 * Fixed: changed 'const nextId' to 'let nextId' so it can be incremented.
 */

const express = require("express");
const router = express.Router();

let items = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Mouse", price: 29.99 },
  { id: 3, name: "Keyboard", price: 79.99 },
];

// FIX: changed from 'const' to 'let' so it can be incremented
let nextId = items.length + 1;

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.get("/items", (req, res) => {
  res.json(items);
});

router.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

router.post("/items", (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  const newItem = { id: nextId++, name, price };  // FIX: works now that nextId is 'let'
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;
