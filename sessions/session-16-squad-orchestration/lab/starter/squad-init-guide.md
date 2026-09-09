# Squad Initialization Guide

Use this guide only after the customer approves the tool, repository, and integration.

## Check the tool path

```bash
node --version
copilot --version
squad --version
```

Use Node.js 20 or later. Verify the current installation and agent-mode instructions rather than relying on a training example.

## Open the project

Open `squad-project/` in VS Code, run `npm install && npm start`, and open Copilot Chat. Select the approved Squad agent mode, if it is available.

Describe the project and the needed boundaries:

```text
Initialize a Squad team for this Node.js Express API. We need bounded roles
for feature work, bug fixes, and quality review.
```

## Review the proposed team

Review roles before confirming a team. Fictional names do not affect behavior. Confirm that the proposal has a decision owner, implementers with distinct file or domain ownership, and a tester. Add or remove roles only when the work justifies it.

## Inspect the shared state

After initialization, inspect:

| File | Use |
| --- | --- |
| `team.md` | Roster and role boundaries |
| `routing.md` | Assignment rules |
| `decisions.md` | Durable team decisions |
| `agents/{name}/charter.md` | Role inputs, outputs, and limits |
| `agents/{name}/history.md` | Role-specific project notes |

The expected `.squad/` directory also contains agent folders, a decision inbox, logs, routing rules, skills, and templates. Agents should write proposals separately. One owner should merge a shared decision.

## Commit the reviewed setup

```bash
git add .squad/
git commit -m "Initialize Squad team"
git push origin main
```

Commit only the state the team has reviewed. If the live path is unavailable, create the same role, routing, and decision artifacts manually.
