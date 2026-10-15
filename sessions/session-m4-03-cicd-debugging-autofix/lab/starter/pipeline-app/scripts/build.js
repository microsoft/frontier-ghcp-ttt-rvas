const fs = require('fs');
const path = require('path');

const output = path.join(__dirname, '..', 'dist');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.copyFileSync(
  path.join(__dirname, '..', 'src', 'index.js'),
  path.join(output, 'index.js'),
);

console.log(`Built ${output}`);
