---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M3-02: Cloud Agent'
---

<!-- _class: lead -->
# One issue, one review decision
## Keep the Copilot cloud agent within the issue

---
# What the cloud agent is

An agent that works **on GitHub, not on your machine**. You hand it a task and come back to a pull request.

```text
issue assigned to Copilot
    ↓
agent session starts in a temporary environment
    ↓
agent reads the repo, edits, runs commands and tests
    ↓
agent pushes a branch and opens a draft pull request
    ↓
you review, comment, and merge
```

You can follow the session log while it runs. Review comments on the pull request start another round.

---
# The environment

Each session gets a **fresh, temporary environment**. In an Actions-based session, it is a GitHub Actions runner.

- `.github/workflows/copilot-setup-steps.yml` runs **before** the agent starts. It installs tools and dependencies so the agent can build and test.
- The workflow needs one job named `copilot-setup-steps`, and it must be on the **default branch**.
- Repository instructions (`.github/copilot-instructions.md`) tell the agent how to work.
- A firewall limits network access by default.

Newer sessions can also run in a cloud sandbox, which does not use setup steps. **Check current docs** for which one your plan uses.

---
# Set up a repository for the agent

1. **Enable** the cloud agent for the repository. Check plan and policy first.
2. **Add instructions** in `.github/copilot-instructions.md`.
3. **Add setup steps** so the agent can install and test.
4. **Merge both** to the default branch.
5. **Run the baseline** yourself. If tests fail before the agent starts, fix that first.

Never put credentials in instructions, setup steps, issues, or comments.

---
# Repository instructions

Tell the agent how to work in this repository:

- project shape and tech stack;
- coding conventions;
- the exact build and test commands;
- where it may and may not change files;
- prohibited changes, such as new dependencies.

Instructions support the issue. **They don't repair a vague one.**

---
# Setup steps are code you must review

The setup workflow runs commands in your repository before the agent starts. Review it like any workflow:

- **permissions**: keep them minimal;
- **commands**: install and build only;
- **secrets**: don't expose any to the session.

A setup step that needs a credential is a reason to stop and ask.

---
# Write an issue the agent can act on

The agent has only the issue text and the repo. Spell out:

- **behavior that changes**, and behavior that must stay the same;
- **files** it may touch;
- **how to check** the result, such as a test command;
- **non-goals**: what is out of scope.

Weak: `Fix title validation.`
Better: a stated behavior, an allowed file list, a passing test command, and a ban on unrelated changes.

If a peer can't tell what "done" means, the agent can't either.

---
# Start and watch a session

- Assign the issue to Copilot, or start a task from the agents panel.
- Open the **session log**. It shows the plan, commands, and edits as they happen.
- Read the log for **scope drift**: extra files, new dependencies, unexpected commands.
- Don't edit the issue mid-run. Stop the session and start a new one.

---
# Review the pull request

The agent opens a **draft pull request**. Treat it like a teammate's.

1. **Read the diff first**: which files changed, and do they match the allowed scope?
2. **Check behavior** against each acceptance criterion.
3. **Look for extras**: dependencies, config, unrelated endpoints.
4. **Run the tests** and read the checks.
5. **Skim the session log** if something looks odd.

**Passing tests don't replace diff review.** A small diff can still be wrong.

---
# Steer with review comments

A comment on the pull request starts another round. Keep it inside the issue.

Good:

```text
The whitespace case is missing. Add a focused test in tests/app.test.js.
Keep the current response shape and do not change other endpoints.
Run npm test and report the result.
```

Bad:

```text
Clean up the API while you are there.
```

Name the file, the fix, and the check. **New work gets a new issue.**

---
# Cloud agent vs IDE and CLI agents

| | Cloud agent | IDE agent mode / CLI |
| --- | --- | --- |
| **Runs** | On GitHub, in a temporary environment | On your machine |
| **You** | Hand off, then review | Watch and steer live |
| **Starts from** | An issue or a prompt | Your open workspace |
| **Result** | A branch and a pull request | Edits in your working tree |
| **Good for** | Well-scoped tasks you can review later | Exploration and tight feedback loops |

Same models and similar tools. The difference is where it runs and how you stay involved.

---
# Limits

- It **works only in the repository** you assign, and can't change other repositories.
- It **runs without you watching**. A vague issue gets a guess.
- The environment is only as good as your **setup steps**. No install step, no useful test run.
- Network access is **restricted by a firewall**.
- Sessions use **Actions minutes and premium requests**. Check your plan.

---
# Risks

- **Scope creep**: the agent fixes more than you asked.
- **Plausible but wrong code** that passes weak tests.
- **Setup and workflow changes** that run with repository permissions.
- **Secrets leaking** into issues, instructions, or logs.
- **Rubber-stamp merges**: the agent doesn't make the merge decision. **A human does.**

---
# Stop conditions

Stop the session when:

- the requested files expand;
- a new dependency appears;
- the agent asks for credentials;
- tests keep failing with no recovery plan;
- the issue changes mid-run.

Then choose: **approve** when scope, behavior, and tests match; **request changes** when a fix within the issue remains; **pause** when test output or ownership is unclear.

---
<!-- _class: divider -->
# In the lab

You run one fixed issue (reject blank task titles) in **your training repository on GitHub**. Follow the five checkpoints in `lab/README.md` and record your review decision.

`proposed-change.diff` is reference material only. Don't apply it.
