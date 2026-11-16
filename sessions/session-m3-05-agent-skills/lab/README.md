# Session M3-05 lab: Write, test, and fix a skill

**Duration:** 2 hours
**Deliverable:** A working `release-notes` skill with evals, a baseline comparison before and after revision, an interview skill, and a decision table

## Lab overview

Your team writes changelog entries by hand and each one looks different. You will write a skill that produces them in the project's format, using `skill-creator` to do most of the drafting.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Baseline: no skill | 10 min |
| 2 | Install `skill-creator` with `npx skills add` | 10 min |
| 3 | Create the skill and evals | 25 min |
| 4 | Test it live | 20 min |
| 5 | Revise, rerun, and compare | 15 min |
| 6 | Example: an interview skill | 25 min |
| 7 | Skill, custom agent, or MCP server? | 10 min |
| 8 | Review a third-party skill | 5 min |

## Before you start

You need Git, Node.js 22 or later (for `npx`), and the standalone Copilot CLI from Session M2-01 with skills support. Use the synthetic project in this lab.

```bash
mkdir -p ~/copilot-labs/session-m3-05
cp -R sessions/session-m3-05-agent-skills/lab/starter/release-notes-project \
  ~/copilot-labs/session-m3-05/
cd ~/copilot-labs/session-m3-05/release-notes-project
git init -q && git add -A && git commit -qm "Start"
```

The project has three files: `CHANGELOG.md` with the team's format, `merged-prs.md` with PRs merged since the last release, and `idea.md`, a rough plan you will use in Part 6.

## Part 1: Baseline without a skill

Start `copilot` in the project and ask:

```text
Write release notes for the PRs in merged-prs.md. Version 2.4.0, dated 2026-10-21.
```

Save the answer as `baseline.md` and don't edit it. You compare against it twice. Use this same prompt for eval case 1, so any difference comes from the skill. If Copilot edits `CHANGELOG.md`, save the answer, then restore the starter file.

Compare `baseline.md` with the entries in `CHANGELOG.md`.

**Checkpoint:** You can name at least two differences, such as missing sections, internal PRs included, or a different tone.

## Part 2: Install `skill-creator`

`skill-creator` is a skill that helps you write skills. It lives in [anthropics/skills](https://github.com/anthropics/skills). Install it with the `skills` CLI, which needs Node.js 22 or later.

```bash
npx skills add anthropics/skills --list
npx skills add anthropics/skills --skill skill-creator -a github-copilot -g
```

The first command lists what the repository offers. The second installs one skill. `-a github-copilot` picks the agent, and `-g` installs it for your user instead of the current project. Drop `-g` to install into the project. Use `-g` for tools you use alone, like this one. Use a project install for skills your team shares. Check where the files landed, then restart `copilot` or run `/skills reload`:

```text
/skills info skill-creator
```

You should see its description and location. A personal skill works in every project. If the CLI fails, copy the `skills/skill-creator` folder from a clone of the repository into `~/.copilot/skills/`.

**Why this matters.** `npx skills add` is how you will share skills with your own teams. It installs from any GitHub repository, so review the source first, as in Part 8.

Read the first 60 lines of its `SKILL.md` before you use it. Note how it tells Copilot to work: interview first, then draft, then test.

Look at how it is built. The frontmatter is short. The body points to files in `references/` and `scripts/`. That's progressive disclosure, covered in Part 3.

## Part 3: Create the skill

Ask Copilot to use it. Keep the request short and let `skill-creator` interview you:

```text
Use /skill-creator to create a project skill called release-notes in
.github/skills/. It should turn a list of merged PRs into a changelog entry
in this project's format.
```

Answer its questions with these facts:

- The entry matches the top entries of `CHANGELOG.md`.
- Group PRs by label. Leave out chores, dependency bumps, and docs typos.
- Breaking changes go under **Upgrade notes**.
- If the version or date is missing, ask for it.
- It must not trigger for commit messages or PR descriptions.

**Accept the evals.** After the draft, `skill-creator` proposes test prompts and saves them to `evals/evals.json`. You don't have to ask. Check that its list covers these four cases, and ask for any that are missing:

1. release notes with a version and date,
2. a commit message (the skill must stay out),
3. "What changed recently?" (observe only),
4. release notes with no version or date (it must ask).

Say yes when it offers to run them. It drafts pass/fail expectations while the runs go. Read them, and compare with [`solution/release-notes/evals/evals.json`](solution/release-notes/evals/evals.json). Skip only the description optimizer. It calls the `claude` CLI, which you don't use here.

Read what it wrote.

```text
.github/skills/release-notes/
├── SKILL.md
├── evals/evals.json
└── references/format.md      # may differ
```

Skills load in three levels, so Copilot doesn't spend context on skills it doesn't use:

| Level | What loads | When |
| --- | --- | --- |
| 1 | `name` and `description` | Always, for every installed skill |
| 2 | The `SKILL.md` body | When the description matches your request |
| 3 | Files in `references/` and `scripts/` | Only when a step needs them |

Check your draft against this. Long templates belong in `references/`, not in the body.

**Checkpoint:** `SKILL.md` starts with `name` and `description` frontmatter. The directory name matches `name`. You have four saved eval cases with expected results. Compare the skill with [`solution/release-notes/SKILL.md`](solution/release-notes/SKILL.md).

## Part 4: Test it live

Run `/skills reload`, then `/skills info release-notes`. Testing has two parts, because the runs check different things.

**1. Output quality (`skill-creator` runs it).** Ask `skill-creator` to run the evals. For each case it starts two subagents in parallel: one follows your skill, one has no skill. It grades the expectations, writes `benchmark.md` (pass rate, time, tokens), and opens a viewer to compare outputs side by side. Save the workspace as `iteration-1`. The subagent reads the skill file directly, so this run does **not** show whether Copilot would pick the skill on its own.

**2. Triggering (you run it).** Start a fresh `copilot` session for each prompt. Restore the starter `CHANGELOG.md` first.

| # | Prompt | You expect |
| --- | --- | --- |
| 1 | `Write release notes for the PRs in merged-prs.md. Version 2.4.0, dated 2026-10-21.` | The skill loads. The entry matches the format. |
| 2 | `Write a commit message for the CSV export change.` | The skill stays out. |
| 3 | `What changed recently?` | Unclear. Record what you see. |
| 4 | `Write release notes for the PRs in merged-prs.md.` | The skill loads and asks for the missing version and date. |

Run prompts 1 and 2 twice each, because selection varies. Also try `Use the /release-notes skill for merged-prs.md.` Save the first prompt 1 entry as `with-skill-v1.md`.

Compare `with-skill-v1.md` with `baseline.md` and [`solution/expected-output.md`](solution/expected-output.md). Note whether the skill loaded each time in `eval-results/iteration-1/triggering.md`.

**Checkpoint:** You have a benchmark, a trigger result for every prompt, and `with-skill-v1.md`. You can name what changed from `baseline.md`.

## Part 5: Revise, rerun, and compare

**Make this revision even if the first run passed.** First save a copy of the current skill. `skill-creator` uses it as the old version in the next run:

```bash
cp -R .github/skills/release-notes release-notes-workspace/skill-snapshot
```

Then ask Copilot:

```text
Let's change the @.github/skills/release-notes/ skill so that it writes the
outcome rather than the changes in the PRs. Keep the output technical but
more high-level: lead with what users or API clients can now do, or what
behavior improved, instead of implementation details or rewritten PR titles.
Keep the format, PR references, measured results, limits, and upgrade actions.
Don't invent benefits that the PR descriptions don't support.
Update the skill, not just the current release-note output.
```

Read the diff. The rules should work for any release, not just these PRs. A good result leads with "Product pages load faster: 480 ms to 190 ms", not with the cache.

Add an expectation to eval case 1: each entry leads with an outcome the PR supports and keeps the technical facts and upgrade actions.

Run `/skills reload`. Ask `skill-creator` to rerun the evals as `iteration-2`, with the snapshot as the baseline. It compares the revised skill with the old one on the same cases, grades both, and shows `benchmark.md` with the difference in pass rate. Don't paste the revision request into the test prompt. The revised skill has to carry it.

Then repeat the triggering checks from Part 4 in fresh sessions and save the first prompt 1 entry as `with-skill-v2.md`.

In `comparison.md`, compare `with-skill-v2.md` with **`baseline.md`** (no skill) and **`with-skill-v1.md`** (first skill version). Record what improved, what stayed the same, and what got worse. Quote one before and after line. Look at format, filtering, technical accuracy, and outcome wording. Add the benchmark numbers for both iterations.

Fix any remaining failure, one at a time, and rerun that case:

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Skill didn't load for prompt 1 | Description lacks the words you used | Add trigger phrases: "release notes", "changelog entry", "what shipped" |
| Skill loaded for prompt 2 | Description is too broad | Add "Don't use for commit messages or PR descriptions" |
| Output ignores a rule | Rule is buried or vague | Move it up, state it as an instruction, and say why it matters |
| `SKILL.md` is long | Everything is in one file | Move the entry template to `references/format.md` and link it from `SKILL.md` |
| Skill invents a version | No "ask first" rule | Add one |

You can ask `skill-creator` to apply a fix, or edit the file yourself. Run `/skills reload` after each change.

**Checkpoint:** Prompts 1 and 2 behave as expected on two runs each with the revised skill. You have two benchmarked iterations and a comparison against the unchanged `baseline.md`. Save the final skill and evals under `.github/skills/release-notes/`.

## Part 6: Example: an interview skill

Not every skill produces a file. Some change how Copilot works with you. A popular example is **`grill-me`**: you give Copilot a rough plan, and it interviews you, relentlessly, until no gray area is left.

1. Ask `skill-creator`:

   > Create a skill called `grill-me`. When I share a plan or idea, it should read the context first, then interview me relentlessly, one question at a time, until every gray or unspecified area is settled. It should recommend an answer for each question, not stop after a set number of questions, and finish with a summary of decisions and open questions.

2. Save it under `.github/skills/grill-me/` and run `/skills reload`.
3. Start a fresh session and run: `Grill me on idea.md.`
4. Answer every question. Don't stop it early. Notice that Copilot reads `idea.md` first, doesn't ask what the file already says, and keeps going until nothing is left unspecified.
5. Compare your skill with [`solution/grill-me/SKILL.md`](solution/grill-me/SKILL.md). Which instructions did yours miss?

Then try the same idea without the skill: `Review idea.md and tell me what's missing.` Copilot will probably return a list of gaps. Compare the two experiences.

**Why a skill works here.** The interview rules ("one question at a time", "recommend an answer", "keep going until no gray area is left") are exactly the kind of instruction you forget to type. The skill stores them. Use the same pattern for design reviews, incident retros, or a spec before you start a `/plan`.

**Checkpoint:** You have a working `grill-me` skill and a summary from your interview of `idea.md`.

## Part 7: Skill, custom agent, or MCP server?

A skill, a custom agent, and an MCP server solve different problems. Sessions M3-03 and M3-04 cover MCP servers and custom agents in depth.

| | Skill | Custom agent | MCP server |
| --- | --- | --- | --- |
| **What it is** | Instructions, plus optional scripts and files | A persona with its own prompt, tools, and model | A process that exposes tools and data |
| **Gives Copilot** | Know-how: how to do a task | A role: who is doing the task | Reach: access to a system |
| **Loads** | On demand, when the description matches | When you pick it or Copilot delegates | When the server is configured |
| **Needs code?** | No, a Markdown file | No, a Markdown file | Yes, a server |
| **Main risk** | Triggers at the wrong time | Too much tool access | Credentials and data leaving the machine |

They combine. A custom agent can use skills. A skill can tell Copilot how to use an MCP server's tools well.

For each task, choose the best home: repository instructions, a skill, a prompt file, a custom agent, an MCP server, or nothing. Write one sentence for each choice in `decisions.md`.

| Task | Your choice |
| --- | --- |
| "Use 2-space indentation in this repo." | |
| Produce release notes in the team format when asked. | |
| Query the issue tracker for open bugs. | |
| A reviewer persona with read-only tools. | |
| A one-off question about a stack trace. | |
| A weekly report that always starts from the same template and script. | |
| Interview me about a plan before I write a spec. | |

Compare with a neighbor and discuss where you differ.

## Part 8: Review a third-party skill

Open [github/awesome-copilot skills](https://awesome-copilot.github.com/skills/) and pick one skill. Read its `SKILL.md` and any scripts. Answer in `decisions.md`:

- What does the description promise?
- Does it run scripts or ask for `allowed-tools`? Would you approve that?
- Would you install it? Why or why not?

Don't install it into this project. To see what it would install, run `npx skills add <owner/repo> --list`, which only lists.

## Final deliverable

1. `.github/skills/release-notes/SKILL.md`, `evals/evals.json`, and any bundled files.
2. `.github/skills/grill-me/SKILL.md` and your interview summary for `idea.md`.
3. `baseline.md`, `with-skill-v1.md`, `with-skill-v2.md`, both benchmarked iterations, the trigger results, and `comparison.md`.
4. `decisions.md` with the seven choices and your third-party review.

## References

- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Adding agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [anthropics/skills](https://github.com/anthropics/skills)
- [github/awesome-copilot](https://github.com/github/awesome-copilot)
