# Session M2-02: IDE agent workflows

## Before teaching

- Pick a training repository with a small task and clear acceptance criteria.
- Check that Agent mode works in your editor.
- Use synthetic data only.

## Session objective

Show learners how to review work at each step of the agent loop.

```text
Plan → Act → Observe → Review → Revise or stop
```

Learners define the task and approve actions. The agent proposes work inside
those limits.

## One-hour plan

| Time | Segment | Result |
| --- | --- | --- |
| 0:00 to 0:08 | Assistant-to-agent shift | Learners tell a continuation, an answer, and a goal-driven task apart |
| 0:08 to 0:18 | Agent loop and tools | The group knows what to check at each stage |
| 0:18 to 0:28 | Task contracts and trust | The contract and stop rules are visible |
| 0:28 to 0:43 | Multi-file demo | The group reviews the plan, commands, diff, and test output |
| 0:43 to 0:50 | Chat, agent, or manual | Learners pick a workflow from the task |
| 0:50 to 0:57 | Redirect and stop | Learners redirect or stop without widening scope |
| 0:57 to 1:00 | Close and lab handoff | |

If time runs short, use the prepared plan instead of waiting for a generated one,
stop the demo after the route and test review, and run one redirect instead of two.
Never cut the independent test run or the stop rules.

## Segment 1: From assistant to agent (0:00 to 0:08)

1. Inline assistance proposes a local continuation.
2. Chat usually answers or proposes a small edit.
3. An agent can pursue a goal through several actions.
4. More actions need more review. You stay accountable.

Present three fictional tasks:

- explain one regular expression;
- change one error message;
- add an optional filter across route, service, and tests.

Ask learners to choose Chat, a manual edit, or an agent workflow, and say how much
review it needs.

> "At each step, you need output you can check before the agent continues."

## Segment 2: Plan, act, observe, review (0:08 to 0:18)

- **Plan:** map acceptance criteria to files, commands, and risks.
- **Act:** approve only the read, edit, or command the task needs.
- **Observe:** read command output and changed files.
- **Review:** compare behavior and scope with the contract.
- **Revise:** change one assumption at a time and check the new result.
- **Stop:** end the task when scope, data, permissions, or repeated failures cross
  a limit.

After each stage, ask:

- **Plan:** Does every step support an acceptance criterion?
- **Act:** Was this file or command necessary?
- **Observe:** What changed, and what does the output show?
- **Review:** Would a reviewer accept this?

## Segment 3: Task contract and trust (0:18 to 0:28)

Open the starter task and write this contract:

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

| Proposed action | Question before approval |
| --- | --- |
| Read a file | Do you need this path and its data? |
| Edit a file | Which criterion requires the edit? |
| Run a test | Do you understand the command and its scope? |
| Add a package | Is it necessary? |
| Use the network or an external tool | Where does the data go? |

> "We'll direct one feature and pause at each checkpoint."

## Demo: optional task filter (0:28 to 0:43)

Use a disposable fictional TypeScript project or prepared excerpts. Start from a
clean working tree. Show the focused test command without running it yet. Don't
install packages or connect to external systems.

```text
route.ts → task-service.ts
    └────→ route.test.ts
```

Opening prompt:

```text
Implement the attached completed-filter task contract.
First inspect only the route, service, and focused test.
Return a three-step plan before editing.
Do not add dependencies, use the network, or change the response schema.
Stop if existing behavior is ambiguous.
```

The plan should:

1. inspect query parsing and the existing error shape;
2. pass an optional boolean to the service and filter without changing the
   unfiltered path;
3. add true, false, invalid, and omitted-parameter tests.

Steps:

1. Compare the plan with the contract. Reject steps that touch other files or add
   dependencies.
2. Approve only reads in the named scope.
3. If your surface can, ask for the proposed diff before broad commands.
4. Check parsing for exact `"true"` and `"false"`.
5. Check that `undefined` keeps the existing service behavior.
6. Check tests for all four criteria.
7. Run the focused test command yourself.
8. Read `git diff --stat` and the full diff, and look for response-schema or
   dependency changes.
9. Decide: accept, revise, or stop.

Expected code shape (an example, not a required pattern):

```ts
const value = req.query.completed;
if (value !== undefined && value !== "true" && value !== "false") {
  return res.status(400).json({ error: "completed must be true or false" });
}
const completed = value === undefined ? undefined : value === "true";
return res.json(taskService.list({ completed }));
```

Expected result: four focused cases, correct filtering, the stated 400 shape, an
unchanged unfiltered list, only three files changed, and no package or external
access.

Ask learners:

- Which test covers the omitted parameter?
- Could a truthiness conversion accept `"yes"`?
- Did the service mutate stored tasks?
- Does the diff match the accepted plan?

If Agent mode fails during the demo, pairs can write the plan, a query-parsing
truth table, four test names, and a change list by hand. Reveal the code
afterward.

If something goes wrong:

- **Plan too broad:** "Stop. Use only the three named files and show a revised plan."
- **Dependency proposed:** reject it and restate the no-dependency constraint.
- **Test fails:** ask for an explanation tied to one failing assertion before
  allowing a revision.
- **Repeated revisions with no progress:** stop and describe the smallest
  acceptable correction.

> "Agent mode fit because the change crossed related files and tests could guide
> each step. Other tasks need a different workflow."

## Segment 5: Chat, agent, or manual (0:43 to 0:50)

Use Chat to explain a problem, suggest options, or propose one small edit. Use an
agent for clear multi-file outcomes with named tools and tests. Work manually when
the change is tiny, requirements are unclear, or autonomy adds review work. Pause
when permissions, data handling, or a destructive action is unresolved.

| Task | Start with | Reason |
| --- | --- | --- |
| Explain a failing assertion | Chat or inspection | No multi-file action |
| Rename a local variable | Manual or inline | The edit is small |
| Add a route plus service tests | Agent | The files and tests are closely related |
| Decide an authorization policy | A person | It's a policy decision |

> "You can redirect the agent or stop it. You don't have to follow its first plan."

## Exercise: redirect and stop (0:50 to 0:57)

Tell learners a proposal has started changing the response schema and
`package.json`. The redirect:

```text
Stop. Do not change package.json or the response schema.
Revert those proposed changes.
Keep the existing service API and add only the optional filter.
Show the revised plan before editing.
```

The revised plan returns to route, service, and tests, and the dependency and
schema changes leave the proposed diff.

Then say an unexpected command requests network access. Learners choose **stop**
and note the unresolved permission. Check that the revised file list matches the
contract and nothing unrelated is still queued.

## Common questions

**Should I approve every tool call so the agent can finish?**
No. Check why the action is needed, what it affects, and whether you can undo it.
Reject or stop when the contract doesn't require it.

**Is agent mode always better for multi-file work?**
No. Requirements, tests, risk, and review cost matter. Chat or manual work can give
you more control.

**What if it keeps fixing its own failures?**
Iteration helps only when each cycle improves the result. Stop repeated, broad, or
unexplained changes and inspect the problem.

**How do we know which files it read?**
Use the product's file list and repository tools. If you can't tell, stop.

**What about MCP or external tools?**
Check the server, its permissions, and where data goes. The demo needs none.

## Pitfalls

| Pitfall | Recovery |
| --- | --- |
| "Fix the project" with no criteria | Write one user-visible goal, non-goals, files, and tests |
| Trusting the agent's test summary | Run the focused test yourself |
| Reviewing only the final message | Read the full diff and command output |
| A surprise dependency | Reject it, restore the manifest, use existing APIs |

## Close and lab handoff (0:57 to 1:00)

> "Define the task before the agent starts. Use tests to check the result, then
> decide whether to accept it."

Open `lab/README.md`. Learners scaffold one Todo API, compare Ask and Agent mode on
a feature, redirect a repository refactor, and decide whether to accept the work.
Check that every learner has Agent mode before they start.
