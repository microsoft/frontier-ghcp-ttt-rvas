# Session 11 Lab: Tighten a Custom Agent Boundary

**Duration:** 2 hours

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07 and 10
**Deliverable:** A tested `.agent.md` profile, weak-to-tight evidence, and one
bounded run record

## Lab overview

Start with a profile that looks useful but has no real boundary. Prove the problem,
tighten the profile, and rerun the same checks.

| Part | Work | Time |
| --- | --- | --- |
| 1 | Inspect the exact profile format | 20 min |
| 2 | Run the weak profile and expose the violation | 25 min |
| 3 | Tighten tools, paths, validation, and stop rules | 35 min |
| 4 | Rerun tests and one bounded scenario | 25 min |
| 5 | Review references and ownership | 15 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Use the
synthetic JavaScript project only.

You need Node.js 20 or later and a writable repository copy. If GitHub Copilot
access is unavailable, use the profile contract test and manual simulation. If
Node.js is unavailable, stop and do not continue the executable lab.

**Fallback:** apply the profile as a manual checklist and collect the same boundary
evidence. Do not move the profile or widen its tools.

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

The profile body owns the behavioral boundary:

- the matching task;
- paths it may read and edit;
- the ordered procedure;
- the validation command;
- the stop and handoff rule.

**Checkpoint:** identify which fields control selection, tool availability, manual
invocation, and profile ownership.

## Part 2: Expose the weak boundary

```bash
cd sessions/session-11-custom-agents/lab/starter/agent-project
npm run check:weak
```

The command must fail. The weak profile uses `tools: ["*"]` and says to "make any
changes needed." A test-only request can therefore drift into `src/`.

Use this scenario:

```text
Add tests for updateOrderStatus.
Change tests only.
The current implementation permits a reverse transition that the acceptance
criteria reject.
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
8. define a manual fallback.

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
tests 2
pass 2
fail 0
```

Repeat the conflict scenario. The correct result is a stop report:

```text
No files changed.
Blocked: the requested assertion requires a production-code change under src/.
Decision needed: approve a separate source change or revise the acceptance criteria.
```

If an approved surface can load the profile, invoke it deliberately and compare
the observed output with this result. Otherwise, mark live invocation as **not
executed** and complete the manual trace.

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
- body length, trigger, procedure, stop rule, and fallback.

## Final deliverable

1. The weak profile and its failed contract output.
2. The tightened `test-writer.agent.md`.
3. Passing profile contract tests.
4. A bounded conflict scenario that stops without editing `src/`.
5. A human accept, revise, or reject decision.

## Verification

- [ ] The weak profile fails for broad tools and a missing source boundary.
- [ ] The tightened profile uses current `.agent.md` structure.
- [ ] `description` is present.
- [ ] `tools` uses a least-privilege allowlist.
- [ ] The profile edits `tests/` only.
- [ ] A production conflict produces a visible stop.
- [ ] `npm test` passes.
- [ ] Live invocation is recorded as executed or **not executed**.
- [ ] The profile has a synthetic owner and reviewable version marker.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
