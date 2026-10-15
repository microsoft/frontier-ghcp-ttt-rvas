# Quickstart: Verify archive behavior

Run the full suite from the project root:

```bash
python -m unittest discover -s tests -v
```

Expected result: nine passing tests.

The suite covers task creation, the existing list behavior, archive state, archived
list inclusion, repeated archive and restore requests, restored-list behavior, and
unknown IDs.
