const express = require('express');
const router = express.Router();
const db = require('../db');

// CODE SMELL: All logic crammed into route handlers
// CODE SMELL: Validation mixed with business logic
// CODE SMELL: Duplicated patterns with products.js
// CODE SMELL: No error handling — crashes on bad input
// CODE SMELL: Hardcoded strings everywhere

// GET all users
router.get('/', (req, res) => {
  // Inline filtering logic — should be extracted
  let users = db.users;
  if (req.query.role) {
    users = users.filter(u => u.role === req.query.role);
  }
  if (req.query.name) {
    users = users.filter(u => u.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }
  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = db.users.find(u => u.id === id);
  if (!user) {
    // Inconsistent error format — sometimes string, sometimes object
    res.status(404).send('User not found');
    return;
  }
  res.json(user);
});

// POST create user
router.post('/', (req, res) => {
  // Validation inline — no middleware, no reuse
  const { name, email, role } = req.body;

  if (!name) {
    res.status(400).send('Name is required');
    return;
  }
  if (!email) {
    res.status(400).send('Email is required');
    return;
  }
  // Duplicated email format check — same logic exists in products for product name
  if (!email.includes('@')) {
    res.status(400).send('Invalid email format');
    return;
  }
  // No check for duplicate emails
  if (name.length < 2 || name.length > 100) {
    res.status(400).send('Name must be 2-100 characters');
    return;
  }

  const newUser = {
    id: db.nextUserId++,
    name,
    email,
    role: role || 'user'
  };

  db.users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = db.users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    // Different error format from GET — inconsistent
    res.status(404).json({ message: 'User not found' });
    return;
  }

  // Same validation repeated — not DRY
  const { name, email, role } = req.body;
  if (name && (name.length < 2 || name.length > 100)) {
    res.status(400).send('Name must be 2-100 characters');
    return;
  }
  if (email && !email.includes('@')) {
    res.status(400).send('Invalid email format');
    return;
  }

  db.users[userIndex] = { ...db.users[userIndex], ...req.body };
  res.json(db.users[userIndex]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = db.users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    res.status(404).send('Not found');
    return;
  }
  db.users.splice(userIndex, 1);
  // Returns nothing — should return the deleted user or a confirmation
  res.status(204).send();
});

module.exports = router;
