# Curriculum plan

Use this page to choose and sequence sessions. Each session's overview has its goals, outline, and lab.

## Modules

```
Module 1: Copilot Fundamentals ───────── Beginner, 3 sessions
    │
Module 2: Copilot in Practice ────────── Intermediate to Advanced, 7 sessions
    │
Module 3: Agentic Workflows ──────────── Advanced, 5 sessions
    │
    ├── Module 4: DevOps & Infrastructure ── 3 sessions, needs Module 1 and M2-01 to M2-02
    ├── Module 5: Specification-Driven Frameworks ── 3 sessions (Squad, Spec Kit, HVE)
    └── Module 6: Advanced Topics & Capstone ── 2 sessions

Module 7: Product and Delivery Teams ─── Beginner to Intermediate, 6 sessions
    └── Standalone, no programming prerequisite
```

Modules 1 to 3 are the technical core.

## Paths

Each path is a [track](tracks/README.md).

| Audience | Sessions | Time |
| --- | --- | --- |
| Copilot beginners | M1-01 to M1-03 | 9 hrs |
| Copilot practitioners | M1-01 to M1-03, M2-01 to M2-05, M7-05, M2-06, M2-07 | 33 hrs |
| Agentic developers | M1-01 to M1-03, M2-01 to M2-05, M7-05, M3-01 to M3-05 | 42 hrs |
| DevOps engineers | M1-01 to M1-03, M2-01 to M2-02, M4-01 to M4-03 | 23 hrs 30 min |
| SDK application developers | M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05, M6-01 | 39 hrs |
| Product and delivery teams | M7-01 to M7-06 | 18 hrs |
| HVE practitioners | M1-01 to M1-03, M2-01 to M2-04, M3-03 to M3-04, M5-03 | 31 hrs |
| Everything | All 29 sessions | 88 hrs |

## Sessions

Session IDs start with the module: M2-01 is the first session in Module 2. Directories use lowercase IDs, such as `sessions/session-m2-01-copilot-cli/`.

### Module 1: Copilot Fundamentals

| Session | Title | Prerequisites | Time |
| --- | --- | --- | --- |
| Session M1-01 | [Introduction to GitHub Copilot](sessions/session-m1-01-intro-to-copilot/README.md) | None | 3 hrs |
| Session M1-02 | [Copilot Chat & Inline Suggestions](sessions/session-m1-02-chat-and-inline/README.md) | M1-01 | 3 hrs |
| Session M1-03 | [Prompt Engineering Fundamentals](sessions/session-m1-03-prompt-engineering/README.md) | M1-01 to M1-02 | 3 hrs |

### Module 2: Copilot in Practice

All Module 2 sessions need M1-01 to M1-03.

| Session | Title | Also needs | Time |
| --- | --- | --- | --- |
| Session M2-01 | [GitHub Copilot in the CLI](sessions/session-m2-01-copilot-cli/README.md) | | 3 hrs |
| Session M2-02 | [Agent Mode in the IDE](sessions/session-m2-02-agent-mode-ide/README.md) | M2-01 | 3 hrs |
| Session M2-03 | [Copilot Spaces & Context Management](sessions/session-m2-03-spaces-and-context/README.md) | M2-01 to M2-02 | 3 hrs |
| Session M2-04 | [Copilot for Code Review & Pull Requests](sessions/session-m2-04-code-review-prs/README.md) | M2-01 to M2-03 | 3 hrs |
| Session M2-05 | [GitHub Copilot App for Developers](sessions/session-m2-05-copilot-app-for-developers/README.md) | M2-01 to M2-04 | 3 hrs |
| Session M2-06 | [Repair and Refactor a Broken Python Application](sessions/session-m2-06-python-repair-refactor/README.md) | M2-01 to M2-04 | 3 hrs |
| Session M2-07 | [Migrate a Legacy Java Service to Modern .NET](sessions/session-m2-07-java-to-dotnet-modernization/README.md) | M2-01 to M2-04 | 3 hrs |

M2-05 needs Copilot app access. The developer tracks then use M7-05's **developer route**, which needs `/orchestrate` but not M7-01 to M7-04 or GitHub MCP.

### Module 3: Agentic Workflows

All Module 3 sessions need M1-01 to M1-03 and M2-01 to M2-04.

| Session | Title | Also needs | Time |
| --- | --- | --- | --- |
| Session M3-01 | [Copilot App, Plugins & Canvas Extensions](sessions/session-m3-01-copilot-app-canvases/README.md) | | 3 hrs |
| Session M3-02 | [Copilot Cloud Agent](sessions/session-m3-02-cloud-agent/README.md) | | 3 hrs |
| Session M3-03 | [MCP Servers & Custom Tool Integration](sessions/session-m3-03-mcp-servers/README.md) | | 3 hrs |
| Session M3-04 | [Custom Agents & Agent Profiles](sessions/session-m3-04-custom-agents/README.md) | M3-03 | 3 hrs |
| Session M3-05 | [Agent Skills & the Copilot Ecosystem](sessions/session-m3-05-agent-skills-ecosystem/README.md) | M3-04 | 3 hrs |

### Module 4: DevOps & Infrastructure

All Module 4 sessions need M1-01 to M1-03 and M2-01 to M2-02.

| Session | Title | Also needs | Time |
| --- | --- | --- | --- |
| Session M4-01 | [GitHub Actions & Workflow Generation](sessions/session-m4-01-actions-workflows/README.md) | | 3 hrs |
| Session M4-02 | [Infrastructure as Code with Copilot](sessions/session-m4-02-iac-with-copilot/README.md) | M4-01 | 2 hrs 30 min |
| Session M4-03 | [CI/CD Pipeline Debugging & Agentic Remediation](sessions/session-m4-03-cicd-debugging-autofix/README.md) | M4-01 | 3 hrs |

### Module 5: Specification-Driven Frameworks

| Session | Title | Prerequisites | Time |
| --- | --- | --- | --- |
| Session M5-01 | [Brady's Squad: Human-Led AI Teams](sessions/session-m5-01-squad-orchestration/README.md) (optional) | M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05 | 3 hrs |
| Session M5-02 | [Spec Kit: Specification-Driven Development](sessions/session-m5-02-spec-kit/README.md) | M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05 | 3 hrs 30 min |
| Session M5-03 | [HVE Core: Evidence-Led Delivery with RPI](sessions/session-m5-03-hve-core-challenge/README.md) | M1-01 to M1-03, M2-01 to M2-04, M3-03 to M3-04 | 4 hrs |

### Module 6: Advanced Topics & Capstone

| Session | Title | Prerequisites | Time |
| --- | --- | --- | --- |
| Session M6-01 | [Build Reliable Agent Applications with the GitHub Copilot SDK](sessions/session-m6-01-copilot-sdk/README.md) | M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05 | 3 hrs |
| Session M6-02 | [End-to-End Capstone Project](sessions/session-m6-02-capstone/README.md) | M1-01 to M1-03, M2-01 to M2-04, M3-01 to M3-05, M5-02 | 3 hrs |

### Module 7: Product and Delivery Teams

All Module 7 sessions need Copilot access. Learners without it should not start the module.

| Session | Title | Prerequisites | Time |
| --- | --- | --- | --- |
| Session M7-01 | [Work Effectively in the GitHub Copilot App](sessions/session-m7-01-copilot-app-foundations/README.md) | Copilot app access | 3 hrs |
| Session M7-02 | [Interview Ideas and Shape Better Work](sessions/session-m7-02-interview-and-shape-work/README.md) | M7-01 | 3 hrs |
| Session M7-03 | [Plan Work with GitHub Issues and MCP](sessions/session-m7-03-plan-work-with-github-issues/README.md) | M7-01 to M7-02, GitHub MCP write access | 3 hrs |
| Session M7-04 | [Build and Use a Planning Canvas](sessions/session-m7-04-plan-and-steer-with-canvases/README.md) | M7-01 to M7-03, canvas creation access | 3 hrs |
| Session M7-05 | [Orchestrate Agents and Workstreams](sessions/session-m7-05-orchestrate-workstreams/README.md) | Product route: M7-01 to M7-04. Developer route: M2-05. Both need app orchestration access. | 3 hrs |
| Session M7-06 | [Automate Delivery Follow-up and Connect Work Systems](sessions/session-m7-06-automate-delivery-follow-up/README.md) | M7-01 to M7-05, Automations and GitHub MCP access | 3 hrs |

## Delivery notes

- **Schedule:** 1 to 2 sessions a day over 15 days, up to 7 teaching hours a day. Or 1 a day over 29 days.
- **Group size:** 8 to 15 learners per cohort.
- **Prep:** Plan 2 hours per session the first time you teach it.
- **Optional and independent sessions:** M5-01 isn't a prerequisite for M5-02 or M6-02. M6-01 isn't a prerequisite for M6-02.
- **Order:** Run M5-03 after M3-03 to M3-04.
- **Setup:** Install standalone CLI before M1-03, a Python language server before M2-06, and a JavaScript one before M3-04.
- **Preview features:** Copilot Memory and third-party agents are in Preview. Update those sessions when they reach GA.
