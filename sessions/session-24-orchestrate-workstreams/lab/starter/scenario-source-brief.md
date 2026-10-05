# Service Request Portal: Status-Visibility Source Brief

Use this fictional source brief with the Session 22 `issue-handoff.md` and Session
23 `canvas-handoff.md`. It contains no production data or source organization
names.

## Parent objective

Decide whether the Service Request Portal status-visibility issue set is ready for
delivery follow-up. Produce one reviewed delivery-status record. Do not change
production systems or publish claims.

## Approved issue roles

### SV-01: Public status mapping

- The first release needs a requester-safe public status vocabulary.
- The product owner must approve the mapping.
- Internal queue names and staff-only reasons stay hidden.

### SV-02: Requester status view

- Session 22 reuses issue `#241`.
- The view may show public status, last public update time, and expected next step.
- No approved source supports a completion forecast.

### SV-03: Empty and stale states

- Missing status must appear as unavailable, not as a guessed state.
- Stale data must show its last update time and a safe next action.
- No response-time promise is approved.

### SV-04: Requester access verification

- A requester may see only their own requests.
- The review must use supplied synthetic evidence.
- Production requests, support transcripts, identities, and secrets are restricted.

## Open ownership

- Implementation owners remain unset.
- The privacy reviewer owns requester-access evidence.
- The product owner owns public status vocabulary approval.
