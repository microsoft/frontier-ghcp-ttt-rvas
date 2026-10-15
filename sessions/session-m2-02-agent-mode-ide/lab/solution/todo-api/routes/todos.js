const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { generateId, timestamp } = require('../utils/helpers');

// In-memory storage
const todos = [];

// GET /api/todos — list all, with optional filters
router.get('/', (req, res) => {
  let result = [...todos];

  if (req.query.status) {
    result = result.filter(t => t.status === req.query.status);
  }
  if (req.query.priority) {
    result = result.filter(t => t.priority === req.query.priority);
  }

  res.json(result);
});

// GET /api/todos/:id — get one
router.get('/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// POST /api/todos — create
router.post('/', validate('create'), (req, res) => {
  const { title, description, status, priority } = req.body;

  const todo = {
    id: generateId(),
    title,
    description: description || '',
    status: status || 'pending',
    priority: priority || 'medium',
    createdAt: timestamp(),
    updatedAt: timestamp()
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /api/todos/:id — update
router.put('/:id', validate('update'), (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index] = {
    ...todos[index],
    ...req.body,
    id: todos[index].id,
    createdAt: todos[index].createdAt,
    updatedAt: timestamp()
  };

  res.json(todos[index]);
});

// DELETE /api/todos/:id — delete
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
