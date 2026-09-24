# Session 15 Trainer Guide: Evidence Before Repair

## Delivery objective

Teach a repeatable debugging sequence: observe, reproduce, form a hypothesis,
repair, then prove. Keep the reference answer hidden until learners record their
investigation. Case 3 adds a second failure after the first repair.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:08 | Observation, hypothesis, and proof |
| 0:08–0:18 | Local application baseline |
| 0:18–0:34 | Prepared pipeline investigation |
| 0:34–0:44 | Multi-stage failure |
| 0:44–0:54 | Security remediation review |
| 0:54–1:00 | Lab handoff |

## Prepare

- Run the pipeline application tests, lint, and build.
- Keep the solution directory closed during the first investigation.
- Hold `error-log-3-stage-2.txt` until the first Case 3 repair.
- Prepare the vulnerable and secure source side by side.
- Do not depend on a remote workflow run or security product.

## Debugging sequence

Use this record:

```text
Observation:
Local proof:
Hypothesis:
Smallest repair:
Proof after repair:
```

An observation quotes a file, command, or log. A hypothesis explains those facts.
Do not let learners write the root cause before they have evidence.

## Prepared investigation

Start with Case 2 because the tempting dependency fix is wrong. Show the failed
`npm ci` step and workflow. Run `npm ci` from the session root, then run the same
operation with `--prefix lab/starter/pipeline-app`.

Pause for learner hypotheses. Reveal the reference fix only after the room explains
why the project location matters.

## Multi-stage failure

For Case 3:

1. Show `error-log-3.txt`.
2. Record the first observation and local package metadata.
3. Apply only the first repair.
4. Announce that the next run reached another stage.
5. Reveal `error-log-3-stage-2.txt`.
6. Repeat the evidence sequence.
7. Compare with the solution after both proofs pass.

The first failure can hide another fault. New evidence should update the diagnosis,
not trigger a broad rewrite.

## Security review

Open one vulnerable route at a time. Ask learners to identify the source, sink,
and expected protection before showing the secure file.

Use local syntax checks as the minimum executable proof. If an approved scan is
available, add it as evidence. A clean scan alone does not prove that the repair
preserves behavior or covers the intended path.

## Access policy

GitHub Copilot and Node.js 20.x are required. Stop if either is unavailable.
Actions, code scanning, and remote remediation are optional. Use the supplied
files and local commands when those routes are unavailable.

## Lab handoff

Learners must keep solutions closed until each checkpoint. Case 3 requires two
evidence records in sequence. The deliverable is the investigation trail plus the
fixed files, not a list of answers.

## Facilitator answer key

Reveal this section only after the matching investigation:

- Case 1 uses a runtime below the application's declared engine.
- Case 2 runs npm from the wrong directory.
- Case 3 first includes an unsupported runtime, then reaches a build job that runs
  outside the application directory.

## Common questions

**Can Copilot name the cause first?** Ask it to separate observations from
hypotheses. Learners still need local proof before changing the workflow.

**Why keep the second log hidden?** The first failed job prevents the later stage
from running. Showing both logs early gives away the sequence.

**What if a different repair works?** Accept it when it explains the evidence,
keeps scope small, and passes the same proof.
