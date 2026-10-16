# Prepare CLI language servers

Install and check the language server before the workshop. Use the training
machine's package policy and keep tool permissions in place. A language-server
process is executable software; read the project configuration before opening
the workspace in Copilot.

## JavaScript: Session m3-04

Use Node.js 22.22.2 or later for the JavaScript server used in this lab.

Check for `typescript-language-server` on `PATH`. If it is missing, install the
server and its TypeScript dependency:

```bash
npm install --global typescript@6 typescript-language-server
```

Use TypeScript 6 with this server, as its
[installation guide](https://github.com/typescript-language-server/typescript-language-server#installing)
specifies. Do not replace it with TypeScript 7.

The lab supplies `.github/lsp.json` and `jsconfig.json`. Open `copilot` from the
copied `agent-project` directory and run:

```text
/lsp show
/lsp test typescript
```

`test` starts a temporary server to check startup. You must also run an actual
definition/reference lookup in the lab.

## Python: Session m2-06

Check for `pyright-langserver` on `PATH`. If it is missing:

```bash
npm install --global pyright
```

Session m2-06 supplies a project `.github/lsp.json` with the server name `python`.
Start the CLI in the copied inventory project and run:

```text
/lsp show
/lsp test python
```

Run these checks before delivery. Wait until the application parses and its
tests pass before starting the code-navigation exercise.

## If a check fails

Use `/lsp logs` to read the error. Check the executable path, project root, and
file-extension mapping. Use `/lsp reload` after correcting the configuration.
Do not label text-search output as an LSP result. Stop the LSP exercise if the
server cannot start or return the requested lookup.

Project configuration applies to its Git repository. These labs use copied
projects as separate repositories; do not place their configuration at the
curriculum repository root or overwrite an existing project server definition.

Checked October 15, 2026:
[Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers).
