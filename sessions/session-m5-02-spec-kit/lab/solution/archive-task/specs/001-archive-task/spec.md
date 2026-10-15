# Feature Specification: Archive tasks

## User Story 1 - Archive an active task (P1)

A user archives a completed task so it no longer appears in the normal working
list while its history remains available.

**Independent test:** Create one task, archive it, and verify that the default list
is empty while the archived-inclusive list still contains the task.

### Acceptance scenarios

1. **Given** an active task, **when** the caller archives its ID, **then** the task
   is marked archived and keeps the same ID and title.
2. **Given** an archived task, **when** the caller requests the default task list,
   **then** that task is omitted.
3. **Given** an archived task, **when** the caller lists tasks with archived tasks
   included, **then** the archived task is returned.

## User Story 2 - Handle repeated and invalid requests (P2)

A caller gets predictable results when an archive request is repeated or names a
task that does not exist.

**Independent test:** Archive the same task twice, then archive an unknown ID.

### Acceptance scenarios

1. **Given** an already archived task, **when** the caller archives it again,
   **then** the same archived task is returned and no duplicate is created.
2. **Given** an unknown task ID, **when** the caller archives it, **then** the store
   raises `TaskNotFoundError`.

## User Story 3 - Restore an archived task (P2)

A user restores an archived task so it returns to the normal working list.

**Independent test:** Archive one task, restore it, and verify that the default list
contains the task again.

### Acceptance scenarios

1. **Given** an archived task, **when** the caller restores its ID, **then** the task
   becomes active and keeps the same ID and title.
2. **Given** an active task, **when** the caller restores it, **then** the same
   active task is returned and no duplicate is created.
3. **Given** an unknown task ID, **when** the caller restores it, **then** the store
   raises `TaskNotFoundError`.

## Requirements

- **FR-001:** The store must archive a task by ID.
- **FR-002:** Archive must preserve the task ID and title.
- **FR-003:** Archive must be idempotent.
- **FR-004:** The default list must exclude archived tasks.
- **FR-005:** The list operation must support including archived tasks.
- **FR-006:** An unknown ID must raise `TaskNotFoundError`.
- **FR-007:** Existing create and list behavior must remain covered by tests.
- **FR-008:** The store must restore an archived task by ID.
- **FR-009:** Restore must preserve the task ID and title and be idempotent.
- **FR-010:** A restored task must appear in the default list.

## Out of scope

Deletion, persistence, due dates, owners, and API transport are excluded.
