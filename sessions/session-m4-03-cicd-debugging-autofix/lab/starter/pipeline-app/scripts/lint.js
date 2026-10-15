const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'src', 'index.js'),
  path.join(__dirname, '..', 'test', 'index.test.js'),
];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('\t')) {
    throw new Error(`${file} contains a tab character`);
  }
}

console.log('Lint passed.');
