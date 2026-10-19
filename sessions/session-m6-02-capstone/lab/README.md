# Session m6-02 lab: End-to-end capstone for one endpoint

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions m1-01 to m1-03, m2-01 to m2-04, m3-01 to m3-05 and m5-02; Session m5-01 is optional

## Before you start

Before the lab, check repository or sandbox permissions, GitHub Copilot access,
and Node.js 20 or later. Name a human reviewer. Use only synthetic bookmark data.

If GitHub Copilot, repository access, Node.js, or dependency installation is
unavailable, stop the lab. **Do not create a public repository, add
a package, configure an MCP server, or use production data.**

The only implementation slice is `POST /api/bookmarks`.

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Set the boundary and accept the specification | 25 min |
| 2 | Write the issue and establish the baseline | 25 min |
| 3 | Implement the accepted slice | 35 min |
| 4 | Verify, review, and hand off | 35 min |

## Phase 1: Accept the specification and scope (25 min)

Read `starter/bookmark-create-spec.md`. Check it against the Session m5-02 standard:

- requirements describe observable behavior;
- acceptance scenarios are testable;
- implementation choices appear only under constraints;
- non-goals are named;
- every open question has an owner or a safe default.

Record the accepted specification IDs and all scope decisions in the GitHub issue
section of `starter/capstone-handoff.md`. Do not add requirements during
implementation.

## Phase 2: Write the issue and establish the baseline (25 min)

Write the issue in `starter/capstone-handoff.md`. Include:

- goal and accepted specification IDs;
- acceptance criteria and non-goals;
- expected files;
- required tests;
- work stop conditions;
- human reviewer.

Copy and enter the starter project:

```bash
mkdir -p ~/copilot-labs/session-m6-02
cp -R lab/starter/capstone-project ~/copilot-labs/session-m6-02/capstone-project
cd ~/copilot-labs/session-m6-02/capstone-project
npm install
```

Run the health-check baseline:

```bash
npm test -- --runTestsByPath tests/health.test.js
```

Then run `npm test`. The Bookmark tests should fail because the route does not exist.
Record that baseline. The missing-route failures are expected at this stage.

## Phase 3: Implement the accepted slice (35 min)

Use Copilot and treat the issue as the work order. Before
editing, list the expected files and map each file to a specification ID.

Implement only:

- route registration;
- in-memory creation and duplicate lookup;
- accepted field validation;
- documented success and error responses.

Implement only the accepted `POST /api/bookmarks` endpoint. Use synthetic data and
the existing dependencies. Stop if the work requires another endpoint, live data,
deployment, tool configuration, or a new dependency.

When blocked or out of time, stop implementation and record the blocker in
`starter/capstone-handoff.md`. Do not claim completion without test results.

## Phase 4: Verify, review, and hand off (35 min)

Run:

```bash
npm test
```

Compare the patch with the issue and specification. Check that `package.json`
contains no new dependency. Record any deviation from the accepted issue in the
handoff.

Ask your reviewer to record one decision: **approve**, **request changes**, or
**pause**. Complete every section in `starter/capstone-handoff.md`.

## Checkpoints

| Time | Expected state |
| --- | --- |
| 25 min | Specification and scope review are complete |
| 50 min | Issue and executable baseline are recorded |
| 85 min | Patch is ready |
| 105 min | Tests and specification trace are reviewed |
| 120 min | Decision and next action are recorded |

## Final deliverable

Submit one `capstone-handoff.md` containing:

1. The implementation-ready issue mapped to specification IDs.
2. The patch summary.
3. Executable test results.
4. The human review decision and reviewer.
5. Deferred scope, deviations, and known risks.
6. One owned next action.

**Your deliverable is incomplete** without executable test results or a review
decision.
