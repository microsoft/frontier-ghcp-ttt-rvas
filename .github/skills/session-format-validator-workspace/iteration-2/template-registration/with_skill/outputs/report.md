## Session NN — [Session Title] (reusable template)

**Status:** Needs work

### Passed checks

- `track-template/session-template/README.md`, `trainer-content/README.md`, and `lab/README.md` exist.
- `lab/starter/` and `lab/solution/` exist.
- The lab includes a **Setup** section and a **Deliverable** section.

### Needs work

- `track-template/session-template/slides.md` — The required slide deck is missing. Add `slides.md` before promotion.
- `track-template/session-template` — The directory name is not publishable. Move it to `sessions/session-NN-topic`, using a real two-digit session number and a lowercase topic slug.
- `data/session-catalog.json` — The template cannot have a catalog record until it has a final slug. Add an entry whose `slug` is the promoted directory name, whose `id` matches `NN`, whose `difficulty` is `Beginner`, `Intermediate`, or `Advanced`, and whose `duration_minutes` is a positive integer.
- `mkdocs.yml` — Curriculum navigation cannot be checked while the directory is named `session-template`. After promotion, add links for `sessions/session-NN-topic/README.md`, `sessions/session-NN-topic/lab/README.md`, and `sessions/session-NN-topic/trainer-content/README.md`.
- `README.md` — Add the promoted session directory reference: `sessions/session-NN-topic/`.
- `curriculum-plan.md` — Add the promoted session as `Session NN`.
- `tracks/full-mastery.md` — Add the session row that begins with `| NN`.
- `track-template/session-template/lab/README.md` — The lab has no fallback route. Add a manual, no-access, or unavailable-tool path so learners can complete the deliverable when the primary setup is unavailable.

The template is a starting point, not a registrable training session. Its placeholder name prevents the validator from resolving catalog metadata and curriculum navigation.
