# Track: DevOps & Automation

**Target Audience:** DevOps engineers, Platform engineers, SRE teams
**Duration:** 23 hours 30 minutes across 8 sessions
**Difficulty:** Beginner → Advanced
**Recommended Delivery:** 4 days (2 sessions per day)

---

## Description

Use this track if you work on pipelines or infrastructure. Start with Copilot
fundamentals and agent mode, then generate GitHub Actions workflows, work with
Terraform and Bicep, and debug CI/CD failures. Review proposed security fixes
before they become changes.

## Prerequisites

- Experience with CI/CD concepts and GitHub Actions (basic familiarity)
- Familiarity with at least one IaC tool (Terraform, Bicep, CloudFormation): helpful but not required
- GitHub account with Copilot access
- VS Code installed with GitHub Copilot extension
- Node.js 22 or later and standalone CLI access for Sessions m1-03 and m2-01
- The CLI commands and local sandbox support listed in Session m2-01's preflight
- Access to a cloud environment for IaC testing (Azure, AWS, or GCP): optional for labs

## Sessions

| Order   | Session ID   | Title                                      | Difficulty   | Duration   |
| ------- | ----------- | ------------------------------------------ | ------------ | ---------- |
| 1       | m1-01          | Introduction to GitHub Copilot             | Beginner     | 3 hrs      |
| 2       | m1-02          | Copilot Chat & Inline Suggestions          | Beginner     | 3 hrs      |
| 3       | m1-03          | Prompt Engineering Fundamentals            | Beginner     | 3 hrs      |
| 4       | m2-01          | GitHub Copilot in the CLI                  | Intermediate | 3 hrs      |
| 5       | m2-02          | Agent Mode in the IDE                      | Intermediate | 3 hrs      |
| 6       | m4-01          | GitHub Actions & Workflow Generation       | Intermediate | 3 hrs      |
| 7       | m4-02          | Infrastructure as Code with Copilot        | Advanced     | 2 hrs 30 min |
| 8       | m4-03          | CI/CD Pipeline Debugging & Agentic Remediation | Advanced  | 3 hrs      |

> Add Session m2-03 to practice giving Copilot cloud documentation through Spaces.

## Recommended delivery schedule

### 4-day standard

| Day   | Sessions        | Focus                 |
| ----- | --------------- | --------------------- |
| Day 1 | Sessions m1-01, m1-02 | Setup and Chat        |
| Day 2 | Sessions m1-03, m2-01 | Prompting + CLI       |
| Day 3 | Sessions m2-02, m4-01 | Agent mode + Actions  |
| Day 4 | Sessions m4-02, m4-03 | IaC + CI/CD debugging |

## Learning outcomes

After this track, you should be able to:

1. Use Copilot effectively across IDE, Chat, and agent mode for DevOps tasks
2. Generate GitHub Actions workflows from natural language descriptions
3. Create custom Actions with Copilot assistance
4. Generate and validate Terraform infrastructure definitions; compare Bicep in the optional exercise
5. Debug failing CI/CD pipelines using Copilot analysis
6. Review a proposed security fix and its test results; configure remote CodeQL scanning when access permits
7. Optimize pipeline performance (caching, parallelization, conditional execution)
8. Choose where security checks belong in a CI/CD pipeline

## Next steps

- **Agentic Development**. Learn to build custom agents and MCP servers that automate infrastructure workflows
- **Developer Productivity**. Add the intermediate sessions on Spaces and code review
