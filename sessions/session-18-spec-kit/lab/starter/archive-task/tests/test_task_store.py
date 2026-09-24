import unittest

from src.task_store import TaskStore


class TaskStoreTests(unittest.TestCase):
    def test_create_task_assigns_id_and_preserves_title(self):
        store = TaskStore()

        task = store.create_task("Write specification")

        self.assertEqual(
            {"id": 1, "title": "Write specification"},
            task,
        )

    def test_list_tasks_returns_created_tasks(self):
        store = TaskStore()
        first = store.create_task("Write specification")
        second = store.create_task("Review plan")

        self.assertEqual([first, second], store.list_tasks())


if __name__ == "__main__":
    unittest.main()
