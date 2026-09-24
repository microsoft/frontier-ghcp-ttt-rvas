# Convergence Review

| Requirement | Evidence |
| --- | --- |
| FR-001, FR-002 | `test_archive_hides_task_from_default_list` |
| FR-003 | `test_archive_is_idempotent` |
| FR-004 | `test_archive_hides_task_from_default_list` |
| FR-005 | `test_list_can_include_archived_tasks` |
| FR-006 | `test_archive_unknown_task_raises_not_found` |
| FR-007 | Existing create and list tests remain in the suite |
| FR-008, FR-010 | `test_restore_returns_task_to_default_list` |
| FR-009 | `test_restore_returns_task_to_default_list`, `test_restore_is_idempotent` |
| Restore not found | `test_restore_unknown_task_raises_not_found` |

All nine tests pass. The implementation adds no package and no out-of-scope
behavior. No remaining task was found during the reference review.
