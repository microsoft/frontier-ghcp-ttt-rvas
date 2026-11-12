# Developer orchestration reference

This reference explains what to expect. It doesn't replace a live `/orchestrate`
run or dictate the wording of child results.

## Separate conclusions

| Question | Likely conclusion | Source |
| --- | --- | --- |
| Does the fix meet `issue-brief.md`? | Yes, if it matches the M2-05 reference fix: `>=` for free shipping, coupon before the shipping decision, `Decimal` with `ROUND_HALF_UP` | `shop/pricing.py`, PR diff |
| What do the tests prove? | Each of the four symptoms has a test, plus the small-order baseline. Five tests pass | `tests/test_pricing.py`, test output |
| What do they miss? | Edge cases such as a 0% or 100% coupon, an empty order, or a coupon over 100 | `tests/test_pricing.py` |
| Is the PR ready? | Decide from the live `tests` check and review threads. A green check with no open threads supports merging. A red check or open thread doesn't, whatever the local run says | `gh pr checks`, review threads |

Local tests passing and a mergeable PR are different claims. The local run doesn't
resolve a review thread or replace the CI check on the PR head commit. Check that
the PR head matches the code the children reviewed.

## Redirection

The planned follow-up makes the test reviewer map each rule to a test. Record what
the child changed or clarified. Don't invent a disagreement.

## Human decision

You decide whether a test gap needs another PR and whether to merge. This lab
doesn't fix anything, comment, approve, or merge.

Check claims against sources and how learners steered the work. Don't grade on
the number of agents or an assumed speedup.
