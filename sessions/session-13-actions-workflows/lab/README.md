# Session 13 Lab — GitHub Actions & Workflow Generation

**Duration:** 2 hours · **Difficulty:** Intermediate
**Prerequisites:** Sessions 01–05 · **Deliverable:** Reviewed workflows, fixes, and a tested custom JavaScript action

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm GitHub Actions, repository pushes, external actions, and deployment targets with the customer. If access is unavailable, draft workflows locally, validate the application tests and YAML, and peer-review against the acceptance criteria.

| Exercise | Task | Time |
| --- | --- | --- |
| 1 | Generate CI | 30 min |
| 2 | Design CD from the specification | 30 min |
| 3 | Fix two broken workflows | 30 min |
| 4 | Create a JavaScript action | 30 min |
| Optional | Agentic Workflows with `gh-aw` | 35 min |

## Setup

Use VS Code with Copilot, Node.js 20+, a repository you may use under policy, and authenticated `gh` only when needed. Open `lab/starter/webapp/`:

```bash
cd lab/starter/webapp
npm install
npm test
npm run lint
```

## 1. Generate CI

Ask agent mode to read the project and create `.github/workflows/ci.yml`. Require pushes to `main` and pull requests, `ubuntu-latest`, Node.js 20, `npm ci`, the existing lint and test scripts, an artifact, npm caching, and least-privilege permissions.

Before running the workflow, check:

- [ ] correct triggers and runner;
- [ ] `actions/checkout@v4` and `actions/setup-node@v4`;
- [ ] `npm ci`, lint, and test commands match `package.json`;
- [ ] `actions/upload-artifact@v4` has a real output path;
- [ ] `permissions: contents: read` is sufficient.

Compare with `lab/solution/webapp/.github/workflows/ci.yml`.

## 2. Design CD

Read `lab/starter/deployment-spec.md`. Ask Copilot to create `cd.yml` with a build job, staging after build, production after staging, environment references, secret references, health checks, and a rollback path. It must trigger only from `main`, not pull requests.

Review every command and secret name against the specification. Environment protection rules belong in repository settings; YAML references them with `environment:`.

## 3. Fix the supplied workflows

For `broken-ci.yml`, find and fix the indentation error, deprecated `actions/checkout@v2`, missing permissions, and incorrect npm command.

For `broken-deploy.yml`, fix the secret name to `${{ secrets.DEPLOY_TOKEN }}`, update `ubuntu-18.04`, add `actions/checkout@v4`, and correct `refs/head/main` to `refs/heads/main`.

Ask Copilot to explain each fix. Then compare with `lab/solution/fixed-workflows/`.

## 4. Build a JavaScript action

Read `lab/starter/custom-action/action.yml` and `src/main.js`. Complete a Node.js action that scans JavaScript files, counts lines and TODO comments, estimates complexity, returns a 0–100 score and pass/fail output, and emits a Markdown report when requested.

Review inputs, outputs, file handling, and the scoring calculation. Add graceful handling for unreadable files and a failure result when the score is below the threshold. Compare with `lab/solution/custom-action/`.

Use `act` only when it is already installed and policy allows local runner execution:

```bash
act -W lab/solution/custom-action/.github/workflows/quality-check.yml -j quality-check
```

## Optional: Agentic Workflows

Run this only with approved repository access, Actions, and an approved AI engine:

```bash
gh extension install github/gh-aw
gh aw init daily-repo-status
gh aw compile daily-repo-status
gh workflow run daily-repo-status.lock.yml
gh aw logs daily-repo-status
```

Start from `lab/starter/agentic-workflows/custom-status-report.md` or `stale-issue-reviewer.md`. Review the `.md` source and `.lock.yml` artifact. Keep permissions read-only by default and add `safe-outputs` only for a reviewed write.

## Completion checklist

- [ ] `ci.yml` uses caching and least privilege.
- [ ] `cd.yml` follows the supplied staging, production, and rollback requirements.
- [ ] Both broken workflows have explained fixes.
- [ ] The custom action has reviewed inputs, outputs, and error handling.
- [ ] Any `gh-aw` artifact has a reviewed `.md` and `.lock.yml` pair.
