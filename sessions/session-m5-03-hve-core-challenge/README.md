---
description: "Overview of the HVE Core RPI, customization, and product delivery challenge"
---

# Session M5-03: HVE Core: Evidence-led delivery with RPI

**Module:** Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04 and M3-04, or equivalent Copilot and custom-agent experience

**Duration:** 4 hours (1 hour trainer content, 3 hours lab)

## Overview

Use Hypervelocity Engineering (HVE), a structured engineering framework for
GitHub Copilot, to take a feature from research to reviewed code. You start with
its file-based Research, Plan, Implement, Review (RPI) workflow. Then you add
repository instructions, targeted coding standards, and a custom review agent.

Product Manager Advisor tests the value and scope of an Engineering Decision API
feature. Agile Coach turns the result into an outcome-oriented story with
acceptance criteria. You feed those artifacts back into the HVE plan before
implementation and review.

## Learning outcomes

* Explain HVE's agents, prompts, instructions, and file-as-interface model.
* Run direct HVE Research, Plan, Implement, and Review phases and inspect each
  `.copilot-tracking/` handoff.
* Compare direct RPI phase prompts with the combined `/rpi` orchestrator and its
  Follow-up phase.
* Add project context, targeted JavaScript/API standards, and a custom agent with a defined scope.
* Use Product Manager Advisor and Agile Coach to refine value, scope, user story,
  and acceptance criteria.
* Deliver and review one containerized API slice through the customized HVE workflow.

## HVE Core requirement

The hands-on challenge requires HVE Core (the extension or Copilot CLI plugin).
Without it, learners can inspect trainer-provided artifacts but can't complete the
challenge. Keep `.copilot-tracking/` local and ignored by Git. The challenge
handoff lists the four phase artifacts, the final decision, unresolved risks, and
the next action.

## HVE references

HVE commands and generated artifacts change between versions.

* [HVE Core repository and framework overview](https://github.com/microsoft/hve-core)
* [Install HVE Core](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
* [RPI workflow overview](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
* [RPI commands](https://github.com/microsoft/hve-core/blob/main/docs/rpi/commands.md)
* [Why RPI works](https://github.com/microsoft/hve-core/blob/main/docs/rpi/why-rpi.md)

## Materials

| Resource | Location |
|----------|----------|
| Trainer guide | [`trainer-content/`](trainer-content/) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/`](lab/) |
| Starter brief and project | [`lab/starter/`](lab/starter/) |
| Trainer reference solution | [`lab/solution/`](lab/solution/) |
| HVE artifact reference | [`lab/solution/hve-artifacts.md`](lab/solution/hve-artifacts.md) |
