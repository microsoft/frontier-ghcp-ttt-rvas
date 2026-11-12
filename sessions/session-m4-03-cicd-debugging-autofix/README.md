# Session M4-03: CI/CD debugging & agentic remediation

**Module:** DevOps & Infrastructure with Copilot
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-02, M4-01
**Duration:** 3 hours (1 hour trainer content + 2 hour lab)

## Overview

A failed pipeline is a puzzle with a log attached. Copilot can read the log and suggest a cause. It can be wrong. You treat its answer as a **hypothesis** and prove it with a rerun.

In the lab you push a small sample repo to a throwaway GitHub repository. It holds three broken workflows. You watch them fail in real GitHub Actions, diagnose each with Copilot, fix, push, and rerun until they pass. You also fix two code scanning alerts and review the patches.

You learn what is a real Copilot feature here and what is just a good habit. The session names the features exactly: **Explain error**, the **Copilot CLI**, the **Copilot cloud agent**, and **Copilot Autofix** for code scanning.

## Learning outcomes

- Name the parts of a pipeline: trigger, job, step, runner, context, secret, and artifact.
- Recognize five failure classes: dependency, environment or secret or permission, flaky test, matrix, and cache.
- Read a real failed run with `gh run view --log-failed`.
- Use Copilot (CLI, Explain error, cloud agent) to propose a cause, then prove or reject it with a rerun.
- Handle a second failure that appears only after the first fix.
- Say which "agentic" remediation features exist and what each one does.
- Review a security patch for scope and for behavior it might break.

## You need

- GitHub Copilot in the Copilot CLI (Session M2-01), the GitHub CLI (`gh`) signed in, Git, and Node.js 20 or later.
- A personal GitHub account that can create repositories and run Actions. A **public** throwaway repo is easiest, because Copilot Autofix is free for public repositories.
- A paid Copilot plan for the cloud agent step. Part 3 has a CLI path if you don't have one.

Use only the synthetic sample repo. Delete the throwaway repo when you finish.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Sample repo with broken workflows | [`lab/starter/ci-lab-repo/`](lab/starter/ci-lab-repo/) |
| Fixed workflows | [`lab/solution/fixed-workflows/`](lab/solution/fixed-workflows/) |
| Fixed server and its test | [`lab/solution/secure-src/`](lab/solution/secure-src/) |
| Generated lockfile | [`lab/solution/package-lock.json`](lab/solution/package-lock.json) |

## Key topics

- Pipeline anatomy: trigger, job, step, runner, context, secret, artifact
- Failure classes and how each looks in a log
- `gh run list`, `gh run view --log-failed`, `gh run rerun --failed`
- Explain error, Copilot CLI, and cloud agent for diagnosis
- A diagnosis is a hypothesis: prove it with a rerun
- Autofix, agentic autofix, and the cloud agent: what each one is
- Reviewing a security patch
- Pros, cons, tips, and common mistakes
