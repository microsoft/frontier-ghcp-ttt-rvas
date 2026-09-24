# Session 13 Trainer Guide: One Application Through GitHub Actions

## Delivery objective

Use `copilot-webapp` from start to finish. Learners first prove the application
works locally. They then create CI, design deployment, repair workflow failures,
and validate a JavaScript action against that same codebase.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Application baseline and Actions model |
| 0:08–0:18 | Generate CI from repository facts |
| 0:18–0:28 | Design staging and production jobs |
| 0:28–0:40 | Diagnose workflow failures |
| 0:40–0:52 | Validate a JavaScript action |
| 0:52–1:00 | Security review and lab handoff |

The timings match [`slides.md`](../slides.md). Stop a live tool response at the end
of its segment and use the prepared solution.

## Prepare

- Run the application tests, lint, and build before delivery.
- Keep the supplied broken workflows unchanged for the investigation.
- Install the solution action dependencies.
- Prepare one passing threshold and the intentional threshold-101 failure.
- Do not configure a live deployment target.

## 0:00–0:08: Baseline and model

Run:

```bash
cd lab/starter/webapp
npm ci
npm test
npm run lint
npm run build
test -f dist/app.js
```

Tie each workflow step to a repository fact. `npm test`, `npm run lint`, and
`npm run build` exist because `package.json` defines them. `dist/` is valid because
the build command creates it.

## 0:08–0:18: Generate CI

Use this bounded request:

```text
Read package.json, tests, and scripts/build.js in copilot-webapp. Create ci.yml
for pull requests and pushes to main. Use Node.js 20, npm ci, the existing lint,
test, and build scripts, npm caching, contents: read, and a seven-day dist artifact.
Do not add dependencies or deployment steps.
```

Parse the YAML, then rerun the local application checks. A valid workflow can
still call a missing script or upload a path that never exists.

## 0:18–0:28: Deployment design

Open `lab/starter/deployment-spec.md`. Ask learners to find the required trigger,
environments, secret names, health checks, and rollback rule before generating
YAML.

Keep this at design level. Repository settings enforce production reviewers, and
the supplied endpoints are placeholders. No live deployment occurs.

## 0:28–0:40: Diagnose failures

Run the YAML parser against `broken-ci.yml` and let the parser reveal the first
fault. After learners repair it, inspect action versions, permissions, and package
commands.

For `broken-deploy.yml`, parsing succeeds. Use the grep command from the lab to
separate syntax from behavior. Each repair needs a source: platform support,
the deployment specification, the Git ref format, or the application checkout
requirement.

## 0:40–0:52: Validate the action

Explain why custom action validation needs two outcomes. A passing run proves the
action can scan the application and emit outputs. The threshold-101 run proves the
action can fail the job.

Run the exact commands in the lab. Show the generated step summary and exit code.
Do not use a repository workflow run as the only proof.

## 0:52–1:00: Review and handoff

Review:

- triggers and token permissions;
- approved action references;
- secret references and environment gates;
- artifact contents and retention;
- exact local proof for each claim.

Point learners to `lab/evidence.md`. The lab is complete when the workflow files,
action, command results, and reviewer decisions agree.

## Access policy

GitHub Copilot access is required. Stop if it is unavailable. Repository access,
Actions, and `act` are optional. The local path remains the required path and uses
no credentials or deployment target.

## Common questions

**Does valid YAML prove the workflow works?** No. It proves only that the file
parses. Run the application commands and review the workflow semantics.

**Why use one application?** The same facts support every decision. Learners do
not waste time reconstructing a new project for each exercise.

**Why force an action failure?** A custom action that always exits successfully
has not proved its enforcement behavior.
