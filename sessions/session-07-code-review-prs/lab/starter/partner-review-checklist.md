# Peer Review Checklist

## Review Information

- **PR Number:** #___
- **Author:**
- **Reviewer:**
- **Date:**

---

## Review Before Assistance

Complete this short section before opening an assisted review.

- **Change intent in one sentence:**
- **Initial verdict:** Approve / Request changes / Pause
- **Most important finding:**
- **Second finding or missing evidence:**

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

## Assisted Review Notes

- **Tool or review surface:**
- **Prompt or review scope:**

## What Changed After the Assisted Review?

- **Useful new finding, after verification:**
- **Unsupported or irrelevant finding rejected:**
- **Did the final verdict change? Why or why not?**

## Verdict

- [ ] **Approve**: ready to merge
- [ ] **Request changes**: blocking issues need correction
- [ ] **Pause**: evidence, access, or scope remains unresolved

## Short Reflection

**What, if anything, did the assisted review add to your decision?**

_(Write one or two sentences.)_
