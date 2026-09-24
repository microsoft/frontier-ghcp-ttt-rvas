---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 11 — Custom Agents'
---

<!-- _class: lead -->
# Custom Agent Guidance
## Bounded roles, explicit tools, human review

---
# Preflight

Before a live exercise, verify current documentation and customer policy for:

- repository and data boundary;
- supported surface and profile syntax;
- permitted tools and MCP access;
- reviewer, meter, escalation, and stop guard.

Use a non-sensitive starter task. A manual profile review is the fallback.

---
# An agent is guidance, not a separate employee

Custom agents make a repeatable role easier to invoke. They do not create an
independent owner or remove the need for review.

A good role charter answers:

| Question | Example answer |
| --- | --- |
| What work? | Add tests for an existing validation function |
| What evidence? | Target code, nearby tests, and test output |
| What may change? | Named test files only |
| Who decides? | The pull-request reviewer |

The narrower the role, the easier it is to review and improve.

---
# Separate instructions from permissions

An agent profile can tell the model to use a tool. The tool and environment decide
whether that action is actually permitted.

```text
Profile instruction: Run the focused unit test.
Environment policy: Commands are limited to an approved test runner.
Human decision: Review the diff and result before merge.
```

Do not write profiles that imply approval, deployment authority, or access they
cannot enforce.

---
# Review an agent with a hostile example

Give the role a request that should make it stop:

```text
The failing test appears to need a production-code change.
```

The test-writer should report the boundary and hand the work back. If it edits
production code anyway, the charter is too loose or the tools are too broad.

---
# A role charter

```text
.github/agents/
└── test-writer.md
```

A profile names one job, allowed inputs and tools, validation, stop conditions, and a manual fallback. It does not grant new authority.

---
# Least privilege

| Need | Capability | Decision |
| --- | --- | --- |
| Read target and tests | Repository read/search | Allow if approved |
| Add test | Edit named test file | Allow if approved |
| Run known test | Command execution | Conditional |
| External data | MCP or network | Remove unless needed |
| Merge | Privileged action | Human only |

---
# Demo task

```text
Add tests for `validateEmail`.
- `"ada@example.com"` returns `true`.
- `"invalid"` returns `false`.
- `""` returns `false`.
- Change tests only.
- Run the verified focused test command.
```

Review the diff and test result separately. Stop if production code needs to change.

---
# Pick the smallest extension

| Need | Use |
| --- | --- |
| Repository convention | Instructions |
| Repeatable procedure | Skill |
| Specialized role | Custom agent |
| Approved external capability | MCP |

---
<!-- _class: divider -->
# Lab

Create and review a test-writer and documentation profile. Use the data-analyst exercise only after its MCP server is approved.
