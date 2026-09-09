const express = require('express');
const app = express();

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Items CRUD (existing, working code)
const items = [
  { id: 1, name: 'Widget', price: 9.99 },
  { id: 2, name: 'Gadget', price: 24.99 },
  { id: 3, name: 'Doohickey', price: 4.99 }
];
let nextId = 4;

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  const item = { id: nextId++, name, price: parseFloat(price) };
  items.push(item);
  res.status(201).json(item);
});

// ---- FIXED: Change 5 — secrets from environment variables, not hardcoded ----
const JWT_SECRET = process.env.JWT_SECRET;
const API_KEY = process.env.API_KEY;
if (!JWT_SECRET || !API_KEY) {
  console.warn('Warning: JWT_SECRET and API_KEY must be set via environment variables');
}

// ---- FIXED: Change 2 — user data stored without returning passwords ----
const users = [
  { id: 1, username: 'admin', email: 'admin@test.com', passwordHash: 'hashed_pw_123', role: 'admin' },
  { id: 2, username: 'jane', email: 'jane@test.com', passwordHash: 'hashed_pw_456', role: 'user' }
];

// Returns user objects with passwordHash stripped
function sanitizeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

app.get('/api/users', (req, res) => {
  res.json(users.map(sanitizeUser));
});

// ---- FIXED: Change 1 — user search with sanitized input (no SQL injection) ----
app.get('/api/users/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase().trim();
  if (!query) return res.json({ results: [] });
  // In-memory filter — in production, use parameterized queries with your ORM/db driver
  const results = users
    .filter(u => u.username.toLowerCase().includes(query) || u.email.toLowerCase().includes(query))
    .map(sanitizeUser);
  res.json({ query, results });
});

// ---- FIXED: Change 4 — POST /api/users with proper error handling ----
app.post('/api/users', async (req, res) => {
  try {
    const userData = JSON.parse(req.body.data);
    const user = { id: users.length + 1, ...userData };
    users.push(user);
    res.status(201).json(sanitizeUser(user));
  } catch (err) {
    res.status(400).json({ error: 'Invalid user data: ' + err.message });
  }
});

// ---- FIXED: Change 6 — /api/products reuses items data instead of duplicating it ----
app.get('/api/products', (req, res) => {
  res.json(items);
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

module.exports = app;
