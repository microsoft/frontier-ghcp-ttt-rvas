# Track Template

This directory contains the repeatable template structure for the GitHub Copilot & Agentic Workflows Train-the-Trainer track. Use it to scaffold new sessions or create variations of the curriculum.

## How to Use

1. **Copy** the `session-template/` folder into `sessions/` with the naming convention:

   ```
   session-NN-short-slug/
   ```

   Example: `session-01-intro-to-copilot/`

2. **Fill in** each template file with session-specific content:
   - `README.md` — Session overview (title, objectives, prerequisites, difficulty)
   - `trainer-content/README.md` — Trainer presentation outline (1-hour block)
   - `lab/README.md` — Lab exercise outline (2-hour block)
   - `lab/starter/` — Starter files trainees begin with
   - `lab/solution/` — Reference solution for trainers

3. **Link** the session in the top-level `README.md` session table, `curriculum-plan.md`,
   `mkdocs.yml`, the relevant track(s), and the home-page session cards.

## Folder Structure

```
session-template/
├── README.md                  # Session overview
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
- **Prerequisites:** Always reference prior session numbers (e.g., "Sessions 01–03")
- **Naming:** Use kebab-case slugs derived from the session title
- **Enterprise delivery:** Add an access/cost preflight, policy or permission
  assumptions, and a no-access fallback to every lab.
