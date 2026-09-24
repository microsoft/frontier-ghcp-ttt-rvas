---
description: "Trainer-guided recovery when one HVE challenge phase cannot complete"
---

# HVE phase recovery

Use this fallback when one HVE agent invocation or one validation command cannot
complete. The trainer supplies the missing phase artifact so the learner can
inspect its handoff and continue with the next HVE agent.

This is a recovery route, not a manual equivalent. A learner who does not run HVE
cannot complete the challenge.

## Recovery protocol

1. Record the failed HVE entry point, exact error, and time spent.
2. Mark that phase `not run` or `incomplete` in the evidence workbook.
3. Inspect the trainer-provided artifact for that phase.
4. Name the decisions and constraints the next phase must consume.
5. Continue with the next HVE agent and cite the supplied artifact path.
6. Do not claim execution credit for the recovered phase.

## Minimum HVE evidence

The final submission must contain learner-generated evidence from:

* at least two RPI phases, including Review;
* one repository or targeted instruction activation;
* Product Manager Advisor or Agile Coach;
* one human approval or pause decision.

If HVE itself is unavailable for the whole lab, switch to an instructor walkthrough.
The learner may record observations but should not be marked complete.