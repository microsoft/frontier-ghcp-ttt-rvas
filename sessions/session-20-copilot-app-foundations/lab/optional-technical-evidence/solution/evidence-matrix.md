# Reviewed Evidence Matrix

| Claim | Artifact and evidence | State | Product impact | Follow-up question or owner |
| --- | --- | --- | --- | --- |
| Coordinators can add or change a due date | `issue-142.md` criterion 1; `diff-evidence.txt` E2 | Verified | Adds the requested triage step | Product owner confirms workflow wording |
| Requesters can see but not edit the date | Criterion 2; E3 | Verified | Gives requesters visibility without changing permissions | None |
| Reminders will be delivered | E5 proves a request is scheduled, but `checks.json` shows an event-version failure | Unknown | The main prevention benefit may not work | Notification service owner |
| Resolved requests never receive reminders | E5 covers requests resolved at scheduling time only | Inferred beyond evidence | Completed work may still trigger a message | Engineering lead |
| Existing requests remain compatible | E1 and successful regression check | Verified | Lowers migration risk | Release owner reviews rollout evidence |
| The new control is accessible | E2 shows a label, but the accessibility check was skipped | Unknown | Some coordinators may be blocked | Accessibility reviewer |
| All tests pass | AI-generated PR summary | Generated and contradicted | Could lead to an unsafe release recommendation | Use `checks.json` as the source |
| The change is ready for release | AI-generated PR summary | Generated and contradicted | Release should wait for failed and missing evidence | Release owner after required actions |
