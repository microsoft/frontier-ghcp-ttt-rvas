# Custom agent profile reference

Repository profiles live in `.github/agents/`. Use a descriptive file name ending
in `.agent.md`.

## Exact profile structure used in this lab

```text
.github/
└── agents/
    └── test-writer.agent.md
```

```yaml
---
name: Test-only writer
description: Adds focused JavaScript tests in tests/ for named acceptance criteria and stops when production code must change.
target: github-copilot
tools:
  - read
  - search
  - edit
  - execute
disable-model-invocation: true
user-invocable: true
metadata:
  owner: training-maintainers
  contract-version: "1"
---
```

The Markdown body defines the trigger, allowed work, ordered procedure, validation,
stop conditions, and fallback.

## Frontmatter used here

| Property | Lab decision |
| --- | --- |
| `description` | Required. States the bounded job and stop condition. |
| `name` | Gives the profile a readable display name. |
| `target` | Limits this example to `github-copilot`. |
| `tools` | Uses the documented `read`, `search`, `edit`, and `execute` aliases. |
| `disable-model-invocation` | Requires deliberate selection for the lab. |
| `user-invocable` | Allows a learner to select the profile. |
| `metadata` | Records a synthetic owner and contract version. |

Omitting `tools` enables all available tools. This lab uses an allowlist because
the profile may read source, edit tests, and run one known command.

## References

- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Invoking custom agents from Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
