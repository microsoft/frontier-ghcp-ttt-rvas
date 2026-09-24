# Approval Record: Service Request Portal Weekly Status

| Field | Value |
| --- | --- |
| Run IDs | `SRP-WEEKLY-2026-09-18-COPILOT-01`, `SRP-WEEKLY-2026-09-18-COPILOT-02` |
| Contract version | `1.0` |
| Reviewer | Delivery lead |
| Review time | September 18, 2026 at 15:24 UTC |
| Decision | Keep as manual, draft-only automation |

## Evidence checked

- [x] Inputs match the contract.
- [x] Counts reconcile.
- [x] Claims trace to accepted source records.
- [x] Rejected records and reasons are visible.
- [x] No prohibited action occurred.
- [x] The GitHub Copilot surface and observed usage are recorded.
- [x] The exception has an owner and next action.

## Run comparison

The first run accepted seven records and excluded `SR-1048` because it had no
owner. After the approved source update, the second run accepted all eight records,
classified `SR-1048` as blocked, and produced no exception.

Both runs stayed inside the same project, tool, output, and publication boundary.

## Required correction or condition

Keep every output internal until a person approves stakeholder preparation. Do not
schedule the automation until the owner approves the cadence and operating budget.

## Next action

| Field | Value |
| --- | --- |
| Owner | Product owner prepares the stakeholder update; operations lead owns the exception |
| Due date | September 21, 2026 |
| Stop status | Two manual tests complete; scheduling remains stopped |
