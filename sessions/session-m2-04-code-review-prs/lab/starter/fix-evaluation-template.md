# Fix evaluation template

## Copilot review analysis

Use this template for the local reviews and the private training PR. Preserve
your initial human verdict in `partner-review-checklist.md` before running either
local command. Record findings once in the table below.

## Review runs

| Pass | Command or surface | Diff scope | Result, including no findings |
| --- | --- | --- | --- |
| Initial | `/review` | | |
| Initial | `/security-review` | | |
| Initial | Copilot PR review | | |
| Correction | `/review` | | |
| Correction | `/security-review` | | |

## Finding triage

| Source | File and line | Claimed impact | Acceptance criterion | Reproduction or code reference | Accept, reject, or unresolved | Reason | Fix and regression test |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

Record overlapping findings once and name each source. A maintainability comment
is not automatically a security vulnerability. A zero-findings result is not
proof that the change is secure.

Use `Human` for findings from the initial independent review. Keep those findings
unchanged; add later review sources, decisions, and fixes in the other columns.
State whether a suggested fix was used as written, revised, or rejected.

## Check coverage of the six intentional issues

Compare these with the triage table to identify missed issues:

- [ ] Unsafe SQL construction, distinguished from actual SQL execution
- [ ] Password exposure in API response
- [ ] Off-by-one pagination bug
- [ ] Missing error handling
- [ ] Synthetic hardcoded configuration, distinguished from a real credential leak
- [ ] Duplicate code (DRY violation)

## Human decision

- What changed after the local reviews:
- What changed after PR review:
- Final test command and result:
- Remaining risk or unresolved findings:
- Reviewer and final decision:
