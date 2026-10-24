# Session m2-03: Context workflows

## Before teaching

Read the [course safety baseline](../../learning-safety-baseline.md). Before the
demo, check the current GitHub docs and your organization's rules. Product
behavior and availability can change.

### Access and cost preflight

1. Choose the training repository and synthetic data.
2. Check which sources learners may add or share.
3. Choose a small question and the files needed to answer it.
4. Set a usage limit if the work is metered and name who can approve more.
5. Check Spaces and GitHub Copilot access before the lab.
6. Check standalone CLI `/env` and `/instructions` in the copied Storefront project.

### Access failure

Stop the learner lab. A printed context packet may support the
trainer demonstration, but it does not count as learner completion.

## Session objective

Teach learners to select the few files needed for a task and check the answer
against those files.

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Trainer outcome |
| --- | --- | --- |
| 0:00 to 0:08 | Diagnose the context problem | Learners distinguish missing information from excess noise. |
| 0:08 to 0:18 | Context hierarchy | Learners rank task, instructions, curated sources, and local references. |
| 0:18 to 0:30 | Curated context workflows | The group creates a purpose, audience, source list, and owner. |
| 0:30 to 0:42 | Instructions and reusable prompts | Learners separate project-wide rules from repeatable tasks. |
| 0:42 to 0:50 | Source governance and maintenance | Each source receives scope and freshness checks. |
| 0:50 to 0:58 | Scripted before/after demo | The group compares two responses with the source files. |
| 0:58 to 1:00 | Close and lab handoff | Learners begin by selecting sources for their Space. |

### Time-pressure cutpoints

- At 0:08, use one missing-context and one excess-context example.
- At 0:18, keep the hierarchy diagram and omit secondary surface examples.
- At 0:30, describe sharing rather than navigating a changing UI.
- At 0:42, create one instruction excerpt and one prompt file, not a library.
- At 0:50, mention memory only after noting that learners must check its availability.
- At 0:55, compare plans rather than waiting for generated code.
- Never cut source approval, maintenance ownership, access checks, or lab boundaries.

## Segment 1: Diagnose context quality (0:00 to 0:08)

### Trainer talking points

- Context is an engineering input. It does not authorize collecting everything available.
- Missing contracts cause invented assumptions.
- Broad, stale, or conflicting sources can obscure the decisive rule.
- Restricted data must not be added merely because it seems relevant.
- A confident answer does not show that the right source was used.
- Teach learners to select the fewest files needed for review.

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

> "We can organize those choices as a hierarchy, starting with the task itself."

## Segment 2: Context hierarchy (0:08 to 0:18)

### Detailed talking points

1. Task intent and acceptance criteria define the immediate outcome.
2. Repository instructions provide reviewed project-wide conventions.
3. Reusable prompt files encode repeatable workflows.
4. Curated collections can bring code, docs, issues, and specifications together.
5. Current files and named references supply local context.
6. Retained memory needs a source, scope, and review date.
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

> "Record why each source is included and who will maintain it."

## Segment 3: Curated context workflow (0:18 to 0:30)

### Access and governance check

1. Use the source permissions and usage limit checked
   [before teaching](#before-teaching).
2. Select the files needed to answer the question.
3. Stop if required sources are missing or permission to use them is unclear.

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
- Check those facts in current official documentation and organizational policy.
- Source-level access does not automatically authorize a new audience or use.
- Assign an owner and review trigger before sharing.
- Test the packet with a known question whose answer exists in the sources.

### Observable outcome

Ask learners to explain why they need each included source and why they excluded
the others.

### Transition

> "Use the selected sources to understand the project. Repository instructions
> tell you how to work in it."

## Segment 4: Instructions and reusable prompts (0:30 to 0:42)

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

- Write instructions a reviewer can check rather than "write high-quality code."
- Show `/env` and `/instructions` in the CLI. Inspect the source and file scope;
  discovery alone does not prove an instruction was applied.
- Use the supplied stale CommonJS note in the copied project only. Compare it
  with the current ES-module contract, correct that note, restart, and inspect
  again. Do not disable personal, managed, or security rules.
- Keep project-wide conventions separate from one feature's requirements.
- Review instruction files through the repository's normal process.
- Instructions guide proposals; they are not enforcement or proof.
- Check current supported paths, names, and settings before demonstrating.
- Stop the runtime-inspection exercise if a required command or source cannot
  be inspected. A manual checklist does not prove loading.

### Reusable prompt example

```markdown
---
description: Review a low-stock endpoint change
---

Read the selected contract, route, service, tests, and repository guidance.
List mismatches before proposing changes.
Do not edit files outside the selected feature.
End with assumptions, cited evidence, and the focused validation command.
```

### Pair exercise

Ask pairs to label each sentence as:

- project-wide instruction;
- task-specific prompt;
- acceptance criterion;
- unsuitable vague guidance.

Debrief disagreements and move feature-specific behavior out of repository-wide rules.

### Transition

> "Context is useful only while its source, scope, and freshness remain trustworthy."

## Segment 5: Source governance and maintenance (0:42 to 0:50)

### Three-question check

For every source or remembered fact, ask:

1. **Source:** Where did this fact come from?
2. **Scope:** Which repository, audience, and task does it apply to?
3. **Freshness:** When, or after which change, should you check it again?

### Maintenance table

| Trigger | Required action |
| --- | --- |
| API contract changes | Update packet sources and retest a known question. |
| Repository convention changes | Review instruction and prompt files. |
| Source owner changes | Assign a new accountable maintainer. |
| Output conflicts with source files | Remove stale sources and identify which source governs the task. |
| Product behavior changes | Recheck current official documentation. |
| Policy or audience changes | Get approval again for using and sharing the sources. |

### Safe delivery wording

> "Check that memory or context features are available before use. Never store secrets, restricted material, or guesses. The manual source log remains authoritative for this exercise."

### Transition

> "Now compare the plans with and without the selected source files."

## Scripted demo: Low-stock reporting with and without grounding (0:50 to 0:58)

### Purpose

Compare the responses against clear criteria. Do not claim that a product surface
always cites or follows context.

### Setup

Use four excerpts from the Storefront API lab:

`docs/api-spec.md`:

```text
Product list responses use the existing data envelope.
Invalid query values use the existing VALIDATION_ERROR response.
```

`src/routes/products.js`:

```js
router.get('/:id', async (req, res) => {
  // Existing dynamic route.
});
```

`src/models/product.js` defines product stock as a non-negative integer.

The lab task requires `GET /api/products/reports/low-stock`, an optional
non-negative integer threshold, and a default threshold of `10`.

Use synthetic data only.

### Pass A: Minimal prompt

Exact prompt:

```text
Add a low-stock report endpoint.
```

### Trainer actions for Pass A

1. If approved access exists, submit the prompt without project context.
2. Otherwise reveal a prepared generic proposal.
3. Record assumptions about the route, threshold, error shape, and test command.
4. Do not score writing style or confidence.

### Expected observation for Pass A

Look for a route placed after `/:id`, invalid thresholds accepted, invented errors,
or missing checks.

Results may vary. The request lacks the source files needed to judge the proposal.

### Pass B: Grounded prompt

#### Exact trainer prompt

Exact prompt:

```text
Using only the API specification, product route, product model, and
repository instructions, propose the smallest low-stock endpoint change.
First list acceptance criteria and assumptions.
Do not add dependencies. Reject negative or non-integer thresholds.
End with the source files used and two checks to run.
```

### Exact trainer actions for Pass B

1. Check that each source is current and allowed for the lab.
2. Submit through the context workflow.
3. Require acceptance criteria before code.
4. Compare the plan with the API specification and route order.
5. Ask whether `Number.isInteger(Number(value))` would wrongly accept `"2"`.
6. Check the default and invalid threshold paths.
7. Record any unsupported assumption.

### Expected outcome

The grounded response should state the threshold rules, place the static route
before `/:id`, avoid new dependencies, name its source files, and list two checks.

It may then include a code proposal such as:

```js
function parseThreshold(value) {
  if (value === undefined) return 10;
  if (!/^\d+$/.test(value)) {
    throw new Error('threshold must be a non-negative integer');
  }
  return Number(value);
}
```

Check the existing project before choosing the error type and message.

### Verification rubric

| Dimension | Pass question |
| --- | --- |
| Correctness | Are the default, valid, and invalid threshold paths represented? |
| Scope | Is the proposal limited to the selected feature? |
| Assumptions | Are unresolved decisions named? |
| Sources | Can each behavior be traced to a source file? |
| Testability | Are valid and invalid cases clear? |
| Data | Was only synthetic data used? |

### Prepared demonstration

Give half the room only the minimal request.

Give the other half the four-source packet and grounded prompt.

Each group writes a plan, not code.

Swap plans and score them with the rubric.

Reveal the code proposal only during debrief. Use this to recover the trainer
demonstration, not as a learner substitute.

### Demo recovery

- If the surface is unavailable during the demonstration, use the printed
  responses and fix access before the lab.
- If it ignores an instruction, mark the mismatch; do not claim enforcement.
- If sources conflict, stop and assign clarification to the source owner.
- If the packet is noisy, remove one source and explain the decision.
- If time expires, compare acceptance criteria and skip code generation.

## Common trainee Q&A

### "Should we add the whole repository?"

No. Start with the fewest files that support the task, then add a file only when
the answer is missing specific information.

### "Do instructions guarantee compliance?"

No. They guide output. Tests, repository checks, and human review enforce the
rules.

### "Which source wins when docs and code disagree?"

Do not guess. Find the source owner, record the conflict, and ask them to clarify it before implementation.

### "Can we include issue comments or meeting notes?"

Only when the lab permits them and they are relevant, owned, and current.
Separate decisions from unverified discussion.

### "Does a Space change repository permissions?"

Do not guess how access works. Check the current docs and organization rules
before adding or sharing a source.

### "Can we store team conventions in memory?"

Keep long-lived team rules in reviewed repository files. Before using a memory
feature, check current support, data rules, sources, scope, and review dates.

### "Why did the grounded response still miss a rule?"

Context supplies more information. It does not guarantee correct use. State the
rule, test it, and review the result.

### "What does this cost?"

Check current metering information and use the organization's usage limit.

## Pitfalls, anti-patterns, and recoveries

| Anti-pattern | Recovery |
| --- | --- |
| "More context is always better" | Remove sources that do not affect a criterion. |
| Adding restricted records | Stop, remove them, notify the appropriate owner, and use synthetic data. |
| Mixing stale and current contracts | Identify authority and update or exclude the stale source. |
| Vague instructions | Rewrite them as behavior a test or reviewer can check. |
| Treating citations as correctness | Open the source and check the claim. |
| No source owner | Assign one or do not share the packet. |
| No review date | Add event-based and scheduled maintenance triggers. |
| Assuming instructions loaded | Test the expected behavior. |
| Teaching fixed paths or UI | Check current docs before delivery. |
| Context changes without review | Manage shared artifacts through normal repository review. |

## Closing and lab handoff (0:58 to 1:00)

### Closing script

> "Keep only the sources the task needs. Check that you may share them, and name
> who will keep them current."

### Lab handoff

Open `lab/README.md`.

Explain that learners will use the same Storefront API to select sources, add
repository instructions, compare context, and test reusable prompts.

Check current support before using a changing UI, path, setting, sharing control,
or memory feature.

### Readiness checklist

- [ ] Purpose, audience, and owner are written.
- [ ] Every source is allowed for the lab and uses synthetic data.
- [ ] Exclusions are clear.
- [ ] One known-answer question is ready.
- [ ] Maintenance triggers are assigned.
- [ ] Required Spaces and GitHub Copilot access is checked.
- [ ] A usage limit is recorded when it applies.
