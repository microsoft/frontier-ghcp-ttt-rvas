# Sample Issues for Squad Integration

Issue 001 is the required lab issue. The other issues in
`backlog-items.md` are optional discussion material.

## Issue 001: Add input validation

**Title:** Add input validation to POST /api/users

```bash
gh issue create --title "Add input validation to POST /api/users" \
  --body "## Description
Add bounded input validation to POST /api/users.

## Acceptance criteria
- [ ] Validate name is a non-empty string after trimming
- [ ] Reject names longer than 100 characters
- [ ] Validate email has a basic local@domain.tld shape
- [ ] Return 400 with a descriptive error for invalid input
- [ ] Add focused tests for every validation rule

## Permitted files
- src/routes/api.js
- tests/api.test.js

## Non-goals
- No new dependency
- No response-envelope change
- No model change
- No unrelated route edit

## Required verification
- npm test

## Reviewer
- Lead" --label "squad"
```

**Owner:** Backend role

**Tester:** Tester role

**Reviewer:** Lead

## Create and verify the issue

Run the command above, then verify:

```bash
gh issue list --label "squad" --json number,title,labels,state
```

The list should show the input-validation issue open with the `squad` label.
