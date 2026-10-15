const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
  loadSkill,
  runScenario,
  validateSkillDirectory
} = require('../scripts/skill-contract.js');

const project = path.resolve(__dirname, '..');
const skillDirectory = path.resolve(
  project,
  '../../solution/skills-project/.github/skills/api-design'
);
const skill = loadSkill(skillDirectory);

function scenario(name) {
  return JSON.parse(fs.readFileSync(path.join(project, 'scenarios', name), 'utf8'));
}

test('validates the skill directory and required file structure', () => {
  assert.deepEqual(validateSkillDirectory(skillDirectory), []);
});

test('rejects an invalid skill directory visibly', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bad-skill-'));
  const directory = path.join(root, 'wrong-name');
  fs.mkdirSync(directory);
  fs.writeFileSync(
    path.join(directory, 'SKILL.md'),
    '---\nname: other-name\ndescription: test\n---\n# Test\n'
  );

  const failures = validateSkillDirectory(directory);
  assert.ok(failures.includes('frontmatter name must match the skill directory'));
  assert.ok(failures.includes('missing section: Preconditions'));
});

test('applies to the bounded REST route scenario', () => {
  const result = runScenario(skill, scenario('trigger.json'));

  assert.equal(result.status, 'applied');
  assert.equal(result.skill, 'api-design');
  assert.match(result.checks[2], /npm test/);
});

test('does not trigger for repository documentation work', () => {
  const result = runScenario(skill, scenario('non-trigger.json'));

  assert.deepEqual(result, {
    status: 'not_applicable',
    skill: 'api-design',
    reason: 'Task is outside REST route work under src/api/.'
  });
});

test('fails visibly when the reviewer precondition is missing', () => {
  const result = runScenario(skill, scenario('failure.json'));

  assert.deepEqual(result, {
    status: 'blocked',
    skill: 'api-design',
    reason: 'Missing precondition: human reviewer.'
  });
});

test('the demo uses the learner skill without a sibling solution directory', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'local-skill-demo-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(project, 'scripts'), path.join(root, 'scripts'), { recursive: true });
  fs.cpSync(path.join(project, 'scenarios'), path.join(root, 'scenarios'), { recursive: true });
  const localSkill = path.join(root, '.github/skills/api-design');
  fs.mkdirSync(localSkill, { recursive: true });
  fs.copyFileSync(path.join(skillDirectory, 'SKILL.md'), path.join(localSkill, 'SKILL.md'));

  const output = execFileSync(process.execPath, [path.join(root, 'scripts/demo.js')], {
    encoding: 'utf8'
  });

  assert.match(output, /"status": "applied"/);
  assert.match(output, /"status": "blocked"/);
});
