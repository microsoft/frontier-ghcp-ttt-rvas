# Session 15: CI/CD Debugging & Agentic Remediation

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Advanced
**Prerequisites:** Sessions 01–05 and 13
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Debug CI/CD failures with workflow files, failed-step output, and local proof.
Learners must record an observation and hypothesis before opening a reference fix.
One case has a second failure that appears only after the first repair.

The security exercise uses a deliberately vulnerable training app. Learners review
the smallest patch through an approved route or work locally.

## Learning outcomes

- Separate observations, hypotheses, repairs, and proof.
- Reproduce relevant pipeline commands locally.
- Handle a second-stage failure without stacking speculative fixes.
- Review a security patch for scope and focused protection.
- Keep remediation behind human approval.

## Required access

Learners need **GitHub Copilot and Node.js 20.x**. Repository Actions, code
scanning, and remote remediation routes are optional. The required path uses the
supplied files and local commands.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Pipeline application | [`lab/starter/pipeline-app/`](lab/starter/pipeline-app/) |
| Failure cases | [`lab/starter/failing-pipelines/`](lab/starter/failing-pipelines/) |
| Reference fixes | [`lab/solution/fixed-pipelines/`](lab/solution/fixed-pipelines/) |
