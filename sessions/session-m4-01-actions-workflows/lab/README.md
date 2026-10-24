# Session M4-01 lab: One application, four workflow tasks

**Duration:** 2 hours
**Difficulty:** Intermediate
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-02
**Deliverable:** Reviewed workflows, command output, and review notes for `copilot-webapp`

## Lab overview

You will use the same application for every part of the lab.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prove the application baseline and create CI | 30 min |
| 2 | Design staged deployment jobs | 25 min |
| 3 | Repair two supplied workflow failures | 30 min |
| 4 | Validate a JavaScript action | 25 min |
| 5 | Collect command results and review notes | 10 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). You must have GitHub Copilot access in the selected coding environment and Node.js 20 or later.

GitHub repository access is optional. Do not push, run Actions, install an external
action, or use a deployment target unless the instructor confirms that route.
When repository access or Actions is unavailable, complete all the work locally
as described below. If GitHub Copilot access is unavailable, stop and do not
continue the lab.

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
ordering, and a permissions block.

Compare your design with `lab/solution/workflows/cd.yml`. Production reviewers are
configured in repository settings. The workflow only references the `production`
environment.

**Checkpoint:** Record the secret names, the production gate, the health-check
behavior, and the rollback steps. Do not claim that a deployment occurred.

## Part 3: Repair workflow failures

The two broken workflows both target `copilot-webapp`.

First, run the parser to see the CI file's syntax failure:

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
Do not accept a broad rewrite unless each change addresses a recorded failure.

## Part 4: Validate the custom action

Complete the metadata and implementation in `lab/starter/custom-action/`. The
action scans the same application used by the workflows.

Copy the supplied dependency manifests into your action directory. Install the
dependencies, then check your implementation against the application:

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

Expected result: the action reports `passed: true`, exits with code 0, and writes
the summary.

Now run the intentional failure:

```bash
cd lab/starter/webapp
action_status=0
env INPUT_THRESHOLD=101 'INPUT_REPORT-FORMAT=json' \
  node ../custom-action/src/main.js || action_status=$?
printf 'Action exit code: %s\n' "$action_status"
test "$action_status" -eq 1
cd ../../..
```

Expected failure: the action reports a score below 101 and exits with code 1.
This proves that the threshold changes the job result.

After your checks pass, compare with `lab/solution/custom-action/`.
If `act` is already installed and local runner use is approved, you may also run
this reference-only demonstration. It does not validate your action:

```bash
act -W lab/solution/custom-action/.github/workflows/quality-check.yml -j quality-check
```

**Checkpoint:** Record the pass and fail exit codes, score, scanned path, outputs,
and summary location.

## Final deliverable

Submit:

1. CI and deployment workflow files for `copilot-webapp`.
2. Both repaired workflow files with explanations tied to the recorded failures.
3. The completed JavaScript action.
4. `lab/evidence.md` with commands, results, changed files, and reviewer decisions.

Keep credentials and real deployment endpoints out of your deliverable. Do not
claim that local syntax checks prove a production deployment is safe.
