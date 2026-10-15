# Interview comparison reference

The learner record must contain actual live skill invocations. A local contract
runner cannot supply them.

## Checks to make

- `decision-interview` is loaded from the Session 21 repository skill.
- `grill-me` and `grilling` match the pinned checksums and both load.
- Each interview starts fresh in Interactive mode with the same synthetic request.
- The learner answers as the owner and records reasons instead of accepting every recommendation.
- Dependency-ordered questions wait for earlier decisions.
- The late constraint changes requester visibility without silently reopening unrelated decisions.
- The decision brief carries unresolved questions into `/plan`.
- At least two decisions affect a plan step or acceptance check.

Both skills use question rounds. The pinned community entry point invokes
`grilling`; it is not a self-contained built-in command or a promise to ask exactly
one question at a time.

Do not grade identical wording or declare a universal winner from two runs.
Grade correct loading, checked assumptions, and a useful decision-to-plan handoff.
No interview result authorizes implementation.

The final `/chronicle improve` check uses this training repository's history.
Require a recommendation linked to an actual correction, or an honest
insufficient-history result. Cancel before application and check Git status.
Do not accept an unrelated session anecdote or an unreviewed instruction update.
