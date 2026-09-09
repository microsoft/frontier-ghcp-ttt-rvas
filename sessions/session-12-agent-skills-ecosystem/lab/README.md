# Session 12 Lab — Repository Skills

**Duration:** 2 hours · **Difficulty:** Advanced
**Prerequisites:** Sessions 01–07 and 11 · **Deliverable:** Two reviewed skills and a repository-sandbox run record

## Before you start

Use Enterprise Cloud as the governance baseline. Verify current documentation and customer policy for the selected repository and surface. Create, review, and share skills only through `.github/skills/`. Set a customer-owned meter, threshold, escalation path, and stop guard for metered work.

If no approved surface can load a skill, create and review the artifacts, use them as manual checklists, and record the same evidence.

| Exercise | Task | Time |
| --- | --- | --- |
| 1 | API-design skill | 30 min |
| 2 | Development-workflow skill | 30 min |
| 3 | Candidate review | 30 min |
| 4 | Bounded integrated workflow | 30 min |

## Setup

Use the starter template, sandbox guide, community catalog, skills project, and static integrated-workflow assets. In a writable sandbox:

```bash
mkdir -p ~/copilot-labs/session-12
cp -R lab/starter/skills-project ~/copilot-labs/session-12/skills-project
cd ~/copilot-labs/session-12/skills-project
mkdir -p .github/skills
npm install
```

## 1. API-design skill

Read `lab/starter/skill-template/SKILL.md` and `src/api/routes.js`. Create `.github/skills/api-design/SKILL.md`. Define the `src/api/` trigger, required data and review conditions, the procedure, focused validation, a manual fallback, and the maintenance owner. Include tasks it must not cover.

Have a peer explain when it applies and name a behavior it prevents. Apply the procedure manually to one small route review.

## 2. Development-workflow skill

Read `lab/starter/repository-sandbox-guide.md`. Create `.github/skills/development-workflow/SKILL.md` for one bounded workflow, such as a bug fix or API test. Name the repository state, paths, approval requirement, tests or manual evidence, recovery step, fallback, and owner.

Keep the procedure reusable. Do not turn one issue into a universal procedure.

## 3. Candidate review

Read `lab/starter/community-skills-catalog.md`. Select one example, then inspect its trigger, scope, tools, data, external services, validation, provenance, and license. Mark it accept for adaptation, revise, or reject. Adapt it only after review, with repository-specific examples and a manual fallback. Never execute a bundled script during evaluation.

## 4. Bounded integrated workflow

Review the static files in `lab/starter/integrated-workflow/`, including the incomplete deployment skill and `mcp.json`. Complete a documentation-only checklist or add validation guidance. Do not connect MCP or other tools until exact approval exists. Run the skill manually and record one improvement and one validation result.

## Completion checklist

- [ ] `.github/skills/api-design/SKILL.md` is reviewed.
- [ ] `.github/skills/development-workflow/SKILL.md` is reviewed.
- [ ] One candidate has an accept, revise, or reject decision.
- [ ] One skill has been applied manually to a bounded task.
- [ ] Tool configuration remains static unless explicitly approved.
- [ ] Each skill has scope, validation, fallback, and an owner.
