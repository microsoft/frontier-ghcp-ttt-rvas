# Session M4-01 lab: Three workflow tasks on one application

**Deliverable:** `ci.yml`, `cd.yml`, and a repaired `broken-deploy.yml` for `copilot-webapp`

## Lab overview

You use the same application for every part. Copilot writes and fixes the YAML. `actionlint` and the application's own commands tell you whether it worked.

| Part | Work | Time |
| --- | --- | --- |
| Setup | Baseline and `actionlint` | 10 min |
| 1 | Generate CI with Copilot, then lint and fix it | 35 min |
| 2 | Design staged deployment | 35 min |
| 3 | Repair the broken deploy workflow | 30 min |
| 4 | Review the three files | 10 min |
| Optional | Validate the JavaScript action | 15 min |

## Before you start

You need GitHub Copilot and Node.js 20 or later. Repository access is optional. Unless the instructor says otherwise, don't push, run Actions, install an external action, or use a deployment target. Everything here runs locally. Use no real credentials or deployment endpoints.

Use Copilot CLI (`copilot`, started in this session directory) or agent mode in your editor. Either works.

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

Install `actionlint`. It checks workflow syntax, expressions, runner labels, and action inputs.

```bash
# macOS or Linux with Homebrew
brew install actionlint

# Any Linux or macOS shell: downloads the binary into the current directory
bash <(curl -s https://raw.githubusercontent.com/rhysd/actionlint/main/scripts/download-actionlint.bash) 1.7.12
```

On Windows, use `winget install rhysd.actionlint` or `go install github.com/rhysd/actionlint/cmd/actionlint@v1.7.12`. If you downloaded the binary, run it as `./actionlint` below.

Check it works:

```bash
actionlint -version
```

If you can't install it, check syntax only and note that you skipped expression and runner checks:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' path/to/workflow.yml
```

## Part 1: Generate CI, then lint and fix it

**Goal:** see what Copilot gets right from repository facts, and what a linter catches that you'd miss.

Ask Copilot:

```text
Read lab/starter/webapp/package.json, the tests, and scripts/build.js. Create
lab/starter/webapp/.github/workflows/ci.yml for pushes to main and pull requests.
Use ubuntu-latest and Node.js 20, npm ci, the existing lint, test, and build scripts,
npm caching, permissions: contents: read, and a dist/ artifact kept for 7 days.
Don't add dependencies or deployment steps.
```

Check the result in two ways:

```bash
actionlint lab/starter/webapp/.github/workflows/ci.yml
cd lab/starter/webapp && npm ci && npm test && npm run lint && npm run build && test -f dist/app.js; cd ../../..
```

`actionlint` prints nothing when the file is clean. If it reports problems, paste the exact output back to Copilot and ask for the smallest fix. Don't ask it to rewrite the file.

If Copilot's first draft is clean, break it on purpose and fix it. Change `runs-on: ubuntu-latest` to `ubuntu-18.04`, run `actionlint`, and read the message. Then ask Copilot to fix it from that message.

Compare with `lab/solution/webapp/.github/workflows/ci.yml`. Check each of these in your file:

- every `run:` command exists in `package.json`;
- the upload `path:` is the directory the build creates;
- `permissions:` is set, so the job token can only read contents;
- the trigger covers pull requests, so the workflow runs on code from forks and branches. Know who can start it.

**Checkpoint:** Write down one thing `actionlint` caught or one thing you corrected in Copilot's draft, and why the workflow uploads `dist/`.

## Part 2: Design staged deployment

**Goal:** wire jobs together with `needs`, environments, and secrets, without deploying anything.

Read `lab/starter/deployment-spec.md`. Ask Copilot to create `lab/starter/webapp/.github/workflows/cd.yml` that:

- builds the same application and uploads the artifact;
- deploys to `staging` first, then to `production` with `needs:`;
- references the `staging` and `production` GitHub Environments and the secrets the spec names;
- runs two health checks;
- describes rollback without calling a real endpoint;
- sets `permissions:` at the top and widens it only on a job that needs it.

```bash
actionlint lab/starter/webapp/.github/workflows/cd.yml
grep -nE 'environment: (staging|production)|needs:|permissions:' \
  lab/starter/webapp/.github/workflows/cd.yml
```

Expected: no `actionlint` output, and the grep shows both environments, job ordering, and a permissions block.

Compare with `lab/solution/workflows/cd.yml`. Repository settings configure production reviewers. The workflow only names the `production` environment. Answer these:

1. Which jobs would you move into a reusable workflow (`workflow_call`) if three repositories deployed the same way? Which stay local?
2. Which secrets are environment secrets and which are repository secrets?
3. What stops production from running if staging health checks fail?

**Checkpoint:** Write down the secret names, the production gate, the health-check behavior, and the rollback steps. No deployment ran.

## Part 3: Repair the broken deploy workflow

**Goal:** fix a workflow that parses but behaves wrongly, using the linter's output and the repository's facts.

`lab/starter/broken-workflows/broken-deploy.yml` targets `copilot-webapp`. Don't read the solution first.

```bash
actionlint lab/starter/broken-workflows/broken-deploy.yml
```

`actionlint` reports the stale runner label. It doesn't report everything. Ask Copilot to review the file against `lab/starter/deployment-spec.md` and list problems before it changes anything. Then check its list against these four:

| Problem | Where to look |
| --- | --- |
| Runner `ubuntu-18.04` no longer exists | `actionlint` output |
| `refs/head/main` should be `refs/heads/main`, so the deploy job never runs | the `if:` line |
| `DEPLOY_KEY` isn't the secret name in the spec | `deployment-spec.md` |
| No checkout step, so `npm ci` has no `package.json` | the `build` job |

Copy the file to `lab/starter/broken-workflows/repaired-deploy.yml`, apply the fixes, and run `actionlint` again. Compare with `lab/solution/fixed-workflows/fixed-deploy.yml`.

Then do the same for the CI file, which doesn't parse:

```bash
actionlint lab/starter/broken-workflows/broken-ci.yml
```

The parse error points at `steps:`. The cause is the first step, which is indented less than the rest. Fix it, update `actions/checkout`, add `permissions:`, and use `npm ci` in place of `npm install`. Compare with `lab/solution/fixed-workflows/fixed-ci.yml`.

**Checkpoint:** For each change, name the output or repository fact behind it. Reject a Copilot rewrite that changes lines you can't tie to a problem.

## Part 4: Review the three files

Read `ci.yml`, `cd.yml`, and the repaired deploy file as a reviewer. For each, find the trigger, the token permissions, every `uses:` reference, every secret, and every artifact. Write a short note for any line you wouldn't merge.

Local checks don't show that a production deployment is safe.

## Optional: Validate the custom action

Do this if you finished early. It shows when a custom action is worth writing: the logic is JavaScript, other repositories will reuse it, and you want to test it without a runner.

Copy the dependency manifests into the starter action, install, and run it against the application:

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

Now the failing case:

```bash
cd lab/starter/webapp
action_status=0
env INPUT_THRESHOLD=101 'INPUT_REPORT-FORMAT=json' \
  node ../custom-action/src/main.js || action_status=$?
printf 'Action exit code: %s\n' "$action_status"
test "$action_status" -eq 1
cd ../../..
```

Expected: the action reports a score below 101 and exits with code 1. Complete the action's metadata and implementation in `lab/starter/custom-action/` first, then compare with `lab/solution/custom-action/`.

## Final deliverable

1. `ci.yml` and `cd.yml` for `copilot-webapp`, both clean under `actionlint`.
2. The repaired deploy and CI workflows, with each change tied to a message or fact.
3. Your notes from the checkpoints.
