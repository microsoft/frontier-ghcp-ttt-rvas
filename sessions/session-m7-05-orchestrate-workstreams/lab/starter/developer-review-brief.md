# Review the M2-05 pull request

## Parent objective

Decide whether the pricing fix meets the issue, what the tests prove, and what the
real pull request says. Return three separate conclusions.

## Sources

- `issue-brief.md`: the rules and symptoms the fix must satisfy.
- `shop/pricing.py`: the code under review.
- `tests/test_pricing.py`: five tests.
- The pull request in your throwaway repo: its diff, `tests` check, and review
  threads. Read it with `gh pr view`, `gh pr checks`, and `gh api`, or with GitHub MCP.

The PR is live. Its state may differ from what you saw at the end of M2-05.

## Provisional author note

> All local tests pass, so this PR is ready to merge.

Treat that as unreviewed. Check it against the PR's real checks and review threads.

## Work limits

Review only. Don't edit files, push, comment, approve, or merge. Only the test
reviewer runs this command:

```bash
python -m unittest discover -s tests -v
```

Only the PR reviewer calls `gh` or GitHub MCP, and only to read.

The parent owns shared conclusions. Children don't wait for each other. A child
doesn't report a test gap as a code defect without support.
