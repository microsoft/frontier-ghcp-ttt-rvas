# Session M7-01 trainer guide: Work effectively in the GitHub Copilot app

**Duration:** 1 hour  
**Audience:** Product managers, product owners, business analysts, project managers, and delivery leads

## Delivery objective

Show learners how to choose a session mode and attach approved source material in
the GitHub Copilot app. Compare answers with and without those sources before
creating the first Delivery Decision Studio brief.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:08 | Orient learners to the app |
| 0:08-0:18 | Choose mode and context |
| 0:18-0:28 | Inspect capabilities and context usage |
| 0:28-0:40 | Compare unscoped and grounded answers |
| 0:40-0:53 | Create, revise, and check a working brief |
| 0:53-1:00 | Explain boundaries and launch the lab |

## Before the session

- Check that every learner can open the GitHub Copilot app.
- Check that the learner can start a chat and open the training repository as a project.
- Check that the learner can see the current app navigation and available
  Customize items.
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

## Modes and context syntax

- **Interactive:** use for interviews, source checks, and reviewed drafts.
- **Plan:** use before a multi-step change so the learner can approve the plan.
- **Autopilot:** reserve for work with agreed scope and permission to act without review of every action. It is not used
  for the Session M7-01 write.

GitHub documents `@` for files, `#` for issues, and `/` for commands. Check the
picker in the current app. Run `/context` before the first draft. Use `/compact`
only when the learner needs to keep a long thread. Use `/clear` or `/reset` for
the fresh-session test.

## Context before prompting

Use a simple rule:

> Use only permitted sources. Attach the smallest set that answers the question.

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

Ask learners which sources Copilot used and which statements remain uncertain.

## Capability inspection

Open **Customize** and identify what is available in the learner's environment. Explain:

- a **skill** provides a repeatable procedure;
- an **agent** carries role-specific instructions and tools;
- an **MCP server** lets Copilot read or act in another system;
- a **plugin** is an installable package that can bundle skills, agents, hooks,
  MCP servers, or canvases;
- a **canvas** provides visible shared state;
- an **automation** repeats a task with a defined scope.

Do not build these customizations in this session. Show learners how to recognize
them and explain that availability depends on plan, policy, and installation.

## Demo: Create and revise a saved brief

1. Start a fresh session, then ask for an initiative summary without attaching
   the source. Do not reuse the capability-check session that already read it.
2. Mark unsupported statements.
3. Attach `lab/starter/initiative-overview.md` and ask again with source
   references.
4. Ask Copilot to complete `initiative-context-brief-template.md`.
5. Review and commit the brief.
6. Reveal `lab/starter/late-evidence.md`.
7. Ask Copilot for a focused update and review the diff.
8. Run `/rubber-duck` for an independent critique.
9. Start a fresh session with only the saved brief and check that it can identify
   the outcome, facts, unresolved decisions, non-goals, and next owner action.

Stress the pattern:

```text
Read -> propose -> review -> write -> verify
```

Point out that learners will use this same pattern in every later session.

## Product notes verified October 5, 2026

Before delivery, check the current GitHub Copilot app navigation, plan
requirements, policy controls, and Customize feature availability.

Official references:

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Quickstart for the GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
- [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app)
- [Working with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
