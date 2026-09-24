# Lab notes

## Access path

- [ ] Live Copilot path
- [ ] Manual fallback

## Suggestion decisions

| Function | Accepted, revised, or rejected | Reason |
| --- | --- | --- |
| `normalize_username` |  |  |
| `is_palindrome` |  |  |
| `word_frequency` |  |  |
| `profile_summary` |  |  |

## Ambiguity decision

How should `word_frequency` treat apostrophes inside words?

**Decision:** Preserve an internal apostrophe, so `don't` is one word.

**Evidence:** The focused test states the expected behavior.

## Change review

Record the search command and test result used after the `username` to `handle`
rename.
