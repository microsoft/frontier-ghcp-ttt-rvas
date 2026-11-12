# Session M3-04 trainer guide: Custom agent boundaries

## Teaching goal

Start with a profile that enables every tool and permits any needed change. Run the contract, show why a test-only task can drift into production code, tighten the profile, and rerun the same test.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | What a custom agent profile controls |
| 0:08 to 0:18 | `.agent.md` structure |
| 0:18 to 0:30 | Weak profile and boundary violation |
| 0:30 to 0:43 | Least-privilege tools and path rules |
| 0:43 to 0:52 | Stop, validation, and human handoff |
| 0:52 to 1:00 | Rerun checks and lab handoff |

## Preparation

- Open the weak and tightened profiles side by side.
- Run `npm test` from `lab/starter/agent-project`.
- Keep `PROFILE-REFERENCE.md` and `BOUNDARY-EVIDENCE.md` open.
- Set up the JavaScript LSP server with `lab/lsp-setup.md`. Check startup and a real `getOrdersByUser` reference lookup.

## Teaching sequence

### 0:00 to 0:08: What the profile controls

A profile supplies instructions and filters the tools the agent sees. It doesn't grant repository permissions.

```text
Profile: role, available tools, procedure, stop rules
Environment: actual tool permissions and repository access
Human: accepts, revises, or rejects the result
```

### 0:08 to 0:18: Structure

```text
.github/
└── agents/
    └── test-writer.agent.md
```

Read the frontmatter from `PROFILE-REFERENCE.md`:

- `description` is required;
- `name` is optional but useful;
- `target` can limit the environment;
- omitting `tools` enables all available tools;
- `disable-model-invocation` requires deliberate use;
- `user-invocable` keeps the profile selectable;
- `metadata` can record a synthetic owner and contract version.

The Markdown body tells the agent what it may do and when to stop.

Spend five minutes on tools versus code intelligence. `/lsp show` lists configured servers and `/lsp test typescript` checks startup. Neither performs a lookup. Ask for `getOrdersByUser` references and inspect the LSP call or logs. `getUserOrderStats` is a caller and the export isn't. Keep this lookup read-only.

### 0:18 to 0:30: Weak profile

Open `weak-test-writer.agent.md`:

```yaml
tools: ["*"]
```

Its body says to make any changes needed. Run:

```bash
npm run check:weak
```

Use this conflict:

```text
Add tests for updateOrderStatus. Change tests only.
A new criterion allows reversing shipped to processing; the implementation
rejects it.
```

Nothing makes the profile stop before editing `src/`. The contract is broken even if one model run happens to stay in bounds.

### 0:30 to 0:43: Tighten tools and paths

Open `test-writer.agent.md`:

```yaml
tools:
  - read
  - search
  - edit
  - execute
```

The allowlist isn't enough: `edit` can still touch the wrong file. The body limits edits to `tests/` and names forbidden paths.

| Rule | Where it lives |
| --- | --- |
| Tool is available | Frontmatter |
| Only tests may change | Profile body |
| Repository blocks a write | Environment or repository policy |
| Change is accepted | Human review |

### 0:43 to 0:52: Stop and handoff

Read the production-conflict rule aloud. The correct output names:

- no files changed;
- the behavior that conflicts with the criteria;
- the forbidden production path;
- the decision a human must make.

Then run `npm test`. If the command can't run, the profile reports **not run** rather than success.

### 0:52 to 1:00: Rerun

```bash
npm run check:tight
npm test
```

The same contract now passes. Load the learner's profile with CLI `/agent` and run the conflict scenario. You need the actual stop report and unchanged source. A manual trace doesn't count as a live run.

Finish with the extension choice:

| Need | Use |
| --- | --- |
| Repository-wide rule | Instructions |
| Repeatable procedure | Skill |
| Role with a defined scope | Custom agent |
| External tools or data | MCP |

## Prepared demonstration

1. Show the weak profile.
2. Run `check:weak` and read the failed checks.
3. Trace the production edit the weak wording permits.
4. Show the tightened frontmatter and body.
5. Run `check:tight` and the full tests.
6. Produce the stop report for the same conflict.
7. Keep the LSP operation and selected profile in `agent-run.md`.

## Common mistakes

- Treating `tools: ["*"]` as harmless convenience.
- Naming a role without naming paths.
- Writing "do not edit source" with no stop and handoff result.
- Reporting validation as passed when the command didn't run.
- Assuming the profile grants permission.
- Adding MCP to a role that doesn't need external data.

## Lab handoff

Learners inspect the structure, run the failing weak profile, tighten it, and rerun the contract. They record a stop report with no source edits. Allow ten minutes for the LSP lookup inside the 25-minute weak-profile block. The lab stays at 120 minutes.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
