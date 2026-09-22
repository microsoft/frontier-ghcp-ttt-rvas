# Skill Benchmark: session-format-validator

**Model**: gpt-5.6-terra
**Date**: 2026-09-21T12:41:43Z
**Evals**: 1, 2, 3 (1 run per configuration)

## Summary

| Metric | With Skill | Without Skill | Delta |
|--------|------------|---------------|-------|
| Pass Rate | 100% ± 0% | 89% ± 19% | +0.11 |
| Time | 203.0s ± 15.7s | 203.0s ± 46.5s | +0.0s |
| Tokens | 0 ± 0 | 0 ± 0 | +0 |

## Notes

- The published-session and missing-directory assertions passed in both configurations, so these two prompts do not distinguish the skill from a careful baseline.
- Only the template-registration prompt differentiated the skill: the baseline did not name the required session-NN directory contract.
- The skill run exposed a real validator defect: an unnumbered directory causes a `ValueError` while deriving its Full Mastery reference.
- Timing is based on subagent elapsed time only. Token and tool-call data were not available, so resource comparisons are not meaningful.