---
description: "Overview of the HVE Core RPI, customization, and product delivery challenge"
---

# Session 28: HVE Core: Evidence-Led Delivery with RPI

**Module:** Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07 and 11, or equivalent Copilot and custom-agent experience

**Duration:** 4 hours (1 hour trainer content, 3 hours lab)

## Overview

This session teaches Hypervelocity Engineering (HVE) as a structured engineering
framework for GitHub Copilot. Learners use its file-based Research, Plan,
Implement, Review (RPI) workflow, then extend that workflow with repository
instructions, targeted coding standards, and a custom review agent.

The challenge then moves upstream. Product Manager Advisor tests the value and
scope of an Engineering Decision API feature. Agile Coach turns the result into
an outcome-oriented story with acceptance criteria. Those artifacts feed back into
the HVE plan before implementation and review.

## Learning outcomes

* Explain HVE's agents, prompts, instructions, and file-as-interface model.
* Run direct HVE Research, Plan, Implement, and Review phases and inspect each
  `.copilot-tracking/` handoff.
* Compare direct RPI phase prompts with the combined `/rpi` orchestrator and its
  Follow-up phase.
* Add project context, targeted JavaScript/API standards, and a bounded custom agent.
* Use Product Manager Advisor and Agile Coach to refine value, scope, user story,
  and acceptance criteria.
* Deliver and review one containerized API slice through the customized HVE workflow.

## Delivery boundary

HVE Core is required for the hands-on challenge. Confirm that the approved HVE
Core extension or Copilot CLI plugin exposes the RPI prompts, agents, and
customizations before the lab starts. Record the tested HVE version or channel in
the evidence workbook.
If HVE cannot run, learners may inspect trainer-provided HVE artifacts and observe
the workflow, but that route does not count as challenge completion.

Use synthetic records in an approved sandbox. Package downloads must use an
approved environment. When local downloads are restricted, use existing
dependencies and a trainer-managed remote container build.

Keep `.copilot-tracking/` local and ignored by Git. Learners inspect those files
during the workflow, then record the required evidence in the workbook.

## HVE version and references

This session was last checked against HVE Core documentation on **September 24,
2026**. HVE commands and generated artifacts can change between versions.

- [HVE Core repository and framework overview](https://github.com/microsoft/hve-core)
- [Install HVE Core](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
- [RPI workflow overview](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
- [RPI commands](https://github.com/microsoft/hve-core/blob/main/docs/rpi/commands.md)
- [Why RPI works](https://github.com/microsoft/hve-core/blob/main/docs/rpi/why-rpi.md)

## Materials

| Resource | Location |
|----------|----------|
| Trainer guide | [`trainer-content/`](trainer-content/) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/`](lab/) |
| Starter brief and project | [`lab/starter/`](lab/starter/) |
| Trainer reference solution | [`lab/solution/`](lab/solution/) |
| HVE artifact reference | [`lab/solution/hve-artifacts.md`](lab/solution/hve-artifacts.md) |
