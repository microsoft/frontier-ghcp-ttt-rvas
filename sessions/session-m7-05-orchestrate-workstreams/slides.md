---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session M7-05: Orchestrate Agents and Workstreams'
---

<!-- _class: lead -->

# Orchestrate agents and workstreams

## Product and delivery teams, or developers after Session M2-05

Session M7-05 | 3 hours

---

<!-- _class: agenda -->

# Agenda

| Segment | Time |
| --- | --- |
| Parent objective, terms, and boundaries | 8 min |
| When to split, independence, shared dependencies | 10 min |
| Minimal workstream plan | 8 min |
| Monitor and intervene; failure modes | 12 min |
| Live demonstration | 12 min |
| Review and lab handoff | 10 min |

---

# Three terms

- **Parent-led orchestration:** one parent session owns the objective, starts
  children, and reviews what they return.
- **Child session:** a separate session that works one question from its own inputs.
- **Stop condition:** the one boundary that ends a child's work.

The parent keeps decision authority.

---

# Orchestration, parallel chats, delegation

| Approach | Difference |
| --- | --- |
| Parallel chats | You merge answers by hand. No parent reviews. |
| Delegation (M2-05, M3-02) | One task to one agent. You review one output. |
| **Orchestration** | A parent splits one objective, runs children, reconciles them. |

---

# When to split

Split when:

- the questions are independent;
- each child has its own inputs;
- the parent can check each result.

**Keep it in one session** when each step needs the last answer, or the work is
small enough that splitting costs more than it saves.

---

# Make workstreams independent

- One question per child, from separate inputs.
- Children don't read each other's results.
- **Shared dependency?** Move it to the parent, or settle it before you start.
- **Overlap?** If two children answer the same thing, redraw the split.

---

# Keep the plan small

Each workstream needs:

- a question with a clear scope;
- the inputs it may use;
- a **stop condition**;
- a reviewer.

Don't track progress in a status form. The orchestration surface already shows
session links, status, timing, and usage.

---

# Steer a running child

| Signal | Action |
| --- | --- |
| On scope | Wait |
| Safe work needs correction | Redirect |
| A boundary is crossed | Stop |
| The result meets the plan | Accept |
| The result lacks support | Reject |
| A person must decide | Escalate |

A redirect is a narrower question, not a restart:

```text
Map each rule in the brief to the test that would catch it. Which rules
have no test? Do not edit files.
```

Read the revised answer. **A follow-up doesn't prove the first answer was wrong.**

---

# Review each result

- Does it answer the assigned question?
- Does it use only the inputs you gave it?
- Did it obey the stop condition?
- Does it list gaps?
- Does a source back the recommendation?

**Reject confident answers that cite nothing.**

---

# Reconcile claims against the source

A child or author says, "Local tests pass, so the PR is ready."

Check the real source: is the check green on the head commit? Are review threads
still open?

**A claim doesn't override the system of record.** When children agree because
they read the same file, check the source, not the count.

---

# Failure modes

| Failure | Response |
| --- | --- |
| Hidden dependency: a child needs another's answer | Pause one; move the question to the parent |
| Overlap: two children answer the same thing | Merge or redraw |
| Child drifts past its question | Redirect |
| Child crosses the stop condition | Stop |
| Confident answer, no source | Reject |
| Agreement from a shared source | Check the source |

---

# The parent result is the handoff

A good parent result:

- links each finding to its source;
- shows rejected claims;
- names gaps and owners;
- recommends the next follow-up.

Later work reads this result and the live sources, not chat history.

---

# A person keeps authority

Copilot coordinates work. **A person reviews results** and approves any issue
update, publication, or release statement.

---

# Session M5-01 is different

| Session M5-01 | Session M7-05 |
| --- | --- |
| Persistent roles and routing | Temporary workstreams |
| Optional framework setup | Built-in orchestration |
| Shared memory | Live sources |

---

# In the lab

Start with `/orchestrate` (check current docs for your app version). You need
GitHub MCP for the product route, or Python 3.10 or later and your Session M2-05
work for the developer route.

| Route | Inputs | Result |
| --- | --- | --- |
| Product and delivery | Four live GitHub issues | Parent result used by Session M7-06 |
| Developer | Your M2-05 fix, tests, and pull request | Implementation, coverage, and PR conclusions |

You deliver an orchestration plan, live child results, and a reviewed parent
result. Include the redirects you made and the claims you rejected.
