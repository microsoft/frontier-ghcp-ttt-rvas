# Completed Measurement Guardrail

| Item | Decision |
| --- | --- |
| Observation window | Two weeks or 10 reviewed tasks, whichever comes first |
| Quality rule | At least 9 of 10 tasks meet written acceptance criteria |
| Safety rule | Zero restricted-data events and zero boundary-check failures |
| Rework rule | No more than 3 tasks need material rewrite |
| Meter and owner | Automated-run counter maintained by the trainer |
| Alert and escalation | Alert at 18 runs; engineering lead reviews with the trainer |
| Stop condition | Pause at 20 runs or on any restricted-data event |
| Manual fallback | Human review with the same acceptance checklist |

## Synthetic observation

The sample shows 9 of 10 tasks meeting acceptance criteria, 2 material rewrites,
zero restricted-data events, zero boundary failures, and 16 automated runs.

**Decision:** Continue the bounded sandbox trial. Do not expand it. Four automated
runs remain before the stop guard.
