// Reference fix for the two vulnerabilities in the starter server.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'public');

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/hello') {
    const name = url.searchParams.get('name') || 'world';
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, ' + escapeHtml(name) + '</h1>');
    return;
  }

  if (url.pathname === '/files') {
    const file = url.searchParams.get('name') || 'index.txt';
    const resolved = path.resolve(root, file);
    if (!resolved.startsWith(root + path.sep)) {
      res.statusCode = 400;
      res.end('Bad request');
      return;
    }
    fs.readFile(resolved, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      res.end(data);
    });
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
});

if (require.main === module) {
  server.listen(3000, () => console.log('Listening on http://localhost:3000'));
}

module.exports = { server };
