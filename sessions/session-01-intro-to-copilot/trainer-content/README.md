# Session 01 — Introduction to Copilot

## Trainer content guide

### Delivery baseline

Use Enterprise Cloud as the governance baseline. Before delivery, verify current official GitHub documentation and the customer administrator policy for the intended environment. Do not teach commercial terms, model catalogs, service status, data terms, or legal commitments as fixed curriculum facts.

### Access and cost preflight

1. Confirm participant role, repository scope, and approved data classification.
2. Verify the current official documentation and customer policy for the selected workflow.
3. Use a non-sensitive, bounded starter task with explicit acceptance criteria.
4. For metered work, define the customer-owned meter, threshold, escalation contact, and stop guard.
5. Prepare the manual starter exercise.

### No-access fallback

If access is absent or policy does not permit a live exercise, learners complete the starter task manually, run the same checks, and compare their result with the solution or trainer review. The lab teaches disciplined inspection and validation. Learners do not need access to a product surface.

## Session objective

Teach that assistant output needs the same discipline as any proposed change: define the task, control scope, test it, and review it.

## Suggested agenda

| Segment | Activity |
| --- | --- |
| Framing | Explain that output is a proposal requiring verification. |
| Preflight | Confirm policy, data, scope, meter, and fallback. |
| Task design | Turn a vague request into acceptance criteria and constraints. |
| Inspection | Read a proposed or manual change against those criteria. |
| Validation | Run focused checks and conduct peer review. |
| Reflection | Identify where assistance helps and where human judgment remains essential. |

## Trainer talking points

> “An assistant can accelerate a bounded task, but it does not replace engineering judgment. We define the outcome, inspect the result, validate it, and decide whether to accept it.”

> “Before a live exercise, the customer’s current documentation and policy decide what may be used. If evidence is missing, we use the manual fallback.”

> “For metered work, a customer-defined stop guard is part of the task: know the meter, threshold, escalation owner, and manual alternative.”

## Bounded task pattern

```markdown
## Task
State one user-visible change.

## Acceptance criteria
- [ ] Expected behavior is testable.
- [ ] Relevant checks pass.
- [ ] The change stays in approved files and data.
- [ ] A human reviewer can understand the result.

## Constraints
- Follow repository conventions.
- Do not introduce unapproved dependencies or data.
- Stop and ask when a requirement is ambiguous.
```

## Review rubric

- Correctness: does the result meet the acceptance criteria?
- Scope: did the work stay within the intended files and task?
- Validation: are test and review results available?
- Safety: are data, dependencies, and permissions understood?
- Maintainability: can another developer explain and change the result?

## Close

Ask learners to name one routine task they could make more reviewable by adding acceptance criteria and a manual fallback. Remind them to recheck official documentation and customer policy before their next live use.

---

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Trainer outcome |
| --- | --- | --- |
| 0:00–0:05 | Welcome and durable mental model | Learners describe Copilot output as a proposal. |
| 0:05–0:15 | Architecture and LLM basics | Learners trace intent and approved context to reviewed output. |
| 0:15–0:25 | Access, policy, data, and cost preflight | The cohort selects the live or manual path. |
| 0:25–0:35 | Setup and suggestion controls | Learners can accept, reject, cycle, and edit deliberately. |
| 0:35–0:48 | Scripted bounded-function demo | The group evaluates a suggestion against tests. |
| 0:48–0:53 | Follow-up edit proposals | Learners treat every related edit as independently reviewable. |
| 0:53–0:58 | Strengths, limits, and Q&A | Learners identify where human judgment dominates. |
| 0:58–1:00 | Lab handoff | Everyone knows the first task, evidence, and fallback. |

### Time-pressure cutpoints

- At 0:15, cut the model explanation before cutting the preflight.
- At 0:25, skip installation clicks and use the prepared editor or screenshots.
- At 0:35, demonstrate only accept, reject, and edit; name cycling verbally.
- At 0:48, omit the follow-up-edit example if the bounded demo ran long.
- At 0:53, take one question and park the rest for the lab.
- Never cut verification, the no-access route, or the lab safety briefing.

## Segment 1 — Welcome and mental model (0:00–0:05)

### Trainer talking points

1. Welcome learners and state that this session teaches a workflow, not a promise of perfect output.
2. Say: “Copilot proposes. The developer defines intent, inspects the proposal, runs checks, and owns the decision.”
3. Ask for one routine coding task and one decision the group would not delegate.
4. Distinguish speed from confidence: speed comes from a useful draft; confidence comes from evidence.
5. State that product behavior and availability change, so current official documentation and organizational policy govern live use.

### Interaction

Ask: “What would you need to see before accepting ten generated lines into a repository?”

Listen for requirements, repository conventions, tests, diff review, and accountable approval.

### Transition

> “To review a proposal well, we need a simple picture of how it was produced.”

## Segment 2 — Architecture and LLM basics (0:05–0:15)

### Trainer talking points

- Draw: `intent + approved context → product surface → proposal → checks + human review`.
- Explain that this is a teaching model, not a fixed implementation or data-flow claim.
- Explain that prompts, nearby code, file type, instructions, and selected context can influence a proposal.
- A fluent answer can still be wrong, incomplete, or outside scope.
- Different runs can differ; reproducible tests matter more than identical wording.
- Avoid claims about training data, retention, telemetry, or model internals.
- Direct those questions to current official documentation and the organization’s approved policy owner.

### Check for understanding

Ask learners to label each item as intent, context, proposal, or evidence:

1. A docstring defining behavior.
2. A suggested function body.
3. A focused test result.
4. A repository coding convention.

Expected classification: intent/context, proposal, evidence, and context respectively.

### Transition

> “Before any context is sent or any suggestion requested, we decide whether the live path is permitted.”

## Segment 3 — Delivery preflight (0:15–0:25)

### Exact trainer actions

1. Display the existing **Delivery baseline**.
2. Identify the administrator or policy contact for the training environment.
3. Confirm the repository is disposable or approved and contains synthetic material only.
4. Confirm the learner’s intended account, role, and repository scope.
5. Check current official documentation for supported setup and controls.
6. Ask the organization owner whether the exercise is permitted.
7. Identify any applicable meter, the organization-owned threshold, and the stop owner.
8. Point to the prepared manual files under `lab/starter/`.
9. Announce either “live path” or “manual path” for the cohort.

### Safe wording

> “I am not inferring entitlement, cost, data handling, or feature support from a plan name. We use current official evidence and the organization’s policy.”

> “If any approval is unclear, the fallback is the planned exercise, not a degraded exception.”

### Observable outcome

The cohort can state:

- which repository and data are approved;
- which surface, if any, will be used;
- who owns review and escalation;
- when metered activity stops;
- where the manual exercise begins.

### Transition

> “Once permission is clear, we can practice the controls that turn a suggestion into a deliberate choice.”

## Segment 4 — Setup and suggestion controls (0:25–0:35)

### Trainer walkthrough

1. Open the approved IDE and the training repository.
2. Confirm the intended account and current status using the IDE’s supported controls.
3. Open `lab/starter/utils.py`.
4. Read the first function name, type hints, and docstring aloud.
5. Place the cursor where a body belongs and pause.
6. If a suggestion appears, do not accept immediately.
7. Read it line by line and compare it with the docstring.
8. Demonstrate rejection for an unsuitable proposal.
9. Demonstrate acceptance only for a proposal the group has reviewed.
10. Use the key bindings shown by the learner’s current IDE rather than asserting fixed shortcuts.

### Expected observations

- The file name, function name, types, and docstring provide context.
- Suggestions may differ between learners.
- Rejecting or editing a suggestion is normal.
- IDE controls expose a proposal; they do not validate correctness.

### Manual fallback

Open `lab/solution/utils.py` beside the starter.

Reveal one line at a time as a prepared proposal.

Ask learners to mark accept, reject, or revise and explain why.

No product access is required to practice the decision.

### Transition

> “Use one small function to show the inspect-test-review loop.”

## Scripted demo — Normalize a fictional username (0:35–0:48)

### Purpose

Demonstrate bounded intent, suggestion review, focused tests, diff inspection, and recovery without sensitive data or dependencies.

### Setup

Use a disposable Python file named `demo_normalize.py`.

Start with a clean working tree or record that the file is outside a repository.

Paste:

```python
def normalize_username(value: str) -> str:
    """Return a lowercase username with surrounding whitespace removed."""
```

State these acceptance criteria:

```python
assert normalize_username("  Ada ") == "ada"
assert normalize_username("") == ""
assert normalize_username("RIVER") == "river"
```

State the non-goals:

- no character replacement;
- no uniqueness check;
- no external service;
- no dependency.

### Exact trainer prompt

If live inline suggestions are approved, type a blank indented line after the docstring.

If using Chat in an approved surface, use:

```text
Propose only the body of normalize_username.
Meet the three stated examples.
Do not add dependencies or change the function signature.
```

### Exact trainer actions

1. Pause when a proposal appears.
2. Ask: “Which acceptance criterion does each operation support?”
3. Reject any proposal that adds unrequested validation or changes the signature.
4. Accept or manually type the smallest valid body:

   ```python
       return value.strip().lower()
   ```

5. Add the three assertions beneath the function.
6. Run the file with the available Python command for the environment.
7. Show that a successful run produces no assertion failure.
8. Deliberately change `.lower()` to `.upper()`.
9. Run again and show an assertion failure.
10. Restore `.lower()`, rerun, and inspect the final diff or file.

### Expected output or observable outcome

- With `.lower()`, all three assertions pass.
- With `.upper()`, at least the first or third assertion fails.
- The final implementation is one return statement.
- The final change contains no dependency, external access, or unrelated behavior.

### Verification questions

- Does surrounding whitespace disappear?
- Does case normalize as specified?
- Does the empty string remain empty?
- Did the proposal invent behavior?
- Can another developer understand the evidence?

### No-access/manual fallback

Write these candidates on screen:

```python
return value.lower()
return value.strip().lower()
return value.replace(" ", "").lower()
```

Have pairs execute the examples mentally.

Expected decision: the second candidate meets all criteria without deleting internal spaces.

Then reveal the prepared solution and perform the same review.

### Demo recovery

- If no suggestion appears, type the candidate manually and continue.
- If the output differs, compare behavior rather than criticizing the model.
- If Python is unavailable, trace each assertion on paper.
- If the live surface requests unexpected access, stop and switch to manual.
- If discussion runs long, omit the deliberate failing edit but keep one successful verification.

### Transition

> “A passing focused check supports this function; it does not prove that every related caller is correct.”

## Segment 6 — Follow-up edit proposals (0:48–0:53)

### Trainer talking points

- A rename or signature change may trigger proposed edits elsewhere.
- Treat every proposed caller update as a new review decision.
- Search for missed callers independently.
- Run the relevant checks after the complete change.
- Do not describe follow-up suggestion availability or controls as guaranteed.
- Verify current official documentation before demonstrating the current surface.

### Micro-exercise

Rename a fictional parameter from `value` to `username`.

Ask learners to list the evidence needed:

1. search results for old references;
2. updated tests;
3. diff review;
4. focused execution.

### Transition

> “Choose a task that is safe to review.”

## Segment 7 — Strengths, limits, and decision practice (0:53–0:58)

### Use assistance when

- the task is bounded and observable;
- examples or tests make correctness reviewable;
- the data and repository are approved;
- a human owns the result;
- manual completion remains practical.

### Prefer manual work or pause when

- requirements are ambiguous;
- authorization, privacy, legal, or architecture judgment is unresolved;
- restricted data may be exposed;
- the output cannot be tested or reviewed;
- current documentation or organizational approval is missing.

### Trainer prompt

Ask: “Is drafting a small string helper a suitable task? Is deciding a retention policy?”

Expected answer: the helper can be bounded and tested; policy requires accountable organizational decision-making.

## Common trainee Q&A

### “Is generated code correct?”

Not by default. Treat it as a proposal. Read it, test expected and failure behavior, inspect the complete diff, and obtain the review required by the repository.

### “Does accepting more suggestions make the tool learn our private code?”

Do not speculate. Demonstrate only visible controls and direct learners to current official product, privacy, and data-handling documentation plus organizational policy.

### “Which model, plan, or IDE should we use?”

There is no timeless course answer. Verify current support, entitlements, organizational enablement, metering, and workload fit before delivery.

### “Will this replace developers?”

The session does not predict staffing outcomes. It shows that developers still define intent, resolve ambiguity, validate behavior, and own changes.

### “Can I paste an error log?”

Only if its classification and the selected workflow are approved. Remove secrets and sensitive values; use a synthetic reproduction when in doubt.

### “Why did I receive a different suggestion?”

Context and generated output can vary. Compare both proposals against the same acceptance criteria and tests rather than seeking identical text.

### “Should I accept a suggestion that passes one test?”

One passing test is partial evidence. Check edge cases, scope, maintainability, dependencies, and the repository’s required checks.

### “What if access disappears during the lab?”

Stop the live workflow, record the point reached, and continue with starter and solution files. The review and validation outcome remains the same.

## Pitfalls, anti-patterns, and recoveries

| Pitfall | Why it fails | Trainer recovery |
| --- | --- | --- |
| Accepting before reading | Fluent code can hide wrong assumptions. | Undo, restate criteria, and review line by line. |
| Vague “write the function” request | Missing behavior invites invention. | Add examples, non-goals, and file scope. |
| Real names or production data | The training task does not need them. | Replace with fictional values and restart. |
| Treating a green check as complete proof | Coverage may be narrow. | Add an edge case and inspect the diff. |
| Debugging product access live for too long | It consumes learning time and can encourage bypasses. | Use the prepared manual path after two minutes. |
| Quoting fixed prices or allowances | Commercial details change. | Open current official documentation or defer to the owner. |
| Claiming fixed data behavior | Settings and terms may differ. | Refer to current evidence and organizational policy. |
| Measuring success by accepted lines | Volume does not establish value or quality. | Measure reviewed outcomes and defects caught. |
| Allowing scope drift | Extra behavior increases risk and review effort. | Return to explicit non-goals and discard unrelated changes. |

## Closing and lab handoff (0:58–1:00)

### Closing script

> “A useful suggestion saves drafting time. A disciplined developer turns it into trustworthy work by bounding the task, protecting context, inspecting the proposal, running checks, and making the final decision.”

### Lab handoff

Direct learners to `lab/README.md`.

The first live path uses `lab/starter/utils.py`.

The first manual path compares that starter with `lab/solution/utils.py`.

Learners then explore JavaScript and TypeScript helpers, optional follow-up edits in `refactor-me.py`, and the effectiveness journal.

### Evidence to retain

- the completed utility functions or manual decisions;
- focused command output or paper traces;
- one rejected or revised proposal and rationale;
- the completed journal reflection;
- the selected live or fallback path.

### Final readiness check

- [ ] The cohort knows its approved path.
- [ ] Synthetic starter data is open.
- [ ] The first acceptance criteria are visible.
- [ ] Learners know how to stop and ask.
- [ ] A reviewer is assigned.
- [ ] The manual solution is available.
