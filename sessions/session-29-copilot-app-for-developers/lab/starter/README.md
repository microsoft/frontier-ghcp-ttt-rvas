# Session 29 Starter

This folder is a synthetic project for the GitHub Copilot app lab.

## Baseline

Run:

```bash
python -m unittest discover -s tests -v
```

Three tests should fail because `evaluate_readiness` ignores review blockers and
missing required evidence.

## Files

- `issue-brief.md`: bounded engineering request
- `readiness_guard/readiness.py`: incomplete implementation
- `tests/test_readiness.py`: focused behavior checks
- `synthetic-pr.json`: local input fixture
- `session-handoff-template.md`: fresh-session handoff
- `pr-readiness-report.md`: outer-loop report template
- `automation-prompt-template.md`: manual read-only automation contract
- `fallback-evidence/`: no-access route

Keep the project dependency-free. Use only Python's standard library.
