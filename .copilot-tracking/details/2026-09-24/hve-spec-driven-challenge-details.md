<!-- markdownlint-disable-file -->

# HVE spec-driven challenge implementation details

## References

* Plan: `.copilot-tracking/plans/2026-09-24/hve-spec-driven-challenge-plan.instructions.md`
* Research: `.copilot-tracking/research/2026-09-24/hve-spec-driven-challenge-research.md`
* Session pattern: `sessions/session-18-spec-kit/`
* Challenge pattern: `sessions/session-19-capstone/`

## Phase 1 details

Create an Engineering Decision API with a passing health-check baseline. The
challenge adds `POST /api/decisions` with required title, context, decision,
status validation, duplicate-title handling, generated ID, and UTC timestamp.
The reference solution adds a multi-stage Azure Linux container. Its build stage
runs the tests, and its runtime stage contains production dependencies, tested
source, a non-root user, and a health check.

The learner produces repository instructions, one targeted review instruction,
RPI evidence, tests, a risk note, and local Git handoff text. The manual path uses
the same files without requiring HVE slash commands.

## Phase 2 details

Register Session 20 in Module 5. Create a nine-hour track with Sessions 17, 18,
and 20. Keep prerequisite equivalence explicit for experienced learners.

## Phase 3 details

Update every hard-coded session or track count found by tests and design records.
Deliver Session 20 before Session 19 in Full Mastery schedules while preserving
the existing public session numbers.

## Validation details

1. Test the starter and solution projects with existing dependencies. Do not
	download local packages.
2. Run the focused Session 20 validator.
3. Run Python and Node repository tests.
4. Run Markdown and lab checks.
5. Build MkDocs in strict mode.
6. Run a no-push ACR container build when local Docker or package access is
	unavailable.
7. Confirm source and target Git status.
