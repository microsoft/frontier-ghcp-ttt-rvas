class TaskNotFoundError(KeyError):
    pass


class TaskStore:
    def __init__(self):
        self._tasks = {}
        self._next_id = 1

    def create_task(self, title):
        if not title or not title.strip():
            raise ValueError("title must not be empty")

        task = {"id": self._next_id, "title": title.strip()}
        self._tasks[task["id"]] = task
        self._next_id += 1
        return task.copy()

    def list_tasks(self):
        return [task.copy() for task in self._tasks.values()]
