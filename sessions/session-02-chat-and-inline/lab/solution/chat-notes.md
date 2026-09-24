# Chat notes

## Access path

- [x] Live Copilot Chat path
- [ ] Manual fallback

## Conversation record

| Stage | Surface or command | Prompt | What you verified |
| --- | --- | --- | --- |
| Explain | Inline Chat, `/explain` | Explain the weighted-average formula and each guard. | The denominator should be the sum of weights. |
| Diagnose | Sidebar with `#file` | Compare the failing test with `weighted_average`. | The implementation divides by the item count. |
| Fix | Inline Chat, `/fix` | Fix only the denominator and preserve the public API. | The focused test passes. |
| Generate tests | Sidebar, `/tests` | Add mismatch, empty input, zero total weight, and history tests. | Each test checks stated behavior. |
| Review workspace | `@workspace` | Summarize calculator behavior and test coverage. | The response cited both project files. |

## Judgment call

**Zero-total-weight behavior:** Raise `ValueError("Total weight must not be zero")`.

**Why:** A numeric fallback would hide invalid input. A focused test preserves the
decision.

## Comparison

The comparison used the same review prompt for both approved paths. The result was
judged against the test suite rather than response style.
