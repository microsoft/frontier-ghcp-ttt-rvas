const fs = require('node:fs');
const path = require('node:path');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatter = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator > 0) {
      frontmatter[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    }
  }
  return { frontmatter, body: match[2] };
}

function validateSkillDirectory(directory) {
  const failures = [];
  const skillFile = path.join(directory, 'SKILL.md');

  if (!fs.existsSync(skillFile)) {
    return ['SKILL.md is missing'];
  }

  const { frontmatter, body } = parseFrontmatter(fs.readFileSync(skillFile, 'utf8'));
  const directoryName = path.basename(directory);
  const name = frontmatter.name?.replace(/^["']|["']$/g, '');
  const description = frontmatter.description?.replace(/^["']|["']$/g, '');

  if (!name) {
    failures.push('frontmatter name is required');
  } else if (name !== directoryName) {
    failures.push('frontmatter name must match the skill directory');
  }
  if (!description) {
    failures.push('frontmatter description is required');
  }

  for (const section of ['Preconditions', 'Procedure', 'Validation', 'Failure behavior', 'Maintenance']) {
    if (!new RegExp(`^## ${section}$`, 'm').test(body)) {
      failures.push(`missing section: ${section}`);
    }
  }

  return failures;
}

function loadSkill(directory) {
  const content = fs.readFileSync(path.join(directory, 'SKILL.md'), 'utf8');
  const parsed = parseFrontmatter(content);
  return {
    ...parsed,
    name: parsed.frontmatter.name?.replace(/^["']|["']$/g, ''),
    description: parsed.frontmatter.description?.replace(/^["']|["']$/g, '')
  };
}

function runScenario(skill, scenario) {
  const apiPath = scenario.paths.some((candidate) => candidate.startsWith('src/api/'));
  const routeTask = /(route|endpoint|REST)/i.test(scenario.request);

  if (!apiPath || !routeTask) {
    return {
      status: 'not_applicable',
      skill: skill.name,
      reason: 'Task is outside REST route work under src/api/.'
    };
  }

  const missing = [];
  if (!scenario.acceptanceCriteria?.length) {
    missing.push('acceptance criteria');
  }
  if (!scenario.reviewer) {
    missing.push('human reviewer');
  }
  if (!scenario.testCommand) {
    missing.push('verified focused test command');
  }

  if (missing.length > 0) {
    return {
      status: 'blocked',
      skill: skill.name,
      reason: `Missing precondition: ${missing.join(', ')}.`
    };
  }

  return {
    status: 'applied',
    skill: skill.name,
    scope: scenario.paths,
    checks: [
      'Read the route and adjacent tests.',
      'Map acceptance criteria to success and failure evidence.',
      `Run ${scenario.testCommand}.`,
      `Request review from ${scenario.reviewer}.`
    ]
  };
}

module.exports = { loadSkill, parseFrontmatter, runScenario, validateSkillDirectory };
