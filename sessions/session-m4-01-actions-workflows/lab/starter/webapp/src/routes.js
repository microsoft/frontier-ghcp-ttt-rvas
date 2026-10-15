const express = require('express');
const router = express.Router();

// In-memory data store
let items = [
  { id: 1, name: 'Widget A', price: 9.99, category: 'tools' },
  { id: 2, name: 'Widget B', price: 19.99, category: 'tools' },
  { id: 3, name: 'Gadget X', price: 49.99, category: 'electronics' },
];
let nextId = 4;

// GET /api/items — list all items
router.get('/items', (req, res) => {
  const { category } = req.query;
  let result = items;
  if (category) {
    result = items.filter(item => item.category === category);
  }
  res.json({ data: result, total: result.length });
});

// GET /api/items/:id — get one item
router.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ data: item });
});

// POST /api/items — create an item
router.post('/items', (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'name and price are required' });
  }

  const newItem = {
    id: nextId++,
    name,
    price: parseFloat(price),
    category: category || 'general',
  };

  items.push(newItem);
  res.status(201).json({ data: newItem });
});

// DELETE /api/items/:id — delete an item
router.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
