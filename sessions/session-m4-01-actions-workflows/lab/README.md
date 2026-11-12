# Session M4-01 lab: One application, four workflow tasks

**Deliverable:** Workflows, command output, and review notes for `copilot-webapp`

## Lab overview

You use the same application for every part.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Check the application baseline and create CI | 30 min |
| 2 | Design staged deployment jobs | 25 min |
| 3 | Repair two supplied workflow failures | 30 min |
| 4 | Validate a JavaScript action | 25 min |
| 5 | Collect command results and review notes | 10 min |

## Before you start

You need GitHub Copilot and Node.js 20 or later. Repository access is optional. Unless the instructor says otherwise, don't push, run Actions, install an external action, or use a deployment target. Everything here runs locally. Use no real credentials or deployment endpoints.

## Setup

Run commands from this session directory unless a command changes directory.

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

Expected: Node 20 or later, seven passing tests, lint and build succeed, and `dist/app.js` exists.

Create `lab/evidence.md` from this table:

| Checkpoint | Command or review | Result | Changed files | Reviewer |
| --- | --- | --- | --- | --- |
| Baseline | | | | |
| CI | | | | |
| Deployment design | | | | |
| Workflow repair | | | | |
| Custom action | | | | |

## Part 1: Create CI

Ask Copilot to read `lab/starter/webapp/package.json`, the tests, and the build script. Create `lab/starter/webapp/.github/workflows/ci.yml` with:

- pushes to `main` and pull requests;
- `ubuntu-latest` and Node.js 20;
- `npm ci`, lint, tests, and build;
- npm caching;
- `permissions: contents: read`;
- the `dist/` build artifact with seven-day retention.

Rerun the application checks:

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

Review the generated commands against `package.json`. Compare with `lab/solution/webapp/.github/workflows/ci.yml`.

**Checkpoint:** Record both results and explain why the workflow uploads `dist/` and not a path the assistant invented.

## Part 2: Design deployment

Read `lab/starter/deployment-spec.md`. Create `lab/starter/webapp/.github/workflows/cd.yml`. It must build the same application, deploy to staging before production, reference GitHub Environments and secrets, run two health checks, and describe rollback without calling a real endpoint.

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/webapp/.github/workflows/cd.yml
grep -nE 'environment: (staging|production)|needs:|permissions:' \
  lab/starter/webapp/.github/workflows/cd.yml
```

Expected: the YAML parses, and the output shows both environments, job ordering, and a permissions block.

Compare with `lab/solution/workflows/cd.yml`. Repository settings configure production reviewers. The workflow only references the `production` environment.

**Checkpoint:** Record the secret names, the production gate, the health-check behavior, and the rollback steps. No deployment occurred.

## Part 3: Repair workflow failures

Both broken workflows target `copilot-webapp`.

Run the parser on the CI file:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/broken-workflows/broken-ci.yml
```

Expected failure: an indentation error near `Setup Node.js`. Fix the indentation, update the checkout action, add least-privilege permissions, and use the package command meant for CI. Parse again and compare with `lab/solution/fixed-workflows/fixed-ci.yml`.

The deployment workflow parses, but its behavior is wrong:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/broken-workflows/broken-deploy.yml
grep -nE 'ubuntu-18.04|refs/head/main|DEPLOY_KEY|checkout' \
  lab/starter/broken-workflows/broken-deploy.yml
```

Parsing succeeds. The grep exposes the stale runner, bad ref, wrong secret name, and missing checkout step. Repair them, parse again, and compare with the solution.

**Checkpoint:** For each change, cite the failure or repository fact behind it. Reject a broad rewrite unless each change answers a recorded failure.

## Part 4: Validate the custom action

Complete the metadata and implementation in `lab/starter/custom-action/`. The action scans the same application.

Copy the dependency manifests into your action directory, install, and check against the application:

```bash
cp lab/solution/custom-action/package.json \
  lab/solution/custom-action/package-lock.json lab/starter/custom-action/
npm ci --prefix lab/starter/custom-action
cd lab/starter/webapp
: > ../custom-action/summary.md
env INPUT_THRESHOLD=0 'INPUT_REPORT-FORMAT=markdown' \
  GITHUB_STEP_SUMMARY="$PWD/../custom-action/summary.md" \
  node ../custom-action/src/main.js
test -s ../custom-action/summary.md
cd ../../..
```

Expected: `passed: true`, exit code 0, and a written summary.

Now the intentional failure:

```bash
cd lab/starter/webapp
action_status=0
env INPUT_THRESHOLD=101 'INPUT_REPORT-FORMAT=json' \
  node ../custom-action/src/main.js || action_status=$?
printf 'Action exit code: %s\n' "$action_status"
test "$action_status" -eq 1
cd ../../..
```

Expected: the action reports a score below 101 and exits with code 1. The threshold changes the result.

After your checks pass, compare with `lab/solution/custom-action/`. If `act` is installed, you can run this reference-only demo. It doesn't validate your action:

```bash
act -W lab/solution/custom-action/.github/workflows/quality-check.yml -j quality-check
```

**Checkpoint:** Record the pass and fail exit codes, score, scanned path, outputs, and summary location.

## Final deliverable

1. CI and deployment workflow files for `copilot-webapp`.
2. Both repaired workflow files, with explanations tied to the recorded failures.
3. The completed JavaScript action.
4. `lab/evidence.md` with commands, results, changed files, and reviewer decisions.

Local syntax checks don't show that a production deployment is safe.
