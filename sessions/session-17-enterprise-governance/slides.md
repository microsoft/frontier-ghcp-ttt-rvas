---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 17: Enterprise Governance'
---

<!-- _class: lead -->

# Enterprise Governance
## A decision framework for policy and measurement

---

# Agenda

| Segment | Time |
| --- | --- |
| Decision owners and evidence | 8 min |
| Access, data, and tool boundary | 10 min |
| Worked evidence map | 12 min |
| Policy decision and checkpoint | 12 min |
| Measurement and rollout gates | 10 min |
| Lab handoff | 8 min |

---

# Start with evidence

Use Enterprise Cloud as the baseline. Check current GitHub documentation and
customer policy before making an access, data, tool, or rollout decision.

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

**Policy text alone is not a rollout plan.** Someone must own the decision.

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
out of the workflow. This gives the team a working boundary.

---
# Measurements need a decision attached

| Signal | Example decision |
| --- | --- |
| Review rework rises | Pause expansion and inspect the workflow |
| Usage reaches a guard | Stop automated runs until the owner reviews |
| Acceptance rate is stable | Continue the bounded trial |
| Restricted data appears | Stop, preserve evidence, and escalate |

An activity count without a threshold and response tells the team little.

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

Unknown is a decision state. Record the owner and needed evidence. **Unknown does
not mean approved.**

---

# Worked scenario

The fictional team proposes a two-week trial:

| Field | Decision |
| --- | --- |
| Repository | `training-review-sandbox` |
| Workflow | Review one synthetic pull request at a time |
| Data | Synthetic task records only |
| Tools | Approved repository assistant; no external MCP server |
| Excluded | Production, deployment, customer data, live policy changes |
| Reviewer | Engineering lead |
| Stop | Restricted data, failed boundary check, or 20 automated runs |

The scenario gives the class fixed facts. Current product and policy claims still
need live evidence from the proper owner.

---

# Evidence-map checkpoint

Record each claim as:

- **confirmed in scenario**;
- **live evidence pending**;
- **out of scope**.

The learner may continue only when the repository, workflow, data class, tool
boundary, reviewer, meter, and fallback have an owner and status.

---

# Policy decision checkpoint

**Reference decision:** Proceed in the repository sandbox only.

The trial may start with synthetic data and human review. Expansion remains blocked
until the administrator and data owner confirm current policy evidence.

If a learner cannot state the approved and blocked scope in one sentence,
the decision record is not ready.

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

# Worked measurement rule

| Item | Fictional value |
| --- | --- |
| Window | Two weeks or 10 reviewed tasks |
| Quality | At least 9 tasks meet acceptance criteria |
| Safety | Zero restricted-data events |
| Rework | No more than 3 tasks need material rewrite |
| Meter | Stop at 20 automated runs |
| Response | Pause, preserve evidence, and use manual review |

These values support the exercise. They are not product limits or commercial
guidance.

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

Use the fixed `training-review-sandbox` scenario.

1. Complete the evidence map and pass Checkpoint 1.
2. Record the sandbox-only policy decision and pass Checkpoint 2.
3. Define the measurement guardrail.
4. Complete start, continue, expand, and pause gates.

Submit four completed artifacts. Compare them with `lab/solution/` after the final
decision, not before.
