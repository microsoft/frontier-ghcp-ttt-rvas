/**
 * API Routes — Intentionally inconsistent styles.
 * 
 * This file has working endpoints but uses INCONSISTENT patterns:
 * - Mixed response formats
 * - Inconsistent error handling
 * - No validation on some endpoints
 * - Different naming conventions
 * 
 * The point: after adding the API design skill, ask Copilot to create
 * a NEW endpoint and see if it follows consistent conventions.
 */

const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage
let users = [];
let nextId = 1;

// GET /api/users — returns array directly (no wrapper)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/users/:id — returns object directly
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    // Inconsistent error format — just a string
    return res.status(404).send('User not found');
  }
  res.json(user);
});

// POST /api/users — no input validation
app.post('/api/users', (req, res) => {
  const user = {
    id: nextId++,
    ...req.body,
    created: new Date()  // Inconsistent date format (not ISO)
  };
  users.push(user);
  // Returns 200 instead of 201
  res.json({ message: 'Created', user });
});

// PUT /api/users/:id — different error format
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    // Yet another error format
    return res.status(404).json({ err: 'not found' });
  }
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// DELETE /api/User/:id — wrong naming convention (singular, capitalized)
app.delete('/api/User/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  // Returns 200 with body instead of 204
  res.json({ deleted: true });
});

// Health check
app.get('/health', (req, res) => {
  res.send('OK');
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
