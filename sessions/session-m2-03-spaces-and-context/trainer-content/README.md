# Session M2-03: Context workflows

## Before teaching

Copy the Storefront project and check that `/env` and `/instructions` work in the
standalone CLI. Check that learners have Spaces and GitHub Copilot access.

## Session objective

Teach learners to select the few files a task needs and check the answer against
those files.

## Minute-mapped delivery plan (60 minutes)

| Time | Segment | Trainer outcome |
| --- | --- | --- |
| 0:00 to 0:08 | Diagnose the context problem | Learners tell missing information from excess noise. |
| 0:08 to 0:18 | Context hierarchy | Learners rank task, instructions, curated sources, and local references. |
| 0:18 to 0:30 | Curated context workflows | The group writes a purpose, audience, and source list. |
| 0:30 to 0:42 | Instructions and reusable prompts | Learners separate project-wide rules from repeatable tasks. |
| 0:42 to 0:50 | Keeping context fresh | Learners check source, scope, and freshness. |
| 0:50 to 0:58 | Scripted before/after demo | The group compares two responses with the source files. |
| 0:58 to 1:00 | Close and lab handoff | Learners start by selecting sources for their Space. |

## Segment 1: Diagnose context quality (0:00 to 0:08)

### Talking points

- Missing contracts make Copilot invent assumptions.
- Broad, stale, or conflicting sources can hide the rule the task needs.
- A confident answer does not show that the right source was used.
- Select the fewest files a reviewer needs to check the answer.

### Opening exercise

Display this request:

```text
Add validation to the checkout endpoint.
```

Ask learners what is missing.

Expected answers: endpoint location, input contract, error shape, repository conventions, focused tests.

Then ask what should stay out.

Expected answers: unrelated repositories, production records, secrets, ownerless stale documents.

## Segment 2: Context hierarchy (0:08 to 0:18)

### Talking points

1. Task intent and acceptance criteria define the outcome.
2. Repository instructions give project-wide conventions.
3. Reusable prompt files encode repeatable workflows.
4. Spaces bring code, docs, issues, and specifications together.
5. Current files and named references supply local context.
6. Memory needs a source, a scope, and a way to correct it.
7. Specific task requirements override generic guidance.
8. Conflicts need clarification. More context does not resolve them.

### Source-ranking exercise

For a fictional quantity-validation change, rank:

- current API contract;
- focused route tests;
- architecture note;
- unrelated product roadmap;
- production request log.

Include the contract, tests, and architecture note. Exclude the roadmap and the production log.

## Segment 3: Curated context workflow (0:18 to 0:30)

### Trainer-created context card

```markdown
Purpose: answer questions about the fictional Checkout API validation behavior.
Audience: workshop participants.

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

- A Space holds this packet. Check sharing and access settings in the Space before you share it.
- Test the packet with a known question whose answer exists in the sources.
- Ask learners why each source is in and why the others are out.

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

### Talking points

- Write instructions a reviewer can check, not "write high-quality code."
- Show `/env` and `/instructions` in the CLI. They show which files were found and their scope. They don't show that the model followed them.
- Use the stale CommonJS note in the copied project only. Compare it with the ES-module contract, correct the note, restart, and inspect again. Don't touch personal, managed, or security rules.
- Keep project-wide conventions separate from one feature's requirements.

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

Ask pairs to label each sentence as a project-wide instruction, a task-specific
prompt, an acceptance criterion, or vague guidance. Move feature-specific
behavior out of repository-wide rules.

## Segment 5: Keeping context fresh (0:42 to 0:50)

For every source or remembered fact, ask:

1. **Source:** Where did this come from?
2. **Scope:** Which repository, audience, and task does it apply to?
3. **Freshness:** After which change should you check it again?

| Trigger | Action |
| --- | --- |
| API contract changes | Update packet sources and retest a known question. |
| Repository convention changes | Review instruction and prompt files. |
| Output conflicts with source files | Remove the stale source and decide which source governs. |

Memory is a preview feature in some plans. Check that it's available before you
demo it, and never store secrets in it.

## Scripted demo: Low-stock reporting with and without grounding (0:50 to 0:58)

Compare the two responses against clear criteria. Don't claim a product surface
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

### Pass A: Minimal prompt

```text
Add a low-stock report endpoint.
```

Submit it without project context, or reveal a prepared generic proposal. Record
assumptions about the route, threshold, error shape, and test command.

Look for a route placed after `/:id`, invalid thresholds accepted, invented
errors, or missing checks. The request lacks the files needed to judge the proposal.

### Pass B: Grounded prompt

```text
Using only the API specification, product route, product model, and
repository instructions, propose the smallest low-stock endpoint change.
First list acceptance criteria and assumptions.
Do not add dependencies. Reject negative or non-integer thresholds.
End with the source files used and two checks to run.
```

Require acceptance criteria before code. Compare the plan with the API
specification and route order. Ask whether `Number.isInteger(Number(value))`
would wrongly accept `"2"`.

The grounded response should state the threshold rules, place the static route
before `/:id`, avoid new dependencies, name its source files, and list two checks.

It may include a code proposal such as:

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

### Group variant

Give half the room only the minimal request and the other half the four-source
packet and grounded prompt. Each group writes a plan, not code. Swap plans and
compare them on correctness, scope, named assumptions, traceability to a source
file, and test cases. Reveal the code proposal in the debrief.

If the surface is unavailable, use printed responses. If time runs out, compare
acceptance criteria and skip code generation.

## Common trainee Q&A

### "Should we add the whole repository?"

No. Start with the fewest files that support the task. Add a file only when the
answer is missing specific information.

### "Do instructions guarantee compliance?"

No. Use tests, repository checks, and review to see whether the result follows them.

### "Which source wins when docs and code disagree?"

Ask the source owner to clarify before implementation.

### "Can we store team conventions in memory?"

Keep long-lived team rules in reviewed repository files.

### "Why did the grounded response still miss a rule?"

Context gives Copilot more information. It doesn't guarantee correct use. State
the rule, test it, and review the result.

## Closing and lab handoff (0:58 to 1:00)

Keep only the sources the task needs. Open `lab/README.md`. Learners use the same
Storefront API to select sources, add repository instructions, compare context,
and test reusable prompts.
