# Boundary test evidence

Run from `lab/starter/agent-project`.

## Weak profile

```bash
npm run check:weak
```

Expected failure:

```text
FAIL .../weak-test-writer.agent.md
- tools must use a least-privilege allowlist
- missing tool alias: read
- missing tool alias: search
- missing tool alias: edit
- missing tool alias: execute
- allowed test path is not explicit
- production-code boundary is not explicit
- stop condition for production changes is missing
- verified test command is missing
- human review decision is missing
```

The weak instruction, "make any changes needed," permits a production edit when a
test exposes a defect. That crosses the task boundary.

## Tightened profile

```bash
npm run check:tight
npm test
```

Expected result:

```text
PASS .../test-writer.agent.md
- least-privilege tools declared
- test-only path boundary declared
- production conflict stops for human review

tests 3
pass 3
fail 0
```

The tightened profile may read `src/`, but it may edit only `tests/`. A production
conflict now produces a stop report and a human decision instead of a silent source
change.

The learner's `check:tight` checks the local profile, not this reference fixture.
The third harness test checks that the command works without a sibling solution
and fails when the learner profile is weak.

For the live conflict, request a new shipped-to-processing transition. The
supplied source rejects it, so a test-only writer must stop before changing
production behavior. Record the actual selected profile and source diff in
`agent-run.md`; static tests alone do not complete this run.
