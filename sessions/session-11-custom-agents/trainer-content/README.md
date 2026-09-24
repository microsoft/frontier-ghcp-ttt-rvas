# Session 11 Trainer Guide: Custom Agent Boundaries

## Delivery objective

Make the boundary failure visible. Start with a profile that enables every tool and
permits any needed change. Run the contract, show why a test-only task can drift
into production code, tighten the profile, and rerun the same test.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | What a custom agent profile controls |
| 0:08–0:18 | Current `.agent.md` structure |
| 0:18–0:30 | Weak profile and boundary violation |
| 0:30–0:43 | Least-privilege tools and path rules |
| 0:43–0:52 | Stop, validation, and human handoff |
| 0:52–1:00 | Rerun evidence and lab handoff |

## Preflight

- Open the weak and tightened profiles side by side.
- Run `npm test` from `lab/starter/agent-project`.
- Keep `PROFILE-REFERENCE.md` and `BOUNDARY-EVIDENCE.md` open.
- Confirm current profile support only when a live surface is approved.
- Use the manual scenario when live profile loading is unavailable.

Do not push, merge, open issues, or attach MCP during the core demonstration.

## Teaching sequence

### 0:00–0:08: What the profile controls

A profile supplies instructions and filters the tools presented to the agent. It
does not create repository authority.

```text
Profile: role, available tools, procedure, stop rules
Environment: actual tool permissions and repository access
Human: accepts, revises, or rejects the result
```

The profile must not imply that a tool call is approved simply because the tool is
listed.

### 0:08–0:18: Exact structure

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

The Markdown body carries the operational boundary.

### 0:18–0:30: Weak profile

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
The implementation permits a reverse transition that the criteria reject.
```

The profile has no reason to stop before editing `src/`. The failure is in the
contract, even if one model run happens to stay inside the boundary.

### 0:30–0:43: Tighten tools and paths

Open `test-writer.agent.md`.

The profile uses:

```yaml
tools:
  - read
  - search
  - edit
  - execute
```

This allowlist is necessary but insufficient. `edit` can still affect the wrong
file. The body therefore permits edits under `tests/` only and names forbidden
paths.

Ask learners to distinguish:

| Rule | Where it lives |
| --- | --- |
| Tool is available | Frontmatter |
| Only tests may change | Profile body |
| Repository blocks a write | Environment or repository policy |
| Change is accepted | Human review |

### 0:43–0:52: Stop and handoff

Read the production-conflict rule aloud. The correct output names:

- no files changed;
- the behavior that conflicts with the criteria;
- the forbidden production path;
- the decision a human must make.

Then show `npm test` as the verified command. If the command does not run, the
profile reports **not run**. It must not fill the gap with a success claim.

### 0:52–1:00: Rerun

Run:

```bash
npm run check:tight
npm test
```

The same contract now passes. If a supported surface is available, invoke the
profile deliberately with the conflict scenario. Otherwise, trace it manually.

Finish with the extension choice:

| Need | Use |
| --- | --- |
| Repository-wide rule | Instructions |
| Repeatable procedure | Skill |
| Bounded role | Custom agent |
| Approved external capability | MCP |

## Prepared demonstration

1. Show the weak profile.
2. Run `check:weak` and read the failed checks.
3. Trace the production edit the weak wording permits.
4. Show the tightened frontmatter and body.
5. Run `check:tight` and the full tests.
6. Produce the stop report for the same conflict.

## Common mistakes

- Treating `tools: ["*"]` as harmless convenience.
- Naming a role without naming paths.
- Writing "do not edit source" without a stop and handoff result.
- Claiming validation passed when the command did not run.
- Assuming the profile grants permission.
- Adding MCP to a role that does not need external data.

## Lab handoff

Learners inspect the current structure, fail the weak profile, tighten it, rerun the
contract, and record a bounded stop result. They then review the documentation and
read-only data analyst examples with the same structure.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
