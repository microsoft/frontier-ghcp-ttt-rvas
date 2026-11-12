---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M4-01: GitHub Actions & Workflow Generation'
---

<!-- _class: lead -->
# One application through GitHub Actions
## DevOps & infrastructure | Intermediate

Session M4-01 | 3 hours

---
# Agenda

| Time | Topic |
| --- | --- |
| 0:00 to 0:08 | Baseline and Actions model |
| 0:08 to 0:18 | Generate CI |
| 0:18 to 0:28 | Design deployment |
| 0:28 to 0:40 | Repair workflow failures |
| 0:40 to 0:52 | Validate a JavaScript action |
| 0:52 to 1:00 | Review and lab handoff |

---
# Start with repository facts

`copilot-webapp` already defines the contract:

```bash
npm ci
npm test
npm run lint
npm run build
test -f dist/app.js
```

The workflow calls these commands. It doesn't invent another build, artifact path, or runtime.

---
# A workflow is code with an execution boundary

| Review | Question |
| --- | --- |
| Trigger | Who can cause this code to run? |
| Runner | Which tools and trust boundary apply? |
| Permissions | What can the token read or change? |
| Commands | Do they exist in the repository? |
| Artifacts | Which files leave the job? |
| Environment | Which approval gate applies? |

---
# Generate CI from the application

```text
Read package.json, tests, and scripts/build.js. Create ci.yml for pull requests
and pushes to main. Use Node.js 20, npm ci, existing lint, test, and build scripts,
npm caching, contents: read, and a seven-day dist artifact.
```

Then check YAML syntax and application behavior:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' ci.yml
npm test && npm run lint && npm run build
```

---
# Deployment stays a design exercise

```text
build → staging → production
```

The workflow references environments and secrets. Production reviewers are set in repository settings. Placeholder commands must not imply a deployment ran.

---
# Syntax and behavior fail differently

`broken-ci.yml` doesn't parse.

`broken-deploy.yml` parses but has a stale runner, a bad Git ref, a wrong secret name, and no checkout.

Get the failed-step output before the repair.

---
# Tie each repair to a failure

```text
Observation: the parser fails near Setup Node.js.
Change: align the step indentation.
Proof: parse the file again.
```

For behavior faults, cite the deployment spec or repository facts, then check the repair.

---
# Validate both action outcomes

```bash
env INPUT_THRESHOLD=0 ... node src/main.js
env INPUT_THRESHOLD=101 ... node src/main.js
```

The first run passes and writes a summary. The second exits with code 1.

One successful run doesn't show the action enforces the threshold.

---
<!-- _class: divider -->
# Lab

Create CI, design deployment, repair failures, and validate the action against `copilot-webapp`.
