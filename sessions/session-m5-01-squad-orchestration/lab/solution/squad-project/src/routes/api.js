const express = require('express');
const router = express.Router();
const User = require('../models/user');

const users = new User();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get('/users', (req, res) => {
  const allUsers = users.getAll();
  res.json({ data: allUsers, count: allUsers.length });
});

router.post('/users', (req, res) => {
  const { name, email } = req.body;
  const normalizedName = typeof name === 'string' ? name.trim() : '';

  if (!normalizedName) {
    return res.status(400).json({ error: 'Name must be a non-empty string' });
  }

  if (normalizedName.length > 100) {
    return res.status(400).json({ error: 'Name must be 100 characters or fewer' });
  }

  if (typeof email !== 'string' || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Email must be a valid email address' });
  }

  const existing = users.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const user = users.create({ name: normalizedName, email });
  return res.status(201).json({ data: user });
});

router.delete('/users/:id', (req, res) => {
  const deleted = users.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(204).send();
});

module.exports = router;
