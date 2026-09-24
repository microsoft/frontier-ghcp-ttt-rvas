# Implementation Plan: Archive tasks

## Summary

Add an `archived` Boolean to each in-memory task. Add `archive_task(task_id)`,
`restore_task(task_id)`, and an `include_archived` option to `list_tasks`.

## Technical context

- **Language:** Python 3.10 or later
- **Dependencies:** Python standard library only
- **Storage:** Existing in-memory dictionary
- **Testing:** `unittest`
- **Files:** `src/task_store.py`, `tests/test_task_store.py`

## Constitution check

- Existing create and list tests stay in the suite.
- Requirements remain in `spec.md`; this file owns the implementation choice.
- No package is added.
- Every acceptance scenario has a planned unit test.

## Design

New tasks start with `archived=False`. Archive and restore use one private lookup
helper that raises `TaskNotFoundError` when the ID is absent. `archive_task` sets
the state to `True`; `restore_task` sets it to `False`. Both return a copy.
`list_tasks` excludes archived records unless `include_archived=True`.
