# Session M4-01 trainer guide: One application through GitHub Actions

## Teaching goal

Use `copilot-webapp` start to finish. Show that the application works locally, then demonstrate CI creation and deployment design, workflow repairs, and JavaScript action validation against the same codebase.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Application baseline and Actions model |
| 0:08 to 0:18 | Generate CI from repository facts |
| 0:18 to 0:28 | Design staging and production jobs |
| 0:28 to 0:40 | Diagnose workflow failures |
| 0:40 to 0:52 | Validate a JavaScript action |
| 0:52 to 1:00 | Security review and lab handoff |

The timings match [`slides.md`](../slides.md). Stop a live tool response at the end of its segment and use the prepared solution.

## Prepare

- Run the application tests, lint, and build.
- Keep the supplied broken workflows unchanged.
- Install the solution action dependencies.
- Prepare one passing threshold and the threshold-101 failure.
- Don't configure a deployment target.

## 0:00 to 0:08: Baseline and model

```bash
cd lab/starter/webapp
npm ci
npm test
npm run lint
npm run build
test -f dist/app.js
```

Tie each workflow step to a repository fact. `npm test`, `npm run lint`, and `npm run build` exist because `package.json` defines them. `dist/` is valid because the build creates it.

## 0:08 to 0:18: Generate CI

```text
Read package.json, tests, and scripts/build.js in copilot-webapp. Create ci.yml
for pull requests and pushes to main. Use Node.js 20, npm ci, the existing lint,
test, and build scripts, npm caching, contents: read, and a seven-day dist artifact.
Do not add dependencies or deployment steps.
```

Parse the YAML, then rerun the local checks. A valid workflow can still call a missing script or upload a path that doesn't exist.

## 0:18 to 0:28: Deployment design

Open `lab/starter/deployment-spec.md`. Ask learners to find the trigger, environments, secret names, health checks, and rollback rule before generating YAML.

Review the design without deploying it. Repository settings enforce production reviewers, and the endpoints are placeholders.

## 0:28 to 0:40: Diagnose failures

Run the YAML parser against `broken-ci.yml` and let it reveal the first fault. After learners fix it, inspect action versions, permissions, and package commands.

`broken-deploy.yml` parses. Use the lab's grep command to separate syntax from behavior. Each repair needs a source: platform support, the deployment spec, the Git ref format, or the checkout requirement.

## 0:40 to 0:52: Validate the action

A custom action needs two outcomes. A passing run shows it can scan the application and emit outputs. The threshold-101 run shows it can fail the job.

Run the lab's commands. Show the step summary and exit code. A repository workflow run alone isn't enough.

## 0:52 to 1:00: Review and handoff

Review:

- triggers and token permissions;
- action references;
- secret references and environment gates;
- artifact contents and retention.

Point learners to `lab/evidence.md`. Their workflow files and action should agree with the command results.

## Common questions

**Valid YAML only proves the file parses.** Run the application commands and review what the workflow does.

**Why one application?** Learners use the same repository facts for each decision instead of rebuilding a project per exercise.

**Why test an action failure?** An action that always exits successfully hasn't shown it enforces the threshold.
