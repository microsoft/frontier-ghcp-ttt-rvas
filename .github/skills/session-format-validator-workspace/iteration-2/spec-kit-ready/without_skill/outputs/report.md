# Session 18 validation report

**Verdict: NOT READY TO PUBLISH**

Validated on September 21, 2026. Session 18 has the expected overview, lab, trainer guide, slides, catalog record, and navigation entries. The learner lab is not publish-ready because its starter and solution materials do not match their own inventories, and its reproducibility exercise cannot create or use the lock file it requires.

| Area | Status | Evidence |
| --- | --- | --- |
| Core materials | Partial | `README.md`, `lab/README.md`, `trainer-content/README.md`, `slides.md`, and three skill files exist. |
| Catalog metadata | Pass | The `18` record has slug `session-18-spec-kit`, module `5`, Advanced difficulty, and a 180-minute duration. |
| Navigation | Pass | The Module 5 navigation contains Overview, Lab, and Trainer Guide entries for Session 18. |
| Lab readiness | Fail | Required starter and reference-solution assets are absent. The setup path is not reproducible as written. |

## Publish blockers

1. **The Exercise 2 and Exercise 3 starter kits are incomplete.**  
   Exercise 2 lists `problem-statement.md`, `.github/skills/`, and `.specify/`, but none exists under `lab/starter/exercise-2/`. Exercise 3 lists `governance/`, `.specify/`, and `test-fallback/`; all are absent from `lab/starter/exercise-3/`.

2. **The reference solutions are documentation-only.**  
   The Exercise 1 solution claims completed `.specify/` artifacts plus `src/users-api.js` and `src/users-api.test.js`; none exists. Exercise 2 similarly lacks its stated phases and source/test files. Exercise 3 lacks `SETUP_GUIDE.md`, `uv.lock`, `governance/`, `.specify/`, and `test-fallback/`. Learners cannot inspect, run, or compare a completed handoff.

3. **The lock-file exercise cannot succeed from the supplied setup.**  
   `lab/starter/exercise-3/setup.sh` installs `specify-cli` as a global `uv tool`, then tells learners to run `uv sync --locked`. There is no project manifest or `uv.lock` in the starter. In uv 0.11.26, `--locked` asserts that an existing `uv.lock` stays unchanged; it does not create one. The setup must include a project dependency and committed lock file, or the instructions must use a reproducibility method that supports a tool installation.

4. **The lab gives conflicting delivery directions.**  
   The lab says learners should produce a handoff unless implementation is approved. Exercise 1 and Exercise 2 tell them to generate code, while the supplied solutions advertise runnable Node projects without package manifests or source files. Pick one supported path for each exercise and provide the files and checks for it.

## Non-blocking fixes

- Align the starter estimates with the lab schedule: Exercise 1 is 30 minutes in its starter and 35 minutes in the lab; Exercise 2 is 30 and 40 minutes; Exercise 3 is 30 and 25 minutes.
- Exercise 1 lists `.github/skills/` and `src/` as starter-kit contents even though it says the former is created after initialization. State which files learners receive and which files the approved tool creates.
- Keep the approved pinned-version decision in one place. The overview intentionally uses an unpinned placeholder command, while the lab uses `specify-cli==0.8.5`; label the former as a non-runnable example or replace it with the approved command.

## Required remediation before publishing

1. Add every asset listed by the three starter-kit READMEs, or remove the inventory entries and rewrite the exercises around the materials that remain.
2. Add real reference solutions with the phases, source, tests, dependency metadata, and any lock or governance files that the solution READMEs claim.
3. Replace the Exercise 3 setup flow with a reproducible, testable path. Include its manifest and committed lock file if the lab uses `uv sync --locked`.
4. Reconcile the implementation-versus-handoff instructions, exercise timings, and verification commands. Run the documented path from a clean learner copy before publishing.

## Checks run

- `python tests/test_catalog.py` — 14 tests passed.
- `python tests/test_session_rendering.py` — 20 tests passed.
- Session 18 Markdown link check — no broken inline Markdown links found.
- `bash -n sessions/session-18-spec-kit/lab/starter/exercise-3/setup.sh` — passed.

I did not run `setup.sh`, install `specify-cli`, or contact a package source. The lab itself requires an approved source and tool path, so this report keeps that review static.
