# Session M3-04 lab: Tighten a custom agent boundary

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04 and M3-03
**Deliverable:** A tested `.agent.md` profile, a checked LSP lookup, and a live
test-only run that stops at a source-code conflict

## Lab overview

Start with a profile that does not restrict source edits. Show the
problem, tighten the profile, and rerun the same checks.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Inspect the exact profile format | 20 min |
| 2 | Inspect symbols with LSP and expose the weak boundary | 25 min |
| 3 | Tighten tools, paths, validation, and stop rules | 35 min |
| 4 | Rerun tests and the source-conflict scenario | 25 min |
| 5 | Review references and ownership | 15 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use the
synthetic JavaScript project only.

You need Node.js 22.22.2 or later, Git, a writable repository copy, standalone Copilot
CLI custom-agent support, and the JavaScript language server described in
[`lsp-setup.md`](lsp-setup.md). Check `/agent`, `/lsp show`, and
`/lsp test typescript` before starting.

**If the CLI, required profile, or language server is unavailable, stop the lab.**
Contract tests and manual traces do not replace live profile loading or an LSP
lookup.

Copy the full lab from the curriculum root to a fresh workspace:

```bash
mkdir -p ~/copilot-labs/session-m3-04
cp -R sessions/session-m3-04-custom-agents/lab ~/copilot-labs/session-m3-04/
cd ~/copilot-labs/session-m3-04/lab/starter/agent-project
git init
```

Read `.github/lsp.json` and `jsconfig.json` before opening this copied project.
Keep the full lab copy: the harness unit tests use its reference profile fixture.
Your `check:tight` command checks the profile you create locally.

Do not push, merge, open an issue, or attach MCP. This lab tests the profile
contract, not repository authority.

## Part 1: Inspect the exact profile format

Open:

```text
lab/solution/agent-project/PROFILE-REFERENCE.md
lab/starter/agent-project/.github/agents/weak-test-writer.agent.md
```

A repository profile lives under `.github/agents/` and uses Markdown with YAML
frontmatter. `description` is required. Omitting `tools` enables all available
tools, so this lab declares `read`, `search`, `edit`, and `execute`.

The profile body tells the agent what it may do:

- the matching task;
- paths it may read and edit;
- the ordered procedure;
- the validation command;
- the stop and handoff rule.

**Checkpoint:** identify which fields control selection, tool availability, manual
invocation, and profile ownership.

## Part 2: Expose the weak boundary

### Inspect symbols before delegating (10 minutes)

In a normal CLI session, ask:

```text
Use JavaScript language-server operations to find the definition and references
of getOrdersByUser in src/order-service.js. Distinguish its caller from its
CommonJS export. Report paths and lines. Do not edit or rename anything.
```

Inspect the actual tool call or `/lsp logs`, then check the reported caller
`getUserOrderStats` against the source. A comment or export is not a call.
Record the operation, returned locations, and your check in `agent-run.md`.
If the agent used only text search, ask it to use the configured LSP; a file
match does not complete this step.

### Expose the profile boundary (15 minutes)

```bash
npm run check:weak
```

The command must fail. The weak profile uses `tools: ["*"]` and says to "make any
changes needed." A test-only request can therefore drift into `src/`.

Use this scenario:

```text
Add tests for updateOrderStatus.
Change tests only.
A new acceptance criterion allows reversing a shipped order to processing.
The current implementation rejects that transition.
```

The weak profile has no instruction that forces a stop. Record the boundary
violation as:

```text
Observed: profile permits a production edit under src/.
Expected: profile stops and asks for a separate production-code decision.
```

Do not repair the source file during this exercise.

## Part 3: Tighten the profile

Create `.github/agents/test-writer.agent.md`. Use
[`solution/agent-project/.github/agents/test-writer.agent.md`](solution/agent-project/.github/agents/test-writer.agent.md)
as the acceptance reference.

The tightened profile must:

1. include a required `description`;
2. use a least-privilege tool allowlist;
3. permit reads under `src/`;
4. permit edits under `tests/` only;
5. run `npm test`;
6. stop when a production change is needed;
7. request a human review decision;
8. define a stop condition for missing access or approval.

Do not claim that the profile can enforce repository permissions. The environment
still controls what each tool can do.

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

Load your profile through `/agent` and repeat the conflict scenario.
The correct result is a stop report:

```text
No files changed.
Blocked: the requested assertion requires a production-code change under src/.
Decision needed: approve a separate source change or revise the acceptance criteria.
```

Record the actual selected profile and result in `agent-run.md`. A manual trace
can help diagnose problems but does not complete the live run. The profile should report
that new source behavior needs a separate decision; it must not silently change
the criterion or edit `src/`.

**Checkpoint:** the same contract that failed the weak profile now passes.

## Part 5: Review the full profile

Use
[`solution/agent-project/PROFILE-REFERENCE.md`](solution/agent-project/PROFILE-REFERENCE.md)
and
[`solution/agent-project/BOUNDARY-EVIDENCE.md`](solution/agent-project/BOUNDARY-EVIDENCE.md).

Review:

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
5. A human accept, revise, or reject decision.
6. `agent-run.md` with the actual LSP lookup and live selected-profile result.

## Final checks

- [ ] The weak profile fails for broad tools and a missing source boundary.
- [ ] The tightened profile uses current `.agent.md` structure.
- [ ] `description` is present.
- [ ] `tools` uses a least-privilege allowlist.
- [ ] The profile edits `tests/` only.
- [ ] A production conflict produces a visible stop.
- [ ] `npm test` passes.
- [ ] The LSP definition/reference lookup was inspected and checked against source.
- [ ] Your profile was loaded and the conflict stopped without source edits.
- [ ] The profile has a synthetic owner and reviewable version marker.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers)
