---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 17 — Enterprise Governance'
---

<!-- _class: lead -->

# Enterprise Governance
## A decision framework for policy and measurement

---

# Start with evidence

Use Enterprise Cloud as the baseline. Check current GitHub documentation and customer policy before making an access, data, tool, or rollout decision.

A training slide cannot establish feature availability, entitlement, retention, or compliance.

---
# Governance turns uncertainty into decisions

Governance decides what can run, under which limits, and what evidence will change
that decision.

| Question | Record |
| --- | --- |
| Can this use case start? | Scope, owner, data boundary, and approval |
| Is it safe to continue? | Quality, usage, and review evidence |
| Can it expand? | The approver and the added boundary |
| Should it pause? | Trigger, recovery, and next review date |

Policy text alone is not a rollout plan. Someone must own the decision.

---
# A boundary has inputs, actions, and outputs

Classify more than the prompt text:

```text
Inputs: repository files, issues, tool results
Actions: read, summarize, write, deploy
Outputs: chat, commit, pull request, external system
Evidence: logs, review, approval, metric
```

For each item, decide what is allowed, who approves exceptions, and what must stay
out of the workflow. That creates a boundary people can operate.

---
# Measurements need a decision attached

| Signal | Example decision |
| --- | --- |
| Review rework rises | Pause expansion and inspect the workflow |
| Usage reaches a guard | Stop automated runs until the owner reviews |
| Acceptance rate is stable | Continue the bounded trial |
| Restricted data appears | Stop, preserve evidence, and escalate |

An activity count without a threshold and response tells the team very little.

---
# Preflight

| Confirm | Why it matters |
| --- | --- |
| Sandbox or repository | Keeps the trial bounded |
| Owner and reviewer | Makes decisions accountable |
| Data classification | Defines what may enter the workflow |
| Approved features and tools | Prevents an unsupported path |
| Meter and stop guard | Limits metered work |
| Manual fallback | Keeps learning moving when access is blocked |

---

# Policy decision sequence

```text
Evidence map → bounded trial → observed review evidence →
continue, expand, gather more evidence, or pause
```

Unknown is a decision state. Record the owner and evidence needed. Do not treat it as approval.

---

# Data and tool boundaries

Classify the repository and inputs before using an assistant. Keep restricted content out of prompts, issues, comments, and training tools.

Review MCP servers, approved package sources, and external tools the same way: owner, purpose, permitted data, permissions, logging, and fallback.

---

# Measurement guardrail

Activity is not value. Compare bounded work with acceptance criteria, human review, safety evidence, and a known baseline.

| Guardrail item | Required decision |
| --- | --- |
| Meter | Customer-owned source and unit |
| Window | When observations are collected |
| Threshold | When an alert fires |
| Escalation | Who responds |
| Stop | When automated work pauses |
| Fallback | Manual work while evidence is pending |

---

# Rollout gates

| Gate | Evidence |
| --- | --- |
| Start | Approved policy, data boundary, tools, reviewer, and fallback |
| Continue | Quality, safety, review, and meter evidence |
| Expand | Explicit approval from required owners |
| Pause | Unresolved policy, data, quality, or measurement concern |

---

# Lab handoff

Create an evidence map, choose a fictional policy scenario, define a measurement guardrail, then propose reversible gates.

The final record names owners, evidence, and the next action.
