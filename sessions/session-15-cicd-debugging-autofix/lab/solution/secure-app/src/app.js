const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize in-memory SQLite database
const db = new Database(':memory:');
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  );
  INSERT INTO users (username, email, role) VALUES 
    ('admin', 'admin@example.com', 'admin'),
    ('alice', 'alice@example.com', 'user'),
    ('bob', 'bob@example.com', 'user');
`);

// FIX 1: SQL Injection — Use parameterized query
// Before: `SELECT * FROM users WHERE username = '${username}'`
// After:  Prepared statement with ? placeholder
app.get('/api/users/search', (req, res) => {
  const username = req.query.username;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'username query parameter is required' });
  }

  try {
    const stmt = db.prepare('SELECT id, username, email, role FROM users WHERE username = ?');
    const users = stmt.all(username);
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// FIX 2: XSS — Escape HTML entities before rendering
// Before: res.send(`<h1>Hello, ${name}!</h1>`)
// After:  HTML-encode special characters to prevent script injection
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

app.get('/greet', (req, res) => {
  const name = req.query.name || 'World';
  const safeName = escapeHtml(name);
  res.send(`<html><body><h1>Hello, ${safeName}!</h1></body></html>`);
});

// FIX 3: Path Traversal — Validate and restrict file access
// Before: path.join(__dirname, 'uploads', filename) with no validation
// After:  Resolve the path, then verify it's within the uploads directory
app.get('/api/files', (req, res) => {
  const filename = req.query.filename;

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'filename query parameter is required' });
  }

  // Resolve the absolute path and verify it stays within uploads/
  const uploadsDir = path.resolve(__dirname, 'uploads');
  const requestedPath = path.resolve(uploadsDir, filename);

  // Security check: ensure the resolved path is within the uploads directory
  if (!requestedPath.startsWith(uploadsDir + path.sep) && requestedPath !== uploadsDir) {
    return res.status(403).json({ error: 'Access denied — path traversal detected' });
  }

  try {
    const content = fs.readFileSync(requestedPath, 'utf-8');
    res.json({ filename: path.basename(requestedPath), content });
  } catch (err) {
    res.status(404).json({ error: 'File not found' });
  }
});

// Safe endpoint — no vulnerabilities
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
