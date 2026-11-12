# Session M7-01 trainer guide: Work effectively in the GitHub Copilot app

**Duration:** 1 hour  
**Audience:** Product managers, product owners, business analysts, project managers, and delivery leads

## Goal

Show learners how to choose a session mode and attach source material in the
GitHub Copilot app. Compare answers with and without those sources before creating
the first Delivery Decision Studio brief.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00-0:05 | Orient learners to the app and the session scope |
| 0:05-0:17 | Choose a mode; context and reset controls |
| 0:17-0:27 | How the app assembles context |
| 0:27-0:32 | Inspect capabilities (short) |
| 0:32-0:42 | Compare unscoped and grounded answers |
| 0:42-0:55 | Create, revise, and check a working brief |
| 0:55-1:00 | Launch the lab |

## Prepare

- Every learner can open the GitHub Copilot app, start a chat, and open the training repository as a project.
- Open the starter initiative and reference brief.
- Use only the fictional scenario in the demo.

A generic chatbot doesn't meet this session's goal. Use the app and the repository.

## Teach the app as a work environment

- **Chats:** exploratory work and interviews;
- **Projects:** ongoing goals that can span repositories (public preview). Repositories and their sessions are listed under **Sessions**;
- **My work:** issues, pull requests, and active agent sessions;
- **Search:** finding repository information;
- **Automations:** recurring or on-demand tasks;
- **Customize:** skills, agents, MCP servers, plugins, and canvases.

Labels move. Teach what each area is for, not a fixed click path. The current docs list the sidebar as New, Pull requests, Issues, Automations, Customize, Search, Projects, Sessions, and Chats. They don't list **My work**, so check which label your build shows.

## Scope against M2-05 and M3-01

Say this in the first five minutes. M2-05 teaches developers the coding loop:
worktrees, diffs, pull requests. M3-01 teaches canvas and plugin design. M7-01
teaches non-developers how context gets into an answer and how to control it.
Learners who also take M2-05 meet the same three modes. Here the question is
which mode suits a document or decision task.

## Choose a mode

| Mode | Choose it when | Risk |
| --- | --- | --- |
| Interactive | You want to review each step: interviews, source checks, drafts | Slow for long, well-defined work |
| Plan | The change has several steps and you want to approve the approach first | A good plan can still rest on a wrong source |
| Autopilot | Scope, sources, and the stop point are agreed, and you accept no review per action | Wrong assumptions spread before you see them |

**Start in Interactive. Move to Plan before Copilot writes.** Use Autopilot only
for work you can check afterward from a diff. M7-01 uses Interactive, then Plan,
and never Autopilot.

## Context controls

`@` adds files, `#` references issues, and `/` opens commands.

| Command | Use it to |
| --- | --- |
| `/context` | See current context usage |
| `/compact` | Summarize earlier turns and keep the thread |
| `/clear` or `/reset` | Start a fresh conversation |

Run `/context` before the first draft. Use `/compact` when the thread still
matters. Use `/clear` or `/reset` for the fresh-session test. The docs list the
two as one entry; check current docs for any difference in your app version.

## How the app assembles context

Each answer is built from what is in the session, not from everything you know.

**It can see:**

- the conversation so far, including its own earlier answers;
- files you attach with `@`, issues you reference with `#`, and files it reads
  in the project;
- instructions and customizations the app loads (check **Customize**);
- anything an enabled MCP server returns.

**It can't see:**

- a file you only mentioned by name;
- another chat or session, unless you carry the content over;
- meetings, or anything in your head;
- anything dropped by `/compact`, `/clear`, or `/reset`.

An earlier wrong answer stays in context and **keeps influencing later answers**
until you clear or compact. A fluent answer with no source may come from the
model's general knowledge, not your project. Run `/context`, then decide: attach
less, compact, or start fresh. Treat this list as a teaching model; check
current docs for what your app version loads.

## Context before prompting

> Attach the smallest set of sources that answers the question.

Contrast:

```text
Explain this project.
```

with:

```text
Use the repository overview and the open initiative notes. Explain the product,
the affected users, the current decision, and the missing information for a
product owner. Cite the source for each factual claim.
```

Ask learners which sources Copilot used and which statements remain uncertain.

## Capability inspection (5 minutes)

Open **Customize** and identify what is available. One line each:

- a **skill** provides a repeatable procedure;
- an **agent** carries role-specific instructions and tools;
- an **MCP server** lets Copilot read or act in another system;
- a **plugin** is an installable package that can bundle skills, agents, hooks,
  MCP servers, or canvases;
- a **canvas** provides visible shared state;
- an **automation** repeats a task with a defined scope.

Learners don't build these here; M3-01 covers canvases and plugins. Availability
depends on plan, policy, and installation.

## Demo: create and revise a saved brief

1. Start a fresh session and ask for an initiative summary without the source.
2. Mark unsupported statements.
3. Attach `lab/starter/initiative-overview.md` and ask again with source references.
4. Ask Copilot to complete `initiative-context-brief-template.md`.
5. Review and commit the brief.
6. Reveal `lab/starter/late-evidence.md`.
7. Ask Copilot for a focused update and review the diff.
8. Run `/rubber-duck` for an independent critique.
9. Start a fresh session with only the saved brief. Check it can identify the
   outcome, facts, unresolved decisions, non-goals, and next owner action.

The pattern for every later session:

```text
Read -> propose -> review -> write -> verify
```

## References

- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)
- [Quickstart for the GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
- [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app)
- [Working with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Slash commands for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands)
