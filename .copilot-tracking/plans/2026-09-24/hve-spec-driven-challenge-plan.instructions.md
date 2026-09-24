<!-- markdownlint-disable-file -->

# HVE spec-driven challenge implementation plan

## User requests

* Create a new branch for the work.
* Add a new Hypervelocity Engineering track and challenge under spec-driven
  development.
* Read the HVE showcase solution without modifying it.
* Adapt only the parts needed for this curriculum's structure.
* Map the showcase scenarios to tasks in the new track.
* Do not download local packages. Containerize the solution and use an approved
  remote ACR build when clean validation needs dependencies.

## Objectives

* Publish a complete optional Session 20 with trainer material, slides, a
  two-hour challenge, runnable starter code, and a reviewed solution.
* Publish a dedicated HVE Challenge track that assembles governance,
  specification, and HVE delivery practice.
* Preserve Session 19 as the final capstone in delivery order.
* Keep all learner tasks bounded, reviewable, and usable without live HVE tools.

## Context

* Repository rules: `AGENTS.md`
* Markdown rules: HVE Core Markdown and writing-style instructions
* Session contract: `.github/skills/session-format-validator/SKILL.md`
* Source research:
  `.copilot-tracking/research/2026-09-24/hve-spec-driven-challenge-research.md`
* Detailed scenario research:
  `.copilot-tracking/research/subagents/2026-09-24/hve-showcase-scenarios-research.md`
* Integration research:
  `.copilot-tracking/research/subagents/2026-09-24/hve-curriculum-integration-research.md`

## Implementation checklist

### Phase 1: Build the challenge session

<!-- parallelizable: false -->

* [x] Create the Session 20 overview, trainer guide, and slides.
* [x] Create the two-hour lab with preflight, fallback, deliverable, scoring, and
  source-scenario mapping.
* [x] Add runnable starter and solution Engineering Decision API projects.
* [x] Add reference instruction and evidence artifacts to the solution.
* [x] Add a tested, production-only container definition to the solution.
* [x] Run starter and solution tests.

### Phase 2: Add the learning track and catalog entry

<!-- parallelizable: false -->

* [x] Create `tracks/hve-challenge.md` for Sessions 17, 18, and 20.
* [x] Add Session 20 to `data/session-catalog.json`.
* [x] Add track and session routes to `mkdocs.yml`.
* [x] Run the session-format validator.

### Phase 3: Integrate the published curriculum

<!-- parallelizable: true -->

* [x] Update root, curriculum, track, Full Mastery, and homepage content.
* [x] Update count-sensitive tests and design assertions.
* [x] Update later slide-deck session counts.
* [x] Run dependency-free Node checks and focused lab validation.
* [ ] Run the complete Python suite, Markdown lint, and strict site build. The
  installed environments do not contain the required packages, and local package
  downloads are prohibited.

### Phase 4: Review and close

<!-- parallelizable: false -->

* [x] Verify each user request against the final diff.
* [x] Confirm the source HVE checkout remains clean.
* [x] Record changes, validation, deviations, and follow-up work.

## Dependencies

* Humanize Writing skill with the clear-thinker voice
* Session Format Validator skill
* Node.js and npm for challenge projects
* Python test environment and MkDocs dependencies
* Azure Container Registry for the no-push clean container build
* HVE Core is optional for the learner path because a manual evidence route is
  required

## Success criteria

* The branch is `feature/hve-spec-driven-development-track`.
* The source HVE repository has no worktree changes.
* Session 20 contains every required material and passes focused validation.
* The challenge can run from starter to green reference solution.
* Published counts and routes are consistent across the site and tests.
* A no-push ACR build installs from the lock file, runs the solution tests, and
  assembles the non-root runtime image.
