# Session M3-04 lab: Tighten a custom agent boundary

**Deliverable:** A tested `.agent.md` profile, a checked LSP lookup, and a live test-only run that stops at a source-code conflict

## Lab overview

Start with a profile that doesn't restrict source edits. Show the problem, tighten the profile, and rerun the same checks.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Inspect the profile format | 20 min |
| 2 | Inspect symbols with LSP and expose the weak boundary | 25 min |
| 3 | Tighten tools, paths, validation, and stop rules | 35 min |
| 4 | Rerun tests and the source-conflict scenario | 25 min |
| 5 | Review the full profile | 15 min |

## Before you start

You need Node.js 22.22.2 or later, Git, standalone Copilot CLI with custom-agent support, and the JavaScript language server from [`lsp-setup.md`](lsp-setup.md). Check `/agent`, `/lsp show`, and `/lsp test typescript` first. Contract tests and manual traces don't replace a live profile load or an LSP lookup.

Copy the full lab to a fresh workspace:

```bash
mkdir -p ~/copilot-labs/session-m3-04
cp -R sessions/session-m3-04-custom-agents/lab ~/copilot-labs/session-m3-04/
cd ~/copilot-labs/session-m3-04/lab/starter/agent-project
git init
```

Read `.github/lsp.json` and `jsconfig.json` before opening the project. Keep the whole lab copy: the harness unit tests use its reference profile. `check:tight` checks the profile you create locally.

Don't push, merge, open an issue, or attach MCP. This lab tests the profile contract.

## Part 1: Inspect the profile format

Open:

```text
lab/solution/agent-project/PROFILE-REFERENCE.md
lab/starter/agent-project/.github/agents/weak-test-writer.agent.md
```

A repository profile lives under `.github/agents/` as Markdown with YAML frontmatter. `description` is required. Omitting `tools` enables all available tools, so this lab declares `read`, `search`, `edit`, and `execute`.

The body tells the agent the matching task, the paths it may read and edit, the ordered procedure, the validation command, and the stop and handoff rule.

**Checkpoint:** Identify which fields control selection, tool availability, manual invocation, and ownership.

## Part 2: Expose the weak boundary

### Inspect symbols (10 minutes)

In a normal CLI session, ask:

```text
Use JavaScript language-server operations to find the definition and references
of getOrdersByUser in src/order-service.js. Distinguish its caller from its
CommonJS export. Report paths and lines. Do not edit or rename anything.
```

Inspect the actual tool call or `/lsp logs`. Check the reported caller `getUserOrderStats` against the source. A comment or export is not a call. Write the operation, returned locations, and your check in `agent-run.md`. If the agent used only text search, ask it to use the configured LSP.

### Expose the profile boundary (15 minutes)

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

## Part 3: Tighten the profile

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

## Part 4: Rerun the same contract

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

## Part 5: Review the full profile

Use [`PROFILE-REFERENCE.md`](solution/agent-project/PROFILE-REFERENCE.md) and [`BOUNDARY-EVIDENCE.md`](solution/agent-project/BOUNDARY-EVIDENCE.md). Review:

- file location and `.agent.md` suffix;
- required and optional frontmatter;
- tool aliases and the effect of omitting `tools`;
- `disable-model-invocation` and `user-invocable`;
- owner and contract version metadata;
- body length, trigger, procedure, and stop rule.

## Final deliverable

1. The weak profile and its failed contract output.
2. The tightened `test-writer.agent.md`.
3. Passing profile contract tests.
4. A source-conflict scenario that stops without editing `src/`.
5. `agent-run.md` with the LSP lookup and the live selected-profile result.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
