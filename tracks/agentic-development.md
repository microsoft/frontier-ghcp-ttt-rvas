# Track: Agentic Development

**Target Audience:** Teams adopting agentic AI workflows
**Duration:** 42 hours (14 sessions × 3 hrs)
**Difficulty:** Beginner → Advanced
**Recommended Delivery:** 5 to 7 days (2 to 3 sessions per day)

---

## Description

Start with daily Copilot use, then learn to assign and review agent work.
The track covers the GitHub Copilot app, cloud agents, MCP servers, custom agents,
and skills.

Sessions M2-05 and M7-05 give you practice critiquing plans, isolating app work,
and supervising independent child sessions. In Session M3-05, compare a local
interview skill with pinned community skills, then use the accepted decisions
as input to `/plan`.

## Prerequisites

- Solid software development experience (1+ years)
- GitHub Copilot Enterprise Cloud access; check the customer's enabled features before the lab
- VS Code installed with GitHub Copilot extension
- Git proficiency (branching, PRs, merging)
- Node.js or Python installed (for MCP server development in Sessions M3-03 to M3-05)
- Node.js 22 or later for CLI and live skills; Python 3.10 or later for the app labs
- Copilot app access, including `/rubber-duck` and `/orchestrate`
- CLI `/refine` before Session M1-03, and local sandbox support for Session M2-01
- Node.js 22.22.2 or later and a working JavaScript LSP server for Session M3-04
- App `/fork`, `/merge-to-parent`, and `/spar` for Session M2-05

## Sessions

| Order   | Session ID   | Title                                     | Difficulty   | Duration   |
| ------- | ----------- | ----------------------------------------- | ------------ | ---------- |
| 1       | M1-01          | Introduction to GitHub Copilot            | Beginner     | 3 hrs      |
| 2       | M1-02          | Copilot Chat & Inline Suggestions         | Beginner     | 3 hrs      |
| 3       | M1-03          | Prompt Engineering Fundamentals           | Beginner     | 3 hrs      |
| 4       | M2-01          | GitHub Copilot in the CLI                 | Intermediate | 3 hrs      |
| 5       | M2-02          | Agent Mode in the IDE                     | Intermediate | 3 hrs      |
| 6       | M2-03          | Copilot Spaces & Context Management       | Intermediate | 3 hrs      |
| 7       | M2-04          | Copilot for Code Review & Pull Requests   | Intermediate | 3 hrs      |
| 8       | M2-05          | GitHub Copilot App for Developers         | Intermediate | 3 hrs      |
| 9       | M7-05          | Orchestrate Agents and Workstreams: developer route | Intermediate | 3 hrs |
| 10      | M3-01          | Copilot App, Plugins & Canvas Extensions  | Advanced     | 3 hrs      |
| 11      | M3-02          | Copilot Cloud Agent                       | Advanced     | 3 hrs      |
| 12      | M3-03          | MCP Servers & Custom Tool Integration     | Advanced     | 3 hrs      |
| 13      | M3-04          | Custom Agents & Agent Profiles            | Advanced     | 3 hrs      |
| 14      | M3-05          | Agent Skills & the Copilot Ecosystem      | Advanced     | 3 hrs      |

**App access is required for Sessions M2-05 and M7-05.** Stop if access or a required
command is unavailable. Use Session M7-05's developer route; it does not require
Sessions M7-01 to M7-04 or GitHub MCP. Session M3-05 requires live CLI skill invocation.

## Recommended delivery schedule

### 5-day intensive

| Day   | Sessions            | Focus                  |
| ----- | ------------------- | ---------------------- |
| Day 1 | Sessions M1-01, M1-02, M1-03 | Foundations            |
| Day 2 | Sessions M2-01, M2-02, M2-03 | Intermediate workflows |
| Day 3 | Sessions M2-04, M2-05, M7-05 | Review + app workflow + developer orchestration |
| Day 4 | Sessions M3-01, M3-02, M3-03 | Canvases + cloud agent + MCP |
| Day 5 | Sessions M3-04, M3-05 | Custom agents + skills |

### 6-day standard

| Day   | Sessions        | Focus                            |
| ----- | --------------- | -------------------------------- |
| Day 1 | Sessions M1-01, M1-02 | Setup and Chat                   |
| Day 2 | Sessions M1-03, M2-01 | Prompting + CLI                  |
| Day 3 | Sessions M2-02, M2-03 | Agent mode + context             |
| Day 4 | Sessions M2-04, M2-05, M7-05 | Review + developer app + orchestration |
| Day 5 | Sessions M3-01, M3-02, M3-03 | Canvases + cloud agent + MCP |
| Day 6 | Sessions M3-04, M3-05 | Custom agents + skills            |

## Learning outcomes

After this track, you should be able to:

1. Use inline suggestions, Chat, CLI, agent mode, Copilot App, and cloud agent
2. Build and configure Copilot Spaces for team context management
3. Use the cloud agent for issue-driven autonomous development
4. Build canvases that let people and agents work from the same artifact
5. Build custom MCP servers that extend Copilot's capabilities
6. Create custom agent profiles with specialized instructions and tools
7. Develop and share agent skills for team workflows
8. Plan an agent workflow that starts with an issue and requires PR review before merge
9. Evaluate third-party coding agents (Claude, Codex) alongside Copilot
10. Choose agent workflows for a development team
11. Use isolated Copilot App sessions to implement and critique a scoped change
12. Supervise app orchestration and check findings against local code and PR fields
13. Compare live interview skills and trace accepted decisions into a plan
14. Inspect LSP results and loaded instructions; review Chronicle suggestions for selected sessions

## Next steps

- **DevOps & Automation**. Apply Copilot and agent mode to CI/CD pipelines and infrastructure
- **Full Mastery**. Add DevOps, Squad orchestration, and the capstone
