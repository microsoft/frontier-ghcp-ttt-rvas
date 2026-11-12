const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');

const users = new User();
const tasks = new Task();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/users — list all users
router.get('/users', (req, res) => {
  const allUsers = users.getAll();
  res.json({ data: allUsers, count: allUsers.length });
});

// POST /api/users — create a new user
router.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  if (typeof name !== 'string' || name.length > 100) {
    return res.status(400).json({ error: 'Name must be a string of at most 100 characters' });
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Email is not valid' });
  }

  const existing = users.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const user = users.create({ name, email });
  res.status(201).json({ data: user });
});

// DELETE /api/users/:id — delete a user
router.delete('/users/:id', (req, res) => {
  const deleted = users.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send();
});

// GET /api/tasks — list tasks, optionally filtered by ?status=
router.get('/tasks', (req, res) => {
  const { status } = req.query;
  if (status && !Task.STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Status must be todo, doing, or done' });
  }
  const list = tasks.getAll(status);
  res.json({ data: list, count: list.length });
});

// POST /api/tasks — create a task
router.post('/tasks', (req, res) => {
  const { title, status } = req.body;

  if (typeof title !== 'string' || !title.trim() || title.length > 100) {
    return res.status(400).json({ error: 'Title is required (at most 100 characters)' });
  }
  if (status !== undefined && !Task.STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Status must be todo, doing, or done' });
  }

  res.status(201).json({ data: tasks.create({ title: title.trim(), status }) });
});

// PATCH /api/tasks/:id — change a task's status
router.patch('/tasks/:id', (req, res) => {
  const { status } = req.body;
  if (!Task.STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Status must be todo, doing, or done' });
  }
  const task = tasks.update(req.params.id, { status });
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json({ data: task });
});

// DELETE /api/tasks/:id — delete a task
router.delete('/tasks/:id', (req, res) => {
  if (!tasks.delete(req.params.id)) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).send();
});

module.exports = router;
