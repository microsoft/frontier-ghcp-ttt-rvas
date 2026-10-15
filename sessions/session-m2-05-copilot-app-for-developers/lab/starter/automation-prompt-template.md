# Manual read-only PR-readiness automation

## Name

`PR readiness evidence report`

## Trigger

Manual only.

## Repository

Use an approved synthetic or training repository.

## Tools

Select only tools that can read:

- issue title, body, and acceptance criteria;
- pull-request metadata and changed files;
- review comments and thread resolution state;
- check names, required status, conclusion, and timestamp.

Do not grant tools that can comment, label, push, approve, merge, close, reopen, or
resolve threads.

## Prompt

```text
Create a read-only readiness report for the selected pull request.

Trace issue acceptance criteria to changed files, review threads, and required
checks. Report READY, NOT_READY, or UNKNOWN as a suggestion. Cite the evidence for
every blocker and call out missing or stale evidence.

Treat a failed or pending required check as NOT_READY. Treat an unresolved blocking
review thread as NOT_READY. Treat inaccessible required evidence as UNKNOWN.

Do not change repository state. Do not comment, label, push, approve, merge, close,
reopen, or resolve anything. The final decision belongs to a human reviewer.
```

## Manual run review

- Run date:
- Pull request:
- Tools granted:
- Suggested verdict:
- Evidence links:
- Confirmed repository writes: `none`
