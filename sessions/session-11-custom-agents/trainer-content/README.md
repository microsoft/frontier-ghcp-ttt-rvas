# Session 11 — Custom Agent Guidance

## Trainer content guide

Use Enterprise Cloud as the governance baseline. Before a live demonstration, verify current official GitHub documentation and customer policy for the repository, surface, metadata, available tools, activation behavior, data handling, and metering. This session uses a bounded artifact under `.github/agents/`.

If live access is unavailable, learners create and peer-review the artifact, complete the task manually, and collect the same evidence. Do not bypass policy or move the artifact.

**Preflight**

- Open the disposable repository, `lab/starter/docs-agent-template.md`, and the focused test command.
- Confirm the permitted repository paths, tool boundary, reviewer, usage guard, and fallback.
- Verify current profile metadata and invocation support only if a live surface is approved.

## One-hour plan

| Time | Topic | Learner evidence |
| --- | --- | --- |
| 0:00–0:10 | Preflight and role choice | Approved scope or manual fallback |
| 0:10–0:20 | Profile anatomy | Annotated role charter |
| 0:20–0:32 | Tool boundaries | Least-privilege decision table |
| 0:32–0:47 | Test-writer demo | Focused profile and reviewed output |
| 0:47–0:54 | Evaluate and revise | One evidence-based instruction change |
| 0:54–1:00 | Extension choice and lab | Agent, instruction, skill, or MCP decision |

At 0:42, stop troubleshooting live activation. Continue with the manual simulation.

## Role charter

A custom agent is a **narrow, reviewable role contract**. It should state:

1. the task that triggers it and tasks it must reject;
2. permitted inputs, paths, data, and tools;
3. an ordered procedure;
4. validation evidence and a human decision;
5. stop conditions and a manual fallback.

Show a profile from `lab/starter/docs-agent-template.md`. Confirm current frontmatter and tool syntax before invoking it. Course examples teach the pattern; they do not define a permanent platform schema.

Use `validateEmail` for the demo:

```text
Add focused tests for `validateEmail`.

Acceptance criteria:
- `"ada@example.com"` returns `true`.
- `"invalid"` returns `false`.
- `""` returns `false`.
- Change tests only.
- Run the repository’s verified focused test command.
- Stop if production code appears inconsistent with these criteria.
```

The profile should read the function and adjacent tests, edit only the named test file, run the focused check, report the result, and request review. If it needs a production-code edit, it stops and requests a separate decision.

Learners should be able to point to the named test file, three assertions, the focused-check result or an explicit unrun status, and a human review decision. At 0:42, stop activation troubleshooting and have them draft and review the same test manually.

## Tool and MCP review

| Need | Capability | Decision |
| --- | --- | --- |
| Read target and nearby tests | Repository read/search | Allow when approved |
| Add a focused test | Edit named test path | Allow when approved |
| Run the known check | Approved command execution | Conditional |
| External data | MCP or network | Remove unless the task requires it |
| Merge or accept risk | Privileged action | Human only |

MCP access does not widen the role’s authority. Before adding it, review the server owner, tool catalog, permissions, authentication, data flow, and fallback.

## Evaluate the profile

Review the output against the task:

- Does every assertion map to an acceptance criterion?
- Did only permitted files change?
- Did the named check run, or is it clearly marked unrun?
- Did the role stop on a scope conflict?
- Can a human follow the same procedure without a live surface?

Revise the single instruction tied to an observed failure. Do not grow a short role into a policy manual.

## Choose the smallest extension

| Need | Use |
| --- | --- |
| Repository-wide convention | Repository instructions |
| Repeatable procedure | Skill |
| Specialized bounded role | Custom agent |
| Approved external capability | MCP server |

For shared profiles, define an owner, versioning, representative tests, review triggers, and a retirement condition.

## Lab handoff

Learners create a test-writer and documentation profile, then review their procedures against bounded tasks. They add the data-analyst exercise only when the Session 10 server and its data boundary are approved. The deliverable is reviewed profile files, observed or manual test evidence, a human decision, and a fallback path.

## Likely questions

**Why must the profile stop for a production-code conflict?** The task authorizes tests only. A different change needs a separate review decision.

**Can the role use an MCP server?** Only when the bounded task requires an approved server and its data, permissions, and fallback have been reviewed.

**What if the profile will not activate?** Use the manual simulation. Do not move the artifact or broaden its permissions.
