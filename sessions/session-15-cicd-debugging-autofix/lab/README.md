# Session 15 Lab: Evidence-Led Pipeline Debugging

**Duration:** 2 hours
**Difficulty:** Advanced
**Prerequisites:** Sessions 01–05 and 13
**Deliverable:** Three evidence records, fixed workflows, and a reviewed security patch

## Lab overview

| Part | Work | Time |
| --- | --- | --- |
| 1 | Prove the local application baseline | 10 min |
| 2 | Investigate three pipeline cases | 50 min |
| 3 | Review a security remediation | 30 min |
| 4 | Improve feedback speed | 20 min |
| 5 | Package evidence | 10 min |

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). You must have GitHub Copilot access and Node.js 20.x. Use only the supplied application, logs,
and workflow files.

Remote workflow runs and security products are optional. Use them only when the
instructor confirms access and policy. **The local path is required.** If GitHub
Copilot access is unavailable, stop.

Do not open `lab/solution/fixed-pipelines/` until a checkpoint tells you to compare.
For Case 3, do not open `error-log-3-stage-2.txt` until the first repair is complete.

## Setup

Run all commands from this session directory unless a command changes directory.

Prove the application works before you inspect the pipeline:

```bash
cd lab/starter/pipeline-app
npm ci
npm test
npm run lint
npm run build
test -f dist/index.js
cd ../../..
```

Expected result: install, tests, lint, and build pass.

Create one evidence record per case:

| Field | Record |
| --- | --- |
| Failed job and step | |
| Exact observation | |
| Local proof command | |
| Hypothesis | |
| Smallest repair | |
| Proof after repair | |

## Part 1: Investigate the pipeline cases

For every case:

1. Read the workflow and failed-step output.
2. Record observations without naming a root cause.
3. Run the local proof command.
4. State one hypothesis.
5. Ask Copilot to challenge the hypothesis and propose the smallest repair.
6. Validate the repaired YAML.
7. Compare with the solution only after the checkpoint.

Use this prompt:

```text
Read this workflow and failed-step output. Separate observations from hypotheses.
Use the supplied local command as additional evidence. Propose the smallest repair
and one proof command. Do not change unrelated jobs.
```

### Case 1

Open `pipeline-1.yml` and `error-log-1.txt`.

Run:

```bash
node --version
cd lab/starter/pipeline-app
npm pkg get engines.node
npm test
cd ../../..
```

Record what the log and package metadata say. Edit only after your hypothesis
explains both.

After the repair:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/failing-pipelines/pipeline-1.yml
```

**Checkpoint:** Record the proof, then compare with
`lab/solution/fixed-pipelines/pipeline-1.yml`.

### Case 2

Open `pipeline-2.yml` and `error-log-2.txt`.

Run the failing command from the workflow location:

```bash
npm ci
```

Expected failure: npm cannot find the project package metadata in the session root.
Prove that the application command works:

```bash
npm --prefix lab/starter/pipeline-app ci
npm --prefix lab/starter/pipeline-app test
```

After the repair, parse the YAML and compare with the solution.

**Checkpoint:** The repair must explain why changing dependency resolution would
not address the observed path failure.

### Case 3: multi-stage failure

Open `pipeline-3.yml` and `error-log-3.txt`. Investigate only the first failed
stage.

Run:

```bash
cd lab/starter/pipeline-app
npm pkg get engines.node
npm ci
npm test
cd ../../..
```

Repair the first failure and parse the workflow. Then open
`error-log-3-stage-2.txt`. The second log represents the next run after the first
repair.

Use the new evidence. Do not restore the first change or add unrelated fixes.
After the second repair, run:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/starter/failing-pipelines/pipeline-3.yml
npm --prefix lab/starter/pipeline-app run build
test -f lab/starter/pipeline-app/dist/index.js
```

**Checkpoint:** Record two observations, two repairs, and separate proof for each
stage. Then compare with `lab/solution/fixed-pipelines/pipeline-3.yml`.

## Part 2: Review a security remediation

Open `lab/starter/vulnerable-app/src/app.js`. Run local syntax proof:

```bash
node --check lab/starter/vulnerable-app/src/app.js
```

Complete the CodeQL workflow template. If an approved remote scan is available,
inspect its findings. Otherwise use the supplied source as the finding context.

Investigate these sinks without opening the secure solution:

- SQL query construction;
- HTML response construction;
- file path resolution.

Ask for one repair at a time. Review the diff, then compare with
`lab/solution/secure-app/src/app.js`. Run the focused proof:

```bash
node --check lab/solution/secure-app/src/app.js
npm ci --prefix lab/solution/secure-app
npm test --prefix lab/solution/secure-app
```

Record why parameterized queries, output encoding, and resolved-path containment
address the observed code paths. The three tests must pass. Do not accept scanner
silence as the only proof.

## Part 3: Improve feedback speed

Review `lab/starter/slow-pipeline/workflow.yml`. Preserve its checks while adding
lockfile caching, parallel lint and test jobs, shallow checkout, and a main-push
deployment condition.

Validate:

```bash
ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' \
  lab/solution/optimized-pipeline/workflow.yml
grep -nE "cache: 'npm'|needs: \\[lint, test\\]|fetch-depth: 1|github.event_name" \
  lab/solution/optimized-pipeline/workflow.yml
```

## Final deliverable

Submit:

1. Three fixed workflows.
2. Three evidence records, with two stages for Case 3.
3. A reviewed security patch and local syntax proof.
4. The optimized workflow review.

Write the root-cause statement after the observation and local proof. Keep the
original logs unchanged in the evidence package.
