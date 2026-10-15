const fs = require('node:fs');

function parseProfile(path) {
  const content = fs.readFileSync(path, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: '', body: content };
  }
  return { frontmatter: match[1], body: match[2] };
}

function evaluateProfile(path) {
  const { frontmatter, body } = parseProfile(path);
  const failures = [];

  if (!/^description:\s*.+/m.test(frontmatter)) {
    failures.push('description is required');
  }
  if (/tools:\s*\[\s*["']\*["']\s*\]/m.test(frontmatter) || !/^tools:/m.test(frontmatter)) {
    failures.push('tools must use a least-privilege allowlist');
  }
  for (const tool of ['read', 'search', 'edit', 'execute']) {
    if (!new RegExp(`(?:-|\\[|,)\\s*["']?${tool}["']?`, 'm').test(frontmatter)) {
      failures.push(`missing tool alias: ${tool}`);
    }
  }
  if (!/tests?\//i.test(body)) {
    failures.push('allowed test path is not explicit');
  }
  if (!/(do not|never) (edit|change|modify).*(src\/|production)/i.test(body)) {
    failures.push('production-code boundary is not explicit');
  }
  if (!/stop.*production|production.*stop/i.test(body)) {
    failures.push('stop condition for production changes is missing');
  }
  if (!/npm test/i.test(body)) {
    failures.push('verified test command is missing');
  }
  if (!/human review|reviewer/i.test(body)) {
    failures.push('human review decision is missing');
  }

  return failures;
}

module.exports = { evaluateProfile, parseProfile };
