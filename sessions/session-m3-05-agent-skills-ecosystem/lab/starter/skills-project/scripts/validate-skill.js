const path = require('node:path');

const { validateSkillDirectory } = require('./skill-contract.js');

const directory = path.resolve(process.argv[2]);
const failures = validateSkillDirectory(directory);

if (failures.length > 0) {
  console.error(`FAIL ${directory}`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`PASS ${directory}`);
  console.log('- directory name and frontmatter name match');
  console.log('- required SKILL.md sections are present');
}
