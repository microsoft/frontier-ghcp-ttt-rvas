class TaskNotFoundError(KeyError):
    pass


class TaskStore:
    def __init__(self):
        self._tasks = {}
        self._next_id = 1

    def create_task(self, title):
        if not title or not title.strip():
            raise ValueError("title must not be empty")

        task = {
            "id": self._next_id,
            "title": title.strip(),
            "archived": False,
        }
        self._tasks[task["id"]] = task
        self._next_id += 1
        return task.copy()

    def archive_task(self, task_id):
        task = self._get_task(task_id)

        task["archived"] = True
        return task.copy()

    def restore_task(self, task_id):
        task = self._get_task(task_id)
        task["archived"] = False
        return task.copy()

    def list_tasks(self, include_archived=False):
        return [
            task.copy()
            for task in self._tasks.values()
            if include_archived or not task["archived"]
        ]

    def _get_task(self, task_id):
        try:
            return self._tasks[task_id]
        except KeyError as error:
            raise TaskNotFoundError(task_id) from error
