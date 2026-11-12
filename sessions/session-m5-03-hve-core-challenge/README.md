---
description: "Overview of the HVE Core RPI challenge, with optional customization and product agents"
---

# Session M5-03: HVE Core: Evidence-led delivery with RPI

**Module:** Specification-Driven Frameworks

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04 and M3-04, or equivalent Copilot and custom-agent experience

**Duration:** 4 hours (1 hour trainer content, 3 hours lab)

## Overview

Use Hypervelocity Engineering (HVE), a structured engineering framework for
GitHub Copilot, to take a feature from research to reviewed code. You start with
its file-based Research, Plan, Implement, Review (RPI) workflow. Each phase writes
a file the next phase reads.

If time allows, you also add repository instructions, a coding standard, and a
custom review agent, and use Product Manager Advisor and Agile Coach to refine the
feature before implementation.

## Learning outcomes

* Explain RPI, HVE's agents, prompts, and instructions, and why phases hand off through files.
* Run direct HVE Research, Plan, Implement, and Review phases and read each
  `.copilot-tracking/` file.
* Compare direct phase prompts with the combined `/rpi` and its Follow-up step.
* Deliver and review one containerized API slice.
* Optional: add project context, an `applyTo` coding instruction, and a custom agent, and check that each is active.
* Optional: use Product Manager Advisor and Agile Coach to refine the story and criteria.

## HVE Core requirement

The hands-on challenge requires HVE Core (the extension or Copilot CLI plugin).
Without it, learners can read trainer-provided files but can't do the lab. Keep
`.copilot-tracking/` local and ignored by Git.

## HVE references

HVE commands and generated files change between versions. Check the HVE Core README for your version before you teach.

* [HVE Core repository and framework overview](https://github.com/microsoft/hve-core)
* [Install HVE Core](https://github.com/microsoft/hve-core/blob/main/docs/getting-started/install.md)
* [RPI workflow overview](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md)
* [Using RPI together](https://github.com/microsoft/hve-core/blob/main/docs/rpi/using-together.md)
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
