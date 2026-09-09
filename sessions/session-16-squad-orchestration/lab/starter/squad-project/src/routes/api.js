const express = require('express');
const router = express.Router();
const User = require('../models/user');

const users = new User();

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

module.exports = router;
