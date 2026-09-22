## Reusable session template

**Status:** Needs work

The target is `track-template/session-template/`. It cannot be promoted as a session because its directory has no numeric session ID. The supplied validator stopped while building the full-mastery check: it tried to convert `te` from `session-template` into an integer.

### Passed checks

- `README.md`, `trainer-content/README.md`, and `lab/README.md` exist.
- The starter and solution directories exist.
- The lab has `## Setup` and `## Deliverable` headings.

### Needs work

**Materials**

- `track-template/session-template/slides.md` — Missing required file. Add the session slide deck before publishing.

**Metadata**

- `track-template/session-template/` — The directory name does not match `session-NN-topic`. Rename the promoted copy to a numbered, kebab-case session directory.
- `data/session-catalog.json` — No catalog entry exists for `session-template`. Add an entry for the promoted session directory with the matching ID, a valid difficulty, and a positive `duration_minutes` value.

**Navigation**

- `mkdocs.yml` — Missing the three session navigation paths: `sessions/session-template/README.md`, `sessions/session-template/lab/README.md`, and `sessions/session-template/trainer-content/README.md`. Replace `session-template` with the promoted directory name and register all three pages.
- `README.md` — The template is listed under `track-template/`, but it has no `sessions/session-template/` curriculum entry. Add the promoted session to the session table.
- `curriculum-plan.md` — The template has no curriculum entry. The validator derives the invalid label `Session te` from the current directory name, so it cannot check a real session record. Add the promoted session's numbered entry after assigning its ID.
- `tracks/full-mastery.md` — The validator cannot reach this check because `int("te")` raises `ValueError`. The file also contains no template reference. Add the promoted session's numbered track row.

**Lab readiness**

- `track-template/session-template/lab/README.md` — Missing fallback guidance. Add a manual or no-access route for learners who cannot use the required tools or accounts.
