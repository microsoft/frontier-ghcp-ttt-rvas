# Fleet scenario: inspect the repaired project

Use `/plan`, then `/fleet` to analyse independent parts of the repaired
`agent-tasks` project. Record results in `workflow-record.md`.

## Plan before delegation

```text
/plan Split a read-only analysis of agent-tasks into independent questions about
src/app.js, src/utils.js, and tests/. Give each task input paths, an expected
result, and a stop rule. Identify any shared assumption the parent must settle
first. Do not edit files or delegate implementation alongside dependent tests.
```

Review the breakdown and agree a usage limit. Leave Plan mode before starting
the fleet.

## Run and inspect

```text
/fleet Use the accepted analysis plan. Assign independent read-only tasks for
route behavior, utility input contracts, and test gaps. Each result must cite
files and separate proven defects from proposed improvements. Do not edit files,
install packages, or use the network. Stop on scope growth or the usage limit.
```

Open `/tasks`, inspect the live child tasks, and stop work that crosses the rule.
Check at least one claim per result against a file or focused test. Ask the parent
to reconcile duplicates and conflicting conclusions.

**Do not grade agent count or speed.** Record the tasks actually created. If the
work stayed sequential, the trainer must adjust the split before learners can
claim hands-on fleet completion.

## Compare the tools

| Tool | Use in this curriculum |
| --- | --- |
| `/fleet` | Parallel subagents for suitable parts of one task; available in CLI and app |
| `/tasks` | Inspect CLI child-task details and stop a task |
| `/delegate` | Cloud changes and a pull request; taught in Session M3-02 |
| `/orchestrate` | App built-in skill for steerable sessions; taught in Session M7-05 |

Finish with `/usage`. Record the observed usage and explain whether this task
justified parallel work. Never estimate a sequential runtime you did not measure.
