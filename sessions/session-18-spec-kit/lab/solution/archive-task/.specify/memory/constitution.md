# Archive Task Project Constitution

## Principles

### Preserve accepted behavior

Changes must keep existing create and list behavior unless an accepted feature
requirement says otherwise. Regression tests protect that behavior.

### Requirements before design

`spec.md` defines user-visible behavior and edge cases. Technical choices belong in
`plan.md`.

### Standard library only

The training project uses Python 3.10 or later and adds no external package.

### Tests prove accepted behavior

Each acceptance scenario must map to at least one unit test. The full suite must
pass before convergence review.

## Governance

Review the specification before planning and the plan before task generation.
Resolve high-severity analysis findings at the source artifact. Merge only after
tests pass and convergence reports no remaining gap.
