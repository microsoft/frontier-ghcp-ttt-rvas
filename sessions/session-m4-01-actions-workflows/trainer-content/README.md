# Session M4-01 trainer guide: One application through GitHub Actions

## Teaching goal

Teach the parts of a workflow first. Then use `copilot-webapp` start to finish: Copilot generates CI, `actionlint` and local commands check it, and learners design a staged deployment and repair broken workflows. The JavaScript action is a short demo and an optional lab part.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:15 | Workflow anatomy |
| 0:15 to 0:23 | Reusable workflows, custom actions, and common YAML mistakes |
| 0:23 to 0:35 | Generate and fix CI with Copilot and `actionlint` |
| 0:35 to 0:45 | Design staging and production jobs |
| 0:45 to 0:55 | Diagnose workflow failures |
| 0:55 to 1:00 | Review and lab handoff |

The timings match [`slides.md`](../slides.md). Stop a live tool response at the end of its segment and use the prepared solution.

## Prepare

- Run the application tests, lint, and build.
- Install `actionlint` and run it on `lab/starter/broken-workflows/` so you know the output.
- Keep the supplied broken workflows unchanged.
- Install the solution action dependencies and prepare the threshold-0 and threshold-101 runs for a short demo.
- Don't configure a deployment target.

## 0:00 to 0:15: Workflow anatomy

Put `lab/solution/webapp/.github/workflows/ci.yml` on screen and label each part as you meet it:

- **Workflow:** the YAML file in `.github/workflows/`.
- **Trigger:** the `on:` block. It decides who can start the run.
- **Job:** a group of steps on one runner. Jobs run in parallel unless one lists `needs:`.
- **Runner:** the machine, such as `ubuntu-latest`. Each job gets a fresh one.
- **Step:** one `run:` command or one `uses:` action.
- **Action:** reusable code that a step calls, such as `actions/checkout`.
- **Artifact:** files a job uploads so another job or a person can get them. Jobs don't share a disk.
- **`needs`:** ordering and failure propagation between jobs.
- **Permissions:** what the job's `GITHUB_TOKEN` can do. Set the minimum.
- **Secrets:** values stored in GitHub and read as `${{ secrets.NAME }}`. They are masked in logs.
- **Environments:** named targets such as `staging` and `production`. They can hold secrets and require reviewers before a job starts. That is the deployment gate.

Then run the baseline:

```bash
cd lab/starter/webapp
npm ci
npm test
npm run lint
npm run build
test -f dist/app.js
```

Tie each workflow step to a repository fact. `dist/` is a valid artifact path because the build creates it.

## 0:15 to 0:23: Reuse and common mistakes

**Reusable workflow** (`on: workflow_call`): a whole workflow that other workflows call as a job. Use it when several repositories repeat the same pipeline. Don't use it for one repository.

**Custom action** (`action.yml`): a single step packaged for reuse. Use a JavaScript or composite action when the logic needs real code, or when you want to test it locally. Show the optional lab's threshold-0 and threshold-101 runs in two minutes. An action that never fails hasn't shown it enforces anything.

Common YAML mistakes, with one example each from the broken files:

- Indentation that changes what is a step. `broken-ci.yml` fails to parse.
- Typos in values that stay valid YAML: `refs/head/main` never matches.
- Old runner labels and old action versions.
- Missing `actions/checkout`, so the job has no code.
- Secret names that don't match what is stored.
- No `permissions:` block, so the token gets the default scope.
- `${{ }}` expressions in the wrong place, for example secrets inside `if:` on a step.

## 0:23 to 0:35: Generate and fix CI with Copilot

Demo in Copilot CLI (or agent mode). Start `copilot` in the session directory and send:

```text
Read package.json, tests, and scripts/build.js in copilot-webapp. Create ci.yml
for pull requests and pushes to main. Use Node.js 20, npm ci, the existing lint,
test, and build scripts, npm caching, contents: read, and a seven-day dist artifact.
Do not add dependencies or deployment steps.
```

Then lint outside Copilot:

```bash
actionlint lab/starter/webapp/.github/workflows/ci.yml
```

If the draft is clean, change `runs-on` to `ubuntu-18.04`, run `actionlint` again, and paste the message into Copilot with "Fix this with the smallest change." Show that the message points at one line and the fix touches one line. Then rerun the local commands. A valid workflow can still call a missing script or upload a path that doesn't exist.

## 0:35 to 0:45: Deployment design

Open `lab/starter/deployment-spec.md`. Ask learners to find the trigger, environments, secret names, health checks, and rollback rule before generating YAML.

Review the design without deploying it. Repository settings enforce production reviewers, and the endpoints are placeholders.

## 0:45 to 0:55: Diagnose failures

Run `actionlint` on `broken-ci.yml`. It reports the parse error at `steps:`, but the cause is the step list below it: the first step is indented less than the rest. Run it on `broken-deploy.yml`: it reports the runner label and nothing else. Use that to show what a linter can't know: the ref typo is valid, the secret name is valid, and a missing checkout is valid YAML. Each repair needs a source: the linter, the deployment spec, the Git ref format, or the checkout requirement.

## 0:55 to 1:00: Review and handoff

Review triggers and token permissions, action references, secret references and environment gates, and artifact contents and retention.

Learners keep notes at each lab checkpoint. Their workflow files should agree with the `actionlint` and application results.

## Common questions

**Valid YAML only proves the file parses.** Run the application commands and review what the workflow does.

**Why one application?** Learners use the same repository facts for each decision instead of rebuilding a project per exercise.

**Does Copilot replace `actionlint`?** No. Copilot drafts and fixes. `actionlint` and the application's commands decide whether the result is right.

**Why test an action failure?** An action that always exits successfully hasn't shown it enforces the threshold.
