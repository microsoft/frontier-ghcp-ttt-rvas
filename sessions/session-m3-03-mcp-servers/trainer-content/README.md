# Session M3-03 trainer guide: MCP servers

## Teaching goal

Learners leave knowing what MCP is, how to add a server to the real Copilot CLI, how approvals work, and where the risks are. They have seen Copilot call a server they ran themselves.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:10 | What MCP is |
| 0:10 to 0:22 | Configure servers in Copilot CLI |
| 0:22 to 0:32 | Demo: GitHub server and approvals |
| 0:32 to 0:40 | Skill vs custom agent vs MCP |
| 0:40 to 0:52 | Pros, cons, and tips |
| 0:52 to 1:00 | Lab handoff |

The timings match [`slides.md`](../slides.md).

## Preparation

- Install Copilot CLI and sign in. Check that `/mcp` opens and lists the GitHub server.
- Run the lab once. Keep [`lab/solution/custom-mcp/`](../lab/solution/custom-mcp/) open for comparison.
- Check whether learners' organizations allow MCP servers and the Microsoft Learn URL. Copilot Business and Enterprise policies can block them.
- Install Node.js 20 or later.
- Use a public repository for the demo. Never demo with a real token on screen.
- Check the docs for current command names. The CLI changes often.

## What MCP is (0:00 to 0:10)

Use the USB analogy once, then drop it: a standard plug so any client works with any server.

- **Client and server.** Copilot CLI is the client. The server is a program that lists tools and runs them.
- **Tools, resources, prompts.** Tools are actions the model calls. Resources are readable data. Prompts are templates you pick. Most servers, and most of this lab, are about tools. Check current docs for which client supports which.
- **Transports.** stdio starts a local process. HTTP reaches a remote service. SSE is deprecated.
- **Schema.** Each tool has a JSON Schema for its arguments. The model reads it to fill in a call. The server uses it to reject bad input.

Walk the five steps on the "How a tool call works" slide. Stress step 4: the user can approve every call.

## Configure servers (0:10 to 0:22)

Show `/mcp`, `/mcp add`, `/mcp show`, and `copilot mcp add`. Open `~/.copilot/mcp-config.json` and point out `type`, `command` or `url`, and `tools`.

Mention VS Code in one minute: it uses `.vscode/mcp.json` with a `servers` key. Learners who use both editors need both files. The CLI doesn't read the VS Code file.

Mention project config: `.mcp.json` or `.github/mcp.json`, loaded after folder trust.

## Demo script: GitHub server and approvals (0:22 to 0:32)

1. `/mcp`. Select the GitHub server. Show the tool list.
2. Ask: `Using the GitHub MCP server, list 5 open issues in github/copilot-cli. Titles and numbers only.`
3. Read the approval prompt aloud. Explain allow once vs allow for the session vs saved approval.
4. Quit. Start with `copilot --deny-tool='github-mcp-server(list_issues)'`. Ask again. Show the refusal. **Check the exact server and tool names in `/mcp show` first.** They vary by version.
5. Ask: what would you allow for a read-only reviewer? What would you deny?

If the demo fails, show the dashboard and the config file instead. Don't debug live for more than two minutes.

## Skill vs custom agent vs MCP server (0:32 to 0:40)

Same table as [M3-05](../../session-m3-05-agent-skills/trainer-content/README.md). **Skill is know-how. Custom agent is a role. MCP is reach.** One sentence each, then the combination: an agent can use skills, and a skill can describe how to use an MCP server's tools. Link to [M3-04](../../session-m3-04-custom-agents/trainer-content/README.md) for agents. Don't re-teach them.

Quick check. Ask where each belongs:

| Need | Best home |
| --- | --- |
| Query the issue tracker | MCP server |
| Release notes in the team format | Skill |
| Read-only reviewer persona | Custom agent |
| Always use 2-space indentation | Instructions |

## Pros, cons, and tips (0:40 to 0:52)

**Pros.** Live data, real actions, one server works in many clients, and a registry of existing servers.

**Cons.**
- **Credentials.** A token in config acts as you. Use the narrowest scope.
- **Context cost.** Every tool's name, description, and schema goes into the prompt. Many tools mean less room for your code and worse tool choice.
- **Prompt injection.** Tool output is untrusted input. Issues, web pages, and files can hold instructions. Approval prompts and least privilege are your defenses.
- **Trust.** A local server runs code on your machine. Read the source first.

**Tips.** Few focused tools. Descriptions written for the model. Read-only by default. Limit `tools` in config. Disable servers you don't need.

## Common mistakes

| Mistake | Symptom | Fix |
| --- | --- | --- |
| Logging to stdout | Server connects, then fails | Log to stderr |
| Relative path in `args` | Server not found | Use an absolute path |
| Vague description | Copilot never calls the tool | Say what it does and when |
| Forgot to restart | New tool missing | Restart the session or check `/mcp` |
| Token in a committed file | Leaked secret | Use environment variables; rotate the token |
| `--yolo` with an unknown server | No approval before a risky call | Allow named tools only |

## Lab notes

- Part 1: the GitHub server needs no setup. A learner whose policy blocks it can read the docs and do Parts 3 to 5.
- Part 2: the Microsoft Learn URL is `https://learn.microsoft.com/api/mcp`. If it fails, use another HTTP server from the [GitHub MCP Registry](https://github.com/mcp) or `/mcp search`.
- Part 3: use `copilot mcp add`, so the path stays absolute. Most failures are a relative path or stdout logging.
- Part 4: results vary by model. A vague description often still works on simple prompts. Have learners try a harder prompt such as a chained question.
- Part 5: the model may ignore the injected note. That is a valid result. Tell learners that one pass doesn't prove safety.
- Part 6: remove servers so the next session starts clean.

## Answer key

- Part 1: the tool name depends on the question, such as `list_issues` or `search_issues`. Arguments include owner, repo, and state.
- Part 3: Oslo returns 30 °C and rain.
- Part 4: 30 °C is 86 °F. The finished tool is in `lab/solution/custom-mcp/src/index.js`.
- Part 5: the finished injection is in the solution. A good answer denies the shell command.

## References

- [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
- [Allowing and denying tool use](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools)
- [About MCP](https://docs.github.com/en/copilot/concepts/customizations/mcp)
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)
- [GitHub MCP Registry](https://github.com/mcp)
