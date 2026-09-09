# Session 18 — Spec Kit: Enterprise Specification-Driven Development

**Module:** Advanced Topics & Capstone

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17
**Duration:** 3 hours (1 hour trainer content, 2 hours lab)

## Overview

Specification-driven delivery lets teams review intent before implementation. Spec Kit is an optional pre-1.0 example that turns a bounded request into a constitution, specification, clarification record, plan, checklist, tasks, analysis, implementation, and convergence review.

Use only the customer-approved package source and pinned version.

## Learning outcomes

- Turn a request into a specification ready for implementation.
- Follow the sequence from constitution through convergence.
- Store shared guidance in `.github/skills/`.
- Apply Session 17 decisions for access, data, metering, and fallback.

## Delivery preflight

- Confirm Enterprise Cloud access, repository permissions, and enabled policies.
- Confirm the approved Spec Kit version, source, and network path.
- Use synthetic requirements in a training repository.
- Set a stop guard and prepare a manual-artifact fallback.

## Initialization pattern

```bash
uv tool install specify-cli
specify init <project> --integration copilot --integration-options="--skills"
```

Replace the install command with the customer-approved pinned reference. Do not treat the version or generated layout as a stable contract.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/`](trainer-content/) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/`](lab/) |
