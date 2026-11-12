# Session M4-03 trainer guide: CI/CD debugging & agentic remediation

## Teaching goal

Learners leave able to read a real failed Actions run, ask Copilot for a cause, and **prove the cause with a rerun**. They also know exactly which "agentic" fixes GitHub ships, and which are only habits.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:10 | Pipeline anatomy |
| 0:10 to 0:22 | Failure classes |
| 0:22 to 0:32 | Copilot as a diagnostician |
| 0:32 to 0:44 | Demo: a real failed run |
| 0:44 to 0:52 | What "agentic" really means |
| 0:52 to 1:00 | Pros, cons, tips, lab handoff |

## Preparation

- Create your own throwaway repo from `lab/starter/ci-lab-repo/` and run it once, so you know what the failures look like today. Action versions and runner images change.
- Check that Explain error appears on your failed run page. Docs say it opens from a failed check in the PR merge box or from the run summary page.
- Check that Autofix shows a **Generate fix** button on a CodeQL alert in your repo. Wait a few minutes for CodeQL to finish.
- Keep `lab/solution/` closed in the room.

## Pipeline anatomy (0:00 to 0:10)

Draw the chain: **trigger, workflow, job, step**. Then add the runner, context, and artifact.

- A **runner** is a fresh virtual machine. Nothing from the last run is there, except what a cache restores.
- A **context** is data GitHub gives a workflow, like `github.ref` or `secrets.DEPLOY_TOKEN`.
- An **artifact** is how jobs pass files to each other.

Open `build.yml` from the starter repo and have learners name each part.

## Failure classes (0:10 to 0:22)

| Class | What happened | Typical clue | Usual fix |
| --- | --- | --- | --- |
| Dependency | Lockfile missing or out of sync | `npm ci` error | Commit the lockfile |
| Environment, secret, permission | Missing secret or too little `GITHUB_TOKEN` access | Empty variable; `403 Resource not accessible by integration` | Add the secret or the permission |
| Flaky test | Test depends on time, order, or network | Passes on rerun | Fix the test, don't rerun until green |
| Matrix | One version or OS fails | One leg red, others cancelled | Fix the code or drop an unsupported leg |
| Cache | Wrong key or missing lockfile | Cache or lockfile error | Fix the key or the path |

Two points to stress:

- **The first red step is the cause. Later red is often fallout.**
- A rerun that turns green is not a fix. It hides a flaky test.

## Copilot as a diagnostician (0:22 to 0:32)

Three entry points, each with a different job:

| Entry point | Strength | Limit |
| --- | --- | --- |
| Explain error | One click on a failed check or run page | Reads the log, can't run your code |
| Copilot CLI | Reads logs with `gh`, runs commands locally, edits files | Needs your permission for each command |
| Cloud agent | Works alone from an issue and opens a PR | Slower; you review a PR, not a chat |

A diagnosis is a **hypothesis**. Show the habit:

1. Quote the first failing line.
2. Ask Copilot for the most likely cause and what would disprove it.
3. Reproduce the failing command locally if you can.
4. Make the smallest fix.
5. Push and read the new run.

## Demo: a real failed run (0:32 to 0:44)

Use your own throwaway repo.

1. `gh run list`. Point at the three red runs.
2. Pick **Build**. Run `gh run view <id> --log-failed` and read the error aloud.
3. Start `copilot` in the clone and ask: "Read the failed log of the latest Build run with `gh run view --log-failed`. Give me the most likely cause and what would disprove it. Don't change files."
4. Ask the room: do we believe it? Reproduce: run `npm ci` locally. It fails with the same lockfile message.
5. Let Copilot fix it. Show the diff. Push. Watch `gh run watch`.
6. Open **Label good builds**. Fix the first failure (empty secret), push, and let learners see the **second** failure appear (403).

Say aloud when Copilot is wrong. If it isn't, ask it to defend the answer against another cause.

## What "agentic" really means (0:44 to 0:52)

"Agentic" is a word people use loosely. These are the features that exist. **Check the docs before the session, because they change.**

| Feature | What it does | Needs |
| --- | --- | --- |
| Explain error | Chat about one failed run | Copilot access |
| Copilot cloud agent | You assign an issue (or a code scanning alert) to Copilot. It works in a GitHub Actions environment and opens a pull request. | Paid Copilot plan |
| Copilot Autofix | One suggested fix for a CodeQL alert. You review and apply it. | Public repo, or a private repo with GitHub Code Security. No Copilot subscription. |
| Agentic autofix | Assigning an alert to Copilot runs an agent session that explores, fixes, re-runs CodeQL, and opens a draft PR. Default-branch alerts only. | Enabled for the repository. No Copilot license needed. Uses AI credits and Actions minutes. |

What is **not** a feature: a Copilot that watches your pipeline and fixes it by itself. Learners can build loops with the CLI or a workflow, but that is their own automation. Nothing merges without a human.

## Pros, cons, and tips (0:52 to 0:58)

**Pros**

- Reads a 2,000-line log in seconds and points at the first real error.
- Knows common errors: lockfiles, permissions, version mismatches.
- Drafts the fix and the commit.

**Cons**

- Guesses when the log is thin or the cause is outside the repo, such as a missing secret.
- Can "fix" by deleting a test, loosening a permission, or adding `continue-on-error`.
- Sees only the logs and files you give it. It doesn't see your org settings.

**Tips**

- Give it `gh run view --log-failed`, not the whole log.
- Ask for one cause at a time.
- Ask what would **disprove** the diagnosis.
- Work on a branch. Open a PR so checks run before main.
- Reproduce locally before you push, when the failure isn't environment-only.
- Pin permissions. Start with `contents: read` and add only what a step needs.

## Common mistakes

- **Rerunning until green.** That hides flaky tests.
- **Accepting the first diagnosis.** Check it with a rerun.
- **Fixing three things in one push.** You can't tell which one worked.
- **Broadening permissions.** `permissions: write-all` fixes a 403 and creates a risk.
- **Pasting real secrets into a prompt.** Use synthetic values in the lab.
- **Treating "alert gone" as "fixed".** Read the patch and run the tests.
- **Expecting agentic autofix to be on by default.** A repository admin must enable it, and an organization owner may have to allow it first.

## Lab handoff (0:58 to 1:00)

Learners create their own repo and delete it at the end. Remind them: public repo for Autofix, no real secrets, and one fix per push.

## Answer key

| Workflow | Class | Cause | Fix |
| --- | --- | --- | --- |
| Build | Dependency and cache | No `package-lock.json`, and `cache: npm` needs one | Run `npm install`, commit the lockfile |
| Test on several Node versions | Matrix | `toSorted` needs Node 20; `engines` says 20 or later | Remove Node 18 from the matrix |
| Label good builds | Secret, then permission | `DEPLOY_TOKEN` empty, then `GITHUB_TOKEN` lacks `issues: write` | `gh secret set`, then add `issues: write` |
| CodeQL alerts | Security | Reflected XSS and path traversal in `src/server.js` | Escape output; resolve and check the path |

Accept a different fix for the matrix case if the learner changes the code to run on Node 18 and `engines` agrees.

## Reference

- [Troubleshooting workflows](https://docs.github.com/en/actions/how-tos/troubleshoot-workflows)
- [About autofix for code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning)
- [Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
- [Using workflow run logs](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs)
- [`gh run` manual](https://cli.github.com/manual/gh_run)
