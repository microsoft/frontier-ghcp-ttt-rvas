# Sample Issues for Squad Integration

Create five GitHub Issues for Exercise 3. Apply the `squad` label to each.

---

## Issue 1: Add Input Validation

**Title:** Add input validation to POST /api/users

```bash
gh issue create --title "Add input validation to POST /api/users" \
  --body "## Description
The POST /api/users endpoint accepts any input without validation. Add proper input validation.

## Acceptance Criteria
- [ ] Validate \`name\` is a non-empty string, max 100 characters
- [ ] Validate \`email\` is a valid email format
- [ ] Return 400 with descriptive error messages for invalid input
- [ ] Add tests for all validation rules

## Technical Notes
- Follow the existing error response format in routes/api.js
- Keep validation inline (no external libraries)" --label "squad"
```

**Best assigned to:** Backend Dev

---

## Issue 2: Add Request Logging Middleware

**Title:** Add request logging middleware

```bash
gh issue create --title "Add request logging middleware" \
  --body "## Description
Add a logging middleware that logs all incoming requests with method, path, status code, and response time.

## Acceptance Criteria
- [ ] Log format: \`[TIMESTAMP] METHOD /path STATUS TIMEms\`
- [ ] Log to stdout
- [ ] Don't log health check requests (to avoid noise)
- [ ] Add tests for the middleware

## Technical Notes
- Add as Express middleware in app.js
- Keep it simple — no external logging libraries" --label "squad"
```

**Best assigned to:** Backend Dev

---

## Issue 3: Write API Documentation

**Title:** Write complete API documentation in README

```bash
gh issue create --title "Write complete API documentation in README" \
  --body "## Description
The README has minimal info. Add complete API documentation for all endpoints.

## Acceptance Criteria
- [ ] Document all endpoints: method, path, request body, response format
- [ ] Include example curl commands for each endpoint
- [ ] Add setup instructions for new contributors
- [ ] Document environment variables (PORT)

## Technical Notes
- Read the existing routes to discover all endpoints
- Follow standard REST API doc format" --label "squad"
```

**Best assigned to:** Lead or Docs agent

---

## Issue 4: Add PATCH /api/users/:id Endpoint

**Title:** Add PATCH /api/users/:id for partial updates

```bash
gh issue create --title "Add PATCH /api/users/:id for partial updates" \
  --body "## Description
Users can only be created or deleted. Add the ability to update a user's name or email.

## Acceptance Criteria
- [ ] PATCH /api/users/:id accepts partial updates (name, email, or both)
- [ ] Returns 404 if user doesn't exist
- [ ] Returns 409 if updated email conflicts with another user
- [ ] Returns the updated user
- [ ] Add tests for happy path and error cases

## Technical Notes
- Add to routes/api.js following existing patterns
- Update the User model with an update() method" --label "squad"
```

**Best assigned to:** Backend Dev

---

## Issue 5: Add Test Coverage Reporting

**Title:** Add test coverage reporting with Jest

```bash
gh issue create --title "Add test coverage reporting with Jest" \
  --body "## Description
We have tests but no coverage visibility. Add Jest coverage reporting.

## Acceptance Criteria
- [ ] Add a \`test:coverage\` script to package.json
- [ ] Configure Jest to collect coverage from \`src/\` directory
- [ ] Add coverage thresholds: 70% statements, 70% branches
- [ ] Add \`coverage/\` to .gitignore

## Technical Notes
- Jest has built-in coverage via --coverage flag
- Configure in package.json under jest config section" --label "squad"
```

**Best assigned to:** Tester

---

## Create the issues

Run each `gh issue create` command above in sequence, or use a script:

```bash
#!/bin/bash
# Create all 5 issues (run from repo root)
# Copy each gh issue create command above and paste into terminal
```

After creating them, verify:

```bash
gh issue list --label "squad"
```

The list shows all five issues with the `squad` label.
