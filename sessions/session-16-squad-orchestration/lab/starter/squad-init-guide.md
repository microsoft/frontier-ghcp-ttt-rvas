# Squad Initialization Guide

Use this guide only after the customer approves the tool, repository, and
integration.

## Check the tool path

```bash
node --version
copilot --version
squad --version
```

Use Node.js 20 or later. Verify the current installation and agent-mode
instructions. Do not rely on a training example.

## Open the project

Open `squad-project/` in VS Code, run `npm install && npm start`, and open Copilot Chat. Select the approved Squad agent mode, if it is available.

Describe the project and the required Issue 001 boundaries:

```text
Initialize a Squad team for this Node.js Express API. We need bounded roles
for lead review, backend implementation, test evidence, and decision recording.
The required lab changes only src/routes/api.js and tests/api.test.js.
```

## Review the proposed team

Review roles before confirming a team. Fictional names do not affect behavior.
Confirm that the proposal has a lead, backend implementer, tester, and scribe.
Keep the source and test write boundaries separate.

## Inspect the shared state

After initialization, inspect:

| File | Use |
| --- | --- |
| `team.md` | Roster and role boundaries |
| `routing.md` | Assignment rules |
| `decisions.md` | Durable team decisions |
| `agents/{name}/charter.md` | Role inputs, outputs, and limits |
| `agents/{name}/history.md` | Role-specific project notes |
| `reviews/issue-001-review.md` | Acceptance checks, test evidence, and lead decision |
| `orchestration-log/issue-001.md` | Assignment-to-review state changes |

The expected `.squad/` directory also contains agent folders, a decision inbox,
logs, reviews, routing rules, skills, and templates. Agents write proposals
separately. The scribe updates the shared decision after lead approval.

## Commit the reviewed setup

```bash
git add .squad/
git commit -m "Initialize Squad team"
git push origin main
```

Commit only the state the team reviewed. If the live path is unavailable, create
the same role, routing, and decision artifacts manually.
