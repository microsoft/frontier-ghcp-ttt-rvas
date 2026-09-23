# Product Impact and Risk Brief

**Change:** Service Request Portal due dates and 24-hour reminders  
**Decision:** Request changes before release  
**Confidence:** High for the decision; medium for final user impact  
**Prepared by:** Training reviewer  
**Date:** September 23, 2026

## Requested outcome and user impact

The change should let service coordinators set one due date, show it to requesters, and trigger one reminder 24 hours before the date. This would move date tracking into the portal and could reduce requests that become overdue without warning. Existing requests can remain without a due date.

## Verified scope

- Coordinators can add or change a due date, while requesters have a read-only view (`diff-evidence.txt` E2-E3).
- Past dates are rejected, and existing records may omit the field (`diff-evidence.txt` E1 and E4; successful unit and regression check).
- Authentication, role definitions, reporting, recurring reminders, and calendar integration did not change (`diff-evidence.txt` E6).

## Evidence

| Material claim | State | Evidence |
| --- | --- | --- |
| “All tests pass” | Verified false | `checks.json` shows a failed notification contract test, a skipped accessibility check, and pending copy review. |
| One reminder is requested 24 hours before the due date | Verified with a boundary | `diff-evidence.txt` E5 and the successful unit check support scheduling. Delivery is not proven because the contract test failed. |
| Existing requests remain compatible | Verified | E1 says the field is optional; the regression check passed for records without a due date. |
| The change is ready for release | Generated and contradicted | The AI summary states this, but the overall check result is `action_required`. |

## Risks and unknowns

| Risk or unknown | Product effect | Severity / confidence | Owner and next action |
| --- | --- | --- | --- |
| Notification event version does not match the shared service | Reminders may never reach users | High / high | Portal engineering lead and notification service owner must agree on the event contract and pass the contract test. |
| Accessibility check was skipped | Keyboard or assistive-technology users may be unable to set a due date | High / medium | Accessibility reviewer must run the check and record the result. |
| A request resolved after scheduling may still receive a reminder | Users could receive a confusing reminder for completed work | Medium / medium | Engineering lead must confirm cancellation or send-time suppression behavior. |
| “Target response date” differs from “due date” | Users may misunderstand whether the date is a commitment | Medium / high | Product owner must approve or revise the wording. |
| Server-date validation has an unstated time-zone rule | A date may be accepted or rejected unexpectedly near midnight | Medium / medium | Engineering lead and product owner must define the business time zone and add evidence. |

## Review boundary

This brief does not approve code correctness, accessibility conformance, notification-service compatibility, or production release. Those decisions remain with the engineering lead, accessibility reviewer, notification service owner, and release owner.

## Recommended next action

Keep Pull Request 87 open. The portal engineering lead should fix or reconcile the notification event contract first, then rerun the failed check. Release review can resume after that check passes, accessibility evidence is recorded, and the product owner approves the visible wording.

