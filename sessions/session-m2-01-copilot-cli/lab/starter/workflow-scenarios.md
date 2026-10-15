# Workflow Scenarios: CLI or IDE?

For each scenario, choose the **CLI**, the **IDE**, or both. Explain the choice from the task constraints. Several answers can work; the reason matters.

---

## Scenario 1: SSH into a Production Server

**Situation:** A Node.js service on a Linux server is crashing intermittently.
You've connected through SSH and have only a terminal. You need to read logs, check
process status, inspect memory use, and possibly fix a configuration file.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___ (What's the constraint that drives your decision?)

---

## Scenario 2: Setting Up CI/CD Pipeline

**Situation:** You're creating a GitHub Actions workflow for a new repository.
Write `.github/workflows/ci.yml` with build, test, and deploy stages. It needs
matrix builds for Node 20 and 22, caching, and conditional deployment.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___

---

## Scenario 3: Analyzing a 500-Line Error Log

**Situation:** A deployment failed. The CI log contains more than 500 lines of npm
output, build errors, and test failures. Find the root cause in
`deploy-failure.log`.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___

---

## Scenario 4: Writing a New React Component

**Situation:** Create a dashboard component in an existing React project. It needs
subcomponents, styled-components, data-fetching hooks, and unit tests across more
than 5 files.

**Your choice:** CLI / IDE / Both  
**Why:** ___

**Key consideration:** ___

---

## Scenario 5: Automating a Weekly Report Script

**Situation:** Every Friday, you gather Git commits, Jira API data, and deployment
logs. You combine them into a summary and post it to Slack. Automate the work with
a Bash script that runs through cron.

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
