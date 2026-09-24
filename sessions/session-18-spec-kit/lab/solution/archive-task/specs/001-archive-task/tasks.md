# Tasks: Archive tasks

## Phase 1: Archive state

- [x] T001 [US1] Add the `archived` field to new tasks in `src/task_store.py`.
- [x] T002 [US1] Add `archive_task(task_id)` to `src/task_store.py`.
- [x] T003 [US1] Add default and archived-inclusive filtering to
  `list_tasks` in `src/task_store.py`.

## Phase 2: Archive tests

- [x] T004 [US1] Test archive state, title preservation, and default filtering in
  `tests/test_task_store.py`.
- [x] T005 [US1] Test `include_archived=True` in `tests/test_task_store.py`.
- [x] T006 [US2] Test repeated archive requests in `tests/test_task_store.py`.
- [x] T007 [US2] Test `TaskNotFoundError` for an unknown ID in
  `tests/test_task_store.py`.

## Phase 3: Verification

- [x] T008 Run `python -m unittest discover -s tests -v`.
- [x] T009 Confirm FR-001 through FR-007 map to passing tests.

## Phase 4: Living-spec restore change

- [x] T010 [US3] Add `restore_task(task_id)` to `src/task_store.py`.
- [x] T011 [US3] Share not-found lookup behavior between archive and restore in
  `src/task_store.py`.
- [x] T012 [US3] Test restore state, title preservation, and default-list return in
  `tests/test_task_store.py`.
- [x] T013 [US3] Test repeated restore requests in `tests/test_task_store.py`.
- [x] T014 [US3] Test `TaskNotFoundError` for restore in
  `tests/test_task_store.py`.

## Phase 5: Final convergence

- [x] T015 Run `python -m unittest discover -s tests -v`.
- [x] T016 Confirm FR-001 through FR-010 map to passing tests.
