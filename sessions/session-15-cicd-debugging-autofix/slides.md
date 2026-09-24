---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 15: CI/CD Debugging & Agentic Remediation'
---

<!-- _class: lead -->
# Evidence Before Repair
## DevOps & Infrastructure | Advanced

Session 15 | 3 hours

---
# Agenda

| Time | Topic |
| --- | --- |
| 0:00–0:08 | Observation, hypothesis, proof |
| 0:08–0:18 | Local baseline |
| 0:18–0:34 | Pipeline investigation |
| 0:34–0:44 | Multi-stage failure |
| 0:44–0:54 | Security remediation |
| 0:54–1:00 | Lab handoff |

---
# Start with evidence

Record:

```text
Observation:
Local proof:
Hypothesis:
Smallest repair:
Proof after repair:
```

Do not put a root-cause answer in the observation field.

---
# Prove the application first

```bash
npm ci
npm test
npm run lint
npm run build
test -f dist/index.js
```

If these commands pass locally, the workflow may still use the wrong runtime,
directory, environment, or job order.

---
# Give Copilot bounded evidence

```text
Read this workflow and failed-step output. Separate observations from hypotheses.
Use the local command as additional evidence. Propose the smallest repair and one
proof command. Do not change unrelated jobs.
```

**Check every claim against the files.**

---
# Do not reveal the answer early

1. Read the failed step.
2. Record exact evidence.
3. Reproduce the relevant command.
4. State one hypothesis.
5. Repair one cause.
6. Prove the rerun.
7. Open the reference fix.

---
# One failure can hide another

```text
first failed stage
        ↓ repair
next workflow run
        ↓
new failed stage
```

Use the new log. Do not undo a proven repair or stack guesses.

---
# Security findings need path evidence

For each finding, identify:

- input source;
- dangerous sink;
- expected protection;
- focused proof;
- approval decision.

Scanner silence is not enough.

---
# Access policy

GitHub Copilot and Node.js 20.x are required.

Actions, code scanning, and remote remediation are optional. The local path uses
the supplied application, logs, workflows, and syntax checks.

---
<!-- _class: divider -->
# Lab

Keep solutions closed until each checkpoint. Case 3 has two investigation stages.
