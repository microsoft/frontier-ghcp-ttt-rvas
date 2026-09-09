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
