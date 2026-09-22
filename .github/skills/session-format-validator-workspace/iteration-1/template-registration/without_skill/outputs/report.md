# Reusable Session Template: Promotion Readiness

**Result: not ready for promotion.** The reusable template is a blank scaffold, not a deliverable training session. It has no session-specific curriculum and no registration in the published curriculum.

## Scope and evidence

This review covered `track-template/session-template/`, the curriculum and track documents, `mkdocs.yml`, `data/session-catalog.json`, the shared site hook, and the existing Session 01 materials. It did not invoke the `session-format-validator` skill or change repository source files.

## Curriculum gaps

| ID | Gap | Evidence | Promotion impact |
| --- | --- | --- | --- |
| C1 | The session has no identity or place in the learning path. | `README.md` still uses `NN`, `[Session Title]`, a placeholder difficulty, topic area, and prerequisites. | The session cannot be placed in a module, assigned a sequence number, or checked against prerequisite paths. |
| C2 | The overview has no curriculum content. | The description and all four learning objectives are placeholders. The materials checklist and trainer notes are also unfilled. | Learners have no stated outcomes, and curriculum documents cannot describe the session accurately. |
| C3 | The trainer block has no teachable agenda. | `trainer-content/README.md` has placeholders for core concepts, live demo, patterns, demo setup, slides, and talking points. | A trainer has no 60-minute run sheet, demo scenario, setup list, teaching points, or lab handoff. |
| C4 | The lab has no executable learning activity. | `lab/README.md` has placeholders for its objective, prerequisites, setup, four exercises, expected results, deliverable, and troubleshooting. | There is no two-hour practice flow or observable evidence that a learner met an objective. |
| C5 | There are no starter or reference materials. | `lab/starter/` and `lab/solution/` contain only `.gitkeep`. | Learners cannot begin a prepared exercise, and trainers cannot verify outcomes against a reference. |
| C6 | The lab omits the delivery safeguards required by the template’s own conventions. | `track-template/README.md` requires an access/cost preflight, policy or permission assumptions, and a no-access fallback for every lab. None appear in `lab/README.md`. | The session has no approved route for restricted access, unavailable product surfaces, or customer policy limits. |
| C7 | No slide deck exists. | The template has no `slides.md`; `scripts/build-slides.sh` skips a session without that file. | Slide HTML and PDF cannot be built, while the site’s session overview controls still point to those generated artifacts. |

## Navigation and registration gaps

| ID | Gap | Evidence | Promotion impact |
| --- | --- | --- | --- |
| N1 | The template itself is excluded from the published site. | `mkdocs.yml` excludes `track-template/`. The template is also outside `sessions/`. | MkDocs cannot publish the overview, lab, or trainer guide from the current location. |
| N2 | There are no session entries in the MkDocs navigation tree. | `mkdocs.yml` lists exactly three entries per existing session: Overview, Lab, and Trainer Guide. No entry points at the template. | The session would have no visible route under **Sessions**. |
| N3 | The shared session catalog has no entry for this session. | `data/session-catalog.json` contains IDs `01` through `19` only. `hooks/presentation_embed.py` uses this catalog for homepage cards, the set builder, and session material URLs. | The session would be absent from the homepage cards and cannot be selected in **Build your set**. The hook also requires all three material files to exist and be included in MkDocs. |
| N4 | Current catalog tests encode a 19-session set. | `tests/test_catalog.py` expects IDs `01` through `19`, 57 material paths, 19 homepage cards, and six session groups. | Promoting an additional session requires updating the expected catalog and navigation assertions; otherwise validation fails. |
| N5 | The repository-level curriculum listings have no session record. | `README.md` lists 19 sessions and 57 hours. `curriculum-plan.md` defines the six-module architecture, session-plan tables, detailed session sections, prerequisite paths, and the same total. | The promoted session would not appear in the public curriculum, and the stated counts, duration, order, and prerequisite graph would be wrong. |
| N6 | Track placement cannot be determined. | The template has no audience, topic, module, session number, or prerequisite values. `track-template/README.md` requires adding a session to the relevant track documents. | There is no basis to decide which role-based track receives the session. **Full Mastery** would also need a count, duration, session table, and delivery-schedule update if the session joins the complete curriculum. |
| N7 | Static copy still says the curriculum has 19 sessions. | The count appears in `README.md`, `mkdocs.yml`, `overrides/main.html`, `tracks/README.md`, and `tracks/full-mastery.md`. | Published descriptions would disagree with a promoted additional session. |

## Promotion decision

Do not promote the template as a session. First supply a real session identity, outcomes, trainer plan, lab, starter and solution materials, delivery safeguards, and slides. Then register that completed session in the catalog, MkDocs navigation, curriculum documents, the applicable tracks, and the tests that protect the catalog.

