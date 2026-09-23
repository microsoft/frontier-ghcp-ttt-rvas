# Issue 142 — Add request due dates and reminders

## Problem

Service coordinators track target dates outside the portal. Requesters cannot see the target date, and coordinators sometimes notice overdue work too late.

## User outcome

A coordinator can set one due date during triage. The requester and coordinator can see it. The portal asks the shared notification service to send one reminder 24 hours before the due date unless the request is already resolved.

## Acceptance criteria

1. A coordinator can add or change a due date on an open request.
2. A requester can view the due date but cannot edit it.
3. The portal rejects a due date earlier than the current date.
4. The portal sends one reminder request 24 hours before the due date.
5. A resolved request does not produce a reminder.
6. Existing requests without a due date still display and update normally.
7. The due-date control has a visible label and works with keyboard navigation.

## Out of scope

- Recurring reminders
- Manager escalation
- Calendar integration
- Service-level calculations
- Changes to authentication or roles

## Required evidence

- Automated tests for date validation, permissions, reminder timing, and resolved requests
- Regression test for requests without a due date
- Accessibility check for the new control
- Notification service owner confirmation of the reminder contract
- Product owner review of visible wording

