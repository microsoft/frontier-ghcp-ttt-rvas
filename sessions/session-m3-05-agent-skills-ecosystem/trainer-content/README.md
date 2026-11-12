# Session M3-05 trainer guide: Agent Skills

## Teaching goal

Learners leave knowing what a skill is, when to write one, how to write one with `skill-creator`, and what can go wrong.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:10 | What a skill is |
| 0:10 to 0:25 | Skill, agent, or MCP server? |
| 0:25 to 0:35 | Writing a good skill |
| 0:35 to 0:47 | Demo: `skill-creator` |
| 0:47 to 0:55 | Pros, cons, and tips |
| 0:55 to 1:00 | Lab handoff |

## Preparation

- Install `skill-creator` in `~/.copilot/skills` (see lab Part 2) and run `/skills info skill-creator`.
- Copy the starter project to a scratch folder and run the lab once. Keep the reference skill in `lab/solution/release-notes/` open for comparison.
- Pick a second demo task you can finish in 10 minutes (a commit-message or PR-template skill works).

## What a skill is (0:00 to 0:10)

- A skill is a folder. `SKILL.md` is required and must be named exactly that.
- Frontmatter needs `name` and `description`. `name` is lowercase with hyphens and matches the directory.
- Project skills live in `.github/skills`, `.claude/skills`, or `.agents/skills`. Personal skills live in `~/.copilot/skills` or `~/.agents/skills`.
- Copilot picks a skill from the description. It then loads `SKILL.md` and can use other files in the folder. You can also name it: `Use the /name skill`.
- It's an open standard used by several tools. Support differs by surface. Check the docs for the one you teach on.

Show: `/skills list`, `/skills info <name>`, `/skills reload`.

## Skill, agent, or MCP server? (0:10 to 0:25)

Ask the room to sort five tasks, then reveal the table.

| Need | Use |
| --- | --- |
| Rule that always applies | Repository instructions |
| One saved prompt you run by hand | Prompt file |
| Workflow Copilot should pick up when relevant | Skill |
| Persona with its own tools and scope | Custom agent |
| Live access to a system | MCP server |

Key line: instructions are always on, skills load on demand.

**Skill vs custom agent vs MCP server.** Use one sentence each: a skill gives Copilot know-how, a custom agent gives it a role, an MCP server gives it reach. Link back to M3-03 (MCP) and M3-04 (custom agents) rather than re-teaching them. Stress that they combine: an agent can load skills, and a skill can describe how to use an MCP server's tools.

**Example: `grill-me`.** Show the slide, then run it live on `idea.md`: `Grill me on idea.md.` Let it ask three questions, answer them, and stop. Point out that it reads the file first and recommends an answer. The takeaway: skills can shape *how you work with Copilot*, not only what it produces. The finished skill is in `lab/solution/grill-me/SKILL.md`.

**Answer key for lab Part 7:**

| Task | Best home |
| --- | --- |
| 2-space indentation | Instructions: always applies |
| Release notes in team format | Skill |
| Query issue tracker for open bugs | MCP server |
| Read-only reviewer persona | Custom agent |
| One-off stack trace question | Nothing |
| Weekly report from template and script | Skill, with the script bundled |
| Interview me about a plan | Skill (`grill-me`). A custom agent also works if you want a fixed persona with restricted tools. |

Accept other answers if the reasoning holds. Prompt file is a fair answer for the release notes if the team runs it by hand every time.

## Writing a good skill (0:20 to 0:32)

**Description.** It decides whether the skill loads.
- Say what it does and when to use it.
- List the words people actually say.
- Add "Don't use for…" for look-alike tasks.
- Skills tend to undertrigger, so lean specific and a bit pushy.

Show a weak and a better description side by side.

**Body.**
- Imperative steps.
- A reason for each non-obvious rule.
- A short output example.
- An "ask if missing" rule instead of guessing.
- Keep it short. Move long templates to `references/` and link them.

**Scripts and tools.** Files in the skill folder are available to Copilot. `allowed-tools` pre-approves tools. Warn that pre-approving `shell` removes the confirmation step, so only do it after reading every script and trusting its source.

## Demo: `skill-creator` (0:32 to 0:44)

Build your second demo skill live. Narrate the loop.

1. Prompt: `Use /skill-creator to create a project skill called <name> in .github/skills/.`
2. Let it interview you. Answer in one line each.
3. Decline formal evals. Its eval and description-optimizer scripts call the `claude` CLI.
4. Read the draft out loud. Point at the description.
5. `/skills reload`, then test one matching and one non-matching prompt.
6. If it misfires, change the description and retest.

Say what you'd edit by hand. The tool drafts; you own the result.

## Pros, cons, and tips (0:44 to 0:54)

**Pros:** repeatable, loaded on demand, shareable through git, portable across surfaces, can bundle templates and scripts.

**Cons:**
- Triggering is probabilistic and can miss or misfire.
- Failures are quiet. Nothing errors when it doesn't load.
- Overlapping descriptions collide.
- Skills go stale.
- Third-party skills can run scripts.
- Support differs by surface.

**Tips:**
- Start from a task you've done by hand.
- Test three prompts: should trigger, shouldn't, ambiguous. Run each twice.
- Fix one thing at a time.
- If it's one always-on rule, write instructions instead.
- Delete skills nobody uses.

## Lab handoff (0:54 to 1:00)

Open `lab/README.md`. Walk through the seven parts. Tell learners to run the baseline first so they can see what the skill changes.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Directory name differs from `name` | Make them match |
| File is `skill.md` or `Skill.md` | Rename to `SKILL.md` |
| Skill doesn't show up | `/skills reload`, then `/skills info <name>` |
| Description is "helps with X" | Add triggers and a "don't use for" line |
| Everything in one long `SKILL.md` | Move templates to `references/` |
| Learner tries the `skill-creator` eval scripts | Skip them. Test by hand |

## Reference

- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Adding agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
