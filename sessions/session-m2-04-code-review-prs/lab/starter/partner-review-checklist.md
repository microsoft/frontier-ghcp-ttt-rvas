# Peer review checklist (optional)

Use these prompts while you review. Write your verdict and findings in
`fix-evaluation-template.md`, not here.

## Review information

- **PR number:** #___
- **Author:**
- **Reviewer:**
- **Date:**

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
