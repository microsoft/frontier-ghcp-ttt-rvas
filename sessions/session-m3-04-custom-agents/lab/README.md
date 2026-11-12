# Session M3-04 lab: Tighten a custom agent boundary

**Deliverable:** A tested `.agent.md` profile and a live test-only run that stops at a source-code conflict. The LSP lookup is an optional stretch.

## Lab overview

Start with a profile that doesn't restrict source edits. Show the problem, tighten the profile, and rerun the same checks.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Inspect the profile format | 15 min |
| 2 | Expose the weak boundary | 15 min |
| 3 | Tighten tools, paths, validation, and stop rules | 35 min |
| 4 | Rerun tests and the source-conflict scenario | 30 min |
| 5 | Review the full profile | 10 min |
| 6 | Optional stretch: LSP lookup | 15 min |

## Before you start

You need Node.js 22.22.2 or later, Git, and standalone Copilot CLI with custom-agent support. Check that `/agent` works first. Contract tests and manual traces don't replace a live profile load. For the optional stretch you also need the JavaScript language server from [`lsp-setup.md`](lsp-setup.md).

Copy the full lab to a fresh workspace:

```bash
mkdir -p ~/copilot-labs/session-m3-04
cp -R sessions/session-m3-04-custom-agents/lab ~/copilot-labs/session-m3-04/
cd ~/copilot-labs/session-m3-04/lab/starter/agent-project
git init
```

Keep the whole lab copy: the harness unit tests use its reference profile. `check:tight` checks the profile you create locally.

Don't push, merge, open an issue, or attach MCP. This lab tests the profile contract.

## Part 1: Inspect the profile format (15 minutes)

Open:

```text
lab/solution/agent-project/PROFILE-REFERENCE.md
lab/starter/agent-project/.github/agents/weak-test-writer.agent.md
```

A repository profile lives under `.github/agents/` as Markdown with YAML frontmatter. Fields differ by client, so check the [current docs](https://docs.github.com/en/copilot/reference/custom-agents-configuration).

- `description` is required. Copilot reads it to choose the agent.
- `tools` lists what the agent can use. Omitting it enables all tools, so this lab declares the aliases `read`, `search`, `edit`, and `execute`.
- `disable-model-invocation: true` means Copilot won't pick the agent on its own. You select it.
- `user-invocable` controls whether people can select it.

The body tells the agent the matching task, the paths it may read and edit, the ordered procedure, the validation command, and the stop and handoff rule.

**Checkpoint:** Name the field that controls tool availability and the field that stops automatic selection.

## Part 2: Expose the weak boundary (15 minutes)

```bash
npm run check:weak
```

It must fail. The weak profile uses `tools: ["*"]` and says to "make any changes needed," so a test-only request can drift into `src/`.

Use this scenario:

```text
Add tests for updateOrderStatus.
Change tests only.
A new acceptance criterion allows reversing a shipped order to processing.
The current implementation rejects that transition.
```

Nothing forces the weak profile to stop. Record:

```text
Observed: profile permits a production edit under src/.
Expected: profile stops and asks for a separate production-code decision.
```

Don't repair the source file.

## Part 3: Tighten the profile (35 minutes)

Create `.github/agents/test-writer.agent.md`. Use [`solution/agent-project/.github/agents/test-writer.agent.md`](solution/agent-project/.github/agents/test-writer.agent.md) as the reference.

The profile must:

1. include `description`;
2. use a least-privilege tool allowlist;
3. permit reads under `src/`;
4. permit edits under `tests/` only;
5. run `npm test`;
6. stop when a production change is needed;
7. ask for a human review decision;
8. stop on missing access.

The profile can't enforce repository permissions. The environment still controls what each tool can do.

## Part 4: Rerun the same contract (30 minutes)

```bash
npm run check:tight
npm test
```

Expected:

```text
PASS .../test-writer.agent.md
tests 3
pass 3
fail 0
```

Load your profile with `/agent` and repeat the conflict scenario. The correct result is a stop report:

```text
No files changed.
Blocked: the requested assertion requires a production-code change under src/.
Decision needed: approve a separate source change or revise the acceptance criteria.
```

Record the selected profile and result in `agent-run.md`. A manual trace helps diagnose problems but doesn't complete the live run. The profile must not silently change the criterion or edit `src/`.

**Checkpoint:** The contract that failed the weak profile now passes.

## Part 5: Review the full profile (10 minutes)

Use [`PROFILE-REFERENCE.md`](solution/agent-project/PROFILE-REFERENCE.md) and [`BOUNDARY-EVIDENCE.md`](solution/agent-project/BOUNDARY-EVIDENCE.md). Check:

- file location and `.agent.md` suffix;
- `description`, `tools`, and `disable-model-invocation`;
- the effect of omitting `tools`;
- body trigger, procedure, and stop rule.

Then decide: would a skill or an MCP server fit this need better? A skill gives know-how, an agent gives a role, and MCP gives reach. This role needs tools and limits, so an agent fits.

## Part 6: Optional stretch: LSP lookup (15 minutes)

Skip this unless you finish early. It needs the language server from [`lsp-setup.md`](lsp-setup.md). Check `/lsp show` and `/lsp test typescript` first, and read `.github/lsp.json` and `jsconfig.json`.

In a normal CLI session, ask:

```text
Use JavaScript language-server operations to find the definition and references
of getOrdersByUser in src/order-service.js. Distinguish its caller from its
CommonJS export. Report paths and lines. Do not edit or rename anything.
```

Inspect the actual tool call or `/lsp logs`. Check the reported caller `getUserOrderStats` against the source. A comment or export is not a call. Write the operation, returned locations, and your check in `agent-run.md`. If the agent used only text search, ask it to use the configured LSP.

## Final deliverable

1. The weak profile and its failed contract output.
2. The tightened `test-writer.agent.md`.
3. Passing profile contract tests.
4. A source-conflict scenario that stops without editing `src/`.
5. `agent-run.md` with the live selected-profile result. Add the LSP lookup if you did the stretch.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
