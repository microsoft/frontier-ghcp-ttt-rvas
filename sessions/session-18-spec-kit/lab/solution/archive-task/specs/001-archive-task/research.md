# Research: Archive tasks

## Decision 1: Store archive state on the task

**Decision:** Add an `archived` Boolean to each task.

**Reason:** The feature needs reversible visibility state without deleting the task
record. A Boolean is enough for the accepted scope.

**Rejected option:** Move archived tasks to a second collection. That would add
coordination logic without improving the in-memory training project.

## Decision 2: Make repeated archive requests idempotent

**Decision:** Return the same archived task when archive is called again.

**Reason:** The source request requires repeat safety and no duplicate record.

## Decision 3: Keep the existing list call compatible

**Decision:** Add `include_archived=False` to `list_tasks`.

**Reason:** Existing callers keep the active-only behavior. Callers must opt in to
archived records.

## Decision 4: Evolve the living specification for restore

**Decision:** Add restore behavior to the existing feature artifacts.

**Reason:** Restore changes the accepted behavior of the same task state model. The
specification, plan, tasks, implementation, and tests must evolve together.

## Decision 5: Share task lookup behavior

**Decision:** Use one private lookup helper for archive and restore.

**Reason:** Both operations require the same not-found result. One helper keeps
that behavior consistent without changing the public interface.
