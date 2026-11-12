# Reference solution notes

This folder holds one correct result for the lab task. Your Squad run will differ in names, structure, and wording. Compare behavior, not text.

## What the code should do

- `POST /api/users` rejects a malformed email and a name over 100 characters with `400`.
- `GET /api/tasks` lists tasks and accepts `?status=todo|doing|done`.
- `POST /api/tasks` needs a non-empty `title` of at most 100 characters. `status` defaults to `todo`.
- `PATCH /api/tasks/:id` changes the status. `DELETE /api/tasks/:id` removes a task.
- Unknown ids return `404`. Bad input returns `400`.
- `npm test` passes, with tests for both the validation and the tasks API.
- The README documents the new endpoints.

Run it:

```bash
cd squad-project
npm install
npm test
```

## What the `.squad/` folder should show

Names and file layout depend on your Squad version. Check the Squad README for your version. In a healthy run you can point to:

| Artifact | What to look for |
| --- | --- |
| `team.md` | A roster with a lead, at least one developer, a tester, and a scribe. Ralph is on the roster. |
| `routing.md` | Rules that match this repo, such as `src/**` to a developer and `tests/**` to the tester. |
| `agents/<name>/charter.md` | Role, what the agent owns, what it does not handle. |
| `agents/<name>/history.md` | What that agent learned about this project (file name may differ by version). |
| `decisions.md` and `decisions/inbox/` | Choices that affect others, such as the error format and the status values. |
| `orchestration-log/` | Which agents the coordinator started, and why. |

## Where runs usually go wrong

- Two agents edit `src/routes/api.js` and one overwrites the other. Check that both the user validation and the tasks routes are present.
- The tester writes tests against an API shape the developer then changes. Run `npm test`.
- The docs describe endpoints that do not exist. Compare the README with the routes.
