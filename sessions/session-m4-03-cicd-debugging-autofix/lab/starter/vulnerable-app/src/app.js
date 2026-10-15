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

// VULNERABILITY 1: SQL Injection
// The user input is directly concatenated into the SQL query string.
// An attacker can inject SQL via the 'username' query parameter.
// Example attack: GET /api/users/search?username=' OR '1'='1
app.get('/api/users/search', (req, res) => {
  const username = req.query.username;
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  try {
    const users = db.prepare(query).all();
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VULNERABILITY 2: Cross-Site Scripting (XSS)
// User-supplied 'name' parameter is rendered directly into HTML
// without escaping. An attacker can inject <script> tags.
// Example attack: GET /greet?name=<script>alert('xss')</script>
app.get('/greet', (req, res) => {
  const name = req.query.name || 'World';
  res.send(`<html><body><h1>Hello, ${name}!</h1></body></html>`);
});

// VULNERABILITY 3: Path Traversal
// The 'filename' parameter is used directly in a file path without
// sanitization. An attacker can read arbitrary files from the server.
// Example attack: GET /api/files?filename=../../../etc/passwd
app.get('/api/files', (req, res) => {
  const filename = req.query.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ filename, content });
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
