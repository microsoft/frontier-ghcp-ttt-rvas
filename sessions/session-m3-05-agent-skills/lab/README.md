# Session M3-05 lab: Write, test, and fix a skill

**Duration:** 2 hours
**Deliverable:** A working `release-notes` skill, your live test results, an interview skill, and a decision table

## Lab overview

Your team writes changelog entries by hand and each one looks different. You will write a skill that produces them in the project's format, using `skill-creator` to do most of the drafting.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Baseline: no skill | 10 min |
| 2 | Install `skill-creator` | 10 min |
| 3 | Create the skill | 25 min |
| 4 | Test it live | 20 min |
| 5 | Fix it | 15 min |
| 6 | Example: an interview skill | 25 min |
| 7 | Skill, custom agent, or MCP server? | 10 min |
| 8 | Review a third-party skill | 5 min |

## Before you start

You need Git and the standalone Copilot CLI from Session M2-01 with skills support. Use the synthetic project in this lab.

```bash
mkdir -p ~/copilot-labs/session-m3-05
cp -R sessions/session-m3-05-agent-skills-ecosystem/lab/starter/release-notes-project \
  ~/copilot-labs/session-m3-05/
cd ~/copilot-labs/session-m3-05/release-notes-project
git init -q && git add -A && git commit -qm "Start"
```

The project has three files: `CHANGELOG.md` with the team's format, `merged-prs.md` with PRs merged since the last release, and `idea.md`, a rough plan you will use in Part 6.

## Part 1: Baseline without a skill

Start `copilot` in the project and ask:

```text
Write release notes for the PRs in merged-prs.md.
```

Save the answer as `baseline.md`. Compare it with the entries in `CHANGELOG.md`.

**Checkpoint:** You can name at least two differences, such as missing sections, internal PRs included, or a different tone.

## Part 2: Install `skill-creator`

`skill-creator` is a skill that helps you write skills. It lives in [anthropics/skills](https://github.com/anthropics/skills).

```bash
git clone --depth 1 https://github.com/anthropics/skills ~/copilot-labs/session-m3-05/skills
mkdir -p ~/.copilot/skills
cp -R ~/copilot-labs/session-m3-05/skills/skills/skill-creator ~/.copilot/skills/
```

Restart `copilot`, or run `/skills reload`. Then run:

```text
/skills info skill-creator
```

You should see its description and location. A skill in `~/.copilot/skills` is personal: it works in every project.

Read the first 60 lines of its `SKILL.md` before you use it. Note how it tells Copilot to work: interview first, then draft, then test.

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

When `skill-creator` offers formal evals, decline. Its eval and description-optimizer scripts call the `claude` CLI, which you don't use here. You will test by hand in Part 4.

Read what it wrote.

```text
.github/skills/release-notes/
├── SKILL.md
└── references/format.md      # may differ
```

**Checkpoint:** `SKILL.md` starts with `name` and `description` frontmatter. The directory name matches `name`. Compare it with [`solution/release-notes/SKILL.md`](solution/release-notes/SKILL.md).

## Part 4: Test it live

Run `/skills reload`, then `/skills info release-notes`. Start a fresh session. Try three prompts and note what happens for each:

| # | Prompt | You expect |
| --- | --- | --- |
| 1 | `Write release notes for the PRs in merged-prs.md. Version 2.4.0, dated 2026-10-21.` | The skill loads. The entry matches the format. |
| 2 | `Write a commit message for the CSV export change.` | The skill stays out. |
| 3 | `What changed recently?` | Unclear. Record what you see. |

Also try naming the skill: `Use the /release-notes skill for merged-prs.md.`

Skill selection can vary between runs. Run prompt 1 twice. Record whether it loaded both times.

Compare prompt 1 with [`solution/expected-output.md`](solution/expected-output.md).

**Checkpoint:** You have a result for each prompt and know which ones the skill got wrong.

## Part 5: Fix it

Use what you saw in Part 4. Fix one problem at a time and rerun the failing prompt.

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Skill didn't load for prompt 1 | Description lacks the words you used | Add trigger phrases: "release notes", "changelog entry", "what shipped" |
| Skill loaded for prompt 2 | Description is too broad | Add "Don't use for commit messages or PR descriptions" |
| Output ignores a rule | Rule is buried or vague | Move it up, state it as an instruction, and say why it matters |
| `SKILL.md` is long | Everything is in one file | Move the entry template to `references/format.md` and link it from `SKILL.md` |
| Skill invents a version | No "ask first" rule | Add one |

You can ask `skill-creator` to apply a fix, or edit the file yourself. Run `/skills reload` after each change.

**Checkpoint:** Prompts 1 and 2 behave as expected on two runs each. Save the final skill under `.github/skills/release-notes/`.

## Part 6: Example: an interview skill

Not every skill produces a file. Some change how Copilot works with you. A popular example is **`grill-me`**: you give Copilot a rough plan, and it interviews you until the gaps are gone.

1. Ask `skill-creator`:

   > Create a skill called `grill-me`. When I share a plan or idea, it should interview me one question at a time, recommend an answer for each question, and finish with a summary of decisions and open questions.

2. Save it under `.github/skills/grill-me/` and run `/skills reload`.
3. Start a fresh session and run: `Grill me on idea.md.`
4. Answer at least eight questions. Notice that Copilot reads `idea.md` first and doesn't ask what the file already says.
5. Compare your skill with [`solution/grill-me/SKILL.md`](solution/grill-me/SKILL.md). Which instructions did yours miss?

Then try the same idea without the skill: `Review idea.md and tell me what's missing.` Copilot will probably return a list of gaps. Compare the two experiences.

**Why a skill works here.** The interview rules ("one question at a time", "recommend an answer", "stop when a colleague could build it") are exactly the kind of instruction you forget to type. The skill stores them. Use the same pattern for design reviews, incident retros, or a spec before you start a `/plan`.

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

Don't install it into this project.

## Final deliverable

1. `.github/skills/release-notes/SKILL.md` and any bundled files.
2. `.github/skills/grill-me/SKILL.md` and your interview summary for `idea.md`.
3. Your prompt 1, 2, and 3 results, plus what you changed to fix them.
4. `decisions.md` with the seven choices and your third-party review.

## References

- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Adding agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [anthropics/skills](https://github.com/anthropics/skills)
- [github/awesome-copilot](https://github.com/github/awesome-copilot)
