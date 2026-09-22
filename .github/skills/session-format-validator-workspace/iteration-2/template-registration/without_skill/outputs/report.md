# Reusable Session Template: Promotion Readiness

**Decision: do not promote this template.** `track-template/session-template/` is a reusable scaffold, not a real training session. It is outside `sessions/` and does not use the required `session-NN-short-slug/` directory name.

## Scope

This review checked the template, a complete Session 01, the published curriculum, MkDocs navigation, the shared session catalog and hook, tracks, slide build script, and catalog tests. It did not use the `session-format-validator` skill or change repository source files.

## Curriculum gaps

| ID | Missing item | Evidence | Promotion impact |
| --- | --- | --- | --- |
| C1 | A session identity and curriculum position | The overview still contains `NN`, `[Session Title]`, placeholder difficulty, topic area, and prerequisites. | The session cannot receive an ID, slug, module, order, or prerequisite path. |
| C2 | A session description and learning outcomes | The overview has a placeholder description and four placeholder objectives. | Curriculum pages cannot explain what learners will achieve. |
| C3 | A usable one-hour trainer plan | `trainer-content/README.md` has placeholder concepts, demo, patterns, setup, slide link, and talking points. | A trainer has no agenda, prepared demo, setup instructions, or lab handoff. |
| C4 | A usable two-hour lab | `lab/README.md` has placeholder objectives, setup, exercises, results, deliverable, and troubleshooting. | Learners have no executable activity or evidence of completion. |
| C5 | Lab inputs and a reference result | `lab/starter/` and `lab/solution/` contain only `.gitkeep`. | Learners cannot start a prepared exercise, and trainers cannot compare work against a reference. |
| C6 | Lab delivery safeguards | The template convention requires an access/cost preflight, policy or permission assumptions, and a no-access fallback. The lab has none of them. | Delivery would fail or become unsafe when access, policy, or product availability differs from the planned environment. |
| C7 | Slides | The template has no `slides.md`. `scripts/build-slides.sh` skips a session without it, while the site hook presents slide HTML and PDF links from every session overview. | The site would show controls for slide artifacts that no build can create. |

## Registration and navigation gaps

| ID | Missing registration | Evidence | Promotion impact |
| --- | --- | --- | --- |
| N1 | A valid published session path | The template sits at `track-template/session-template/`. `track-template/README.md` requires a copied `sessions/session-NN-short-slug/` folder. | The shared hook only recognizes pages under `sessions/session-NN-*/`; this folder cannot receive the standard session navigation or controls. |
| N2 | MkDocs inclusion and session navigation | `mkdocs.yml` excludes `track-template/`. Its **Sessions** tree has overview, lab, and trainer-guide routes only for sessions 01 through 19. | The template has no published route and no links between its materials. |
| N3 | A catalog record | `data/session-catalog.json` lists only IDs 01 through 19. Each record needs an ID, matching slug, module, title, description, difficulty, and duration. | The session will not appear in homepage cards or **Build your set**, and the shared hook cannot resolve its material URLs. |
| N4 | Repository curriculum registration | `README.md` and `curriculum-plan.md` list the 19 current sessions, module tables, durations, descriptions, outcomes, and prerequisites. | The new session would have no public curriculum entry or defined place in the learning sequence. |
| N5 | Track registration | `tracks/README.md` and the track files list fixed session counts, durations, and session tables. The template gives no audience or module information to decide which track needs it. | The promoted session cannot appear in a role-based path. If it joins Full Mastery, that track needs its count, duration, session table, and delivery schedule updated. |
| N6 | Count and duration updates | `README.md`, `curriculum-plan.md`, `mkdocs.yml`, `overrides/main.html`, `tracks/README.md`, and `tracks/full-mastery.md` describe a 19-session, 57-hour curriculum. | Published totals would disagree with the promoted curriculum. |
| N7 | Catalog protections | `tests/test_catalog.py` asserts IDs 01 through 19, 57 catalog material paths, 19 homepage cards, and six module groups. | Adding a catalog entry and its MkDocs routes requires matching test updates. |

## Required work before promotion

1. Copy the template to a unique `sessions/session-NN-short-slug/` path and replace every placeholder with approved session content.
2. Add the trainer plan, lab steps, starter files, reference solution, delivery safeguards, and `slides.md`.
3. Register the session in the catalog, MkDocs navigation, root curriculum tables, detailed curriculum plan, and every selected track.
4. Update counts, durations, schedules, and catalog tests where the new session changes them.

