# Developer orchestration reference

This reference explains facts from the sources. It does not replace a live
`/orchestrate` run or dictate the wording of child results.

## Separate conclusions

| Question | Supported conclusion | Source |
| --- | --- | --- |
| Does the reference satisfy the supplied focused checks? | All six unittest cases pass | Actual command output from the copied workspace |
| Does every passing test prove the full contract? | Inspect each assertion; ordering alone does not prove the complete reason list | `test_reason_codes_are_sorted` |
| Is the supplied PR ready? | `NOT_READY` | Required `integration-tests` failure and unresolved blocking thread `R1` in `pr-snapshot.json` |

Reject the provisional author note that passing local tests makes the PR ready.
The local run does not resolve the recorded review thread or replace the required
integration check. Non-blocking thread `R2` is not itself a blocker.

The PR snapshot records head `71f5cba`. Do not claim the local training run tested
that exact commit or that these files describe live GitHub state.

## Redirection

The planned follow-up should make the test reviewer inspect criterion 5 and the
ordering assertion. Record what the child actually changed or clarified. Do not
invent a defect or disagreement.

## What remains a human decision

The reviewer decides whether a test gap needs more work and who owns the failed
integration check and blocking thread. This read-only lab does not fix those
items, post a comment, approve, or merge.

Keep child results and usage in the app. Grade claims supported by sources
and how learners steer the work, not the number of agents or an assumed speedup.
