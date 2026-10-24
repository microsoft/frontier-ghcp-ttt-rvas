# Session M4-03: CI/CD debugging & agentic remediation

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-02 and M4-01
**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

You will debug CI/CD failures using workflow files, failed-step output, and local checks.
Record an observation and hypothesis before opening a reference fix.
One case has a second failure that appears only after the first repair.

The security exercise uses a deliberately vulnerable training app. Review
the smallest patch through a route you have approval to use, or work locally.

## Learning outcomes

- Separate observations, hypotheses, repairs, and proof.
- Reproduce relevant pipeline commands locally.
- Handle a second-stage failure without stacking speculative fixes.
- Review a security patch for scope and focused protection.
- Keep remediation behind human approval.

## Required access

You need **GitHub Copilot and Node.js 20.x**. Repository Actions, code
scanning, and remote remediation are optional. Complete the lab with the supplied
files and local commands.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Pipeline application | [`lab/starter/pipeline-app/`](lab/starter/pipeline-app/) |
| Failure cases | [`lab/starter/failing-pipelines/`](lab/starter/failing-pipelines/) |
| Reference fixes | [`lab/solution/fixed-pipelines/`](lab/solution/fixed-pipelines/) |
