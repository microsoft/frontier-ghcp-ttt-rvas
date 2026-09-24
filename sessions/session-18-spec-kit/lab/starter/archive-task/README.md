# Archive Task Starter

This small Python project stores tasks in memory. It already creates and lists
active tasks. The lab adds archive behavior through the Spec Kit workflow.

## Run the baseline

```bash
python -m unittest discover -s tests -v
```

Both tests should pass before you initialize Spec Kit.

## Files

- `feature-request.md` is the source request.
- `change-request.md` is opened only after the first convergence result.
- `src/task_store.py` is the existing implementation.
- `tests/test_task_store.py` protects existing behavior.
