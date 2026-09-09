# Session 05 — IDE Agent Workflows

## Trainer content guide

### Delivery baseline

Use Enterprise Cloud as the governance baseline. Verify current official GitHub documentation and customer administrator policy before a live exercise. Treat editor modes, tool permissions, model selection, and product lifecycle as current-state decisions, not static training facts.

### Access and cost preflight

1. Confirm attendee role, repository scope, approved data classification, and human reviewer.
2. Verify the current documentation and customer policy for the intended workflow and tools.
3. Choose a non-sensitive, bounded starter task with explicit acceptance criteria.
4. For metered work, define the customer-owned meter, threshold, escalation contact, and stop guard.
5. Prepare the manual version of the task.

### No-access fallback

Learners write the same plan, make the smallest change manually, run the required tests, and review it against the stated criteria. A trainer may use only an approved recorded example. Do not bypass policy.

## Session objective

Teach the agent loop as an engineering review practice.

```text
Plan → Act → Observe → Review → Revise or stop
```

Learners own the task definition and approvals. The assistant proposes work within those boundaries.

## Suggested agenda

| Segment | Activity |
| --- | --- |
| Preflight | Confirm scope, policy, data, tools, measurement, and fallback. |
| Plan | Write a bounded goal, constraints, and acceptance criteria. |
| Act | Inspect proposed changes and commands before approval. |
| Observe | Read test output, diffs, and unexpected effects. |
| Review | Validate correctness, safety, scope, and maintainability. |
| Fallback | Complete the same task manually. |

## Trainer talking points

> “The agent loop does not delegate judgment. It creates review points: plan before the change, inspect each action, validate the evidence, and stop when the task leaves its approved scope.”

> “Demonstrate only controls permitted by current documentation and customer policy. If a surface is unavailable, the manual workflow still teaches planning, tests, and review.”

> “Metered work needs a customer-defined stop guard. Before starting, the team needs the meter, threshold, escalation owner, and manual alternative.”

## Task template

```markdown
## Goal
Describe one user-visible, testable change.

## Constraints
- Approved repository paths and data only
- Required checks and repository conventions
- No unapproved dependencies or external access

## Completion
- Acceptance criteria are satisfied
- Test evidence is recorded
- A human reviewer approves the result
```

## Review rubric

- Is the plan small enough to verify?
- Does each proposed change stay within the approved scope?
- Are commands, dependencies, and data access understood before approval?
- Do relevant checks pass?
- Does a reviewer accept the outcome?
- Did the work remain within the customer-defined guard?

## Close

Ask learners to identify one point in their own workflow where a plan or review checkpoint would reduce risk. Recheck current official documentation and customer policy before the next live demonstration.

---

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Evidence produced |
| --- | --- | --- |
| 0:00–0:08 | Assistant-to-agent shift | Learners distinguish a continuation, answer, and goal-driven task. |
| 0:08–0:18 | Agent loop and tools | The group identifies evidence at every loop stage. |
| 0:18–0:28 | Task contracts and trust | A bounded contract and stop rules are visible. |
| 0:28–0:43 | Scripted multi-file demo | Plan, tool decisions, diff, and test evidence are reviewed. |
| 0:43–0:50 | Chat, agent, or manual decision | Learners select a workflow from task characteristics. |
| 0:50–0:57 | Intervention exercise | Learners redirect or stop without expanding scope. |
| 0:57–1:00 | Close and lab handoff | Live and fallback paths are assigned. |

### Time-pressure cutpoints

- At 0:08, shorten the mode comparison to one example per mode.
- At 0:18, keep read, edit, and command trust questions; omit optional tool categories.
- At 0:28, use the prepared plan rather than waiting for a generated plan.
- At 0:38, stop after route and test review; describe the service edit.
- At 0:43, skip the mode table and state the decision rule.
- At 0:50, run one redirect rather than two.
- Never cut preflight, independent verification, stop rules, or fallback.

## Segment 1 — From assistant to agent (0:00–0:08)

### Trainer talking points

1. Inline assistance proposes a local continuation.
2. Chat commonly answers or proposes a bounded edit.
3. An agent can pursue a defined goal through multiple approved actions.
4. More actions create more review points, not less accountability.
5. Capability is not authorization; current documentation and organizational policy decide what may run.
6. Product modes, controls, models, and availability are current-state facts to verify before delivery.

### Trainer interaction

Present three fictional tasks:

- explain one regular expression;
- change one error message;
- add an optional filter across route, service, and tests.

Ask learners to choose Chat, manual edit, or agent workflow and justify the review burden.

### Transition

> “A multi-step task is safe to direct only when every loop produces observable evidence.”

## Segment 2 — Plan, act, observe, review (0:08–0:18)

### Detailed talking points

- **Plan:** map acceptance criteria to files, commands, and risks.
- **Act:** approve only the required read, edit, or command.
- **Observe:** inspect command output and changed files.
- **Review:** compare behavior and scope with the task contract.
- **Revise:** change one assumption at a time and gather evidence.
- **Stop:** end the task when scope, data, permissions, or repeated failures cross a boundary.

### Evidence prompts

After **Plan**, ask: “Does every step support an acceptance criterion?”

After **Act**, ask: “Was this file or command approved and necessary?”

After **Observe**, ask: “What changed, and what does the output actually prove?”

After **Review**, ask: “Would an accountable reviewer accept this evidence?”

### Transition

> “The contract gives the agent and reviewer the same boundary.”

## Segment 3 — Task contract and trust preflight (0:18–0:28)

### Exact trainer actions

1. Re-display the Delivery baseline and Access and cost preflight.
2. Confirm synthetic repository data and the approved attendee role.
3. Verify current official documentation for the intended IDE workflow.
4. Confirm organizational policy for file access, commands, network use, and tools.
5. Identify the human reviewer.
6. Record the applicable organization-owned meter, threshold, escalation owner, and stop guard.
7. Open the manual starter task before any live request.
8. Write this contract:

```markdown
Goal: add optional completed filtering to a fictional task list.

Acceptance criteria:
- completed=true returns only completed tasks.
- completed=false returns only incomplete tasks.
- another value produces the existing HTTP 400 error shape.
- omitting completed preserves current behavior.

Constraints:
- route, service, and focused tests only.
- no dependency, network access, or response-schema change.
- show a plan before editing.

Done:
- focused tests pass independently.
- final diff stays in scope.
- a human reviewer accepts the result.
```

### Trust-boundary questions

| Proposed action | Question before approval |
| --- | --- |
| Read a file | Is its path and data approved? |
| Edit a file | Which criterion requires the edit? |
| Run a test | Is the command understood and scoped? |
| Add a package | Is it necessary and explicitly approved? |
| Use a network or external tool | Is that destination and permission approved? |

### Transition

> “We will direct one feature and pause at each checkpoint.”

## Scripted demo — Optional task filter (0:28–0:43)

### Setup

Use a disposable fictional TypeScript project or prepared excerpts.

The working tree must be clean.

Display this relationship:

```text
route.ts → task-service.ts
    └────→ route.test.ts
```

Show the focused test command without running it yet.

Do not install packages or connect to external systems.

### Exact opening prompt

```text
Implement the attached completed-filter task contract.
First inspect only the route, service, and focused test.
Return a three-step plan before editing.
Do not add dependencies, use the network, or change the response schema.
Stop if existing behavior is ambiguous.
```

### Expected plan

The wording may vary, but it should:

1. inspect query parsing and existing error shape;
2. pass an optional boolean to the service and filter without changing the unfiltered path;
3. add true, false, invalid, and omitted-parameter tests.

### Exact trainer actions

1. Compare the plan with the contract.
2. Reject any step involving unrelated files or dependencies.
3. Approve only reads in the named scope.
4. Ask the agent to show the proposed diff before broad commands when the current surface supports that review flow.
5. Inspect parsing for exact `"true"` and `"false"` values.
6. Inspect the service so `undefined` preserves existing behavior.
7. Inspect tests for all four criteria.
8. Run the focused test command independently.
9. Inspect `git diff --stat` and the full diff.
10. Search for unintended response-schema or dependency changes.
11. Make the human accept, revise, or stop decision.

### Expected code shape

```ts
const value = req.query.completed;
if (value !== undefined && value !== "true" && value !== "false") {
  return res.status(400).json({ error: "completed must be true or false" });
}
const completed = value === undefined ? undefined : value === "true";
return res.json(taskService.list({ completed }));
```

This is an example, not a required framework pattern.

### Expected outcome

- Four focused cases are present.
- Valid values filter correctly.
- Invalid values preserve the stated error contract.
- No parameter preserves the baseline list.
- Only route, service, and focused tests changed.
- No package or external access was introduced.

### Verification

Ask learners:

- Which test proves omitted behavior?
- Could a truthiness conversion incorrectly accept `"yes"`?
- Did the service mutate stored tasks?
- Does the diff match the approved file graph?
- Which result was independently reproduced?

### No-access/manual fallback

Distribute the prepared contract and code shape.

Pairs write:

1. a three-step plan;
2. a query-parsing truth table;
3. four test names and expected outcomes;
4. a three-file change list;
5. an approve, revise, or stop decision.

Reveal the illustrative code only after plans are complete.

The same rubric applies; no live agent is needed.

### Demo recovery

- If agent mode is unavailable, switch immediately to the manual plan.
- If the plan is too broad, say: “Stop. Use only the three named files and show a revised plan.”
- If a dependency is proposed, reject it and restate the no-dependency constraint.
- If tests fail, ask for an explanation tied to one failing assertion before allowing revision.
- If repeated revisions add no evidence, stop and complete the smallest fix manually.
- If metering reaches the defined guard, record progress and use the prepared diff.

### Transition

> “Agent mode was suitable because the goal crossed related files and tests could drive the loop; that is not true for every task.”

## Segment 5 — Choose Chat, agent, or manual work (0:43–0:50)

### Decision framework

Use Chat for explanation, option generation, or one surgical proposal.

Use an agent workflow for explicit multi-file outcomes with bounded tools and executable evidence.

Use manual work when the change is tiny, requirements remain unclear, or autonomy adds review burden.

Pause when permissions, data handling, policy, or a destructive action is unresolved.

### Quick classification exercise

| Task | Preferred starting point | Reason |
| --- | --- | --- |
| Explain a failing assertion | Chat or human inspection | No multi-file action is required. |
| Rename a local variable | Manual or inline | The edit is small and directly observable. |
| Add a route plus service tests | Agent when approved | Related files and tests form a bounded graph. |
| Decide an authorization policy | Human owners | This is an accountable policy decision. |

### Transition

> “Choosing an agent does not lock us into its first direction; intervention is part of the workflow.”

## Scripted exercise — Redirect and stop (0:50–0:57)

### Setup

Tell learners that a proposal has started changing the response schema and `package.json`.

### Exact redirect

```text
Stop. Do not change package.json or the response schema.
Revert those proposed changes.
Keep the existing service API and add only the optional filter.
Show the revised plan before editing.
```

### Expected outcome

The revised plan returns to route, service, and tests.

The dependency and schema changes disappear from the proposed diff.

### Stop scenario

Then say an unexpected command requests network access.

Learners must choose **stop**, record the unresolved permission, and switch to manual completion.

### Verification

- The revised file list matches the contract.
- No unrelated action remains queued.
- The stop rationale names the boundary crossed.
- Manual continuation instructions are clear.

## Common trainee Q&A

### “Should I approve every tool call so the agent can finish?”

No. Understand necessity, scope, reversibility, data, and permission first. Reject or stop when the action is not required by the contract.

### “Is agent mode always better for multi-file work?”

No. Requirements, tests, risk, repository size, and review cost matter. Manual work or Chat may be more controlled.

### “Can an agent add a dependency?”

Only through the organization’s normal dependency approval and review process. This session’s demo explicitly forbids it.

### “What if it keeps fixing its own failures?”

Iteration helps only when each cycle adds evidence. Stop repeated, broad, or unexplained changes and diagnose manually.

### “Can I let it run without watching?”

Use only modes and approval controls permitted by current documentation and organizational policy. Regardless of surface, review the resulting actions, diff, and evidence.

### “How do we know which files it read?”

Use observable surface information and repository tooling where available; do not infer. Keep approved scope narrow and stop if evidence is insufficient.

### “What about MCP or external tools?”

Verify the current product documentation, server identity, permissions, data path, and organizational approval. The base demo requires none.

### “How much will a run cost?”

Do not quote static figures. Check the current organization-specific meter and terms, set a threshold and owner, and retain the manual alternative.

## Pitfalls, anti-patterns, and recoveries

| Anti-pattern | Recovery |
| --- | --- |
| “Fix the project” with no criteria | Write one user-visible goal, non-goals, files, and tests. |
| Approving commands by habit | Pause and connect each command to a criterion. |
| Counting changed files as progress | Evaluate behavior and evidence instead. |
| Allowing a surprise dependency | Reject, restore the manifest, and use existing APIs. |
| Trusting the agent’s test summary | Run the focused check independently. |
| Reviewing only the final message | Inspect complete diff and command output. |
| Endless self-correction | Stop after repeated cycles without new evidence. |
| Treating intervention as failure | Normalize redirect, rollback, and manual completion. |
| Using sensitive examples | Replace with synthetic fictional tasks. |
| Teaching fixed UI or entitlement | Verify current official docs and policy at delivery. |

## Closing and lab handoff (0:57–1:00)

### Closing script

> “A well-directed agent task is a chain of reviewable decisions. The contract bounds the goal, tool approvals bound actions, tests provide evidence, and a human closes the loop.”

### Lab handoff

Open `lab/README.md`.

Learners will practice project scaffolding, multi-file refactoring, Chat-versus-agent comparison, and TODO-driven course correction.

Before any lab dependency or authentication example, apply current organizational approval and use only synthetic credentials and data.

If that live path is not approved, learners plan the same tasks, make the smallest manual edits, and compare against the stated criteria.

### Lab readiness checklist

- [ ] Approved live or manual path is assigned.
- [ ] Repository copy contains no sensitive data.
- [ ] Goal, constraints, tests, and stop rules are written.
- [ ] Human reviewer is named.
- [ ] Meter and stop guard are recorded when they apply.
- [ ] Learners know how to cancel and continue manually.
