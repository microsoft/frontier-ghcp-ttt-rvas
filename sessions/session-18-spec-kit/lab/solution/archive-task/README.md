# Archive Task Reference Result

This directory shows one valid result after the archive feature converged and the
living specification added restore behavior. Spec Kit output can vary with the
approved release and accepted clarifications. Compare behavior and traceability,
not wording.

Run the reference tests:

```bash
python -m unittest discover -s tests -v
```

The meaningful Spec Kit artifacts are:

- `.specify/memory/constitution.md`;
- `specs/001-archive-task/spec.md`;
- `specs/001-archive-task/plan.md`;
- `specs/001-archive-task/research.md`;
- `specs/001-archive-task/data-model.md`;
- `specs/001-archive-task/quickstart.md`;
- `specs/001-archive-task/checklists/requirements.md`;
- `specs/001-archive-task/tasks.md`.

Release-specific scripts, templates, and Copilot integration skills are omitted
from this reference. Learners generate those files with their approved Spec Kit
release.

`review.md` is a training review record, not a generated Spec Kit configuration
file.
