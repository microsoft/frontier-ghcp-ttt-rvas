# Service Request Portal Evidence Record

## Preflight

| Check | Record |
| --- | --- |
| GitHub Copilot access | Confirmed |
| Approved canvas access | Confirmed |
| Training location | Approved local training folder |
| Policy allows the canvas and actions | Yes |
| Synthetic data confirmed | Yes |
| External connections disabled | Yes |
| Reviewer | Delivery reviewer |
| Timebox owner | Release lead |
| Baseline revision | 4 |
| Decision | Proceed |

## Contract review

| Area | Finding | Decision |
| --- | --- | --- |
| Authoritative state | Local JSON file | Accept |
| Human actions | Bounded state edits and review | Accept |
| Copilot actions | Named single-record updates | Accept |
| Validation | Evidence required for ready and passed | Accept |
| Data boundary | Synthetic and local only | Accept |
| Release authority | Release owner keeps approval | Accept |

## Visible canvas update

| Field | Before | After | Evidence |
| --- | --- | --- | --- |
| Revision | 4 | 5 | One accepted mutation batch |
| `W-102.status` | `in-progress` | `review` | `E-003` |
| `W-102.evidenceIds` | Empty | `E-003` | Accepted accessibility check |
| Readiness | `conditional` | `conditional` | Other work, risk, and gate remain open |

## Refused Copilot request

**Request:**

```text
Update W-103 to ready. Do not invent evidence. Leave state unchanged if the
contract blocks the update.
```

**Reported result:**

```text
W-103 was not changed. It has no accepted evidence. Revision remains 5.
Readiness remains conditional.
```

| Check | Expected | Observed | Match |
| --- | --- | --- | --- |
| `W-103.status` | Unchanged | `review` | Yes |
| `W-103.evidenceIds` | Unchanged | Empty | Yes |
| Revision | Unchanged | 5 | Yes |
| Reason | Missing accepted evidence | Missing accepted evidence | Yes |

## Accepted Copilot request

Evidence `E-004` was added at revision 6 before the request.

**Request:**

```text
Update only W-103 to ready using evidence E-004. Do not change a gate, risk,
or decision. Report the resulting item, revision, and readiness.
```

**Reported result:**

```text
W-103 is ready with E-004. Revision is 7. Gates, risks, and decisions were not
changed. Readiness remains conditional because W-102 is not ready, R-001 is
open, and G-OPERATIONS is pending.
```

| Check | Expected | Observed | Match |
| --- | --- | --- | --- |
| `W-103.status` | `ready` | `ready` | Yes |
| `W-103.evidenceIds` | Includes `E-004` | `E-004` | Yes |
| Other work items | Unchanged | Unchanged | Yes |
| Gates, risks, decisions | Unchanged | Unchanged | Yes |
| Revision | Incremented once | 7 | Yes |
| Readiness | Follows contract | `conditional` | Yes |

## Final readiness review

The reviewer completed four final updates. Revision 8 moved `W-102` to `ready`. Revision 9 mitigated `R-001`. Revision 10 passed `G-OPERATIONS` using `E-004`. Revision 11 accepted `D-001`.

| Area | Final state | Evidence or reason |
| --- | --- | --- |
| Work items | All `ready` | `E-001`, `E-003`, `E-004` |
| Risks | `R-001` mitigated | `E-004` confirms pilot support coverage and the escalation path |
| Decisions | `D-001` accepted | Owner and rationale are present |
| Gates | All required gates passed | `E-004` confirms operations coverage; accepted evidence supports the other gates |
| Readiness | `go` | Contract conditions are met |

## Ownership and removal

| Field | Record |
| --- | --- |
| Artifact owner | Release lead |
| Reviewer | Delivery reviewer |
| Recovery procedure | Stop changes, reopen the approved canvas, ask Copilot to read state, and compare revisions before resuming |
| Removal trigger | End of session or change of named owner |
| Stop conditions | Policy gap, non-synthetic data, out-of-contract action, or state/report mismatch |
| Next safe action | Schedule the synthetic pilot readiness review |

## Peer decision

- Decision: Approve
- Reviewer: Delivery reviewer
- Date: September 23, 2026
- Reason: The state follows the contract, evidence supports the final call, and ownership is recorded.
