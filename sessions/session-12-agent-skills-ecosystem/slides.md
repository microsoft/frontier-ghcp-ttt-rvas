---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 12: Agent Skills Ecosystem'
---

<!-- _class: lead -->

# Agent Skills

## Test selection, non-selection, and visible failure

Session 12 of 19 | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| Skill directory and loading model | 8 min |
| Required frontmatter and description | 10 min |
| Trigger and non-trigger design | 12 min |
| Preconditions and visible failure | 12 min |
| Validation and bounded runner | 10 min |
| Candidate review and lab handoff | 8 min |

---

# A skill has two jobs

1. **Select the right task.**
2. **Guide the work after selection.**

A good procedure with a broad description still creates noise. A precise
description with no failure behavior still creates unsafe success claims.

---

# Repository skill structure

```text
.github/
└── skills/
    └── api-design/
        └── SKILL.md
```

The directory uses lowercase words and hyphens. The instruction file is named
exactly `SKILL.md`.

---

# Required frontmatter

```yaml
---
name: api-design
description: Use for creating or reviewing REST routes under src/api/ when acceptance criteria, a reviewer, and a verified focused test command are available. Do not use for documentation, UI, deployment, or generated clients.
---
```

The `name` matches the directory. The `description` carries the trigger.

---

# Test the positive trigger

```text
Review GET /api/tasks/:id under src/api/.
Check identifier handling and the existing not-found response.
```

Required context:

- acceptance criteria;
- named paths;
- reviewer;
- verified focused test command.

Expected status: `applied`.

---

# Test a non-trigger

```text
Rewrite the installation section in README.md.
```

Expected:

```json
{
  "status": "not_applicable",
  "skill": "api-design",
  "reason": "Task is outside REST route work under src/api/."
}
```

A bounded skill stays quiet outside its job.

---

# Matching work can still be blocked

```text
Add POST /api/tasks under src/api/.
Acceptance criteria exist.
No reviewer is assigned.
```

The trigger matches. The precondition does not.

---

# Make the failure visible

```json
{
  "status": "blocked",
  "skill": "api-design",
  "reason": "Missing precondition: human reviewer."
}
```

Do not invent a reviewer, skip the check, or return success.

---

# A reviewable skill body

```text
Preconditions
Procedure
Validation
Failure behavior
Maintenance
```

Each section answers a different question. Keep the procedure short enough that a
human can apply it as a checklist.

---

# Validate the files

```bash
npm run validate:skill
```

The validator checks:

- `SKILL.md` exists;
- frontmatter has `name` and `description`;
- `name` matches the directory;
- required sections are present.

---

# Test all three outcomes

```bash
npm test
```

The suite proves:

- a route task applies the skill;
- a documentation task does not;
- a missing reviewer blocks;
- valid and invalid directories are distinguishable.

---

# End with a bounded run

```bash
npm run demo
```

The output shows:

1. correct application to named API files;
2. a visible missing-reviewer failure.

The local runner is a teaching harness, not a replacement skill platform.

---

# Review candidates before adaptation

Check:

- source and license;
- files and scripts;
- dependencies and network use;
- data flow;
- repository fit;
- owner and retirement condition.

Do not run an unfamiliar script just to inspect it.

---

# Lab handoff

1. Create `api-design/SKILL.md`.
2. Validate the directory and frontmatter.
3. Run the trigger scenario.
4. Run the non-trigger scenario.
5. Run the missing-reviewer scenario.
6. Finish with the bounded demo.
7. Record live loading as executed or **not executed**.

**The final evidence must show both correct application and a visible precondition
failure.**
