# Session m2-02: IDE Agent Workflows

## Trainer content guide

### Delivery baseline

Read the [course safety baseline](../../learning-safety-baseline.md). Before the
demo, check the current GitHub docs and your organization's rules. Editor modes,
permissions, and model choices can change.

### Access and cost preflight

1. Choose the training repository and synthetic data.
2. Check which tools and commands learners may use.
3. Choose a small task with clear acceptance criteria.
4. Set a usage limit if the work is metered.
5. Check Agent mode access before the lab.

### Access failure

Stop the learner lab and fix access. A prepared recording may preserve the
trainer demonstration, but it does not count as learner completion.

## Session objective

Teach the agent loop as an engineering review practice.

```text
Plan → Act → Observe → Review → Revise or stop
```

Learners own the task definition and approvals. The assistant proposes work within those boundaries.

## Suggested agenda

| Segment | Activity |
| --- | --- |
| Preflight | Check scope, data, tools, usage limits, and access. |
| Plan | Write the goal, constraints, and acceptance criteria. |
| Act | Inspect proposed changes and commands before approval. |
| Observe | Read test output, diffs, and unexpected effects. |
| Review | Validate correctness, safety, scope, and maintainability. |
| Access gate | Stop when required Agent mode access is missing. |

## Trainer talking points

> "The agent loop does not delegate judgment. Plan before the change, inspect each
> action, check the result, and stop when the task leaves its stated scope."

> "Use only the tools allowed for the training repository."

> "For metered work, set a usage limit and name who can approve more."

## Task template

```markdown
## Goal
Describe one user-visible, testable change.

## Constraints
- Named repository paths and synthetic data only
- Required checks and repository conventions
- No new dependencies or external access

## Completion
- Acceptance criteria are satisfied
- Test output is recorded
- A human reviewer approves the result
```

## Review rubric

- Is the plan small enough to verify?
- Does each proposed change stay within the planned files?
- Are commands, dependencies, and data access understood before approval?
- Do relevant checks pass?
- Does a reviewer accept the outcome?
- Did the work stay within the usage limit?

## Close

Ask learners to identify one point in their workflow where a plan or review check
would reduce risk.

---

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Result |
| --- | --- | --- |
| 0:00 to 0:08 | Assistant-to-agent shift | Learners distinguish a continuation, answer, and goal-driven task. |
| 0:08 to 0:18 | Agent loop and tools | The group identifies evidence at every loop stage. |
| 0:18 to 0:28 | Task contracts and trust | The contract and stop rules are visible. |
| 0:28 to 0:43 | Scripted multi-file demo | The group reviews the plan, tool decisions, diff, and test output. |
| 0:43 to 0:50 | Chat, agent, or manual decision | Learners select a workflow from task characteristics. |
| 0:50 to 0:57 | Intervention exercise | Learners redirect or stop without expanding scope. |
| 0:57 to 1:00 | Close and lab handoff | Required access is confirmed. |

### Time-pressure cutpoints

- At 0:08, shorten the mode comparison to one example per mode.
- At 0:18, keep read, edit, and command trust questions; omit optional tool categories.
- At 0:28, use the prepared plan rather than waiting for a generated plan.
- At 0:38, stop after route and test review; describe the service edit.
- At 0:43, skip the mode table and state the decision rule.
- At 0:50, run one redirect rather than two.
- Never cut preflight, independent verification, or stop rules.

## Segment 1: From assistant to agent (0:00 to 0:08)

### Trainer talking points

1. Inline assistance proposes a local continuation.
2. Chat commonly answers or proposes a small edit.
3. An agent can pursue a defined goal through multiple actions.
4. More actions create more review points, not less accountability.
5. Capability is not authorization; current documentation and organizational policy decide what may run.
6. Check current product modes, controls, models, and availability before delivery.

### Trainer interaction

Present three fictional tasks:

- explain one regular expression;
- change one error message;
- add an optional filter across route, service, and tests.

Ask learners to choose Chat, manual edit, or agent workflow and justify the review burden.

### Transition

> "A multi-step task is safe to direct only when every loop produces output the
> learner can check."

## Segment 2: Plan, act, observe, review (0:08 to 0:18)

### Detailed talking points

- **Plan:** map acceptance criteria to files, commands, and risks.
- **Act:** approve only the required read, edit, or command.
- **Observe:** inspect command output and changed files.
- **Review:** compare behavior and scope with the task contract.
- **Revise:** change one assumption at a time and check the new result.
- **Stop:** end the task when scope, data, permissions, or repeated failures cross a boundary.

### Review prompts

After **Plan**, ask: "Does every step support an acceptance criterion?"

After **Act**, ask: "Was this file or command necessary?"

After **Observe**, ask: "What changed, and what does the output actually prove?"

After **Review**, ask: "Would the reviewer accept this result?"

### Transition

> "The contract gives the agent and reviewer the same boundary."

## Segment 3: Task contract and trust preflight (0:18 to 0:28)

### Exact trainer actions

1. Re-display the Delivery baseline and Access and cost preflight.
2. Check that the repository contains only synthetic data.
3. Check the current GitHub docs for Agent mode.
4. Check the rules for file access, commands, network use, and tools.
5. Identify the human reviewer.
6. Set a usage limit and name who can approve more.
7. Open the starter task before the first request.
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

> "We will direct one feature and pause at each checkpoint."

## Scripted demo: Optional task filter (0:28 to 0:43)

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

### Prepared demonstration

Distribute the prepared contract and code shape.

Pairs write:

1. a three-step plan;
2. a query-parsing truth table;
3. four test names and expected outcomes;
4. a three-file change list;
5. an approve, revise, or stop decision.

Reveal the illustrative code only after plans are complete.

Use this only to recover the trainer demonstration. Learners still need Agent mode
for the lab.

### Demo recovery

- If Agent mode is unavailable during the demonstration, use the prepared example
  and fix access before the lab.
- If the plan is too broad, say: "Stop. Use only the three named files and show a revised plan."
- If a dependency is proposed, reject it and restate the no-dependency constraint.
- If tests fail, ask for an explanation tied to one failing assertion before allowing revision.
- If repeated revisions add no useful result, stop the run and explain the smallest
  acceptable correction.
- If the run reaches its usage limit, stop and record progress.

### Transition

> "Agent mode was suitable because the goal crossed related files and tests could drive the loop; that is not true for every task."

## Segment 5: Choose Chat, agent, or manual work (0:43 to 0:50)

### Decision framework

Use Chat for explanation, option generation, or one surgical proposal.

Use an agent workflow for clear multi-file outcomes with named tools and tests.

Use manual work when the change is tiny, requirements remain unclear, or autonomy adds review burden.

Pause when permissions, data handling, policy, or a destructive action is unresolved.

### Quick classification exercise

| Task | Preferred starting point | Reason |
| --- | --- | --- |
| Explain a failing assertion | Chat or human inspection | No multi-file action is required. |
| Rename a local variable | Manual or inline | The edit is small and directly observable. |
| Add a route plus service tests | Agent | The files and tests are closely related. |
| Decide an authorization policy | Human owners | This is an accountable policy decision. |

### Transition

> "Choosing an agent does not lock us into its first direction; intervention is part of the workflow."

## Scripted exercise: Redirect and stop (0:50 to 0:57)

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

Learners must choose **stop** and record the unresolved permission. Do not
continue until the permission is resolved.

### Verification

- The revised file list matches the contract.
- No unrelated action remains queued.
- The stop rationale names the boundary crossed.
- The reason for stopping is clear.

## Common trainee Q&A

### "Should I approve every tool call so the agent can finish?"

No. Understand necessity, scope, reversibility, data, and permission first. Reject or stop when the action is not required by the contract.

### "Is agent mode always better for multi-file work?"

No. Requirements, tests, risk, repository size, and review cost matter. Manual work or Chat may be more controlled.

### "Can an agent add a dependency?"

Only through the organization's normal dependency approval and review process. This session's demo explicitly forbids it.

### "What if it keeps fixing its own failures?"

Iteration helps only when each cycle improves the result. Stop repeated, broad,
or unexplained changes and inspect the problem.

### "Can I let it run without watching?"

Use only the modes and controls allowed for the repository. Review the actions,
diff, and test output.

### "How do we know which files it read?"

Use the product's file list and repository tools; do not guess. Keep the file
list small and stop if you cannot tell what the agent read.

### "What about MCP or external tools?"

Check the current product docs, server identity, permissions, and data path. The
base demo does not need external tools.

### "How much will a run cost?"

Do not quote static figures. Check the current terms, set a usage limit, and name
who can approve more.

## Pitfalls, anti-patterns, and recoveries

| Anti-pattern | Recovery |
| --- | --- |
| "Fix the project" with no criteria | Write one user-visible goal, non-goals, files, and tests. |
| Approving commands by habit | Pause and connect each command to a criterion. |
| Counting changed files as progress | Check behavior and test output instead. |
| Allowing a surprise dependency | Reject, restore the manifest, and use existing APIs. |
| Trusting the agent's test summary | Run the focused check independently. |
| Reviewing only the final message | Inspect complete diff and command output. |
| Endless self-correction | Stop after repeated cycles without a better result. |
| Treating intervention as failure | Normalize redirect, rollback, and stopping. |
| Using sensitive examples | Replace with synthetic fictional tasks. |
| Teaching fixed UI or entitlement | Check current docs before delivery. |

## Closing and lab handoff (0:57 to 1:00)

### Closing script

> "A well-directed agent task is a chain of reviewable decisions. The task
> contract limits the goal, tests check the result, and a human closes the loop."

### Lab handoff

Open `lab/README.md`.

Learners will keep one Todo API through four stages: scaffold it, compare Ask and Agent mode on one feature, redirect a repository refactor, and make a final human decision.

Use only synthetic credentials and data. Stop the lab if Agent mode or the
required repository permissions are unavailable.

### Lab readiness checklist

- [ ] Required Agent mode access is confirmed.
- [ ] Repository copy contains no sensitive data.
- [ ] Goal, constraints, tests, and stop rules are written.
- [ ] Human reviewer is named.
- [ ] A usage limit is recorded when it applies.
- [ ] Learners know how to cancel and stop the lab.
