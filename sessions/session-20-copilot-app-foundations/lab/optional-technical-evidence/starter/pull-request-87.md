# Pull Request 87 — Add due dates and reminder scheduling

**Status:** Open  
**Author statement:** Ready for product review

## AI-generated summary

> This pull request adds complete due-date support to the Service Request Portal. Coordinators can set and update due dates, requesters can view them, and automatic reminders are scheduled 24 hours before each due date. All tests pass, existing requests remain compatible, and the change is ready for release.

## Author notes

- Added a due-date field to request create and update flows.
- Added a due-date display to requester and coordinator views.
- Added validation for dates in the past.
- Added reminder scheduling through the shared notification service.
- Added automated tests.
- No authentication or role changes were intended.

## Files described by the author

| Area | Stated change |
| --- | --- |
| Request data | Optional due-date field |
| Coordinator view | Editable due-date control |
| Requester view | Read-only due-date text |
| Reminder worker | Schedule a reminder before the due date |
| Tests | Validation, display, reminders, and regression coverage |

## Reviewer note

The AI-generated summary has not been verified. Use the issue, diff evidence, and check results before making a release recommendation.
