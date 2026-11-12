# Track template

Copy this template to add a session.

## Steps

1. **Copy** the `session-template/` folder into `sessions/` with the naming convention:

   ```
   session-mN-NN-short-slug/
   ```

   Example: `session-m2-08-new-topic/` for the next session in Module 2.
   Use a two-digit number that starts at `01` within each module.

2. **Fill in** each template file with session-specific content:
   - `README.md`: overview, objectives, prerequisites, difficulty
   - `slides.md`: concept deck that teaches the lesson before the lab
   - `trainer-content/README.md`: 1-hour presentation outline
   - `lab/README.md`: 2-hour lab
   - `lab/starter/`: starter files for learners
   - `lab/solution/`: reference solution for trainers

3. **Register** the session in `data/session-catalog.json`, in module-local order.
   Set `id` to `m2-08`, `module` to `2`, and `slug` to the directory name.
   Use `M2-08` in headings and other visible labels.

4. **Link** the session in `README.md`, `curriculum-plan.md`, `mkdocs.yml`, and
   the relevant tracks. Home-page cards come from the catalog. Add new sessions
   at the end of their module and don't renumber existing IDs.

5. **Validate** the session:

   ```bash
   python .github/skills/session-format-validator/scripts/validate_session.py \
     sessions/session-m2-08-new-topic
   ```

## Folder structure

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

- **Difficulty:** Beginner, Intermediate, or Advanced.
- **Duration:** 3 hours: 1 hour of trainer content and a 2-hour lab.
- **Prerequisites:** Use module-local IDs, such as "Sessions M1-01 to M1-03". Split ranges at module boundaries.
- **Slugs:** kebab-case, from the session title.
- **Labs:** Name the required tools and permissions. Put demo recovery in the trainer guide.
- **Slides:** Teach the concepts before the lab. Include an agenda, examples or decision tables, a demo where it helps, and a lab handoff.
