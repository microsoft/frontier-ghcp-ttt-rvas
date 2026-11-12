# Prepare CLI language servers

Install and check the language server before the workshop. A language-server process is executable software, so read the project configuration before opening the workspace in Copilot.

## JavaScript: Session M3-04

Use Node.js 22.22.2 or later.

Check for `typescript-language-server` on `PATH`. If it's missing:

```bash
npm install --global typescript@6 typescript-language-server
```

Use TypeScript 6 with this server, per its [installation guide](https://github.com/typescript-language-server/typescript-language-server#installing). Don't use TypeScript 7.

The lab supplies `.github/lsp.json` and `jsconfig.json`. Open `copilot` from the copied `agent-project` directory and run:

```text
/lsp show
/lsp test typescript
```

`test` starts a temporary server to check startup. You still need to run a real definition/reference lookup in the lab.

## Python: Session M2-06

Check for `pyright-langserver` on `PATH`. If it's missing:

```bash
npm install --global pyright
```

Session M2-06 supplies a project `.github/lsp.json` with the server name `python`. Start the CLI in the copied inventory project and run:

```text
/lsp show
/lsp test python
```

Wait until the application parses and its tests pass before you start the code-navigation exercise.

## If a check fails

Run `/lsp logs` to read the error. Check the executable path, project root, and file-extension mapping. Run `/lsp reload` after you fix the configuration. Text-search output isn't an LSP result: if the server can't start or return the lookup, stop the LSP exercise.

Project configuration applies to its Git repository. These labs use copied projects as separate repositories, so don't put their configuration at the curriculum repository root or overwrite an existing server definition.

See [Adding LSP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/add-lsp-servers).
