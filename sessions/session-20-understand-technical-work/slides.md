---
marp: true
theme: ghcp-ttt
paginate: true
header: 'GitHub Copilot Train-the-Trainer'
footer: 'Session 20: Understand Technical Work Without Reading Code'
---

<!-- _class: lead -->

# Understand Technical Work Without Reading Code

Session 20 | Product and Delivery Teams | Beginner

---

# GitHub Copilot is required

Before the session:

- sign in with an approved GitHub account;
- open GitHub Copilot Chat;
- submit a test prompt;
- confirm Copilot returns a response.

**Stop if access fails.** Resolve the account, license, policy, or service issue before continuing.

---

# Your job is to make a sound decision

You do not need to explain the implementation.

Use GitHub Copilot to question the supplied evidence and judge:

- what changes for users;
- what could go wrong;
- what remains unknown;
- who must review the decision.

---

# Use an evidence chain

| Artifact | What it can tell you |
| --- | --- |
| Repository overview | Product purpose and system boundaries |
| Issue | Intended problem, scope, and acceptance criteria |
| Pull request | Proposed implementation and stated validation |
| Diff evidence | Specific behavior changed |
| Checks | What automated validation ran and its result |
| Human review | Context, judgment, and approval ownership |

No single artifact tells the whole story.

---

# Ask business questions

- Which user journey changes?
- What behavior is new, removed, or altered?
- Which acceptance criteria have evidence?
- What could block release or create support load?
- Which claim needs a specialist to confirm?

Avoid broad prompts such as “Is this safe?”

---

# Separate claims by evidence state

| State | Meaning |
| --- | --- |
| Verified | Directly supported by a named artifact |
| Inferred | Reasonable conclusion, not directly proven |
| Generated | Suggested by an AI summary and not yet checked |
| Unknown | Evidence is missing or contradictory |

Generated does not mean false. It means **check it**.

---

# A summary is a map, not proof

GitHub Copilot can answer questions about repository and pull request context.

Use the answer to find likely files, checks, risks, and follow-up questions. Then inspect the cited artifact or ask the accountable owner.

---

# Read checks as evidence with limits

**Passed** means the configured check completed successfully.

It does not prove:

- every user path was tested;
- skipped tests are harmless;
- rollout and support plans are ready;
- the business requirement is correct.

---

# Escalate when the decision exceeds your evidence

| Signal | Escalate to |
| --- | --- |
| Security, identity, or permission behavior | Security or engineering owner |
| Personal or regulated data | Privacy or compliance owner |
| Accessibility evidence missing | Accessibility or UX owner |
| Failed, skipped, or absent release checks | Engineering or release owner |
| Requirement and implementation disagree | Product owner and engineering lead |

Escalation is a decision, not a failure.

---

# Lab deliverable

Write a one-page product impact and risk brief for the Service Request Portal change.

Use GitHub Copilot to analyze and question the synthetic evidence.

Include:

1. decision and confidence;
2. user and product impact;
3. verified evidence;
4. risks and unknowns;
5. review boundary and next action.

---

# Review standard

A strong brief is traceable.

Another person can identify:

- which artifact supports each material claim;
- which statements remain uncertain;
- why the work should proceed, pause, or change.
