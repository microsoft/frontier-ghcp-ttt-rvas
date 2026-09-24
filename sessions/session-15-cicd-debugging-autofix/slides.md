---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 15 — CI/CD Debugging & Security Remediation with Cloud Agent'
---

<!-- _class: lead -->

# CI/CD Debugging & Security Remediation with Cloud Agent
## Module 4: DevOps & Infrastructure | Advanced

Session 15 of 19 | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| Diagnose failures from evidence | 15 min |
| Triage and review remediation | 15 min |
| Pipeline speed and security controls | 15 min |
| Prepared demonstrations | 15 min |
| Lab | 2 hours |

---

# Start with the failed step

A red workflow tells you little. Read the failed step, its output, exit code, workflow, and recent change. Then classify the failure.

| Exit code | Common interpretation |
| --- | --- |
| `1` | Command, test, lint, or build failure |
| `127` | Required command missing |
| `137` | Process killed, often for memory use |
| `143` | Cancellation or timeout |

---
# Classify before you repair

The same visible failure can have very different causes.

| Failure class | Evidence to gather | Typical next step |
| --- | --- | --- |
| Code regression | Diff, test name, stack trace | Repair the changed behavior |
| Environment drift | Tool version, image, dependency source | Restore the approved environment |
| Flaky dependency | Timing, retries, external status | Make the dependency explicit or isolate it |
| Resource limit | Memory, duration, concurrency | Reduce load or change the approved limit |

Changing the first suspicious line often hides the actual cause.

---
# A remediation is a hypothesis

The agent's patch should connect a cause to a check:

```text
Observation: Tests run on Node 18, but the project requires Node 20.
Hypothesis: The runner version causes the syntax failure.
Repair: Set the workflow to Node 20.
Check: Re-run the failed job and the focused test command.
```

Ask for this chain in every proposal. It gives the reviewer a way to reject a
plausible patch that does not explain the evidence.

---
# Security findings need a different review

For a vulnerability remediation, confirm the affected path, exploit condition,
scope of the change, and evidence that the control now works.

Do not accept a patch because a scanner becomes quiet. The finding may be suppressed,
misconfigured, or no longer reachable by the scan. Keep the security review focused
on the reported weakness and its safe regression test.

---
# Give Copilot relevant evidence

```text
The CI job failed in [step]. The workflow is #file:.github/workflows/ci.yml.
This change added [change].

[failing-step output]

Identify the root cause, cite evidence, and propose the smallest repair.
```

Do not send an entire log, secrets, or unrelated output.

---

# Review the remediation

Use **Assign to Copilot** only when the customer environment supports it and policy permits it.

1. Confirm the finding and affected code.
2. Limit work to the finding and required tests.
3. Review scope, dependencies, behavior, and sensitive data.
4. Run focused tests and approved scans.
5. Require human approval.

---

# Improve feedback without weakening controls

- Cache npm packages from the lockfile.
- Run independent lint and test jobs in parallel.
- Use shallow checkout when full history is unnecessary.
- Deploy only from pushes to `main`.

Branch protection and human review decide whether a finding blocks a merge.

---

# Customer controls and fallback

Confirm the repository, tools, permissions, data boundary, reviewer, meter, and stop condition. If remote scans or agent routes are unavailable, use the supplied application and findings locally. The review standard stays the same.

---

# Demonstration and lab

1. Show a failing matrix job and the relevant log output.
2. Compare the failed matrix legs with the workflow.
3. Diagnose the Node version, Windows path, and `CI=true` issues.
4. Review the minimal patch and compare it with the solution.
5. Review a prepared CodeQL remediation without merging it.

| Exercise | Time |
| --- | --- |
| Fix three pipelines | 40 min |
| Review CodeQL remediation | 30 min |
| Optimize a workflow | 30 min |
| Add security checks | 20 min |
