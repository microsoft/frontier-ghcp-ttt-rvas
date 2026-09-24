# Session 13 Lab: One Application, Four Workflow Tasks

**Duration:** 2 hours
**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–05
**Deliverable:** A reviewed workflow set and evidence record for `copilot-webapp`

## Lab overview

Use the same application for every part of the lab.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prove the application baseline and create CI | 30 min |
| 2 | Design staged deployment jobs | 25 min |
| 3 | Repair two supplied workflow failures | 30 min |
| 4 | Validate a JavaScript action | 25 min |
| 5 | Package the evidence | 10 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). You must have GitHub Copilot access in the selected coding environment and Node.js 20 or later.

GitHub repository access is optional. Do not push, run Actions, install an external
action, or use a deployment target unless the instructor confirms that route.
When repository access or Actions is unavailable, complete the full local path
below. If GitHub Copilot access is unavailable, stop and do not continue the lab.

Do not use real credentials or deployment endpoints. The supplied deployment work
is a reviewed design exercise.

## Setup

Run all commands from this session directory unless a command changes directory.

```bash
node --version
cd lab/starter/webapp
npm ci
npm test
npm run lint
npm run build
test -f dist/app.js
cd ../../..
```

Expected result: Node reports version 20 or later, seven tests pass, lint succeeds,
the build succeeds, and `dist/app.js` exists.

Create `lab/evidence.md` from this table:

| Checkpoint | Command or review | Result | Changed files | Reviewer |
| --- | --- | --- | --- | --- |
| Baseline | | | | |
| CI | | | | |
| Deployment design | | | | |
| Workflow repair | | | | |
| Custom action | | | | |

## Part 1: Create CI

Ask Copilot to read `lab/starter/webapp/package.json`, the tests, and the build
script. Create `lab/starter/webapp/.github/workflows/ci.yml` with:

- pushes to `main` and pull requests;
- `ubuntu-latest` and Node.js 20;
- `npm ci`, lint, tests, and build;
- npm caching;
- `permissions: contents: read`;
- the `dist/` build artifact with seven-day retention.

Validate the application again:

```bash
cd lab/starter/webapp
npm ci
npm test
npm run lint
npm run build
test -f dist/app.js
cd ../../..
```

Validate the workflow syntax:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/webapp/.github/workflows/ci.yml
```

Review the generated commands against `package.json`. Compare the result with
`lab/solution/webapp/.github/workflows/ci.yml`.

**Checkpoint:** Record both command results and explain why the workflow uploads
`dist/` rather than a path invented by the assistant.

## Part 2: Design deployment

Read `lab/starter/deployment-spec.md`. Create
`lab/starter/webapp/.github/workflows/cd.yml`. It must build the same application,
deploy to staging before production, reference GitHub Environments and secrets,
run two health checks, and describe rollback without calling a real endpoint.

Run:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/webapp/.github/workflows/cd.yml
grep -nE 'environment: (staging|production)|needs:|permissions:' \
  lab/starter/webapp/.github/workflows/cd.yml
```

Expected result: YAML parsing succeeds. The output shows both environments, job
ordering, and an explicit permissions block.

Compare with `lab/solution/workflows/cd.yml`. Repository settings own production
reviewers. The workflow only references the `production` environment.

**Checkpoint:** Record the secret names, the production gate, the health-check
behavior, and the rollback evidence. Do not claim that a deployment occurred.

## Part 3: Repair workflow failures

The two broken workflows both target `copilot-webapp`.

First prove the CI file has a syntax failure:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/broken-workflows/broken-ci.yml
```

Expected failure: the parser reports an indentation error near `Setup Node.js`.
Fix the indentation, update the checkout action, add least-privilege permissions,
and use the package command intended for CI. Run the parser again and compare with
`lab/solution/fixed-workflows/fixed-ci.yml`.

The deployment workflow parses, but its behavior is wrong:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/broken-workflows/broken-deploy.yml
grep -nE 'ubuntu-18.04|refs/head/main|DEPLOY_KEY|checkout' \
  lab/starter/broken-workflows/broken-deploy.yml
```

Expected result: parsing succeeds. The second command exposes the stale runner,
bad ref, wrong secret name, and missing checkout step. Repair those items, parse
the file again, and compare with the solution.

**Checkpoint:** For each change, cite the observed failure or repository fact.
Do not accept a broad rewrite that cannot explain its evidence.

## Part 4: Validate the custom action

Complete the metadata and implementation in `lab/starter/custom-action/`. The
action scans the same application used by the workflows.

Use the reference implementation to prove both outcomes:

```bash
npm ci --prefix lab/solution/custom-action
cd lab/starter/webapp
env INPUT_THRESHOLD=0 'INPUT_REPORT-FORMAT=markdown' \
  GITHUB_STEP_SUMMARY=/tmp/session-13-summary.md \
  node ../../solution/custom-action/src/main.js
test -s /tmp/session-13-summary.md
cd ../../..
```

Expected result: the action reports `passed: true`, exits with code 0, and writes
the summary.

Now run the intentional failure:

```bash
cd lab/starter/webapp
env INPUT_THRESHOLD=101 'INPUT_REPORT-FORMAT=json' \
  node ../../solution/custom-action/src/main.js
cd ../../..
```

Expected failure: the action reports a score below 101 and exits with code 1.
This proves that the threshold changes the job result.

If `act` is already installed and local runner use is approved, you may also run:

```bash
act -W lab/solution/custom-action/.github/workflows/quality-check.yml -j quality-check
```

**Checkpoint:** Record the pass and fail exit codes, score, scanned path, outputs,
and summary location.

## Final deliverable

Submit:

1. CI and deployment workflow files for `copilot-webapp`.
2. Both repaired workflow files with evidence-linked explanations.
3. The completed JavaScript action.
4. `lab/evidence.md` with commands, results, changed files, and reviewer decisions.

The deliverable must not contain credentials, real deployment endpoints, or a
claim that local syntax checks prove a production deployment is safe.
