# Captured evidence 02: Plan session

## Session setup

- Surface: project session
- Mode: Plan
- Workspace: new working tree
- Attached files: issue brief, implementation, focused tests

## Proposed plan

1. Run the focused unit tests and retain the failing assertions.
2. Return `UNKNOWN` when the snapshot lacks `checks` or `review_threads`.
3. Add a blocker for each unresolved thread marked `blocking`.
4. Keep the existing required-check rule.
5. Sort reason codes before returning.
6. Run the same test command and inspect the diff.

## Plan critique

The plan stays inside the requested file. It does not define how contradictory
evidence should be handled when required data exists but uses an unsupported value.
That case is outside the issue criteria and should be recorded as residual risk.
