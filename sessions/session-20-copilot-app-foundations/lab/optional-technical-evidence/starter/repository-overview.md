# Service Request Portal — Repository Overview

## Product purpose

The Service Request Portal lets employees submit internal service requests. Service coordinators review each request, assign it to a queue, update its status, and communicate progress.

## Main users

| User | Main tasks |
| --- | --- |
| Requester | Submit a request, add details, and view status |
| Service coordinator | Triage requests, set ownership, update status, and contact the requester |
| Service manager | Review queue health and overdue work |

## Current behavior

- A requester submits a title, category, description, and optional attachment.
- A coordinator assigns the request to a service queue.
- Status values are `New`, `In progress`, `Waiting`, and `Resolved`.
- The portal records status history and coordinator notes.
- The portal has no due-date field and sends no due-date reminders.

## System boundaries

- Authentication and user roles come from an existing identity service.
- Email and in-app messages use a shared notification service.
- The portal stores request records but does not own notification delivery.
- Reporting reads portal data once per hour.

## Review contacts

Use roles, not real names:

- Product owner
- Portal engineering lead
- Notification service owner
- Accessibility reviewer
- Release owner

## Training data rule

This scenario is synthetic. Do not add customer names, source organization names, personal information, credentials, or production details.

