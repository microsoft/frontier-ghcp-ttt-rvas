# Captured evidence 01: Chat discovery

## Learner prompt

```text
Explain the requested behavior and identify the evidence needed to prove it.
Do not edit files.
```

## Captured response

The issue asks the evaluator to distinguish three states. `NOT_READY` means
available evidence shows a blocker. `UNKNOWN` means required evidence is absent.
`READY` requires successful required checks plus resolved blocking reviews.

Evidence needed:

- focused tests for each verdict boundary;
- the implementation diff;
- exact test output;
- a PR snapshot with checks and review state.

The task should stay inside `readiness_guard/readiness.py` unless a missing test is
needed to prove a criterion.

## Learner decision

Record whether Chat was the right surface for this step and why.
