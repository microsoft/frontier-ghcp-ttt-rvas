# Track Template

This directory contains the repeatable template structure for the GitHub Copilot & Agentic Workflows Train-the-Trainer track. Use it to scaffold new sessions or create variations of the curriculum.

## How to Use

1. **Copy** the `session-template/` folder into `sessions/` with the naming convention:

   ```
   session-mN-NN-short-slug/
   ```

   Example: `session-m2-08-new-topic/` for the next session in Module 2.
   Use a two-digit number that starts at `01` within each module.

2. **Fill in** each template file with session-specific content:
   - `README.md`: Session overview (title, objectives, prerequisites, difficulty)
   - `slides.md`: Trainer-facing concept deck that explains the lesson before the lab
   - `trainer-content/README.md`: Trainer presentation outline (1-hour block)
   - `lab/README.md`: Lab exercise outline (2-hour block)
   - `lab/starter/`: Starter files trainees begin with
   - `lab/solution/`: Reference solution for trainers

3. **Register** the session in `data/session-catalog.json`, in module-local order.
   Set `id` to `m2-08`, `module` to `2`, and `slug` to the directory name.
   New sessions do not need `legacy_id`; that field preserves links from the
   former global numbering.

4. **Link** the session in the top-level `README.md` session table, `curriculum-plan.md`,
   `mkdocs.yml`, and the relevant tracks. Home-page cards come from the catalog.
   Keep each module's sessions together. Add new sessions at the end of their
   module rather than renumbering existing IDs.

5. **Check** the session:

   ```bash
   python .github/skills/session-format-validator/scripts/validate_session.py \
     sessions/session-m2-08-new-topic
   ```

## Folder Structure

```
session-template/
├── README.md                  # Session overview
├── slides.md                  # Trainer concept deck and lab handoff
├── trainer-content/
│   └── README.md              # Trainer presentation outline
└── lab/
    ├── README.md              # Lab exercise outline
    ├── starter/               # Starter code/files for trainees
    │   └── .gitkeep
    └── solution/              # Reference solution
        └── .gitkeep
```

## Conventions

- **Difficulty levels:** Beginner, Intermediate, Advanced
- **Duration:** Each session is 3 hours total (1 hr trainer content + 2 hr lab)
- **Prerequisites:** Use full module-local IDs (e.g., "Sessions m1-01 to m1-03").
  Split ranges at module boundaries so they do not imply unrelated sessions.
- **Naming:** Use kebab-case slugs derived from the session title
- **Enterprise delivery:** Add an access and cost preflight, state the required
  tools and permissions, and tell learners to stop when a required tool is
  missing. Put demo recovery in the trainer guide. Add another learner setup only
  when it preserves the same objective and completion evidence.
- **Trainer slides:** Teach the concepts before the lab. Include an agenda, enough
  explanation for the trainer to introduce each concept, concrete examples or
  decision tables, a prepared demonstration where relevant, and a clear lab handoff.
