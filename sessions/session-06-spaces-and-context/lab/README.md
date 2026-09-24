# Session 06 Lab: Spaces and Context Management

**Duration:** 2 hours
**Difficulty:** Intermediate
**Prerequisites:** Sessions 01–05 completed
**Deliverable:** A context package for one Storefront API, with comparison evidence

## Lab overview

Use one Storefront API for the full lab. First select the sources for a Copilot
Space. Then add repository instructions and compare the same task across context
levels. Store reusable prompt files beside the project.

| Stage | Work | Time |
| --- | --- | --- |
| 1 | Prepare the project and select Space sources | 30 min |
| 2 | Add repository instructions | 30 min |
| 3 | Compare one task across context levels | 30 min |
| 4 | Build and test a prompt library | 30 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use only the synthetic Storefront API files supplied with this lab.

You need:

- GitHub Copilot access in the approved editor;
- Copilot Spaces access if you will use the live Space path;
- a repository or approved sandbox that can hold the Storefront API;
- Node.js and npm;
- permission to add repository instructions and prompt files.

If Copilot Spaces is unavailable, use the **local context-packet fallback** in each
stage. If all Copilot access is unavailable, **do not start the live Copilot
steps**. Draft the same context artifacts and run the project locally. Complete the
comparison through peer review.

Create a writable copy:

```bash
mkdir -p ~/copilot-labs/session-06
cp -R sessions/session-06-spaces-and-context/lab/starter/ecommerce-project \
  ~/copilot-labs/session-06/storefront-api
cp sessions/session-06-spaces-and-context/lab/starter/context-comparison.md \
  ~/copilot-labs/session-06/storefront-api/
cd ~/copilot-labs/session-06/storefront-api
npm install
npm start
```

Open `http://localhost:3000/api/products`. The response should contain the seeded products.

## Stage 1: Prepare the project and select Space sources (30 minutes)

### Inspect the context before adding it

Read these files:

| Source | Decision it supports |
| --- | --- |
| `README.md` | Project purpose, setup, and endpoints |
| `docs/api-spec.md` | Required HTTP behavior |
| `docs/architecture.md` | Layers, response envelopes, and naming |
| `src/models/product.js` | Product fields and validation |
| `src/routes/products.js` | Current route patterns |

Write `context-notes.md`:

```markdown
# Storefront API Context Notes

## Task
Add a low-stock report endpoint.

## Required sources
## Excluded sources
## Conflicts or stale statements
## Acceptance criteria
```

For this task, keep the source set small. Do not add unrelated repositories, private discussions, or production data.

### Live Space path

Create a Space named `Storefront API Lab`. Add the five reviewed files and these instructions:

```text
Answer from the selected Storefront API sources. Follow docs/api-spec.md and
docs/architecture.md. Use the Product validation and response patterns already in
the project. State when a requested behavior is not defined by the sources.
```

Ask:

```text
What files and acceptance criteria should guide a low-stock report endpoint?
Do not write code yet.
```

Verify every claim against the selected sources.

### Local context-packet fallback

If Spaces is unavailable, create `context-packet.md`. Link the same five files, copy only the task-relevant rules, and answer the question manually or with approved local Chat attachments.

### Checkpoint 1: context scope is visible

- [ ] `context-notes.md` names the task and acceptance criteria.
- [ ] Every selected source has a reason to be present.
- [ ] Unrelated or restricted sources are excluded.
- [ ] Claims in the first answer trace to a selected file.
- [ ] The live Space or local context packet is ready for reuse.

## Stage 2: Add repository instructions (30 minutes)

Create `.github/copilot-instructions.md` in the Storefront API:

```markdown
# Storefront API Instructions

- Use ES modules.
- Keep route handlers under `src/routes/`.
- Follow the `{ data: ... }` success envelope.
- Return errors as `{ error: { code, message, details? } }`.
- Use `Product.validate()` before product data changes.
- Add no dependency unless the task requires it and a reviewer approves it.
- Keep examples and tests on synthetic data.
```

Ask Copilot to plan the low-stock endpoint:

```text
Plan a GET /api/products/reports/low-stock endpoint for this project. It should
accept an optional non-negative integer threshold and default to 10. Return only
products whose stock is at or below the threshold. Follow repository instructions.
Do not edit files.
```

Review the plan against the API spec, architecture, model, and existing route order. A static route must not be hidden behind `/:id`.

Then ask for a minimal implementation and verification:

```text
Implement the accepted low-stock endpoint plan. Keep the current API behavior.
Run the smallest useful check and show the result.
```

Manually verify:

```bash
curl "http://localhost:3000/api/products/reports/low-stock?threshold=80"
curl "http://localhost:3000/api/products/reports/low-stock?threshold=-1"
```

Compare your instruction file with `lab/solution/ecommerce-project/.github/copilot-instructions.md`.

### Checkpoint 2: instructions changed observable behavior

- [ ] The plan uses ES modules and existing response envelopes.
- [ ] The route is placed before `/:id`.
- [ ] Invalid thresholds produce a structured `400` response.
- [ ] Existing product routes still work.
- [ ] `context-notes.md` records one instruction Copilot followed and one item you still had to review.

### Manual fallback

Apply the instructions as a review checklist. Implement or describe the endpoint manually and run the same curl checks.

## Stage 3: Compare one task across context levels (30 minutes)

Open `context-comparison.md`. Use the same task in every experiment:

```text
Add request-logging middleware to the Storefront API. Record timestamp, method,
URL, response time, and status code. Use info for 2xx, warn for 4xx, and error for
5xx. Add no logging package.
```

Run four experiments without changing the task:

1. **No project context:** Ask from an empty window.
2. **Repository context:** Open the Storefront API with `copilot-instructions.md`.
3. **Space or context packet:** Ask with the selected project sources.
4. **Prompt file:** Use a structured repository prompt for the task.

Record:

- import style;
- file placement;
- response and error conventions;
- added assumptions;
- number of corrections;
- claims that cite or clearly follow a source.

Score usefulness against the project, not fluency. More context is only better when it removes wrong assumptions.

### Checkpoint 3: comparison uses evidence

- [ ] All four experiments use the same task text.
- [ ] Each score cites a concrete output difference.
- [ ] The comparison identifies one useful source and one source that added no value.
- [ ] The final choice states the smallest context set that supports the task.

## Stage 4: Build and test a prompt library (30 minutes)

Create these files in `storefront-api/.github/prompts/`:

1. `investigate-bug.prompt.md`
2. `generate-api-docs.prompt.md`
3. `migration-checklist.prompt.md`

Each prompt needs front matter with a short description, a bounded input, expected output sections, and a verification step.

### Test the prompts on the same project

- Run `investigate-bug` against an invalid `minPrice` query scenario.
- Run `generate-api-docs` against the low-stock endpoint.
- Run `migration-checklist` for a proposed Express major-version update. Do not install it.

Review each result:

- Did it stay inside the selected Storefront API sources?
- Did it separate known facts from assumptions?
- Did it name a check another engineer can run?
- Did it avoid changing code when the prompt only requested analysis?

Compare with `lab/solution/ecommerce-project/.github/prompts/`.

### Checkpoint 4: prompts are reusable and bounded

- [ ] All three prompt files appear in `.github/prompts/`.
- [ ] Each prompt was tested on the Storefront API.
- [ ] Each output includes verification.
- [ ] The migration prompt stops before package changes.
- [ ] Stale or duplicate instructions were removed.

## Final Deliverable

Submit the `storefront-api/` workspace with:

1. `context-notes.md` and either the Space source list or `context-packet.md`.
2. `.github/copilot-instructions.md`.
3. The completed `context-comparison.md`.
4. Three tested prompt files under `.github/prompts/`.
5. Low-stock endpoint verification and the final context choice.

**Done:** Another engineer can see which sources were selected, how each context layer changed the result, and how to verify the project-specific output.
