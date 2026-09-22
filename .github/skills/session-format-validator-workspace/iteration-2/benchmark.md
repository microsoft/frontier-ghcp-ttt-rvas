# Skill Benchmark: session-format-validator

**Model**: gpt-5.6-terra
**Date**: 2026-09-21T15:05:08Z
**Evals**: 1, 2, 3 (1 run per configuration)

## Summary

| Metric | With Skill | Without Skill | Delta |
|--------|------------|---------------|-------|
| Pass Rate | 100% ± 0% | 67% ± 33% | +0.33 |
| Time | 130.0s ± 31.6s | 166.7s ± 14.7s | -36.7s |
| Tokens | 0 ± 0 | 0 ± 0 | +0 |

## Notes

- The revised skill passes every assertion across all three prompts and no longer raises an exception for the unnumbered template.
- The ready-session and template-registration prompts do not fully distinguish the skill from a thorough baseline; the baseline passed every template assertion in this iteration.
- The missing-session prompt shows the clearest scope benefit: the skill stops at the missing directory, while the baseline continues into unsupported curriculum analysis.
- The ready-session baseline invented publish blockers outside the repeatable-format contract, which accounts for most of the 33-point pass-rate gap.
- Timing is based on subagent elapsed time only. Token and tool-call data were not available, so resource comparisons are not meaningful.