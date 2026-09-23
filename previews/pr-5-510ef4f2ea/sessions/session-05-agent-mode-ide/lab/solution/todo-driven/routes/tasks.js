const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { validateTask, validateTaskUpdate } = require('../utils/validator');

const tasks = [];
let nextId = 1;

// Rate limiting for write operations
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: { code: 'RATE_LIMIT', message: 'Too many requests, try again later' } }
});

// GET / — list all tasks with optional filters and sorting
router.get('/', async (req, res) => {
  try {
    let result = [...tasks];

    if (req.query.status) {
      result = result.filter(t => t.status === req.query.status);
    }
    if (req.query.priority) {
      result = result.filter(t => t.priority === req.query.priority);
    }

    const sortField = req.query.sort || 'createdAt';
    if (sortField === 'priority') {
      const order = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => order[b.priority] - order[a.priority]);
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /:id — get a single task
router.get('/:id', async (req, res, next) => {
  try {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Task with ID ${req.params.id} not found` }
      });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST / — create a new task
router.post('/', writeLimiter, validateTask, async (req, res, next) => {
  try {
    const { title, description, priority, status } = req.body;

    const task = {
      id: nextId++,
      title,
      description: description || '',
      priority: priority || 'medium',
      status: status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(task);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// PUT /:id — update a task
router.put('/:id', writeLimiter, validateTaskUpdate, async (req, res, next) => {
  try {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Task with ID ${req.params.id} not found` }
      });
    }

    tasks[index] = {
      ...tasks[index],
      ...req.body,
      id: tasks[index].id,
      createdAt: tasks[index].createdAt,
      updatedAt: new Date().toISOString()
    };

    res.json(tasks[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE /:id — delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({
        error: { code: 'NOT_FOUND', message: `Task with ID ${req.params.id} not found` }
      });
    }

    const deleted = tasks.splice(index, 1)[0];
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
