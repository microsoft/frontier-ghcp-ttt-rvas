# Session 15 — CI/CD Pipeline Debugging & Agentic Remediation

**Module:** 4 — DevOps & Infrastructure with Copilot

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–05, 13

**Duration:** 1 hour trainer content + 2 hours lab
**Last updated:** April 2026

## Delivery goal

By the end, learners can diagnose a CI failure from evidence, assess a proposed remediation, and stop when the approved path is unavailable. The lab supplies synthetic logs and an intentionally vulnerable app. It does not claim that any customer feature or route is enabled.

## One-hour plan

| Time | Segment | Outcome |
| --- | --- | --- |
| 0:00–0:05 | Failure triage | Learners can isolate a failing step and its evidence. |
| 0:05–0:15 | Copilot-assisted diagnosis | Learners can give an assistant the relevant log, workflow, and recent change. |
| 0:15–0:25 | Remediation safety | Learners know the review and approval gate for security fixes. |
| 0:25–0:32 | Pipeline speed | Learners can identify safe caching and parallelism changes. |
| 0:32–0:45 | Debugging demo | Show one evidence-led diagnosis and a small fix. |
| 0:45–0:55 | Security-review walkthrough | Review a prepared CodeQL finding and proposed patch. |
| 0:55–1:00 | Lab handoff | Set the scope, safety boundary, and fallback. |

Cut examples before cutting the review gate. The original material exceeded the stated hour; this plan fits it.

## Prepare

- Use only the supplied synthetic logs and training app.
- Confirm workflow runs, security products, and any remediation route with the customer administrator.
- Set a customer-owned usage limit and stop condition for metered work.
- Prepare a broken workflow, its failing-step log, and a prepared security finding or screenshot.
- Have a manual-review fallback ready. A recording is useful when a live run is slow.

## 1. Triage the failure (0:00–0:05)

Start with the practical problem. A failing job may have thousands of log lines, but one step usually holds the useful evidence.

Use this sequence:

1. Find the failed job and step.
2. Copy the complete output for that step, including the exit code.
3. Check the triggering commit and relevant workflow file.
4. Reproduce the command locally when that is safe and useful.
5. Compare with a recent successful run if the failure looks intermittent.

| Exit code | Likely meaning |
| --- | --- |
| `1` | General command, test, lint, or build failure |
| `2` | Command syntax or missing arguments |
| `126` | Permission denied |
| `127` | Command missing on the runner |
| `137` | Process killed, often for memory use |
| `143` | Job cancelled or timed out |

Classify the failure before proposing a change: configuration, dependency, build, test, deployment, or environment. The category does not solve the issue. It keeps the investigation focused.

## 2. Diagnose with Copilot (0:05–0:15)

Give the assistant the failing-step output, the workflow, and the change that preceded the failure. Do not paste a full log that includes secrets or irrelevant noise.

```text
The CI job fails in the “Run tests” step. The workflow is
#file:.github/workflows/ci.yml. This change added a Docker build.

[paste the relevant failing output]

Identify the likely root cause, cite the evidence, and propose the smallest
workflow or code change. Do not change unrelated jobs.
```

Ask learners to check every claim against the log and repository. The assistant may find the issue quickly; the engineer still decides whether the explanation and patch are sound.

Use one short example. A project that requires Node 20 and builds from `node:18-alpine` has a clear mismatch. Change the base image only after confirming the engine requirement in `package.json`.

When the first fix exposes another failure, retain the conversation context and add the new evidence. Do not stack speculative fixes.

## 3. Review remediation safely (0:15–0:25)

Use **Assign to Copilot** only when the customer environment presents that route and policy approves it. Otherwise review the synthetic finding and prepare the patch manually.

For each finding:

1. Identify the affected code and the evidence for the finding.
2. State the expected protection, such as parameterized queries, output encoding, or path validation.
3. Limit the request to that finding and its required tests.
4. Review the proposed diff for scope, behavior, dependencies, and sensitive data.
5. Run focused tests and the approved scan when available.
6. Require human approval before merge.

The CodeQL exercise contains SQL injection, reflected XSS, and path traversal. Treat additional findings as out of scope unless the trainer explicitly expands the exercise.

If a remote scan or remediation route is unavailable, trainees inspect the supplied source and finding locally, write the smallest patch, and complete the same peer review. Record why the live path was not used.

## 4. Improve the pipeline without hiding risk (0:25–0:32)

Show changes that reduce repeated work without weakening checks:

- cache npm packages using the lockfile;
- run independent lint and test jobs in parallel;
- use `fetch-depth: 1` when full history is unnecessary;
- run deploy only for pushes to `main`;
- exclude documentation-only changes only when that fits repository policy.

Measure before and after. Keep security work independent from build feedback where possible, then use branch protection or the customer approval process to block merges for serious findings.

## 5. Debugging demonstration (0:32–0:45)

Use the provided matrix workflow and error log.

1. Point out the failed matrix legs.
2. Copy the failed output and open the workflow beside it.
3. Ask for a diagnosis that ties each proposed change to evidence.
4. Review the result: Node 16 is end of life for the modern API, Windows paths affect an assertion, and some legs lack `CI=true`.
5. Show the smallest workflow changes, then compare with `lab/solution/fixed-pipelines/`.

If the tool is unavailable, narrate the same evidence-to-patch review with the prepared files. The teaching point is the reasoning, not a live response.

At 0:45, stop debugging and begin the prepared security-review walkthrough, even if a live run remains pending. Learners should have the failed matrix legs, relevant log evidence, the smallest proposed workflow changes, and a comparison with `lab/solution/fixed-pipelines/`.

## 6. Security-review walkthrough (0:45–0:55)

Open the training app and the CodeQL workflow template. Show the expected JavaScript/TypeScript initialization and analysis steps. Then review a prepared finding or patch.

Ask the room:

- Does the patch address the reported sink and source?
- Are input validation and output handling covered by focused tests?
- Did it alter unrelated behavior or add an unapproved dependency?
- Does the environment permit this scan and remediation route?

Do not merge during the demonstration. The review decision may be approve, request changes, or pause.

## Lab handoff (0:55–1:00)

Point learners to `lab/README.md`. They will fix three synthetic workflows, review a security remediation, optimize a slow workflow, and add security checks. Remind them to use the supplied material only and to switch to manual review if an approved live route is missing.

## Common questions

**Should learners still learn to read logs?** Yes. Copilot speeds up triage, but they need enough context to judge its answer.

**Can logs contain secrets?** They can. Remove or avoid sensitive material, and follow the customer incident process if a secret appears.

**What if the customer cannot use the tools?** Use the logs, source, and prepared findings locally. The evidence and review standard stay the same.
