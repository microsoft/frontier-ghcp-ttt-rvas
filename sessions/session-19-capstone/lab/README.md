# Session 19 Lab — Bounded End-to-End Capstone

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17–18; Session 16 is optional
**Deliverable:** One reviewed, handoff-ready feature change

## Scenario and boundaries

Use the Bookmark API brief or a customer-safe equivalent. Deliver one coherent slice. Do not build a full application or tour every Copilot feature.

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Select the handoff | 20 min |
| 2 | Establish the baseline | 20 min |
| 3 | Implement one slice | 40 min |
| 4 | Review and hand over | 40 min |

## Preflight and fallback

Confirm Enterprise Cloud access, approved features, repository permissions, Session 17 decisions, a metered-work stop guard, the delivery path, the Session 18 specification, and the human reviewer. Use synthetic data and the starter project unless the instructor approves a different sandbox.

If live repositories, agents, MCP servers, or approved assistant surfaces are unavailable, copy the starter project into a local sandbox. Write the issue and plan manually, make the smallest local change if practical, and complete the review in writing. Do not create public repositories, install unapproved packages, configure live MCP servers, or wait for several cloud-agent pull requests.

## What a handoff needs

1. One bounded requirement from `capstone-brief.md`.
2. An issue with acceptance criteria, non-goals, constraints, required checks, and a reviewer.
3. Code or a plan that matches the issue.
4. Test or manual-verification evidence.
5. A human review decision, governance notes, and a next action.

## Phase 1: Select the handoff (20 min)

Read `lab/starter/capstone-brief.md`. The recommended slice is:

```text
Implement POST /api/bookmarks with validation for url, title, description, tags,
duplicate URL, and the documented success and error response format.
```

Keep authentication, persistent storage, import/export, rate limiting, full search, deployment, and multiple parallel issues out of scope. Write observable criteria:

- valid bookmark returns `201` and `{ "data": { ... } }`;
- missing or invalid URL returns `400`;
- missing or too-long title returns `400`;
- duplicate URL returns `409`;
- success includes timestamps.

State that storage is in memory, data is synthetic, dependencies need approval, and a human must review the work. A partner must approve or revise the issue before implementation.

## Phase 2: Establish the baseline (20 min)

Copy and enter the starter project:

```bash
mkdir -p ~/copilot-labs/session-19
cp -R lab/starter/capstone-project ~/copilot-labs/session-19/capstone-project
cd ~/copilot-labs/session-19/capstone-project
npm install
```

Run the command in `package.json` or the starter README. If installation or execution is blocked, record the command, inspect `package.json` and `src/index.js`, and define the manual proof for the selected endpoint.

Use `capstone-checklist.md` to record the chosen path, baseline, planned tests, review gate, and fallback. Add repository guidance only when policy permits and it reinforces the selected issue.

## Phase 3: Implement one slice (40 min)

Choose one path:

1. Approved cloud-agent path: assign one issue and await one pull request.
2. Approved local agent-mode path: work in the sandbox with the issue as context.
3. Manual path: implement the same issue yourself.
4. Prepared-change fallback: produce a reviewable patch plan.

Start with the issue and constraints. Test the selected acceptance criteria, make the smallest route and storage change, then run:

```bash
npm test
```

Stop at a time, usage, policy, or scope limit. Keep the changed files, test output, deferred criteria, and known limitations for review.

For the prepared-change fallback, name the files and routes to change, validation rules, test cases, expected responses, risks, and open questions.

## Phase 4: Review and hand over (40 min)

For each acceptance criterion, record pass, fail, deferred, or not run, with evidence. Check validation, response shape, duplicate handling, sensitive data, dependencies, and error handling. Confirm the data boundary, allowed tools, absence of unapproved MCP servers or dependencies, meter, and reviewer.

Record one decision: approve, request changes, or pause. The handover must include the issue, implemented and deferred scope, changed or planned files, test or manual evidence, review owner and result, and next safe action.

Complete `trainer-delivery-plan-template.md` as the delivery reflection.

## Checkpoints

| Time | Expected state |
| --- | --- |
| 20 min | One scoped issue with non-goals |
| 40 min | Baseline and checks are known |
| 70 min | Implementation or tests are in progress; scope remains bounded |
| 90 min | Change or plan is ready for review |
| 110 min | Review decision is recorded |
| 120 min | Handover names the next action |

## Final verification

- [ ] One feature slice is selected from `capstone-brief.md`.
- [ ] The issue includes criteria, non-goals, constraints, tests, and review gate.
- [ ] Checks ran or the static/manual fallback records why they did not.
- [ ] The review decision and governance gate are documented.
- [ ] `capstone-checklist.md` and the delivery reflection are complete.
