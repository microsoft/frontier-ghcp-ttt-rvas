# Session M2-03 trainer guide: Copilot Spaces & context management

## Teaching goal

Learners leave knowing what each context mechanism is, when to use it, and how to tell from a result which one is missing.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Context windows and curation |
| 0:08 to 0:23 | Copilot Spaces |
| 0:23 to 0:38 | The other mechanisms |
| 0:38 to 0:46 | Which one when |
| 0:46 to 0:55 | Demo: same task, three contexts |
| 0:55 to 1:00 | Pros, cons, tips, mistakes, lab handoff |

## Preparation

- Run the lab once. Keep your Space, your `bare-api` copy, and `lab/solution/` open.
- Check the Spaces toolset works in your CLI: `copilot --add-github-mcp-toolset copilot_spaces`, then ask for your Space by name.
- Have the demo repository pushed to a private repository on your personal account.
- Open the current Spaces and custom instructions docs. Details change often.

## Context windows and curation (0:00 to 0:08)

- The **context window** is everything the model sees for one reply: prompt, chat history, instructions, attached files, tool output. It has a size limit.
- The model has no other memory of your project. If it isn't in the window, it guesses.
- Three failures: **missing** context (confident guesses), **too much** (vague, slower, costs more), **wrong** (followed faithfully).
- Goal: the smallest set of sources that makes the task answerable.

Ask: "What would a new teammate need on day one for this task?" That list is your context.

## Copilot Spaces (0:08 to 0:23)

**What it is.** A named collection of sources plus short instructions that you ask questions against. It lives on GitHub, not in chat history.

**Sources.** Files, folders, whole repositories, pull requests, issues, uploaded files, pasted text.

- An attached **file** loads in full on every question.
- An attached **repository** is searched. Only relevant parts come back.
- For a few key documents, use files. For a large docs tree, use the repository.

**How sources refresh.** GitHub files and other GitHub sources follow the **`main` branch**. A push to `main` updates the Space. Uploads and pasted text don't change on their own.

**Who can see it.**

- Personal Space: private, shared with named users, or public. Public Spaces are view-only by default.
- Organization Space: org members get admin, editor, or viewer, or no access.
- **Viewers only see sources they can already access.** Sharing a Space doesn't grant repository access.
- Spaces that mix private and multi-organization sources may not work in chat. Check the docs.

**Where you use it.** Copilot Chat on github.com. IDE and CLI access goes through the GitHub MCP server with the `copilot_spaces` toolset, which isn't on by default. In the IDE, whole-repository and uploaded sources aren't available. Check the current docs.

**Cost.** Questions in a Space count as Copilot Chat usage.

Show: create a Space live, add two files, ask a question whose answer is only in them.

## The other mechanisms (0:23 to 0:38)

Go through them in this order. One minute of "what", one of "when".

| Mechanism | Where it lives | What it is |
| --- | --- | --- |
| Repository instructions | `.github/copilot-instructions.md` | Always-on rules for the repository |
| Path-specific instructions | `.github/instructions/*.instructions.md` with `applyTo` | Rules that load only for matching files |
| Prompt file | `.github/prompts/*.prompt.md` | A saved prompt you run on purpose |
| Custom agent | `.github/agents/*.agent.md` | A role with its own tools and rules (M3-04) |
| Skill | `SKILL.md` in a skills folder | A workflow loaded when the request matches (M3-05) |
| Memory | Managed by Copilot | Facts and preferences Copilot learned |
| @-mention, file context | Your chat | Files you point at for one task |

Key points:

- **Instructions** are short and always on. About a page at most. Skip what the code already shows.
- `applyTo` takes globs, comma-separated: `**/*.ts,**/*.tsx`. Use it to keep the main file small.
- The CLI also reads `AGENTS.md` and user-level files in `~/.copilot/`. Don't write conflicting rules in several files. Copilot combines them and defines no precedence.
- **Prompt files** differ by tool. VS Code, Visual Studio, and JetBrains support them. Check the docs for the CLI.
- **Memory** is written by Copilot, not you. Repository facts are shared with people who can use Memory there. User preferences follow you. Show learners where to review and delete.
- **@-mention** is the cheapest option. It doesn't last past the chat.

## Which one when (0:38 to 0:46)

Ask the room to sort five needs, then reveal.

| Need | Use |
| --- | --- |
| Answer questions from the spec and design docs | Space |
| "ES modules and `node:test`" everywhere | Repository instructions |
| A rule only for `src/routes/` | Path-specific instructions |
| Rerun the same review prompt | Prompt file |
| Look at one file right now | @-mention |

Rule of thumb: **facts the code lacks go to a Space. Habits for every task go to instructions.**

## Demo: same task, three contexts (0:46 to 0:55)

Use the lab task. Work in `bare-api` on a branch per run.

1. Run with no context. Read the diff. Point out the guessed threshold and the test framework.
2. Run with the Space. Show the `get_copilot_space` call. Point out the spec rules in the code.
3. Run with instructions. Point out `node:test` and the error shape.

Keep a scorecard on screen. Say out loud which mechanism caused each change. If a run goes odd, say that model output varies and move on.

## Pros, cons, tips (0:55 to 1:00)

**Pros of curated context:** right answers on the first try, shareable, lives in git or on GitHub, saves repeated prompting.

**Cons and risks:**

- **Stale sources.** A Space follows `main`, so it can also follow a bad change. Uploads never refresh.
- **Too much context.** Whole repositories and long instruction files dilute the answer.
- **Sensitive data.** Viewers see what the Space contains. Keep secrets, customer data, and real internal code out unless you know the audience.
- **Silent failure.** A missing source doesn't raise an error. The answer is just worse.
- **Conflicting files.** Several instruction files can disagree.

**Tips:**

- Start with 3 to 5 sources.
- Test a new Space with a question whose answer you know.
- Write instructions as short commands, one idea each.
- Put a rule in the narrowest place that works.
- Review Spaces and instructions when the code changes.

## Lab handoff

Open `lab/README.md`. Tell learners to save each diff, because the comparison depends on them. Tell them the CLI needs the `copilot_spaces` flag for runs 2 and 4. Stretch tasks hold the CLI diagnostics and prompt files.

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Adding the whole repository "just in case" | Add the files the task needs |
| One long instructions file | Move area-specific rules to `.instructions.md` with `applyTo` |
| `applyTo` glob matches nothing | Test with the file you expect it to match |
| Run 2 never calls the Space | Start the CLI with `--add-github-mcp-toolset copilot_spaces` and name the Space |
| Comparing runs from the same session | Start a fresh session each time |
| Instructions repeat the spec | Put facts in the Space and habits in instructions |
| Judging from one run | Rerun once if a result looks odd |
| Secrets in a Space | Use synthetic data only |

## Answer key for lab Part 6

| Line | Best home |
| --- | --- |
| "Our API returns `{ data }` envelopes." | Repository instructions (and it's in the architecture doc for the Space) |
| "The spec for the low-stock report." | Space |
| "Use `node:test` in this repo." | Repository instructions |
| "Summarize this stack trace." | Nothing. Paste it. |
| "Review a PR with our checklist, when I ask." | Prompt file |

Accept other answers if the reasoning holds.

## References

- [About GitHub Copilot Spaces](https://docs.github.com/en/copilot/concepts/prompting-and-context/spaces)
- [Creating GitHub Copilot Spaces](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/copilot-spaces/create-copilot-spaces)
- [Using Copilot Spaces in your IDE](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/extend-copilot-with-tools-and-context/use-copilot-spaces)
- [Adding custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [About Copilot Memory](https://docs.github.com/en/copilot/concepts/prompting-and-context/copilot-memory)
