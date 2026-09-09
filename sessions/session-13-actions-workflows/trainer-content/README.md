# Session 13 — GitHub Actions & Workflow Generation

**Module:** 4 — DevOps & Infrastructure with Copilot  
**Difficulty:** Intermediate  
**Prerequisites:** Sessions 01–05  
**Duration:** 1 hour trainer content + 2 hours lab
**Last updated:** April 2026

## Prepare safely

Read the [course safety baseline](../../learning-safety-baseline.md). Before any push, workflow run, external action, or deployment, confirm repository access, customer policy, and the target environment. Use the starter project and synthetic values. Learners can draft and peer-review workflows locally when access is unavailable.

Generated workflows need human review. Check triggers, permissions, secrets, action references, commands, artifact retention, and deployment gates before committing.

**Preflight**

- Open the starter Node.js project with its existing `lint` and `test` scripts.
- Confirm repository access, approved action sources, target environment, reviewer, and fallback.
- Prepare a reviewed `ci.yml` and one failed-step excerpt. Do not plan a live deployment.

## One-hour plan

| Time | Topic | Trainer move |
| --- | --- | --- |
| 0:00–0:08 | Actions model | Review workflow, event, job, step, runner, secret, and artifact. |
| 0:08–0:18 | Generate CI | Turn a small Node.js requirement into `ci.yml`. |
| 0:18–0:28 | Debug safely | Use one failing step and the relevant YAML. |
| 0:28–0:38 | Reuse and custom actions | Compare a reusable workflow, composite action, and JavaScript action. |
| 0:38–0:50 | Demo | Generate and review a bounded CI pipeline. |
| 0:50–0:56 | Security review | Apply least privilege and action pinning. |
| 0:56–1:00 | `gh-aw` and lab handoff | Explain the source/compiled pair and guardrails. |

Keep the demo to CI and a plan-level deployment design. If it stalls, review a prepared workflow. Do not consume lab time troubleshooting a live run.

## Actions model and prompting

A workflow is YAML under `.github/workflows/`. Events start workflows; jobs run on runners; steps run actions or commands. Give Copilot the project context, trigger, commands that already exist, expected artifacts, and security constraints.

```text
Read package.json and existing tests. Create .github/workflows/ci.yml.
Run on pull requests and pushes to main. Use Node.js 20, npm ci, the existing
lint and test scripts, npm caching, contents: read, and an artifact for test results.
Do not add dependencies or deployment steps.
```

Review the result against the repository. Copilot can produce valid-looking YAML that calls a missing script or assumes an artifact path.

Use this as the bounded demo request:

```text
Read package.json and existing tests. Create .github/workflows/ci.yml.
Run on pull requests and pushes to main. Use Node.js 20, npm ci, the existing
lint and test scripts, npm caching, contents: read, and an artifact for test results.
Do not add dependencies or deployment steps.
```

Learners should identify the workflow file, trigger, existing commands, explicit `contents: read` permission, and any artifact path that needs verification. At 0:44, stop a stalled generation or run and review the prepared workflow instead.

For failures, provide the workflow and the failed step, not an entire run log:

```text
This workflow fails at "Run tests." Here is the step output and ci.yml.
Identify the likely cause, propose the smallest fix, and explain what to verify.
```

## Reuse choices

| Need | Use |
| --- | --- |
| Full job or pipeline shared between repositories | Reusable workflow with `workflow_call` |
| Repeated steps inside one job | Composite action |
| Logic, inputs, and outputs beyond YAML | JavaScript or Docker action |

Start with the smallest form that fits. A custom action still needs metadata, tests where practical, versioning, and code review.

## Workflow review

Use this checklist before commit:

- Set an explicit `permissions` block with the minimum access.
- Keep real values in secrets or use OIDC. Never put credentials in YAML.
- Use `pull_request` for untrusted code; scrutinize `pull_request_target`.
- Pin third-party actions to an approved immutable SHA in production.
- Keep deployment environments and required reviewers outside the workflow where platform policy requires them.
- Restrict artifacts and set retention to match policy.
- Review runner choice, concurrency, and every command that handles untrusted input.

```yaml
permissions:
  contents: read
```

## Cloud agent and Actions

The cloud agent can work in an Actions-backed environment. Its setup and repository workflows remain code that must be reviewed. Do not assume it can view logs, retry jobs, or use permissions beyond what the approved configuration provides.

## Agentic Workflows with `gh-aw`

`gh-aw` stores agentic-workflow intent in Markdown and compiles it to a `.lock.yml` GitHub Actions artifact:

```bash
gh extension install github/gh-aw
gh aw init daily-repo-status
gh aw compile daily-repo-status
gh aw logs daily-repo-status
```

Review the Markdown source first, then inspect the compiled file. Keep permissions read-only unless a reviewed `safe-outputs` write is needed, use the tool allow-list, and audit runs. Do not install or run the optional lab extension without approval.

## Lab handoff

Learners build a CI workflow, design CD from the supplied specification, fix the two broken workflows, and complete a bounded JavaScript action. They review every output against the checklist. The optional `gh-aw` exercise adds a reviewed `.md` and `.lock.yml` pair only when access and policy permit it.

## Likely questions

**Can a generated workflow be committed immediately?** No. Review its triggers, permissions, action references, commands, secrets, and deployment gates first.

**Why pin third-party actions?** An approved immutable SHA fixes the reviewed action version for production use.

**What if a live workflow run is unavailable?** Review the starter YAML and failed-step excerpt locally. The same review evidence is required.
