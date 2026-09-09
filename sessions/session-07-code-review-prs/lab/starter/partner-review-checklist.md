# Peer Review Checklist (with Copilot assistance)

## Review Information

- **PR Number:** #___
- **Author:**
- **Reviewer:**
- **Date:**

---

## Review Checklist

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

## Review Comments

### Comment 1

- **File:**
- **Line:**
- **Severity:** 🔴 Critical / 🟡 Warning / 🟢 Suggestion
- **Found by:** Human / Copilot / Both
- **Issue:**
- **Suggested fix:**

### Comment 2

- **File:**
- **Line:**
- **Severity:** 🔴 Critical / 🟡 Warning / 🟢 Suggestion
- **Found by:** Human / Copilot / Both
- **Issue:**
- **Suggested fix:**

_(Add more as needed)_

---

## Copilot vs. Human Review Comparison

| Dimension                | Copilot Review  | Your Review   |
| ------------------------ | --------------- | ------------- |
| Issues found             |                 |               |
| Security issues caught   |                 |               |
| Logic bugs caught        |                 |               |
| Style/readability issues |                 |               |
| Architecture concerns    |                 |               |
| False positives          |                 |               |
| Time spent               |                 |               |

## Verdict

- [ ] **Approve**: ready to merge
- [ ] **Request changes**: blocking issues need correction
- [ ] **Comment**: non-blocking observations

## Reflection

**What did Copilot catch that you missed?**

_(Write here)_

**What did you catch that Copilot missed?**

_(Write here)_

**How would you use Copilot review on your team?**

_(Write here)_
