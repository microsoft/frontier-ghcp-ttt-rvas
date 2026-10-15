---
description: "Scoring guide for authoritative HVE evidence and the final handoff"
---

# HVE evidence scoring guide

Grade evidence where HVE or the platform created it. Do not require learners to
copy evidence into `challenge-handoff.md`.

## Evidence sources

| Evidence | Authoritative source |
|----------|----------------------|
| Research decisions and constraints | `.copilot-tracking/research/` |
| Approved scope, criteria, and checks | `.copilot-tracking/plans/` |
| Changed files and validation runs | `.copilot-tracking/changes/` |
| Findings, verdicts, and review basis | `.copilot-tracking/reviews/` |
| Advisor and coach output | Platform output cited by the Plan artifact |
| Test and container results | Platform output cited by Implement or Review |
| Final decision, open risks, next action | `challenge-handoff.md` |

## Scoring rubric

| Area | Points | Full-credit standard |
|------|-------:|----------------------|
| HVE RPI evidence | 40 | Award 10 points per phase. Each generated artifact names its inputs, decisions, and next handoff. |
| HVE customization | 25 | The three repository-owned customizations exist, and later HVE artifacts show that each one activated and affected the work. |
| Product and Agile agents | 20 | The platform outputs exist, the Plan cites them, and the Plan records whether they changed or confirmed scope and criteria. |
| Feature validation | 15 | Implement or Review cites exact API test and container results, including `not run` where access was unavailable. |

The handoff must link the four phase artifacts and record the final human decision,
unresolved risks, and next action. Deduct missing evidence from its scoring area;
do not award points for copied summaries in the handoff.

Recovery artifacts do not earn execution points for the phase they replace. A
submission with no HVE execution does not pass the challenge.
