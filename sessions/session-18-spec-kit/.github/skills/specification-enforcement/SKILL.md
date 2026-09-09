# Specification Enforcement Skill

## Use this skill when

Use this skill to check that implementations match specifications. It teaches Copilot to verify compliance during code review.

## Guidance for Copilot

1. **Specification drift detection** — Spot code that diverges from the specification.
2. **Compliance checklist** — Verify that every required endpoint is implemented.
3. **Response format validation** — Check that responses match the specified format.
4. **Error handling verification** — Confirm that all specified error cases are handled.
5. **Performance verification** — Validate latency requirements.

## Convergence Checklist

Before shipping code:

- [ ] All endpoints in spec are implemented
- [ ] No extra (unspecified) endpoints added
- [ ] Request/response formats match specification exactly
- [ ] All error cases from spec are handled
- [ ] Performance requirements are met
- [ ] Tests pass and cover all specification requirements

## Use in CI/CD

```bash
# In your CI pipeline
specify check . \
  --against .specify/specification.yml \
  --verify-code src/ \
  --fail-if-drift
```

## Confidence

**Medium** — This skill automates specification compliance checks. Use it as part of enterprise governance.
