# Session 15 Lab — CI/CD Debugging & Agentic Remediation

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–05 and 13
**Deliverable:** Three fixed pipelines and a reviewed security-remediation patch

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that workflow runs, security products, and any remediation route are approved. Use only the supplied logs and application.

If access is unavailable, inspect the supplied source and findings locally, prepare the smallest patch manually, and complete peer review against the solution.

| Exercise | Work | Time |
| --- | --- | --- |
| 1 | Fix failing workflows | 40 min |
| 2 | Review CodeQL findings and remediation | 30 min |
| 3 | Improve a slow workflow | 30 min |
| 4 | Add security checks | 20 min |

## Setup

- VS Code with GitHub Copilot agent mode
- A customer-approved training repository if remote scanning is permitted
- Node.js 20 or later
- Authenticated `gh` CLI

## Exercise 1: Debug pipeline failures (40 min)

Read the workflow and its matching error log. Give Copilot both, then verify its explanation before changing the workflow.

```text
This GitHub Actions workflow is failing. Read the workflow YAML and error log.
Identify the root cause, cite the evidence, and make the smallest fix.
```

### Pipeline 1: Wrong Node version (10 min)

Open `lab/starter/failing-pipelines/pipeline-1.yml` and `error-log-1.txt`. The project requires Node.js 20 while the workflow uses Node.js 14. Confirm the `package.json` `engines` field, then change `node-version: '14'` to `node-version: '20'`.

### Pipeline 2: Dependency conflict and stale cache (15 min)

Open Pipeline 2 and `error-log-2.txt`. Resolve the peer-dependency failure with `npm ci --legacy-peer-deps` or an appropriate dependency update. Replace the static cache key with one that includes the `package-lock.json` hash.

### Pipeline 3: Matrix-specific failures (15 min)

Open Pipeline 3 and `error-log-3.txt`. Identify why selected matrix legs fail:

- Node 16 cannot run tests that use modern APIs.
- A Windows path breaks a test assertion.
- Some OS legs do not set `CI=true`.

Make the required version, platform, or matrix changes, then compare with `lab/solution/fixed-pipelines/`.

| Problem | Response |
| --- | --- |
| Copilot ignores the log | Attach both the workflow and full failing-step output. |
| It proposes a different valid repair | Confirm that it fixes the actual cause and keeps scope small. |
| Pipeline 3 is confusing | Investigate one failing matrix leg at a time. |

## Exercise 2: CodeQL and remediation (30 min)

The app at `lab/starter/vulnerable-app/` contains three intentional vulnerabilities: SQL injection, reflected XSS, and path traversal.

```bash
cd lab/starter/vulnerable-app
npm install
```

Complete `.github/workflows/codeql.yml` for JavaScript/TypeScript scans on pushes and pull requests. Check that it uses `actions/checkout@v4`, `github/codeql-action/init@v3` with `javascript-typescript`, and `github/codeql-action/analyze@v3`.

If remote scanning is approved, push the training repository and inspect **Security** → **Code scanning alerts**. Use **Assign to Copilot** only when the customer environment presents it and policy approves it. Otherwise make the same patch locally.

Review each proposed change for:

- parameterized queries for SQL injection;
- output encoding for XSS;
- path validation for path traversal;
- focused tests and no unrelated changes.

Compare with `lab/solution/secure-app/src/app.js`. Do not infer why a route or alert is unavailable. Record the approved manual fallback.

## Exercise 3: Improve pipeline speed (30 min)

Read `lab/starter/slow-pipeline/workflow.yml`. Its estimated runtime is about 12 minutes.

```text
Optimize this GitHub Actions workflow without changing its behavior:
- cache npm using the lockfile;
- run lint and test independently;
- use fetch-depth: 1;
- deploy only on pushes to main;
- skip CI for documentation-only changes.
```

Check `cache: 'npm'`, separate lint and test jobs, a build that depends on both, shallow checkout, the deploy condition, and an appropriate `paths-ignore` filter. Compare with `lab/solution/optimized-pipeline/workflow.yml`.

## Exercise 4: Add security checks (20 min)

Read `lab/starter/security-pipeline-template.yml`. Add a separate security job for CodeQL, pull-request dependency review, secret scanning, and SARIF results. Keep existing install, lint, test, and build steps.

Check that dependency review uses `actions/dependency-review-action@v4` only for pull requests, CodeQL has the required permissions, and the security job does not create a `needs:` dependency that blocks the build job. Configure merge controls so high-severity findings and new critical dependencies block only where customer policy requires it.

Compare with `lab/solution/security-pipeline.yml`.

## Deliverable checklist

- [ ] All three workflows are fixed and each root cause is explained.
- [ ] CodeQL findings are reviewed and a manual or approved-agent patch is prepared.
- [ ] The optimized workflow has caching, parallel jobs, and safe conditions.
- [ ] The security workflow includes CodeQL and dependency review.
- [ ] Tests, scans, and human review support every proposed merge.
