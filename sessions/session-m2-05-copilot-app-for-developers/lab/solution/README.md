# Session M2-05 reference solution

The solution shows one acceptable implementation and completed reports for the
supplied PR snapshot.

Run:

```bash
python -m unittest discover -s tests -v
python readiness_report.py ../starter/prepared-evidence/05-pr-snapshot.json
```

Expected report verdict: `NOT_READY`.

The learner's `engineering-review.md` must contain the actual `/plan`,
`/rubber-duck`, `/spar`, fork/return checks, and `/review` results. A reference
implementation cannot supply those live outputs. Check that plan critique happened
before implementation and that code review inspected the uncommitted repair. Accept zero-findings results
when the learner checked them honestly.

The automation specification remains manual and read-only. It does not replace the
human reviewer.
