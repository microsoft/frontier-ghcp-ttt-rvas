const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'src');
const outputDir = path.join(__dirname, '..', 'dist');

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of fs.readdirSync(sourceDir)) {
  if (file.endsWith('.js')) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(outputDir, file));
  }
}

console.log(`Built ${outputDir}`);
