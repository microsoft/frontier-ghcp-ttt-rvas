# Session m3-04 trainer guide: Custom agent boundaries

## Delivery objective

Make the boundary failure visible. Start with a profile that enables every tool and
permits any needed change. Run the contract, show why a test-only task can drift
into production code, tighten the profile, and rerun the same test.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | What a custom agent profile controls |
| 0:08 to 0:18 | Current `.agent.md` structure |
| 0:18 to 0:30 | Weak profile and boundary violation |
| 0:30 to 0:43 | Least-privilege tools and path rules |
| 0:43 to 0:52 | Stop, validation, and human handoff |
| 0:52 to 1:00 | Rerun checks and lab handoff |

## Preflight

- Open the weak and tightened profiles side by side.
- Run `npm test` from `lab/starter/agent-project`.
- Keep `PROFILE-REFERENCE.md` and `BOUNDARY-EVIDENCE.md` open.
- Check profile support in the Copilot client.
- Prepare the JavaScript LSP server using `lab/lsp-setup.md`; check its
  startup and an actual `getOrdersByUser` reference lookup.
- Stop the learner lab if live profile loading is unavailable.

Do not push, merge, open issues, or attach MCP during the core demonstration.

## Teaching sequence

### 0:00 to 0:08: What the profile controls

A profile supplies instructions and filters the tools presented to the agent. It
does not create repository authority.

```text
Profile: role, available tools, procedure, stop rules
Environment: actual tool permissions and repository access
Human: accepts, revises, or rejects the result
```

The profile must not imply that a tool call is approved simply because the tool is
listed.

### 0:08 to 0:18: Exact structure

Show:

```text
.github/
└── agents/
    └── test-writer.agent.md
```

Read the frontmatter from `PROFILE-REFERENCE.md`.

Explain:

- `description` is required;
- `name` is optional but useful;
- `target` can limit the environment;
- omitting `tools` enables all available tools;
- `disable-model-invocation` requires deliberate use;
- `user-invocable` keeps the profile selectable;
- `metadata` can record a synthetic owner and contract version.

Show where the Markdown body tells the agent what it may do and when to stop.

Use five minutes of this segment to distinguish tools from code intelligence.
`/lsp show` reports configured servers; `/lsp test typescript` checks startup.
Neither proves a lookup. Ask for `getOrdersByUser` references and inspect the LSP
call or logs. Check that `getUserOrderStats` is a caller and the export is not.
Keep this lookup read-only and separate from the test-writing role.

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

The profile has no reason to stop before editing `src/`. The failure is in the
contract, even if one model run happens to stay inside the boundary.

### 0:30 to 0:43: Tighten tools and paths

Open `test-writer.agent.md`.

The profile uses:

```yaml
tools:
  - read
  - search
  - edit
  - execute
```

Explain why the allowlist is not enough: `edit` can still affect the wrong file.
Show how the body limits edits to `tests/` and names forbidden paths.

Ask learners to distinguish:

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

Then show that `npm test` runs in the project. If the command does not run, the
profile reports **not run**. It must not fill the gap with a success claim.

### 0:52 to 1:00: Rerun

Run:

```bash
npm run check:tight
npm test
```

The same contract now passes. Load the learner's profile through CLI `/agent` and
run the conflict scenario. Require the actual stop report and unchanged source;
a manual trace does not count as live invocation.

Finish with the extension choice:

| Need | Use |
| --- | --- |
| Repository-wide rule | Instructions |
| Repeatable procedure | Skill |
| Role with a defined scope | Custom agent |
| External tools or data allowed by policy | MCP |

## Prepared demonstration

1. Show the weak profile.
2. Run `check:weak` and read the failed checks.
3. Trace the production edit the weak wording permits.
4. Show the tightened frontmatter and body.
5. Run `check:tight` and the full tests.
6. Produce the stop report for the same conflict.
7. Keep the LSP operation and actual selected profile in `agent-run.md`.

## Common mistakes

- Treating `tools: ["*"]` as harmless convenience.
- Naming a role without naming paths.
- Writing "do not edit source" without a stop and handoff result.
- Claiming validation passed when the command did not run.
- Assuming the profile grants permission.
- Adding MCP to a role that does not need external data.

## Lab handoff

Explain the sequence: inspect the current structure, run the failing weak profile,
then tighten it and rerun the contract. Learners must record a stop report with no
source edits. They then review the documentation and read-only data analyst
examples using the same structure. Allow ten minutes for the LSP lookup within
the 25-minute weak-profile block. Keep the lab at 120 minutes.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
