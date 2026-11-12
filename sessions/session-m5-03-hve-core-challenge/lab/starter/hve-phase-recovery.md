---
description: "Trainer-guided recovery when one HVE challenge phase cannot complete"
---

# HVE phase recovery

Use this recovery guide when one HVE agent invocation or one validation command cannot
complete. The trainer supplies the missing phase artifact so the learner can
inspect its handoff and continue with the next HVE agent.

## Recovery protocol

1. Record the failed HVE entry point, exact error, and time spent.
2. Record the failed execution in the next HVE artifact. Add it to unresolved risks
   in the challenge handoff if it remains open.
3. Inspect the trainer-provided artifact for that phase.
4. Name the decisions and constraints the next phase must use.
5. Continue with the next HVE agent and cite the supplied artifact path.
6. Say in the handoff which phase you recovered.

If HVE is unavailable for the whole lab, switch to an instructor walkthrough and
record your observations.
