# Session M2-06: Repair and refactor a broken Python application

**Module:** Module 2: Copilot in Practice

**Difficulty:** Intermediate

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Duration:** 3 hours (1 hour trainer content + 2 hour lab)

## Overview

Repair a small inventory-reconciliation application that doesn't parse, doesn't
start, and gives the wrong answer once the startup faults are fixed. Use
GitHub Copilot as a debugging partner. Keep each change small and tested.

Restore parsing first, then imports and expected behavior. Add regression tests
before you refactor. The reference solution separates file parsing, reconciliation
rules, reporting, and the command-line entry point.

## Learning outcomes

- reduce a broken Python program to the first actionable failure;
- repair syntax and import faults without unrelated changes;
- use fixtures and expected outputs as a behavioral contract;
- add regression tests before changing structure;
- remove duplicated rules and global state;
- use Python LSP references to find a rule's callers, and tell them apart from duplicated inline rules;
- approve a CLI `/plan` before structural changes.

## Session structure

| Block | Duration | Material |
| --- | ---: | --- |
| Trainer content | 1 hour | [Slides](slides.md) and [trainer guide](trainer-content/README.md) |
| Lab | 2 hours | [Repair and refactor lab](lab/README.md) |

## Scenario

The synthetic application compares warehouse counts with ledger counts. It
normalizes SKU values, aggregates duplicate rows, calculates variances, assigns a
status and severity, then writes text and JSON reports.

The starter fails in this order:

1. named syntax errors;
2. import and startup failures;
3. deterministic logic defects;
4. duplicated business rules;
5. process-wide mutable state;
6. tangled reconciliation and reporting code.

The supplied fixtures and expected outputs define the intended result.

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Marp slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Broken application | [`lab/starter/`](lab/starter/) |
| Tested reference solution | [`lab/solution/`](lab/solution/) |

## Environment

Use the repository Dev Container or GitHub Codespaces. For a native setup, use
Python 3.11 or later, create a virtual environment, and install the pinned
development requirements from the lab directory. You also need GitHub Copilot, the
standalone Copilot CLI, and `pyright-langserver`. Run `/lsp test python` before
the lab. The LSP exercise runs after the parsing and behavior checks pass.

## Trainer note

Don't reveal the source-level fixes at the start. Reveal the failure names and
the repair order.
