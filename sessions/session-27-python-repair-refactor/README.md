# Session 27: Repair and Refactor a Broken Python Application

**Module:** Module 2: Copilot in Practice

**Difficulty:** Intermediate

**Prerequisites:** Sessions 01-07

**Duration:** 3 hours (1 hour trainer content + 2 hour lab)

## Overview

Repair a small inventory-reconciliation application that does not parse, does not
start, and produces the wrong answer after its startup faults are fixed. Use
GitHub Copilot as a debugging partner while keeping each change small, testable,
and recorded.

Follow the order used in repair work: restore parsing, restore imports, recover
expected behavior, add regression tests, then refactor. The reference solution
separates file parsing, reconciliation rules, reporting, and the command-line
entry point.

> [!IMPORTANT]
> GitHub Copilot access is required for the guided workflow. If a learner cannot
> access Copilot in the approved development environment, stop. Do not continue
> until access is restored.

## Learning outcomes

Learners practice how to:

- reduce a broken Python program to the first actionable failure;
- repair syntax and import faults without mixing in unrelated changes;
- use fixtures and expected outputs as a behavioral contract;
- add regression tests before changing structure;
- remove duplicated rules and global state;
- replace tangled control flow with small, named functions;
- prove that a refactor preserved behavior.

## Session structure

| Block | Duration | Material |
| --- | ---: | --- |
| Trainer content | 1 hour | [Slides](slides.md) and [trainer guide](trainer-content/README.md) |
| Lab | 2 hours | [Repair and refactor lab](lab/README.md) |

## Scenario

The synthetic application compares warehouse counts with ledger counts. It
normalizes SKU values, aggregates duplicate rows, calculates variances, assigns a
status and severity, then writes text and JSON reports.

The starter contains a controlled failure sequence:

1. named syntax errors;
2. import and startup failures;
3. deterministic logic defects;
4. duplicated business rules;
5. process-wide mutable state;
6. tangled reconciliation and reporting code.

The supplied fixtures and expected outputs define the intended result. Learners do
not need external systems or private data.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Marp slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Broken application | [`lab/starter/`](lab/starter/) |
| Tested reference solution | [`lab/solution/`](lab/solution/) |

## Environment

Use the repository Dev Container or GitHub Codespaces. It provides the most
predictable Python and editor setup.

For a native setup, use Python 3.11 or later, create a virtual environment, and
install the pinned development requirements from the selected lab directory.

## Trainer note

Do not reveal the source-level fixes at the start. Reveal the failure names and
the expected repair order. The useful habit is **one failure, one hypothesis, one
small change, one check**.
