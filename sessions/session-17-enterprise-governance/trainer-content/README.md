# Session 17 — Enterprise Governance, Policy, and Measurement

## Delivery objective

Learners create an evidence-backed decision record, a metered-work guardrail, and reversible rollout gates. Use Enterprise Cloud as the baseline. Check current GitHub documentation and customer policy. Training material cannot establish entitlement, compliance, retention, or availability.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Governance decisions need owners and evidence |
| 0:08–0:18 | Access, data, and tool preflight |
| 0:18–0:30 | Evidence-map exercise |
| 0:30–0:42 | Scenario-based policy decision |
| 0:42–0:52 | Measurement guardrail |
| 0:52–1:00 | Rollout gates and lab handoff |

## Prepare

- Choose a non-sensitive sandbox or fictional scenario.
- Name the administrator, data owner, human reviewer, and security, privacy, legal, and finance contacts.
- Confirm the approved tools and usage guard. Prepare the static exclusion example, but never place its sensitive content into a prompt or live system.
- For any canvas, identify its artifact storage, user actions, agent capabilities, owner, and removal path.

## Facilitation notes

Start with a small claim: “We want to try one workflow in one sandbox.” Ask the group to name the decision owner and evidence needed before they decide whether the work can begin. An answer based only on a slide is incomplete.

Use `policy-checklist.md` to make the evidence map. Unknown does not mean approved. Write **owner required**, **evidence pending**, or **pause**.

For the tabletop, assign this fictional scenario from `org-policy-scenarios.md`:

```text
A team proposes a two-week review trial in a disposable training repository
with synthetic task records. No customer data, external MCP server, deployment,
or production repository is in scope.
```

Ask the group to record the repository, task, decision owner, data classification, approved tools, meter, stop condition, and fallback. Learners should separate confirmed fictional facts from pending live evidence, then choose sandbox, defer, or pause.

For measurement, distinguish activity from value. A customer-defined meter needs an owner, source, observation window, threshold, alert, escalation contact, stop condition, and manual fallback. Sample data supports discussion only.

For a canvas proposal, record the shared state, data classification, direct user actions, agent-callable capabilities, artifact location, owner, reviewer, and retirement trigger. Treat each agent action as a permission decision. A canvas does not create new authority.

End with the rollout template. Start requires approved evidence. Continue depends on observed quality, safety, review, and meter evidence. Expand needs explicit owner approval. Pause when policy, data, quality, or measurement is uncertain.

At 0:41, complete the decision record even when live evidence is pending. At 0:55, stop discussion and record the rollout or handoff decision. Use the tabletop when access is unresolved.

## Common questions

**Which plan includes a feature?** Check current official GitHub documentation and the customer agreement or ask the administrator. Do not guess.

**Can analytics prove productivity?** No. They are one input. Compare bounded work with acceptance criteria, review evidence, and a human baseline.

**Does content exclusion make all data safe?** No. Treat it as one control. Keep restricted data out of training prompts and use the customer classification process.
