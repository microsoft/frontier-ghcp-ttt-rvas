# Session 09 — Cloud-Agent Workflows

## Trainer content guide

### Delivery baseline

Use Enterprise Cloud as the governance baseline. Check current official GitHub documentation and customer administrator policy before demonstrating any cloud-agent workflow. Do not infer access, security controls, data handling, service behavior, or commercial terms from this curriculum.

### Access and cost preflight

Before delivery:

1. Confirm the attendee role, repository scope, data classification, and human reviewer.
2. Verify current official documentation and customer policy for the intended workflow.
3. Choose a non-sensitive, bounded issue with explicit acceptance criteria.
4. For any metered work, define a customer-owned meter, threshold, escalation contact, and stop guard.
5. Prepare the manual issue-writing and review exercise.

### No-access fallback

If access is absent, an approval is missing, or the stop guard is reached, learners write the issue, implement the smallest change manually in a repository sandbox, run the required checks, and review it with the supplied checklist. Do not bypass policy or submit unapproved data.

## Session objective

Teach an issue-driven, human-reviewed workflow. Learners should be able to define bounded work, collect review evidence, and compare only agents approved for the repository and data classification.

## Suggested agenda

| Segment | Activity |
| --- | --- |
| Preflight | Verify current documentation, policy, scope, and fallback. |
| Issue quality | Turn a vague request into acceptance criteria and constraints. |
| Setup review | Identify repository instructions, tests, and required permissions. |
| Review | Use a common quality and safety rubric for proposed changes. |
| Comparison | Compare approved agents only with the same issue and review rubric. |
| Fallback | Complete the bounded change manually when access is unavailable. |

## Issue-writing exercise

Use this structure:

```markdown
## Problem
Describe the user-visible issue and bounded scope.

## Acceptance criteria
- [ ] Expected behavior is testable.
- [ ] Relevant checks pass.
- [ ] A human reviewer can verify the result.

## Constraints
- Only approved repository paths and data
- Required repository conventions and tests
- Human review before merge
```

### Trainer talking point

> “A well-written issue is a work contract. It defines the outcome, the boundaries, and the proof required for review. It is useful whether the task is completed manually or through an approved workflow.”

## Comparative evaluation protocol

Customer policy controls third-party agent availability, workflow, model selection, data handling, and metering. Check current official GitHub documentation and customer policy before demonstrating or comparing an agent. Do not assume a named agent is enabled.

1. Select a non-sensitive, bounded issue and define a human-reviewed baseline.
2. Verify the agent is approved for the repository, data class, and task.
3. Run one approved agent at a time, using the same issue and checks.
4. Record quality, safety, reviewability, and customer-defined measurement observations.
5. Do not generalize one trial into a permanent capability claim.

| Dimension | Evidence |
| --- | --- |
| Access and policy | Current documentation, administrator approval, and repository scope |
| Quality | Acceptance criteria, tests, and review findings |
| Safety | Approved tools, permissions, and data sources |
| Reviewability | Scope, explanation, and ability to reproduce checks |
| Measurement | Customer-defined meter and stop guard |

## Review rubric

- Does the result meet the issue acceptance criteria?
- Did the required checks run and produce reviewable evidence?
- Is the scope limited to approved files, tools, and data?
- Are dependency, permission, and security implications understood by the reviewer?
- Is a human approval required before merge?

## Close

> “When access, policy, data scope, review ownership, or the stop guard is unclear, pause and use the manual fallback. That is disciplined engineering, not a failed exercise.”

---

## Minute-mapped delivery plan

| Clock | Segment | Trainer action | Learner evidence |
| --- | --- | --- | --- |
| 0:00–0:04 | Frame | State the human-reviewed, issue-driven objective. | Learners name the human decision point. |
| 0:04–0:09 | Preflight | Verify documentation, policy, data, reviewer, meter, and fallback. | Completed go/pause decision. |
| 0:09–0:16 | Mental model | Trace bounded issue to proposed change and review. | Lifecycle sketch. |
| 0:16–0:25 | Issue contract | Improve a vague fictional request. | Testable issue draft. |
| 0:25–0:32 | Repository setup | Review instructions, setup steps, permissions, and tests. | Boundary checklist. |
| 0:32–0:44 | Scripted walkthrough | Use one approved live path or the manual simulation below. | Session observations or manual patch plan. |
| 0:44–0:51 | Review | Apply the common rubric to the proposal. | Evidence-based review comment. |
| 0:51–0:56 | Comparison | Compare only approved paths against the same baseline. | Qualified comparison record. |
| 0:56–1:00 | Close | Confirm lab roles, stop guard, and fallback. | Ready-to-start signal. |

> **Timing rule:** Do not wait for a live run after 0:38. Switch to prepared evidence so review and handoff retain at least 16 minutes.

## Segment 1 — Frame the workflow (0:00–0:04)

### Trainer talking points

> “Today we practice handing a bounded task to an approved workflow, then having a human decide what happens next.”

> “A proposed pull request is evidence to inspect, not proof of correctness and never an automatic merge decision.”

Ask:

- What makes a task safe to delegate?
- What evidence must return with the proposal?
- Who is accountable for approval?

Expected answers include bounded scope, synthetic or approved data, explicit checks, and a named reviewer.

### Transition

> “First establish whether today’s live path is allowed.”

## Segment 2 — Run the preflight (0:04–0:09)

Display the preflight at the top of this guide.

Read each item aloud and record one of `confirmed`, `pending`, or `not permitted`.

Do not translate `pending` into implied permission.

For feature availability, entitlement, pricing, metering, data handling, security, or legal questions:

1. identify the current official documentation to consult;
2. identify the customer policy or accountable owner;
3. record the question without answering from memory;
4. pause live use until evidence is available.

### Trainer check

Ask the reviewer to say:

> “The training repository contains fictional data, the task is bounded, and I own the review decision.”

If they cannot, select the no-access fallback immediately.

### Transition

> “With a path selected, map what stays the same when implementation is automated or manual.”

## Segment 3 — Explain the lifecycle (0:09–0:16)

Draw this sequence:

```text
issue → environment/setup → plan → edits → checks → proposed change → human review
```

Emphasize:

- The issue defines outcome and non-goals.
- Repository guidance constrains implementation.
- Setup steps must be reviewable and must not contain credentials.
- Required checks create evidence but do not replace inspection.
- Branch rules and required reviewers remain authoritative.
- A session that loops, drifts, or reaches its stop guard is stopped.

### Check for understanding

Ask, “Where can a human intervene?”

Accept: before assignment, during clarification, at a stop guard, during review, and before merge.

### Transition

> “The earliest and cheapest control is a well-written issue, so we will build one now.”

## Segment 4 — Fully scripted issue exercise (0:16–0:25)

### Setup

Use only the fictional task API described in the session slides.

Show this weak request:

```text
Fix title validation.
```

### Exact trainer actions

1. Ask learners to underline every ambiguous word.
2. Open a blank issue using the structure already provided in this guide.
3. Type the following title:

   ```text
   Reject blank titles when creating a task
   ```

4. Type this body:

   ```markdown
   ## Problem
   `POST /tasks` currently accepts a blank or whitespace-only title.

   ## Acceptance criteria
   - [ ] Blank and whitespace-only titles return HTTP 400.
   - [ ] The response is `{ "error": "title is required" }`.
   - [ ] Valid task creation preserves its current response.
   - [ ] Focused validation tests and the existing test suite pass.

   ## Constraints
   - Change only the task route/helper and focused tests.
   - Use synthetic examples only.
   - Add no dependency and perform no unrelated refactor.
   - A human reviewer must approve the result.
   ```

5. Ask one learner to map each criterion to observable evidence.
6. Add `npm test` only if that command is verified in the starter project.

### Expected observable outcome

Learners should produce an issue that another person can implement without verbal context.

The issue should distinguish scope, non-goals, checks, and human ownership.

### Verification

Ask a peer to answer:

- Which files may change?
- What response proves the invalid case?
- What behavior must remain unchanged?
- What is explicitly prohibited?

If any answer is unclear, revise the issue before proceeding.

### No-access/manual fallback

Write the same issue in a local Markdown note.

Have one learner act as implementer and another as reviewer.

The implementer writes a patch plan; the reviewer checks it against every criterion.

### Recovery

If discussion expands into authentication, databases, deployment, or redesign, say:

> “Those may be valid future issues. They are non-goals for this bounded contract.”

### Transition

> “The issue defines the work. Repository setup defines safe, repeatable working conditions.”

## Segment 5 — Repository boundary review (0:25–0:32)

Show `lab/starter/copilot-instructions.md` and `lab/starter/copilot-setup-steps.yml`.

Ask learners to locate:

- approved file scope;
- development and test commands;
- prohibited dependency changes;
- network assumptions;
- secrets or credentials that must never appear;
- the independent review requirement.

Explain that the sample YAML is teaching material. It is not a permanent schema guarantee.

Verify current official documentation before presenting filename, syntax, runner, firewall, or permission behavior as supported.

### Observable outcome

The group produces a short boundary record:

```text
Allowed: task implementation and focused tests
Checks: verified starter test command
Data: synthetic only
Dependencies: no additions
Network: none required for the exercise
Reviewer: named before work starts
```

### Transition

> “Now observe one bounded implementation path without changing the contract.”

## Segment 6 — Fully scripted workflow walkthrough (0:32–0:44)

### Live-path setup

Proceed only when the preflight is confirmed.

Use a disposable training repository with the strong issue above.

Keep the meter and stop guard visible.

Never paste credentials, confidential data, or customer code into the issue or session.

### Exact trainer actions for an approved live path

1. Reopen the issue and read scope and non-goals aloud.
2. Use only the currently documented and organization-approved assignment path.
3. Name the reviewer before submission.
4. Open the session or progress view available in the approved surface.
5. Narrate only observed facts: planned files, requested tools, commands, and reported checks.
6. Pause if a requested action exceeds the issue or approved permissions.
7. At 0:38, stop waiting and switch to prepared evidence if no reviewable proposal exists.
8. If a proposal exists, open its diff and test evidence; do not merge.

### Safe trainer prompt or work order

```text
Implement only the attached “Reject blank titles” issue.
Follow repository instructions, add no dependencies, and change no unrelated files.
Run the verified focused checks and report their result.
Stop and request clarification if the task requires broader access or scope.
```

### Expected observable outcome

The audience sees either:

- a bounded plan and proposed diff with check results; or
- a clear blocked state that triggers the fallback.

Review is still required before either outcome is ready.

### Verification

Compare changed files with the issue.

Confirm invalid, whitespace, and valid-title evidence.

Confirm no dependency, configuration, generated, or unrelated file changed.

### Prepared no-access/manual walkthrough

Show this proposed implementation:

```js
export function normalizeTitle(value) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new ValidationError("title is required");
  }
  return value.trim();
}
```

Then show three proposed test cases: `""`, `"   "`, and `" Weekly plan "`.

Ask learners to predict outputs and identify that route-to-HTTP-400 mapping still requires verification.

Have them complete `lab/starter/pr-review-checklist.md` against the snippet and issue.

The manual fallback succeeds when the group records both supported evidence and missing evidence.

### Stop conditions

Stop the live path when:

- policy, access, data, or reviewer ownership becomes unclear;
- a secret or unapproved data source is requested;
- the diff expands beyond named paths;
- an unapproved dependency or network destination is requested;
- checks loop or fail without bounded recovery;
- the customer-defined meter reaches its threshold;
- the 0:38 cutpoint arrives without reviewable evidence.

### Transition

> “We now judge the proposal with the same rubric we would apply to a manual contribution.”

## Segment 7 — Review and feedback (0:44–0:51)

Use the review rubric above in this order:

1. acceptance criteria;
2. changed-file scope;
3. test and failure evidence;
4. dependency, permission, and data implications;
5. maintainability and repository conventions;
6. human decision.

Model this review comment:

```text
The blank-title case is covered, but the evidence does not show that valid creation
preserves its existing response. Add or run that focused test. Keep the current file
scope and report the verified test command and result.
```

Explain why it is actionable: it cites missing evidence, preserves scope, and states how to verify the fix.

### Transition

> “Apply one rubric before making a fair, qualified comparison.”

## Segment 8 — Comparison without capability claims (0:51–0:56)

Compare only paths confirmed by current documentation, policy, and approval.

Use identical issue text, starter state, test command, reviewer, and rubric.

Record observed results, not general claims.

Safe language:

- “In this bounded trial, the proposal changed two expected files.”
- “The manual baseline required one review correction.”
- “This result applies to this task and approved configuration.”

Unsafe language:

- “This agent is always safer.”
- “This workflow is included for everyone.”
- “Data is always handled in a particular way.”
- “This costs a fixed amount.”

Route all commercial, legal, compliance, data, and security questions to current official documentation and accountable organizational owners.

## Common trainee Q&A

### “Can we assign a large backlog item?”

Start with work that one reviewer can understand and verify in a small diff. Split larger work into independently testable issues; do not turn an agent into an unmonitored backlog queue.

### “Does a passing test suite mean we can merge?”

No. Tests support specified behavior; review must also cover scope, security, dependencies, data handling, conventions, and repository protections.

### “Which agent or model is best?”

There is no durable universal answer. Compare only approved options on representative bounded tasks, using current documentation, consistent criteria, and customer-owned measurement.

### “What data can the workflow use?”

The curriculum cannot decide that. The data owner, current official documentation, and organizational policy determine permitted data for the repository and workflow.

### “What does a run cost or consume?”

Do not quote remembered rates, allowances, or meter definitions. Consult current official documentation and the customer’s billing or platform owner, then apply the agreed threshold and stop guard.

### “Can setup steps contain a token?”

No credentials belong in committed setup examples, issues, or comments. Any approved secret mechanism must follow current documentation and organizational secret-handling policy.

### “What if the agent asks for broader scope?”

Do not silently grant it. Clarify within the issue, create a separate reviewed issue, or stop and use the fallback.

### “Is the no-access path a lesser exercise?”

No. It exercises issue quality, repository boundaries, verification, review judgment, and handoff. Those are the durable skills this session teaches.

## Pitfalls, anti-patterns, and recoveries

| Pitfall | Why it fails | Trainer recovery |
| --- | --- | --- |
| Vague “fix it” issue | No stable completion test | Rewrite as observable criteria and non-goals. |
| Waiting silently for a run | Loses teaching and review time | Narrate evidence, then switch at 0:38. |
| Capability claims from one demo | Behavior and access change | Say what was observed and require current verification. |
| Comparing different tasks | Produces an unfair result | Reset to one issue, starter state, and rubric. |
| Treating draft output as approved | Removes accountable review | Reapply checks and require the named reviewer. |
| Broad tool permissions | Expands risk without need | Reduce to least privilege or use manual fallback. |
| Hidden metering assumption | Removes the stop decision | Record meter, owner, threshold, and escalation first. |
| Scope drift during feedback | Converts review into redesign | Restate the issue and defer new work. |
| Credentials in instructions | Creates disclosure risk | Remove them and follow approved secret handling. |
| Ranking agents by reputation | Ignores task evidence | Compare observed quality, safety, and review effort. |

## Explicit time-pressure cutpoints

- **At 0:09:** unresolved preflight means manual path.
- **At 0:25:** freeze the issue; defer extra requirements.
- **At 0:32:** skip detailed setup discussion if the boundary record is complete.
- **At 0:38:** switch any pending live run to prepared evidence.
- **At 0:44:** stop implementation discussion and begin review.
- **At 0:51:** omit live comparison before omitting review.
- **At 0:56:** begin lab handoff even if Q&A remains.

Never cut the policy check, named reviewer, review decision, or no-access fallback.

## Closing and lab handoff (0:56–1:00)

Say:

> “The issue is the work contract, setup defines boundaries, and the proposed change remains subject to human review.”

Assign lab roles:

- issue author;
- implementer or approved workflow operator;
- independent reviewer;
- policy and stop-guard observer.

Confirm each group can point to:

- the bounded issue;
- the approved or manual path;
- the verified check;
- the stop condition;
- the human reviewer;
- the comparison and review templates.

End with:

> “If access disappears or evidence becomes unclear, continue with the manual baseline. Keep the contract, checks, and review decision.”
