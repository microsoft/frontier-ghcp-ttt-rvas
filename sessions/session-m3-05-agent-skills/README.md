# Session M3-05: Agent Skills

**Module:** Agentic Workflows
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04, M3-04
**Duration:** 3 hours (1 hour trainer content + 2 hour lab)

## Overview

A **skill** is a folder with a `SKILL.md` file that teaches Copilot one repeatable workflow. Copilot loads it only when your request matches its description.

You learn what skills are and how they differ from instructions, prompt files, custom agents, and MCP servers. Then you write one with `skill-creator`, create evals, and run them live in Copilot CLI. You revise the skill to write technical outcomes rather than PR changes, rerun the evals, and compare both versions with `baseline.md`.

## Learning outcomes

- Explain what a skill is, where it lives, and when Copilot loads it.
- Choose between a skill, instructions, a prompt file, a custom agent, and an MCP server.
- Use `skill-creator` to interview, draft, and revise a skill.
- Build an interview skill (`grill-me`) that pressure-tests a plan.
- Compare skills with custom agents and MCP servers, and pick the right one.
- Write a description that triggers when it should and stays quiet when it shouldn't.
- Test a skill live with a matching, a non-matching, and an ambiguous prompt.
- Create saved eval cases, score two iterations, and check that missing metadata prompts a question.
- Revise a skill toward outcome-focused output and compare it with the no-skill baseline and first skill version.
- Judge a skill from someone else before you install it.

## You need

The standalone Copilot CLI from Session M2-01 with skills support, and Git.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter project | [`lab/starter/release-notes-project/`](lab/starter/release-notes-project/) |
| Reference skill | [`lab/solution/release-notes/SKILL.md`](lab/solution/release-notes/SKILL.md) |
| Reference evals | [`lab/solution/release-notes/evals/evals.json`](lab/solution/release-notes/evals/evals.json) |
| Expected output | [`lab/solution/expected-output.md`](lab/solution/expected-output.md) |

## Key topics

- Skill anatomy: `SKILL.md`, frontmatter, scripts, references
- Where skills load from: project and personal locations
- Skills vs instructions, prompt files, custom agents, and MCP
- Writing the description, the body, and bundled files
- `skill-creator`: interview, draft, create evals, run, score, revise
- Pros, cons, and tips
- Trusting third-party skills
