# Session 17 Lab — Enterprise Governance, Policy, and Measurement

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–03
**Deliverable:** A governance decision record and reversible rollout proposal

## Lab overview

This tabletop exercise helps learners plan safe, measurable adoption of Copilot and agentic workflows. Do not change live settings unless current GitHub documentation and customer policy explicitly allow it. Produce evidence for a decision owner to review.

| Exercise | Output | Time |
| --- | --- | --- |
| 1 | Evidence map | 30 min |
| 2 | Policy decision | 30 min |
| 3 | Measurement guardrail | 30 min |
| 4 | Rollout gates | 30 min |

## Preflight and fallback

Use Enterprise Cloud as the baseline. Before Exercise 1, confirm the repository or sandbox, participant role, data classification, permitted features, reviewer, and current policy evidence. For metered work, name the customer-owned meter, threshold, escalation contact, and stop condition.

If live policy pages, settings, or analytics are unavailable, choose a fictional scenario from `lab/starter/org-policy-scenarios.md`. Use the supplied worksheets and fictional analytics data. Mark each live claim that needs current documentation or administrator confirmation. Do not submit sensitive data or make live changes.

| Starter file | Use |
| --- | --- |
| `policy-checklist.md` | Evidence map and decision record |
| `org-policy-scenarios.md` | Fictional scenario selection |
| `analytics-scenarios.md` | Measurement prompts |
| `sample-analytics-data.json` | Fictional measurement input |
| `rollout-template.md` | Reversible rollout proposal |
| `exclusion-config/` | Static content-boundary examples |

Treat the exclusion files as training artifacts. Do not copy sensitive examples into prompts, issues, comments, or live tools.

## Exercise 1: Build an evidence map (30 min)

Choose a non-sensitive scenario, then complete `policy-checklist.md`.

1. Name the sandbox or repository and one bounded workflow.
2. Assign an administrator, data owner, security/privacy/legal/finance contacts, reviewer, and final approver. Write **owner required** if a role is unknown.
3. Record the current documentation and administrator policy that must be checked.
4. Record the participant role, repository boundary, data classification, allowed tools, and sensitive paths. For a canvas, also record shared state, storage, user actions, agent capabilities, owner, and retirement trigger.
5. Describe a manual fallback that needs no new permissions or unapproved data.
6. Ask a partner to identify an unsupported assumption and convert it into an evidence request or stop condition.

| Field | Example |
| --- | --- |
| Repository | Training sandbox only |
| Task | Review one synthetic pull request |
| Data | Synthetic examples only |
| Evidence | Current docs and administrator approval |
| Fallback | Local sandbox and human review checklist |

## Exercise 2: Choose a policy approach (30 min)

Read `org-policy-scenarios.md`, choose the scenario that fits the audience, and make one explicit decision: proceed, proceed only in a repository sandbox, defer to owners, or pause.

State what cannot be assumed, including feature availability, retention, legal approval, permissions, and commercial terms. Define the smallest trial: one repository or sandbox, one workflow, synthetic data, one reviewer, and an easy stop. Then record the manual alternative and approvals needed before expansion.

## Exercise 3: Define the measurement guardrail (30 min)

Use `analytics-scenarios.md` and the fictional `sample-analytics-data.json`. Select one or two bounded tasks with acceptance criteria and a human-reviewed baseline.

Define:

- the meter and its owner;
- observation window, threshold, alert, escalation contact, and stop condition;
- quality and safety evidence, such as tests, review comments, defects, dependency review, or data-boundary checks;
- the rule for continue, expand, gather more evidence, or pause.

Sample data supports discussion. It is not live analytics or commercial guidance. Exclude metrics whose source or interpretation lacks approval.

## Exercise 4: Propose reversible rollout gates (30 min)

Complete `rollout-template.md` from the evidence map.

| Gate | Decision support |
| --- | --- |
| Start | Documentation, policy, data classification, approved tools, reviewer, and fallback are known. |
| Continue | The bounded trial has sufficient quality, safety, review, and meter evidence. |
| Expand | Required owners approve the next scope and safeguards. |
| Pause | Policy is unclear, a data boundary is in doubt, a defect is unresolved, a meter is exceeded, or an unapproved tool is required. |

Use `lab/solution/rollout-plan.md` to compare structure. Keep the decision specific to the selected scenario.

## Final deliverable

Submit:

1. The completed evidence map and selected scenario.
2. The policy decision and unresolved evidence requests.
3. The measurement guardrail with meter, threshold, owner, escalation, stop condition, and fallback.
4. The rollout proposal with start, continue, expand, and pause gates.
5. A final decision: start, continue in sandbox, gather more evidence, or pause.

## Verification

- [ ] Every decision has an owner and evidence source.
- [ ] Unverified policy or live-setting claims are visible.
- [ ] The trial is bounded, uses non-sensitive work, and has human review.
- [ ] Each approved canvas has scoped actions, storage, ownership, and a removal path.
- [ ] Metered work has a customer-owned stop guard.
- [ ] The manual route produces the same review evidence.
