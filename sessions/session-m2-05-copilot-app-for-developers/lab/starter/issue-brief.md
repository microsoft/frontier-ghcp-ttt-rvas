# Issue 184: Stop false READY verdicts

## Problem

The local readiness evaluator reports `READY` when all visible checks pass. It
does not account for unresolved blocking review threads. It also treats missing
required evidence as success.

## Acceptance criteria

1. A failed required check returns `NOT_READY`.
2. An unresolved review thread marked `blocking` returns `NOT_READY`.
3. Missing required checks or review data returns `UNKNOWN`.
4. `READY` requires all required checks to pass and every blocking thread to be
   resolved.
5. Reason codes are stable and sorted so another tool can compare reports.

## Scope

Change `readiness_guard/readiness.py`. Add a test only when it proves an uncovered
criterion. Do not add packages, network calls, or GitHub writes.

## Verification

```bash
python -m unittest discover -s tests -v
```
