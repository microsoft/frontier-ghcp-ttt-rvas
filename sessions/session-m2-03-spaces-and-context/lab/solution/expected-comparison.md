# Expected comparison

Your results will differ. Models vary between runs. These are the patterns to expect.

| Check | 1. No context | 2. Space | 3. Instructions | 4. Both |
| --- | --- | --- | --- | --- |
| Default threshold is 10 | Often missing or a guess | Yes | Usually a guess | Yes |
| Only `active` products | Often missing | Yes | Often missing | Yes |
| Sorted by stock, then name | Rarely | Yes | Rarely | Yes |
| Response includes `threshold` | No | Yes | Usually no | Yes |
| Bad threshold returns 400 `VALIDATION_ERROR` | Sometimes, in another shape | Yes | Yes, in the right shape | Yes |
| Uses `node:test` | Rarely | Rarely | Yes | Yes |
| `npm test` passes | Varies | Varies | Usually | Usually |

**Reading it:** the Space supplies **facts** the code doesn't contain. Instructions supply **habits** that apply to every task. Run 4 should do well on every row.
