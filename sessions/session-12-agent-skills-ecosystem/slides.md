---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 12 — Agent Skills'
---

<!-- _class: lead -->
# Repository Skills
## Reviewable guidance in `.github/skills/`

---
# Delivery rule

```text
.github/skills/
└── api-design/
    └── SKILL.md
```

Keep skills in the repository so the team can review, version, own, and test them with the code they affect.

---
# Preflight and fallback

Verify current documentation and customer policy for the repository, surface, data, tools, meter, and reviewer. Use a non-sensitive sandbox.

If access is unavailable, create the same artifact and use it as a manual checklist. Do not move the skill or bypass policy.

---
# A useful skill

```markdown
## When to use
Creating or changing REST routes under `src/api/`.

## Procedure
1. Read the route and its tests.
2. Validate input at the boundary.
3. Add focused success and failure tests.
4. Request review before merging.
```

Add preconditions, validation, fallback, and an owner.

---
# Review a community candidate

Check source, owner, license, version, instructions, scripts, dependencies, network use, data flow, and repository fit. Popularity is not approval.

Never run an unfamiliar bundled script merely to inspect it.

---
# Compose minimally

| Need | Use |
| --- | --- |
| Repository convention | Instructions |
| Repeatable procedure | Skill |
| Specialized role | Custom agent |
| Approved external capability | MCP |
| Shared interactive artifact | Canvas |
| Distributed customizations | Plugin |

---
<!-- _class: divider -->
# Lab

Create two skills, review a candidate, and apply one procedure manually in the sandbox.
