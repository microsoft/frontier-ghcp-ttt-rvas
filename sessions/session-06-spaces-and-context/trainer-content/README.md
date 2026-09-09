# Session 06 — Context Workflows

## Trainer content guide

### Delivery baseline

Use Enterprise Cloud as the governance baseline. Before delivery, verify current official GitHub documentation and the customer administrator policy for the intended context workflow. Do not present a changing surface, automatic behavior, storage behavior, or availability state as a curriculum guarantee.

### Access and cost preflight

1. Confirm the repository, attendee role, approved data classification, and task owner.
2. Verify current documentation and customer policy for the intended workflow.
3. Choose a non-sensitive, bounded question and approved repository sources.
4. For metered work, define the customer-owned meter, threshold, escalation contact, and stop guard.
5. Prepare a manual context-packet exercise.

### No-access fallback

Learners assemble the context packet manually, use it to plan and review the starter change, and compare the result with the acceptance criteria. Do not add a source or live surface that the customer policy has not approved.

## Session objective

Teach learners to curate minimal, relevant, reviewable context for a task. The lasting skill is source selection and evidence-based review, not reliance on a particular product surface.

## Suggested agenda

| Segment | Activity |
| --- | --- |
| Preflight | Confirm policy, data, task, measurement, and fallback. |
| Source selection | Select only relevant repository instructions, code, tests, and docs. |
| Context packet | Explain why every included source is necessary. |
| Bounded task | Use the packet to plan a small change. |
| Review | Check that output follows evidence and tests. |
| Fallback | Repeat the exercise manually. |

## Context packet pattern

```text
Task: make one API behavior change

Include:
- route or service file
- focused tests
- relevant API contract
- repository conventions

Exclude:
- unrelated repositories
- sensitive data
- broad documentation that does not affect the task
```

## Trainer talking points

> “Context is an engineering input. Select the smallest set of approved sources that lets a reviewer explain the result.”

> “If source eligibility or product behavior is unclear, stop and use the manual context packet. It teaches the same lesson without a policy exception.”

> “Metered work has a customer-defined stop guard. Narrow the context or use the manual fallback when the guard is reached.”

## Review rubric

- Does every source have a clear relationship to the task?
- Is all included data approved for the workflow?
- Does the result follow repository evidence and acceptance criteria?
- Are assumptions identified for human review?
- Can the task be completed manually from the packet?

## Close

Ask learners to identify a common task where less context would improve clarity and reviewability. Recheck official documentation and customer policy before a live exercise.

---

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Trainer outcome |
| --- | --- | --- |
| 0:00–0:08 | Diagnose the context problem | Learners distinguish missing evidence from excess noise. |
| 0:08–0:18 | Context hierarchy | Learners rank task, instructions, curated sources, and local references. |
| 0:18–0:30 | Curated context workflows | The group creates a purpose, audience, source list, and owner. |
| 0:30–0:42 | Instructions and reusable prompts | Learners separate durable rules from repeatable tasks. |
| 0:42–0:50 | Source governance and maintenance | Each source receives scope and freshness checks. |
| 0:50–0:58 | Scripted before/after demo | Two responses are compared using evidence, not fluency. |
| 0:58–1:00 | Close and lab handoff | Learners begin with an approved context packet. |

### Time-pressure cutpoints

- At 0:08, use one missing-context and one excess-context example.
- At 0:18, keep the hierarchy diagram and omit secondary surface examples.
- At 0:30, describe sharing rather than navigating a changing UI.
- At 0:42, create one instruction excerpt and one prompt file, not a library.
- At 0:50, mention memory only as an availability-dependent concept requiring verification.
- At 0:55, compare plans rather than waiting for generated code.
- Never cut source approval, maintenance ownership, fallback, or lab boundaries.

## Segment 1 — Diagnose context quality (0:00–0:08)

### Trainer talking points

- Context is an engineering input. It does not authorize collecting everything available.
- Missing contracts cause invented assumptions.
- Broad, stale, or conflicting sources can obscure the decisive rule.
- Restricted data must not be added merely because it seems relevant.
- A confident answer is not evidence that the right source was used.
- The lasting skill is selecting the smallest approved packet that supports review.

### Opening exercise

Display this request:

```text
Add validation to the checkout endpoint.
```

Ask learners what is missing.

Expected answers include endpoint location, input contract, error shape, repository conventions, focused tests, and allowed data.

Then ask what should not be added.

Expected answers include unrelated repositories, production records, secrets, and ownerless stale documents.

### Transition

> “We can organize those choices as a hierarchy, starting with the task itself.”

## Segment 2 — Context hierarchy (0:08–0:18)

### Detailed talking points

1. Task intent and acceptance criteria define the immediate outcome.
2. Repository instructions provide durable, reviewed conventions.
3. Reusable prompt files encode repeatable workflows.
4. Curated collections can bring approved code, docs, issues, and specifications together for a purpose.
5. Current files and explicit references supply local evidence.
6. Any retained memory, when supported and approved, needs source, scope, and freshness.
7. Specific task requirements override generic guidance.
8. Conflicts require clarification; they are not resolved by adding more context.

### Source-ranking exercise

For a fictional quantity-validation change, rank:

- current API contract;
- focused route tests;
- owned architecture note;
- unrelated product roadmap;
- production request log.

Include the contract, tests, and the relevant owned note.

Exclude the unrelated roadmap and production log.

### Transition

> “A useful curated workflow makes that source decision explicit and maintainable.”

## Segment 3 — Curated context workflow (0:18–0:30)

### Access and governance check

1. Revisit the Delivery baseline.
2. Confirm current official documentation for the intended context surface.
3. Confirm attendee role, repository access, and approved data classification.
4. Verify organizational policy for adding and sharing sources.
5. Identify any applicable meter, threshold, escalation owner, and stop guard.
6. Select the manual packet if any evidence is incomplete.

### Trainer-created context card

```markdown
Purpose: answer questions about the fictional Checkout API validation behavior.
Audience: workshop participants.
Owner: training repository maintainer.
Review date: before the next cohort.

Include:
- docs/api-contract.md
- src/routes/checkout.ts
- src/services/checkout.ts
- tests/checkout.test.ts
- .github/copilot-instructions.md

Exclude:
- production data
- secrets and credentials
- unrelated services
- abandoned proposals
```

### Talking points

- A curated Space may support this workflow when it is available and approved.
- Do not infer sharing, access, retention, or entitlement behavior.
- Verify those facts in current official documentation and organizational policy.
- Source-level access does not automatically authorize a new audience or use.
- Assign an owner and review trigger before sharing.
- Test the packet with a known question whose answer exists in the sources.

### Observable outcome

Learners can explain why every included source is necessary and why every excluded source is unnecessary or unsuitable.

### Transition

> “Curated evidence answers what the project says; repository instructions state how work should proceed.”

## Segment 4 — Instructions and reusable prompts (0:30–0:42)

### Repository instruction example

```markdown
# Repository guidance

- Validate request input at the route boundary.
- Keep business logic in src/services/.
- Preserve the documented error response shape.
- Run the focused test before proposing completion.
- Do not add dependencies without reviewer approval.
```

### Trainer talking points

- Use observable instructions rather than “write high-quality code.”
- Keep durable conventions separate from one feature’s requirements.
- Review instruction files through the repository’s normal process.
- Instructions guide proposals; they are not enforcement or proof.
- Verify current supported paths, names, and settings before demonstrating.
- Retain the text as a manual checklist if loading behavior is unavailable.

### Reusable prompt example

```markdown
---
description: Review a checkout validation change
---

Read the selected contract, route, service, tests, and repository guidance.
List mismatches before proposing changes.
Do not edit files outside the selected feature.
End with assumptions, cited evidence, and the focused validation command.
```

### Pair exercise

Ask pairs to label each sentence as:

- durable instruction;
- task-specific prompt;
- acceptance criterion;
- unsuitable vague guidance.

Debrief disagreements and move feature-specific behavior out of repository-wide rules.

### Transition

> “Context is useful only while its source, scope, and freshness remain trustworthy.”

## Segment 5 — Source governance and maintenance (0:42–0:50)

### Three-question check

For every source or remembered fact, ask:

1. **Source:** Where did this fact come from?
2. **Scope:** Which repository, audience, and task does it apply to?
3. **Freshness:** Which event or date triggers revalidation?

### Maintenance table

| Trigger | Required action |
| --- | --- |
| API contract changes | Update packet sources and retest a known question. |
| Repository convention changes | Review instruction and prompt files. |
| Source owner changes | Assign a new accountable maintainer. |
| Output conflicts with evidence | Remove stale sources and clarify authority. |
| Product behavior changes | Recheck current official documentation. |
| Policy or audience changes | Reapprove source eligibility and sharing. |

### Safe delivery wording

> “Availability-dependent memory or context features must be verified before use. Never store secrets, restricted material, or guesses. The manual source log remains authoritative for this exercise.”

### Transition

> “We will now test whether a smaller grounded packet produces a more reviewable plan.”

## Scripted demo — Quantity validation with and without grounding (0:50–0:58)

### Purpose

Compare response quality using explicit criteria while avoiding claims that a surface always cites or follows context.

### Setup

Prepare four fictional excerpts:

`docs/api-contract.md`:

```text
quantity must be a JSON integer from 1 through 99.
Invalid quantity uses the existing VALIDATION_ERROR response.
Numeric strings are not accepted.
```

`src/routes/checkout.ts`:

```ts
const quantity = parseQuantity(req.body.quantity);
```

`src/services/quantity.ts`:

```ts
export function parseQuantity(value: unknown): number {
  return Number(value);
}
```

`tests/checkout.test.ts` lists valid `1`, valid `99`, invalid `0`, invalid `100`, and invalid `"2"`.

Use synthetic data only.

### Pass A — Minimal prompt

Exact prompt:

```text
Add validation to the checkout endpoint.
```

### Trainer actions for Pass A

1. If approved access exists, submit the prompt without project context.
2. Otherwise reveal a prepared generic proposal.
3. Record assumptions about range, numeric strings, error shape, and test command.
4. Do not score writing style or confidence.

### Expected observation for Pass A

The response may lack the range, accept numeric strings, invent an error, or omit tests.

Variation is acceptable; the teaching point is that the request lacks evidence.

### Pass B — Grounded prompt

#### Exact trainer prompt

Exact prompt:

```text
Using only the approved API contract, route, quantity service, focused tests,
and repository instructions, propose the smallest quantity-validation change.
First list acceptance criteria and assumptions.
Do not add dependencies or accept numeric strings.
End with the evidence used and the focused test command.
```

### Exact trainer actions for Pass B

1. Confirm each source is approved and current.
2. Submit through the approved context workflow or use the printed packet.
3. Require acceptance criteria before code.
4. Compare the plan with the contract and test list.
5. Ask whether `Number.isInteger(value)` rejects the string `"2"`.
6. Check both lower and upper boundaries.
7. Record any unsupported assumption.

### Expected outcome

The grounded response should state the integer and boundary criteria, reject numeric strings, avoid new dependencies, and identify the focused tests and source evidence.

It may then include a code proposal such as:

```ts
export function parseQuantity(value: unknown): number {
  if (!Number.isInteger(value) || Number(value) < 1 || Number(value) > 99) {
    throw new ValidationError("quantity must be an integer from 1 through 99");
  }
  return Number(value);
}
```

The existing project’s error type and message remain subject to source verification.

### Verification rubric

| Dimension | Pass question |
| --- | --- |
| Correctness | Are integer type and both boundaries represented? |
| Scope | Is the proposal limited to the selected feature? |
| Assumptions | Are unresolved decisions named? |
| Evidence | Can each behavior be traced to a source? |
| Testability | Are valid and invalid cases explicit? |
| Data | Was only synthetic approved context used? |

### No-access/manual fallback

Give half the room only the minimal request.

Give the other half the four-source packet and grounded prompt.

Each group writes a plan, not code.

Swap plans and score them with the rubric.

Reveal the code proposal only during debrief.

### Demo recovery

- If the surface is unavailable, use the printed responses.
- If it ignores an instruction, mark the mismatch; do not claim enforcement.
- If sources conflict, stop and assign clarification to the source owner.
- If the packet is noisy, remove one source and explain the decision.
- If time expires, compare acceptance criteria and skip code generation.

## Common trainee Q&A

### “Should we add the whole repository?”

No. Start with the smallest approved set that supports the task, then add a source only when a specific evidence gap remains.

### “Do instructions guarantee compliance?”

No. They guide output. Tests, policy controls, repository checks, and human review provide enforcement and evidence.

### “Which source wins when docs and code disagree?”

Do not guess. Identify the accountable source owner, record the conflict, and clarify before implementation.

### “Can we include issue comments or meeting notes?”

Only when approved, relevant, owned, and current. Separate decisions from unverified discussion.

### “Does a Space change repository permissions?”

Do not infer access behavior. Verify current official documentation and organizational policy before adding or sharing any source.

### “Can we store team conventions in memory?”

Use repository-reviewed artifacts for durable team rules. Any memory feature requires current support, policy, source, scope, freshness, and data checks.

### “Why did the grounded response still miss a rule?”

Context makes more evidence available. It does not guarantee correct use. Make the rule explicit, test it, and review the result.

### “What does this cost?”

Check current official metering information for the organization and selected workflow. Use the organization-defined threshold and manual stop path.

## Pitfalls, anti-patterns, and recoveries

| Anti-pattern | Recovery |
| --- | --- |
| “More context is always better” | Remove sources that do not affect a criterion. |
| Adding restricted records | Stop, remove them, notify the appropriate owner, and use synthetic data. |
| Mixing stale and current contracts | Identify authority and update or exclude the stale source. |
| Vague instructions | Rewrite as observable repository behavior. |
| Treating citations as correctness | Open the source and verify the claim. |
| No source owner | Assign one or do not share the packet. |
| No review date | Add event-based and scheduled maintenance triggers. |
| Assuming instructions loaded | Test observable behavior and retain a manual checklist. |
| Teaching fixed paths or UI | Verify current official documentation at delivery. |
| Context changes without review | Manage shared artifacts through normal repository review. |

## Closing and lab handoff (0:58–1:00)

### Closing script

> “Good context is small enough to explain, approved for the audience, tied to evidence, and maintained by an owner. Better output starts with better source decisions.”

### Lab handoff

Open `lab/README.md`.

The live path may curate the fictional e-commerce sources, create repository instructions, compare context levels, and build reusable prompts.

The no-access path assembles the same files as a manual packet and completes the comparison in `lab/starter/context-comparison.md`.

Verify current support and policy before using any changing UI, path, setting, sharing control, or memory feature.

### Readiness checklist

- [ ] Purpose, audience, and owner are written.
- [ ] Every source is approved and synthetic.
- [ ] Exclusions are explicit.
- [ ] One known-answer question is ready.
- [ ] Maintenance triggers are assigned.
- [ ] Live or manual path is selected.
- [ ] Meter and stop guard are recorded when they apply.
