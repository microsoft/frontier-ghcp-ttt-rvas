# Session 20 Trainer Guide: Work Effectively in the GitHub Copilot App

**Duration:** 1 hour  
**Audience:** Product managers, product owners, business analysts, project managers, and delivery leads

## Delivery objective

Learners should leave able to open the GitHub Copilot app, choose useful context,
compare grounded and ungrounded answers, revise a durable work artifact when
evidence changes, and verify it in a fresh session.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:08 | Orient learners to the app |
| 0:08-0:18 | Choose the right context |
| 0:18-0:28 | Inspect available capabilities |
| 0:28-0:40 | Compare unscoped and grounded answers |
| 0:40-0:53 | Create, revise, and verify a working brief |
| 0:53-1:00 | Explain boundaries and launch the lab |

## Required preflight

- Confirm that every learner can open the GitHub Copilot app.
- Confirm that the learner can start a chat and open the training repository as a project.
- Check that the learner can see the current app navigation and the available Customize items.
- Open the starter initiative and reference brief.
- Use only the fictional scenario during the demonstration.

> [!IMPORTANT]
> Stop if the app, repository, or required policy access is unavailable. A generic chatbot does not meet this session's goal.

## Teach the app as a work environment

Show the current locations for:

- **Chats:** exploratory work and interviews;
- **Projects:** repository-grounded work;
- **My work:** issues, pull requests, and active agent sessions;
- **Search:** finding repository information;
- **Automations:** recurring or on-demand tasks;
- **Customize:** skills, agents, MCP servers, plugins, and canvases.

Labels can move. Teach what each area is for rather than a fixed click path.

## Context before prompting

Use a simple rule:

> Give Copilot the smallest approved context that can answer the question.

Demonstrate the difference between:

```text
Explain this project.
```

and:

```text
Use the repository overview and the open initiative notes. Explain the product,
the affected users, the current decision, and the missing information for a
product owner. Cite the source for each factual claim.
```

Ask learners to identify which sources Copilot used and which statements remain uncertain.

## Capability inspection

Open **Customize** and identify what is available in the learner's environment. Explain:

- a **skill** provides a repeatable procedure;
- an **agent** carries role-specific instructions and tools;
- an **MCP server** lets Copilot read or act in another system;
- a **canvas** provides visible shared state;
- an **automation** repeats a bounded task.

Do not teach construction in this session. Learners only need to recognize these capabilities and know that availability depends on plan, policy, and installation.

## Demo: create and revise a durable brief

1. Ask for an initiative summary without attaching the source.
2. Mark unsupported statements.
3. Attach `lab/starter/initiative-overview.md` and ask again with source
   references.
4. Ask Copilot to complete `copilot-working-brief-template.md`.
5. Review and commit the brief.
6. Reveal `lab/starter/late-evidence.md`.
7. Ask Copilot for a focused update and review the diff.
8. Start a fresh session with only the saved brief and verify that it can recover
   the intended state.

Stress the pattern:

```text
Read -> propose -> review -> write -> verify
```

The pattern returns in every later session.

## Product notes verified September 24, 2026

Before delivery, verify the current GitHub Copilot app navigation, plan requirements, policy controls, and availability of Customize features.

Official references:

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Quickstart for the GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
- [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-copilot)
- [Working with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
