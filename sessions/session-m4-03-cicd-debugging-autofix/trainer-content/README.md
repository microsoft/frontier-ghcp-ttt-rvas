# Session M4-03 trainer guide: Reproduce before repair

## Teaching goal

Learners observe and reproduce the failure before forming a hypothesis, then repair and check. Keep the reference answers closed until they record their investigation. Case 3 adds a second failure after the first repair.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00 to 0:08 | Observation, hypothesis, and check results |
| 0:08 to 0:18 | Local application baseline |
| 0:18 to 0:34 | Prepared pipeline investigation |
| 0:34 to 0:44 | Multi-stage failure |
| 0:44 to 0:54 | Security remediation review |
| 0:54 to 1:00 | Lab handoff |

## Prepare

- Run the pipeline application tests, lint, and build.
- Keep the solution directory closed.
- Hold `error-log-3-stage-2.txt` until the first Case 3 repair.
- Put the vulnerable and secure source side by side.

## Debugging sequence

```text
Observation:
Local proof:
Hypothesis:
Smallest repair:
Proof after repair:
```

An observation quotes a file, command, or log. A hypothesis explains those facts. Don't let learners write the root cause before they've checked the files and logs.

## Prepared investigation

Start with Case 2, because the tempting dependency fix is wrong. Show the failed `npm ci` step and workflow. Run `npm ci` from the session root, then again with `--prefix lab/starter/pipeline-app`.

Pause for hypotheses. Reveal the reference fix once the room can explain why the project location matters.

## Multi-stage failure

For Case 3:

1. Show `error-log-3.txt`.
2. Record the first observation and local package metadata.
3. Apply only the first repair.
4. Say that the next run reached another stage.
5. Reveal `error-log-3-stage-2.txt` and repeat the investigation.
6. Compare with the solution after both checks pass.

The first failure can hide another. Update the diagnosis from the new log and keep each repair focused.

## Security review

Open one vulnerable route at a time. Ask learners to name the source, sink, and expected protection before you show the secure file.

Run the local syntax checks. A clean scan doesn't show the repair preserves behavior or covers the intended path.

## Lab handoff

Learners keep solutions closed until each checkpoint. Case 3 needs two investigation records in sequence. They submit the records and the fixed files.

## Answer key

Reveal after the matching investigation:

- Case 1 uses a runtime below the application's declared engine.
- Case 2 runs npm from the wrong directory.
- Case 3 first includes an unsupported runtime, then reaches a build job that runs outside the application directory.

## Common questions

**Can Copilot name the cause first?** Ask it to separate observations from hypotheses. Learners still need local command results before changing the workflow.

**Why hold back the second log?** The first failure stops the later stage from running. Showing both logs early gives away the sequence.

**Accept a different repair** if it explains the observed output, stays small, and passes the same checks.
