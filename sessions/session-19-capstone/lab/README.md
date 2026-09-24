# Session 19 Lab: Bounded End-to-End Capstone

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17–18; Session 16 is optional

## Before you start

Confirm an approved training repository or local sandbox, GitHub Copilot access for
the selected path, Node.js 20 or later, and a human reviewer. Use only synthetic
bookmark data.

If GitHub Copilot or repository access is unavailable, use the manual local path.
If Node.js or dependency installation is unavailable, write the patch plan and
review the supplied tests by inspection. **Do not create a public repository, add
a package, configure an MCP server, or use production data.**

The only implementation slice is `POST /api/bookmarks`.

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Govern and accept the specification | 25 min |
| 2 | Write the issue and establish the baseline | 25 min |
| 3 | Implement or write the patch plan | 35 min |
| 4 | Verify, review, and hand off | 35 min |

## Phase 1: Govern and accept the specification (25 min)

Complete `starter/governance-record.md`. Name the repository boundary, data
classification, allowed tools, dependency rule, meter, threshold, stop condition,
reviewer, and fallback. Ask a partner to challenge one assumption. Resolve it or
record it as a stop condition.

Read `starter/bookmark-create-spec.md`. Check it against the Session 18 standard:

- requirements describe observable behavior;
- acceptance scenarios are testable;
- implementation choices appear only under constraints;
- non-goals are explicit;
- every open question has an owner or a safe default.

Record the accepted specification IDs in `starter/capstone-handoff.md`. Do not add
requirements during implementation.

## Phase 2: Write the issue and establish the baseline (25 min)

Write the issue in `starter/capstone-handoff.md`. Include:

- goal and accepted specification IDs;
- acceptance criteria and non-goals;
- expected files;
- required tests;
- governance stop conditions;
- human reviewer.

Copy and enter the starter project:

```bash
mkdir -p ~/copilot-labs/session-19
cp -R lab/starter/capstone-project ~/copilot-labs/session-19/capstone-project
cd ~/copilot-labs/session-19/capstone-project
npm install
```

Run the health-check baseline:

```bash
npm test -- --runTestsByPath tests/health.test.js
```

Then run `npm test`. The Bookmark tests should fail because the route does not exist.
Record the baseline without treating the expected failure as an implementation
defect.

## Phase 3: Implement or write the patch plan (35 min)

Choose the approved agent path or the manual path. Use the issue as the work order.
Before editing, list the expected files and map each file to a specification ID.

Implement only:

- route registration;
- in-memory creation and duplicate lookup;
- accepted field validation;
- documented success and error responses.

Stop if the work needs a new package, sensitive data, another endpoint, or a file
outside the plan. When blocked or out of time, write the patch plan in
`starter/capstone-handoff.md`. Name each file, change, test, risk, and open decision.

## Phase 4: Verify, review, and hand off (35 min)

Run:

```bash
npm test
```

Compare the patch with the issue and specification. Confirm that `package.json`
contains no new dependency. Check the governance record again.

The reviewer records one decision: **approve**, **request changes**, or **pause**.
Complete every section in `starter/capstone-handoff.md`, then finish
`starter/trainer-delivery-plan-template.md`.

## Checkpoints

| Time | Expected state |
| --- | --- |
| 25 min | Governance record and specification review are complete |
| 50 min | Issue and executable baseline are recorded |
| 85 min | Patch or patch plan is ready |
| 105 min | Tests and specification trace are reviewed |
| 120 min | Decision and next action are recorded |

## Final Deliverable

Submit one `capstone-handoff.md` containing:

1. The implementation-ready issue with specification trace.
2. The patch summary or file-level patch plan.
3. Executable test results, or the blocked command and static evidence.
4. The human review decision and reviewer.
5. Deferred scope and known risks.
6. The completed Session 17 governance record.
7. One owned next action.

**The deliverable is incomplete** without the governance record, executable proof,
or review decision.
