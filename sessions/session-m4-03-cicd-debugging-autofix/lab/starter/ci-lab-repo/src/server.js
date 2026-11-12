// Synthetic training app. It contains deliberate vulnerabilities for Part 5.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'public');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/hello') {
    const name = url.searchParams.get('name') || 'world';
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, ' + name + '</h1>');
    return;
  }

  if (url.pathname === '/files') {
    const file = url.searchParams.get('name') || 'index.txt';
    fs.readFile(path.join(root, file), 'utf8', (err, data) => {
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
