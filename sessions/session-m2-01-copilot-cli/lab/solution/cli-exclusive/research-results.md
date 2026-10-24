# Research results: Expected format

This example shows a useful `/research` result. Your result will depend on the topic and sources, so check its claims before you use them.

---

## Example: Express.js security best practices (Topic 1)

### What a useful `/research` result includes

A thorough `/research` result for this topic should include:

**1. Structure:**

- An executive summary (2-3 sentences)
- Organized sections by topic area
- Code examples for each recommendation
- Source citations (GitHub repos, documentation links)

**2. Expected coverage areas:**

- Helmet.js for HTTP security headers
- CORS configuration patterns
- Rate limiting with express-rate-limit
- Input validation and sanitization (express-validator, joi)
- CSRF protection strategies
- Authentication middleware patterns (passport.js, JWT best practices)
- SQL/NoSQL injection prevention (parameterized queries)
- XSS prevention (output encoding, CSP headers)
- Dependency vulnerability scanning (npm audit, Snyk)
- Error handling that doesn't leak stack traces

**3. Compare the actual outputs:**

- Which claims have sources that support them?
- Do the examples match the package versions and task?
- Which unsupported or outdated claims need correction?
- Did either result change the decision?

Word count does not show accuracy or usefulness. Do not assume regular chat lacks
sources or that `/research` produces a better answer.

### Sample research output structure

```markdown
# Express.js Security Best Practices (2026)

## Executive Summary
Modern Express.js applications face [X] primary attack vectors...

## 1. HTTP Security Headers (Helmet.js)
[Specific configuration examples with current API]
Sources: [GitHub repo links, npm docs]

## 2. Input Validation
[Code examples using express-validator v7+]
Sources: [OWASP Cheat Sheet, express-validator docs]

## 3. Rate Limiting
[Configuration for API endpoints vs. auth endpoints]
Sources: [express-rate-limit repo, real-world configs]

## 4. Authentication
[JWT best practices, session management]
Sources: [OWASP Authentication Guide]

## 5. Database Security  
[Parameterized queries, ORM-specific guidance]

## Sources
- [list of all referenced materials]
```

---

## Evaluation criteria

Rate your `/research` output:

| Criterion                           | Score (1-5)   |
| ----------------------------------- | ------------- |
| Depth of coverage                   | ___           |
| Accuracy of information             | ___           |
| Source citations present            | ___           |
| Actionable code examples            | ___           |
| Current/up-to-date advice           | ___           |
| Usefulness compared with regular chat | ___         |

**Overall:** Would you use `/research` as part of your regular workflow? Why or why not?
