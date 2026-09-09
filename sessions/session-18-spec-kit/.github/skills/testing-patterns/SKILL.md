# Testing Patterns Skill

## Use this skill when

Use this skill when writing tests for specification-driven development. Tests must check specification compliance and code quality.

## Guidance for Copilot

1. **Test structure** — Organize tests by phase (Unit, Integration, Performance).
2. **Specification compliance tests** — Verify every endpoint against its specification.
3. **Edge case coverage** — Test validation errors as well as the happy path.
4. **Performance tests** — Validate latency requirements.
5. **Fixture patterns** — Use setup and teardown that mirror production behavior.

## Test Categories

- **Happy Path Tests** — Success scenarios (200, 201)
- **Validation Tests** — Bad input (400 errors)
- **Not Found Tests** — Missing resources (404 errors)
- **Conflict Tests** — Duplicate/constraint violations (409 errors)
- **Performance Tests** — Latency and throughput

## Confidence

**Medium** — These are widely adopted testing practices. Adapt them to your team's risk tolerance.
