const path = require('node:path');

const { evaluateProfile } = require('./profile-contract.js');

const profilePath = path.resolve(process.argv[2]);
const failures = evaluateProfile(profilePath);

if (failures.length > 0) {
  console.error(`FAIL ${profilePath}`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`PASS ${profilePath}`);
  console.log('- least-privilege tools declared');
  console.log('- test-only path boundary declared');
  console.log('- production conflict stops for human review');
}
