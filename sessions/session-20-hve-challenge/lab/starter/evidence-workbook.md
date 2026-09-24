---
description: "Learner workbook for governed research, planning, review, and handoff evidence"
---

# Challenge evidence workbook

## Delivery boundary

* Selected path:
* Human reviewer:
* Stop condition:
* Data boundary: synthetic decision records, local memory only
* Baseline command and result:
* Container validation path: local, approved remote build, prepared patch, or not run

## Research

List the files that control routing, validation, state, and tests. Record one
constraint from each file. Name anything you inspected but rejected as out of
scope.

## Plan

Map each acceptance criterion to a file change and a check. State the non-goals
again before implementation.

| Criterion | Planned file | Planned check |
|-----------|--------------|---------------|
|           |              |               |

## Changes

Record changed files, decisions made, commands run, and any criterion left open.
Separate offline container-contract checks from an actual image build.

## Review

Use `pass`, `fail`, `deferred`, or `not run` for every criterion. Cite a test,
response, or source line as evidence.

| Criterion | Result | Evidence |
|-----------|--------|----------|
|           |        |          |

## Risk note

Address empty or non-string input, malformed JSON, duplicate normalization,
untrusted error details, the base-image and dependency supply chain, and the limits
of process-local storage. Record one follow-up risk that is outside this challenge.

## Local Git handoff

Write a conventional commit-message preview and a pull-request summary. Do not
commit, push, merge, or open a remote pull request during the lab.

* Commit preview:
* Pull-request summary:
* Test evidence:
* Container build evidence:
* Review decision: approve, request changes, or pause
* Next action:
