# Course Correction: Preserve Storage Boundaries

The repository refactor now has two extra constraints:

1. Route handlers must not read or mutate the in-memory array directly.
2. The repository module must return copies so callers cannot mutate stored todos by reference.

Keep the public HTTP contract unchanged. Add focused tests for the repository boundary and rerun the API tests.

Do not add a database, ORM, cache, or new package.
