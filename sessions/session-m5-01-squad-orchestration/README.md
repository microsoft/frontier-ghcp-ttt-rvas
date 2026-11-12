# Session M5-01: Brady's Squad: Human-led AI teams

**Module:** Specification-Driven Frameworks
**Difficulty:** Advanced
**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04 and M3-02 to M3-05
**Duration:** 3 hours (1 hour trainer content + 2 hour lab)

## Overview

[Squad](https://github.com/bradygaster/squad) is an open-source tool by Brady Gaster. It gives you a team of AI specialists (a lead, developers, a tester, a scribe) that **live in your repository as files**. You talk to one coordinator. It splits the work, starts the specialists in parallel, and writes down what the team learned.

You learn what Squad is, how a team is built (charters, routing, shared decisions, per-agent history), and how it runs inside the Copilot CLI. You then install the real tool, point it at a small API, give it a multi-part task, and watch it work. You also learn when a team of agents beats one agent, and when it only costs more.

## Learning outcomes

- Explain what a human-led AI team is and what the coordinator, agents, and Scribe do.
- Read a charter, a routing table, and a decision file, and say what each controls.
- Install Squad, create a team, and run it with `copilot --agent squad`.
- Watch a team split a task, then review and steer it as the human.
- Find what Squad wrote in `.squad/` and tell product-defined files from your own choices.
- Explain what Ralph does and run a real triage pass over GitHub issues.
- Judge when a team beats a single agent, and when it costs more (overhead, edit conflicts, tokens).

## You need

- GitHub Copilot and the **standalone Copilot CLI** from Session M2-01
- Git and **Node.js 22.5 or later** for the npm install (other install methods don't need Node.js)
- GitHub CLI (`gh`), signed in, for Part 7 (Ralph)
- A throwaway GitHub repository for Part 7

Squad changes quickly. Where a step depends on the version, the lab says: **check the Squad README for your version**.

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab | [`lab/README.md`](lab/README.md) |
| Starter project | [`lab/starter/squad-project/`](lab/starter/squad-project/) |
| Reference solution | [`lab/solution/`](lab/solution/) |
| Squad README | [bradygaster/squad](https://github.com/bradygaster/squad) |

## Key topics

- What Squad is: coordinator, specialists, Scribe, Ralph
- Charters, routing, and casting
- Shared decisions and personal history in `.squad/`
- How Squad runs in the Copilot CLI and VS Code
- Parallel work, conflicts, and cost
- Ralph: the work monitor, in a chat session and with `squad watch`
- Team of agents or one agent?
