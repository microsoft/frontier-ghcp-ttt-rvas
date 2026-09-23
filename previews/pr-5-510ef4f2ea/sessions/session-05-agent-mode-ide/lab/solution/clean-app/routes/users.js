// FIX: Routes only handle HTTP concerns — business logic is in models
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../models/users');
const { validateRequired, validateStringLength, validateEmail } = require('../middleware/validate');

router.get('/', (req, res) => {
  const users = getAllUsers(req.query);
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/',
  validateRequired(['name', 'email']),
  validateStringLength('name', 2, 100),
  validateEmail,
  (req, res) => {
    const user = createUser(req.body);
    res.status(201).json(user);
  }
);

router.put('/:id',
  validateStringLength('name', 2, 100),
  validateEmail,
  (req, res) => {
    const user = updateUser(parseInt(req.params.id), req.body);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  }
);

router.delete('/:id', (req, res) => {
  const user = deleteUser(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send();
});

module.exports = router;
