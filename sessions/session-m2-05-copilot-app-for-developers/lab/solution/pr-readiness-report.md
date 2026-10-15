# Pull-request readiness report

## Suggested verdict

`NOT_READY`

## Blockers

| Reason code | Evidence | Required action |
| --- | --- | --- |
| `CHECK_integration-tests_NOT_SUCCESS` | Required `integration-tests` failed on `71f5cba` | Fix or explain the failure, then rerun on the current head |
| `UNRESOLVED_BLOCKING_REVIEW` | Thread `R1` is blocking and unresolved | Resolve the evidence-contract question and update the thread |

## Missing or stale evidence

No stale SHA was found in the supplied snapshot. The snapshot does not include job
logs, so the cause of the integration failure remains unknown.

## Criterion trace

| Issue criterion | Changed file | Evidence |
| --- | --- | --- |
| Failed required checks return `NOT_READY` | `readiness_guard/readiness.py` | unit test passes; PR integration check fails |
| Blocking reviews return `NOT_READY` | `readiness_guard/readiness.py` | unit test passes; thread `R1` remains open |
| Missing evidence returns `UNKNOWN` | implementation and tests | focused unit tests pass |

## Human decision

The reviewer should request changes or pause. The report is advisory and cannot
approve or merge the pull request.
