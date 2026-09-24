<!-- markdownlint-disable-file -->

# HVE spec-driven challenge changes

## Related plan

`.copilot-tracking/plans/2026-09-24/hve-spec-driven-challenge-plan.instructions.md`

## Implementation date

2026-09-24

## Summary

Added an optional HVE specification-to-delivery challenge, a dedicated learning
track, curriculum integration, and a containerized Engineering Decision API
reference solution.

## Added

* `sessions/session-20-hve-challenge/` with overview, slides, trainer guide, lab,
  starter project, solution, instructions, evidence, and fallback material
* `tracks/hve-challenge.md`
* Multi-stage `Dockerfile`, `.dockerignore`, and container contract tests in the
  Session 20 reference solution

## Modified

* `data/session-catalog.json`, `mkdocs.yml`, `README.md`, and
  `curriculum-plan.md` for Session 20 registration
* `tracks/README.md` and `tracks/full-mastery.md` for the new track and delivery
  order
* Count-sensitive site, slide, workflow, design, and test files for 20 sessions
  and seven tracks
* Session 20 learner and trainer material to require container evidence and offer
  local, approved remote-build, and prepared-patch validation paths

## Removed

No files removed.

## Validation

* Starter tests: 1 passed
* Reference solution tests: 13 passed
* Session format validator: ready
* Dependency-free Node repository checks: passed
* `git diff --check`: passed
* ACR no-push build `dth`: succeeded; tests ran during the build; no image tag
  was retained

The complete Python suite, Markdown lint, and strict MkDocs build could not run
because their packages are absent locally and package downloads are prohibited.