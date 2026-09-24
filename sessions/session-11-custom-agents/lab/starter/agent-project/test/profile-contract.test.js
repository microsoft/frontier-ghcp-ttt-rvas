const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

const { evaluateProfile } = require('../scripts/profile-contract.js');

const weakProfile = path.join(
  __dirname,
  '..',
  '.github',
  'agents',
  'weak-test-writer.agent.md'
);
const tightProfile = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'solution',
  'agent-project',
  '.github',
  'agents',
  'test-writer.agent.md'
);

test('the weak profile demonstrates a production-code boundary violation', () => {
  const failures = evaluateProfile(weakProfile);

  assert.ok(failures.includes('tools must use a least-privilege allowlist'));
  assert.ok(failures.includes('production-code boundary is not explicit'));
  assert.ok(failures.includes('stop condition for production changes is missing'));
});

test('the tightened profile passes the same contract', () => {
  assert.deepEqual(evaluateProfile(tightProfile), []);
});
