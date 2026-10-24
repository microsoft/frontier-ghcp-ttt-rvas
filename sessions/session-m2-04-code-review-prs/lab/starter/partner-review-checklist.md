# Peer review checklist

## Review information

- **PR number:** #___
- **Author:**
- **Reviewer:**
- **Date:**

---

## Review before assistance

Complete this short section before opening an assisted review.

- **Change intent in one sentence:**
- **Initial verdict:** Approve / Request changes / Pause
- **Initial findings:** Record the two most important findings or missing checks
  in `fix-evaluation-template.md`, with `Human` as the source.

---

## Review checklist

### Correctness

- [ ] Code does what the PR description says
- [ ] Edge cases are handled (null, empty, boundary values)
- [ ] Error paths return appropriate responses
- [ ] No logic errors or off-by-one bugs

### Security

- [ ] No SQL injection or command injection vulnerabilities
- [ ] No sensitive data exposed in responses (passwords, tokens, PII)
- [ ] No hardcoded secrets or API keys
- [ ] Input is validated and sanitized
- [ ] Authentication/authorization checks are present where needed

### Performance

- [ ] No obvious N+1 queries or unnecessary loops
- [ ] No memory leaks (unclosed connections, growing arrays)
- [ ] Pagination implemented for list endpoints

### Readability

- [ ] Code is easy to read (clear naming and structure)
- [ ] No unnecessary complexity
- [ ] Consistent style with the rest of the codebase
- [ ] No dead code or commented-out blocks

### Testing

- [ ] New code has test coverage
- [ ] Tests cover expected behavior and errors
- [ ] Existing tests still pass

---

## Review comments

Use the single triage table in `fix-evaluation-template.md` for human and assisted
findings. Record each source, location, impact, check, decision, and fix there;
do not copy the comments into this checklist.

Record the review runs, what changed after assistance, remaining risk, and final
human decision in that same template. Keep the initial verdict above unchanged.
