# Workflow Scenarios: CLI or IDE?

For each scenario, choose the **CLI**, the **IDE**, or both. Explain the choice from the task constraints. Several answers can work; the reason matters.

---

## Scenario 1: SSH into a Production Server

**Situation:** A Node.js service on a Linux server is crashing intermittently. You've SSH'd in to investigate. There's no GUI — just a terminal. You need to read logs, check process status, analyze memory usage, and potentially hot-fix a config file.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___ (What's the constraint that drives your decision?)

---

## Scenario 2: Setting Up CI/CD Pipeline

**Situation:** You're creating a GitHub Actions workflow for a new repository. You need to write a `.github/workflows/ci.yml` file with build, test, and deploy stages. The workflow needs matrix builds for Node 20 and 22, caching, and conditional deployment.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___

---

## Scenario 3: Analyzing a 500-Line Error Log

**Situation:** A deployment failed and the CI log is 500+ lines of npm output, build errors, and test failures. You need to find the root cause. The log is saved as `deploy-failure.log` on your machine.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___

---

## Scenario 4: Writing a New React Component

**Situation:** You need to create a new dashboard component with multiple sub-components, styled-components, hooks for data fetching, and unit tests. It'll span 5+ files in your existing React project.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___

---

## Scenario 5: Automating a Weekly Report Script

**Situation:** Every Friday, you manually gather data from 3 sources (Git commits, Jira API, deployment logs), combine them into a summary, and post it to Slack. You want to automate this as a bash script that runs via cron.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___

---

## Your working rules

Based on these scenarios, write your personal rules:

**Always use CLI when:** ___  
**Always use IDE when:**___  
**Use both when:** ___  
**The deciding factor is usually:**___
