<!-- markdownlint-disable-file -->

# HVE curriculum integration research

## Status

Complete for repository integration. The repository does not define the HVE
challenge content or settle the license for any imported HVE assets. Those points
remain open.

## Recommendation

Add the challenge as an optional full session and expose it through a new learning
track.

| Field | Recommended value |
| --- | --- |
| Session number | `20` |
| Session slug | `session-20-hve-challenge` |
| Session title | `HVE Challenge: Governed Specification-to-Delivery` |
| Module | `5`, Specification-Driven Frameworks |
| Difficulty | `Advanced` |
| Duration | `180` minutes: one-hour trainer block and two-hour lab |
| Prerequisites | Sessions 01-12 and 17-18, or an approved equivalent baseline |
| Track title | `HVE Challenge` |
| Track slug | `hve-challenge` |
| Track file | `tracks/hve-challenge.md` |
| Track sessions | 17, 18, 20 |
| Track duration | 9 hours |

The track should include Session 17 because Session 18 already requires it and
because the challenge needs an explicit policy, data, cost, and review boundary.
The track page can require Sessions 01-12 or equivalent experience without
repeating the entire core curriculum.

Session 20 needs its own assessed outcome. Session 18 already fills all 120 lab
minutes with specification, flow practice, governance review, and handoff review.
Session 19 then consumes that handoff in a bounded implementation capstone. The HVE
challenge should test whether a learner can apply an HVE workflow to a prepared,
governed specification and produce review evidence under time and tool constraints.
It should not teach the nine-phase flow again or repeat the Bookmark API capstone.

## Why this should be a full session

A full session fits the repository contract and the proposed teaching shape. The
template gives the challenge a trainer guide, slides, a two-hour lab, starter
assets, and a reviewed solution. It also makes the challenge visible in the shared
catalog, homepage, set builder, and Full Mastery track.

Extending Session 18 is the weaker option. Its lab schedule already totals 120
minutes (`35 + 40 + 25 + 20`). Adding another two-hour challenge would either make
the metadata false or force the existing handoff exercises out of the session.

A track-only artifact is the weakest option. Tracks in this repository assemble
published sessions. A standalone challenge page would sit outside
`data/session-catalog.json`, the set builder, session navigation, slide rendering,
trainer-guide rendering, and the session validator. It would also have no standard
place for starter and solution assets.

The full-session recommendation depends on one content gate: the challenge must
have a distinct outcome and enough material for a one-hour trainer block plus a
two-hour lab. If it is only an extra scenario for the existing Session 18 lab, keep
it as an optional Session 18 extension and do not create Session 20 or a dedicated
track.

## Required new files

### Session 20

Create the standard session tree:

```text
sessions/session-20-hve-challenge/
|-- README.md
|-- slides.md
|-- trainer-content/
|   `-- README.md
`-- lab/
    |-- README.md
    |-- starter/
    |   `-- <challenge assets>
    `-- solution/
        `-- <reviewed reference assets>
```

The overview must begin with `# Session 20` and contain populated `Module`,
`Difficulty`, `Prerequisites`, and `Duration` fields in the exact bold-label form
used by the validator.

The lab needs an H2 named `Setup`, `Preflight`, or `Before you start`. It must say
what to do when the preferred tool is unavailable and must include `## Deliverable`
or `## Final Deliverable`. The starter and solution directories must contain
tracked files. Placeholder directories alone meet the path check but do not make a
challenge teachable.

### Dedicated track

Create `tracks/hve-challenge.md` using the established track shape:

* target audience and 9-hour duration
* prerequisites or equivalent-experience statement
* ordered session table for 17, 18, and 20
* one-day intensive or two-day standard schedule
* learning outcomes tied to governance, specification, and challenge evidence
* next steps to Full Mastery or the capstone

## Required integration changes

### Shared catalog and navigation

| File | Required change |
| --- | --- |
| `data/session-catalog.json` | Append Session 20 with ID `20`, the recommended slug, module `5`, the exact title, an HVE-specific description, difficulty `Advanced`, and `duration_minutes: 180`. Keep catalog IDs in `01` through `20` order. |
| `mkdocs.yml` | Change the site description to 20 sessions. Add `HVE Challenge: tracks/hve-challenge.md` under Tracks. Add Session 20 under Module 5 with Overview, Lab, and Trainer Guide routes. |
| `README.md` | Add Session 20 to the Module 5 table. Add the HVE track to the track list and audience-path table. Change 19 sessions and 57 hours to 20 sessions and 60 hours. Change `01-19` to `01-20`. Add both new paths to the repository tree. |
| `curriculum-plan.md` | Change Module 5 from two sessions to three. Add the HVE track to delivery choices. Add Session 20 to the Module 5 table and create a full Session 20 detail section. Update totals and schedules to 20 sessions and 60 hours. State that Session 20 is delivered before Session 19 in Full Mastery. |
| `tracks/README.md` | Add the HVE Challenge row with 3 sessions and 9 hours. Add it to the choice diagram and progression path. Update Full Mastery to 20 sessions and 60 hours. |
| `tracks/full-mastery.md` | Change the header to 20 sessions and 60 hours. Add Session 20 under Module 5. Update both delivery schedules so Session 20 runs after Session 18 and before Session 19. Keep Session 19 as the final delivery event. |
| `overrides/main.html` | Change the hero copy to 20 sessions. Add a seventh track card that links to `tracks/hve-challenge/` and states the session set. |

Use this catalog shape:

```json
{
  "id": "20",
  "slug": "session-20-hve-challenge",
  "module": "5",
  "title": "HVE Challenge: Governed Specification-to-Delivery",
  "description": "Apply a governed HVE workflow to a prepared specification and produce reviewable delivery evidence under fixed constraints.",
  "difficulty": "Advanced",
  "duration_minutes": 180
}
```

### Count and duration changes

The standard session length stays at three hours. The required arithmetic is:

| Scope | Current | After Session 20 |
| --- | --- | --- |
| Curriculum | 19 sessions, 57 hours | 20 sessions, 60 hours |
| Module 5 | 2 sessions, 6 hours | 3 sessions, 9 hours |
| HVE Challenge track | Does not exist | 3 sessions, 9 hours |
| Full Mastery | 19 sessions, 57 hours | 20 sessions, 60 hours |
| Homepage tracks | 6 | 7 |
| Session material routes | 57 | 60 |
| Trainer guides | 19 | 20 |

The dedicated track uses Sessions 17, 18, and 20. Its stated prerequisites should
cover Sessions 01-12 or equivalent experience. Session 20 itself should require
Sessions 17-18 because its challenge starts from an approved governance boundary
and a specification handoff.

### Tests

| File | Required change |
| --- | --- |
| `tests/test_catalog.py` | Change the expected IDs to `range(1, 21)`, material count from 57 to 60, homepage card count from 19 to 20, and track-card count from 6 to 7. |
| `tests/test_session_rendering.py` | Change trainer-source count from 19 to 20 and route count from `19 * 3` to `20 * 3`. |
| `tests/browser_session_sets.py` | Change the initial visible catalog-row count from 19 to 20. |
| `.github/skills/session-format-validator/tests/test_validate_session.py` | Add a ready-session regression for Session 20. The existing missing path, `session-20-spec-frameworks`, does not collide with the recommended slug and can remain. |

No change is needed in `.github/skills/session-format-validator/scripts/validate_session.py`.
Its two-digit ID rule accepts `20`, and its checks resolve catalog and navigation
from the session slug. The validator does not check the new track page, homepage
track card, published totals, slide counts, or delivery order. Passing it is only
the first gate.

No change is needed in `hooks/presentation_embed.py`, `overrides/sets.js`, or the
session-set templates. They read the catalog at build time. The homepage track cards
are static, so `overrides/main.html` still needs a manual card.

### Published count references

Update these count-bearing files so decks and design records do not contradict the
catalog:

* `sessions/session-15-cicd-debugging-autofix/slides.md`: `Session 15 of 20`
* `sessions/session-16-squad-orchestration/slides.md`: `Session 16 of 20`
* `sessions/session-18-spec-kit/slides.md`: `Session 18 of 20`
* `sessions/session-19-capstone/slides.md`: `Session 19 of 20`
* `sessions/session-20-hve-challenge/slides.md`: `Session 20 of 20`, with an
  optional-specialization label so the capstone still reads as the culmination
* `DESIGN.md`: replace the 19-session and six-track design assertions with 20 and
  seven; retain six modules
* `.impeccable/design.json`: update the hero sample and Curriculum Jump Rule to 20
  sessions and seven tracks; correct its stale five-module sample to six while the
  file is being refreshed

The CSS track grid uses two flexible columns and becomes one column on small screens.
A seventh card needs no CSS change, though browser review should check the odd final
row on desktop and mobile.

## Full Mastery delivery order

Do not renumber the existing capstone. Renaming Session 19 would move public paths,
invalidate links, and create far more churn than the new elective warrants.

Keep the session ID as 20 but deliver it before Session 19 in Full Mastery:

```text
Day 6: Sessions 16, 17, 18
Day 7: Session 20, then Session 19
```

The ten-day schedule can use Sessions 17-18 on day 9 and Sessions 20-19 on day 10.
This looks numerically unusual, but the repository already separates module grouping
from prerequisite order: Session 17 belongs to Module 6 and is required before
Session 18 in Module 5. The schedule, prerequisite fields, and track tables must make
the teaching order explicit.

## Risks from adding Session 20 after the capstone

### Capstone meaning

`sessions/session-19-capstone/slides.md` says `Session 19 of 19`, and both capstone
guides describe the capstone as the endpoint. A later numbered challenge can make
the capstone look premature. Keep Session 19 last in delivery schedules and label
Session 20 as an optional Module 5 specialization.

### Content overlap

Session 18 produces a governed specification handoff. Session 19 implements one
bounded slice and reviews it. A generic specification-to-code challenge would copy
both sessions. Session 20 needs a different scoring frame, HVE-specific workflow,
fixed time limits, and its own evidence package.

### Prerequisite order

The numeric order becomes `17 -> 18 -> 20 -> 19` for the advanced finish. Readers
who assume numeric order may take the capstone too early. Put the order in the new
track, Full Mastery schedule, Session 20 prerequisites, and Session 19 prerequisites
or notes.

### False-green validation

The session validator can report `ready` while counts, the dedicated track, homepage
copy, or browser tests are stale. Run the repository tests and strict site build
after the session validator.

### Imported asset rights

The current repository does not contain the HVE source scenarios or their license.
`.copilot-tracking/research/subagents/2026-09-24/hve-showcase-scenarios-research.md`
is only an unfinished scaffold. Do not copy starter or solution assets until their
source paths, license, attribution wording, and redistribution rights are recorded.

### Delivery time

Full Mastery grows to 60 hours. Its header currently says 6-9 days while its tables
show seven and ten days. Use `7-10 days` after adding Session 20. The new HVE track
needs its own schedule so trainers do not treat it as an automatic extra day for
every audience.

## Validation commands

Run these from the repository root after implementation.

### Session contract

```bash
python .github/skills/session-format-validator/scripts/validate_session.py \
  sessions/session-20-hve-challenge
python .github/skills/session-format-validator/tests/test_validate_session.py
```

### Repository tests

```bash
python -m unittest discover -s tests -p "test_*.py"
node tests/session_sets.js
node tests/session_controls.js
node tests/marp_engine.js
```

The Python rendering suite already invokes the three Node checks when Node is
available, but running them directly gives clearer failures.

### Content and generated outputs

```bash
bash scripts/lint-markdown.sh
bash scripts/validate-labs.sh
python scripts/render-trainer-guides.py
bash scripts/build-slides.sh
pip install -r requirements.txt
mkdocs build --strict
```

The slide build needs Marp CLI. CI installs it with:

```bash
npm install -g @marp-team/marp-cli
npx puppeteer browsers install chrome
```

### Browser check

Start a local site, then run the existing desktop and mobile flow:

```bash
mkdocs serve -a 127.0.0.1:8765
python tests/browser_session_sets.py http://127.0.0.1:8765/
```

Check the homepage Module 5 cards, the seventh track card, Build your set with 20
rows, the Session 20 material tabs, and the Full Mastery and HVE track pages.

## Evidence

* `track-template/session-template/` defines the required overview, trainer guide,
  lab, starter, and solution shape. `track-template/README.md` adds slides, global
  registration, three-hour duration, and lab fallback expectations.
* `.github/skills/session-format-validator/scripts/validate_session.py` requires six
  paths, exact overview metadata labels, a catalog record, four navigation surfaces,
  lab preflight, fallback wording, and a deliverable heading.
* `sessions/session-18-spec-kit/lab/README.md` consumes all 120 minutes and ends with
  an implementation-ready governed handoff.
* `sessions/session-19-capstone/README.md` and its lab consume the Session 18 handoff
  and end with one reviewed feature change or plan.
* `data/session-catalog.json` is the source for homepage and set-builder session data.
  `hooks/presentation_embed.py` validates its schema and resolves all three material
  links for each session.
* `tests/test_catalog.py` fixes the current ID range, 57 material routes, 19 homepage
  cards, and six track cards. `tests/test_session_rendering.py` fixes 19 trainer
  sources and 57 navigation routes. `tests/browser_session_sets.py` fixes 19 visible
  catalog rows.
* `README.md`, `curriculum-plan.md`, `tracks/README.md`,
  `tracks/full-mastery.md`, `mkdocs.yml`, and `overrides/main.html` publish the current
  19-session, 57-hour curriculum.
* `DESIGN.md` and `.impeccable/design.json` record the current session and track counts
  as design rules, so they must move with the visible interface.

## Recommended next research

* [ ] Finish the HVE scenario inventory and choose the exact challenge scenario.
* [ ] Verify source licenses, attribution text, and redistribution rights for every
  imported starter or solution asset.
* [ ] Define the Session 20 scoring rubric and show how it differs from Session 18
  handoff review and Session 19 capstone review.
* [ ] Confirm whether Full Mastery must include the optional challenge. This report
  assumes yes because Full Mastery currently promises every session.

## Clarifying questions

1. Which HVE scenario is the required core challenge, and which scenarios are
   stretch work?
2. Is Session 20 optional for Full Mastery certification or only optional in other
   tracks?
3. What source license and attribution text govern the HVE starter and solution
   assets?
