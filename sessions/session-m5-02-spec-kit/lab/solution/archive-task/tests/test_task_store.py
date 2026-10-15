import unittest

from src.task_store import TaskNotFoundError, TaskStore


class TaskStoreTests(unittest.TestCase):
    def test_create_task_assigns_id_and_preserves_title(self):
        store = TaskStore()

        task = store.create_task("Write specification")

        self.assertEqual(
            {"id": 1, "title": "Write specification", "archived": False},
            task,
        )

    def test_list_tasks_returns_created_tasks(self):
        store = TaskStore()
        first = store.create_task("Write specification")
        second = store.create_task("Review plan")

        self.assertEqual([first, second], store.list_tasks())

    def test_archive_hides_task_from_default_list(self):
        store = TaskStore()
        task = store.create_task("Write specification")

        archived = store.archive_task(task["id"])

        self.assertTrue(archived["archived"])
        self.assertEqual("Write specification", archived["title"])
        self.assertEqual([], store.list_tasks())

    def test_list_can_include_archived_tasks(self):
        store = TaskStore()
        task = store.create_task("Write specification")
        store.archive_task(task["id"])

        self.assertEqual(
            [
                {
                    "id": task["id"],
                    "title": "Write specification",
                    "archived": True,
                }
            ],
            store.list_tasks(include_archived=True),
        )

    def test_archive_is_idempotent(self):
        store = TaskStore()
        task = store.create_task("Write specification")

        first = store.archive_task(task["id"])
        second = store.archive_task(task["id"])

        self.assertEqual(first, second)
        self.assertEqual(1, len(store.list_tasks(include_archived=True)))

    def test_archive_unknown_task_raises_not_found(self):
        store = TaskStore()

        with self.assertRaises(TaskNotFoundError):
            store.archive_task(404)

    def test_restore_returns_task_to_default_list(self):
        store = TaskStore()
        task = store.create_task("Write specification")
        store.archive_task(task["id"])

        restored = store.restore_task(task["id"])

        self.assertFalse(restored["archived"])
        self.assertEqual(task["id"], restored["id"])
        self.assertEqual(task["title"], restored["title"])
        self.assertEqual([restored], store.list_tasks())

    def test_restore_is_idempotent(self):
        store = TaskStore()
        task = store.create_task("Write specification")

        first = store.restore_task(task["id"])
        second = store.restore_task(task["id"])

        self.assertEqual(first, second)
        self.assertEqual(1, len(store.list_tasks()))

    def test_restore_unknown_task_raises_not_found(self):
        store = TaskStore()

        with self.assertRaises(TaskNotFoundError):
            store.restore_task(404)


if __name__ == "__main__":
    unittest.main()
