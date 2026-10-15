const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
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

test('check:tight validates the learner profile without a sibling solution', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'learner-agent-profile-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const project = path.resolve(__dirname, '..');
  fs.cpSync(path.join(project, 'scripts'), path.join(root, 'scripts'), { recursive: true });
  fs.copyFileSync(path.join(project, 'package.json'), path.join(root, 'package.json'));
  const agents = path.join(root, '.github/agents');
  fs.mkdirSync(agents, { recursive: true });
  fs.copyFileSync(tightProfile, path.join(agents, 'test-writer.agent.md'));

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const output = execFileSync(npm, ['run', 'check:tight', '--silent'], {
    cwd: root,
    encoding: 'utf8'
  });
  assert.match(output, /PASS .*test-writer\.agent\.md/);

  fs.copyFileSync(weakProfile, path.join(agents, 'test-writer.agent.md'));
  assert.throws(() => execFileSync(npm, ['run', 'check:tight', '--silent'], {
    cwd: root,
    stdio: 'pipe'
  }));
});
