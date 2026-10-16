# Lab notes

## Access path

- [x] Required Copilot access checked

## Suggestion decisions

| Function | Accepted, revised, or rejected | Reason |
| --- | --- | --- |
| `normalize_username` | Revised | The first proposal did not collapse repeated whitespace. |
| `is_palindrome` | Accepted | It ignored non-alphanumeric characters and passed the test. |
| `word_frequency` | Revised | A simple split did not preserve apostrophes correctly. |
| `profile_summary` | Accepted | The output matched the stated format. |

## Ambiguity decision

How should `word_frequency` treat apostrophes inside words?

**Decision:** Preserve an internal apostrophe, so `don't` is one word.

**Test result:** `test_word_frequency_preserves_apostrophes` passes.

## Change review

`grep -R --include='*.py' "username" .` found no stale parameter or caller after
the rename.
`python -m unittest -v` passed all five tests.
