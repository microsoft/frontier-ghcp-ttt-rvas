const express = require('express');
const router = express.Router();

// In-memory items store
const items = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 999.99 },
  { id: 2, name: 'Notebook', category: 'stationery', price: 12.99 },
  { id: 3, name: 'Coffee Mug', category: 'kitchen', price: 8.50 }
];
let nextId = 4;

// GET all items
router.get('/', (req, res) => {
  let result = items;
  if (req.query.category) {
    result = result.filter(item => item.category === req.query.category);
  }
  res.json(result);
});

// GET item by ID
router.get('/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST create item
router.post('/', (req, res) => {
  const { name, category, price } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (!price) return res.status(400).json({ error: 'Price is required' });

  const newItem = {
    id: nextId++,
    name,
    category: category || 'uncategorized',
    price: parseFloat(price)
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item
router.put('/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  items[index] = { ...items[index], ...req.body, id: items[index].id };
  res.json(items[index]);
});

// DELETE item
router.delete('/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  items.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
