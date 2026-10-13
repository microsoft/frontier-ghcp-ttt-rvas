# Captured evidence 04: Independent critique

## Critic prompt

```text
Find a case where this evaluator could return READY from incomplete or
contradictory evidence. Review only; do not edit files.
```

## Findings

1. An empty `checks` list counts as present evidence and can produce `READY`.
   The issue says missing required checks return `UNKNOWN`, but it does not say
   whether an empty list proves that no checks are required.
2. A check with no `required` field is treated as optional. The data contract does
   not state whether omitted means false or unknown.
3. A review thread with no `blocking` field is treated as non-blocking. That may be
   correct, but the schema does not prove it.

## Required learner action

Evaluate each finding. Accept it only when the issue or a declared data
contract supports it. Record residual ambiguity rather than expanding scope without
approval.
