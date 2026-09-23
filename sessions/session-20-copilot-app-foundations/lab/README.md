# Session 20 Lab: Build a Copilot Working Brief

**Duration:** 2 hours  
**Difficulty:** Beginner

## Objective

Use the GitHub Copilot app to understand one initiative, inspect the available capabilities, and create a reviewed Markdown working brief.

## Required preflight

**Access policy:** GitHub Copilot app access and repository project access are required.

1. Sign in to the GitHub Copilot app.
2. Open the training repository as a project.
3. Start a chat and confirm that Copilot can read `starter/initiative-overview.md`.
4. Open **Customize** and note which skills, agents, MCP servers, and canvases are available.
5. Use only the supplied fictional data or approved, sanitized work.

> [!IMPORTANT]
> **Stop if required access is missing.** Resolve the GitHub Copilot app or repository project access before continuing. Do not complete the lab in a generic chatbot.

## Time plan

| Phase | Work | Time |
| --- | --- | --- |
| 1 | Orient to the app and repository | 20 min |
| 2 | Ask grounded questions | 30 min |
| 3 | Create the working brief | 35 min |
| 4 | Review and verify the artifact | 25 min |
| 5 | Peer review | 10 min |

## Phase 1: orient to the app and repository

Find the current app areas for Chats, Projects, My work, Search, Automations, and Customize. Record the available Customize items in the working brief.

Open `starter/initiative-overview.md`. Ask Copilot:

```text
Use only the supplied initiative overview. Explain the product, affected users,
requested outcome, known constraints, and next decision for a product owner.
Cite the section that supports each factual claim. Mark missing information as
unknown.
```

Check every claim against the file.

## Phase 2: ask grounded questions

Run at least three follow-up prompts:

1. Ask which facts are directly supported.
2. Ask which questions the request owner must answer.
3. Ask which GitHub artifact should hold the next stage of work.

Then ask Copilot to explain the same initiative for a delivery lead. Compare the two answers. Keep the answer that best supports the next decision.

## Phase 3: create the working brief

Copy `starter/copilot-working-brief-template.md` into your working folder or repository branch.

Ask Copilot to complete it from the approved conversation. The brief must contain:

- initiative purpose;
- affected users;
- known facts with sources;
- assumptions and unknowns;
- useful repository artifacts;
- available Copilot capabilities;
- the next decision;
- owner and reviewer.

## Phase 4: review and verify

Review the proposed Markdown change before accepting it.

Reject or revise any statement that:

- lacks a source;
- turns an unknown into a fact;
- invents an owner;
- recommends a write action without review;
- includes restricted information.

Ask Copilot to read the saved brief and report its path, owner, open questions, and next decision. Compare the answer with the file.

## Phase 5: peer review

A peer records **Ready** or **Revise**.

The brief is ready when another learner can identify the initiative, find the source for each fact, and understand the next decision without reading the chat history.

## Deliverable

Submit one reviewed Copilot working brief created through the GitHub Copilot app.

## Completion checklist

- [ ] The app and repository preflight passed.
- [ ] The learner found the main app areas.
- [ ] Available Customize capabilities are recorded.
- [ ] Every factual claim names its source.
- [ ] Unknowns remain visible.
- [ ] The Markdown change was reviewed before acceptance.
- [ ] The brief names the next decision, owner, and reviewer.
- [ ] No customer or source organization names appear.

## Optional technical-evidence exercise

Use [`optional-technical-evidence/`](optional-technical-evidence/) after the main lab when the audience needs practice questioning pull request and validation evidence.
