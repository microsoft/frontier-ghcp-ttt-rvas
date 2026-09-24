---
description: "Overview of the governed HVE Engineering Decision API challenge"
---

# Session 20: HVE Challenge: Governed Specification-to-Delivery

**Module:** Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–12 and 17–18, or an approved equivalent baseline

**Duration:** 3 hours (1 hour trainer content, 2 hours lab)

## Overview

This optional specialization asks learners to deliver one small API feature from
a fixed contract. The work is judged by its evidence: bounded research, a file-level
plan, tested behavior, a production container, review findings, and a local Git
handoff.

The application is an Engineering Decision API. The starter already has a passing
health check. Learners add `POST /api/decisions`; they do not build another Bookmark
API or a complete service.

## Learning outcomes

* Turn acceptance criteria into a short research-plan-implement-review record.
* Use repository and targeted instructions without letting them expand scope.
* Prove API validation, conflict handling, generated metadata, and stable errors.
* Package tested source and production dependencies in a non-root container.
* Record input and data-boundary risks before a human review decision.
* Prepare commit and pull-request text without changing remote state.

## Delivery boundary

Use synthetic records in a local sandbox. HVE Core is optional. Learners with an
approved installation may use its current RPI workflow; everyone else writes the
same artifacts manually. A prepared-patch route is available when local execution
is blocked. Package downloads must use an approved environment. When local downloads
are restricted, use the prepared-patch route or an approved remote container build.

The lab was independently rewritten from workflow facts observed at HVE showcase
commit `598ba5fbc937abf0dce622b97bcafda63bbc2dd1`. It does not copy source prose,
prompts, samples, or templates.

## Materials

| Resource | Location |
|----------|----------|
| Trainer guide | [`trainer-content/`](trainer-content/) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/`](lab/) |
| Starter brief and project | [`lab/starter/`](lab/starter/) |
| Trainer reference solution | [`lab/solution/`](lab/solution/) |
