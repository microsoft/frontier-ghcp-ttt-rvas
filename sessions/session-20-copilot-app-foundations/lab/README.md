# Session 20 Lab: Product Impact and Risk Brief

**Duration:** 2 hours  
**Difficulty:** Beginner  
**Prerequisites:** Working access to GitHub Copilot Chat  
**Deliverable:** One-page product impact and risk brief

## Scenario

The fictional **Service Request Portal** lets employees submit requests and lets service coordinators route and track them. A stakeholder wants coordinators to set due dates and send reminders for requests that are approaching their due date.

You are reviewing the proposed work before release planning. You do not need to read code. Use GitHub Copilot to analyze the repository overview, issue, pull request material, diff evidence, checks, and stakeholder request. Then decide what the product team should do next.

All artifacts are synthetic and industry-neutral. Do not add customer names, source organization names, personal data, credentials, or private source code.

## Preflight

1. Copy `lab/starter/` to a writable folder if needed.
2. Sign in to the approved GitHub account with GitHub Copilot access.
3. Open GitHub Copilot Chat and submit a test prompt.
4. Confirm that Copilot returns a response and can use the supplied Markdown, text, and JSON evidence.
5. Confirm where you will write the final brief.
6. Set a stop boundary: you will not approve security, privacy, accessibility, architecture, or release readiness without the responsible owner or direct evidence.

> [!IMPORTANT]
> **Stop if GitHub Copilot is unavailable.** Resolve the account, license, policy, or service issue before you continue. The starter assets remain the lab evidence, but they do not replace Copilot access.

## Time plan

| Phase | Time | Result |
| --- | --- | --- |
| 1. Orient to the evidence | 20 min | Product purpose and requested outcome |
| 2. Build an evidence matrix | 35 min | Claims classified by evidence state |
| 3. Assess impact and risk | 35 min | Decision, risks, unknowns, and owners |
| 4. Write and review the brief | 30 min | One-page reviewed deliverable |

## Phase 1: Orient to the evidence (20 min)

Give GitHub Copilot these files in order:

1. `starter/repository-overview.md`
2. `starter/stakeholder-request.md`
3. `starter/issue-142.md`

Ask Copilot:

```text
Use only these supplied artifacts. Explain the product purpose, requested outcome,
affected user behavior, explicit exclusions, and acceptance criteria that affect
release confidence. Cite the artifact for each claim. Mark missing evidence as unknown.
```

Check the response against the source files. Write short answers:

- Who uses the portal?
- What outcome does the stakeholder want?
- Which user behavior should change?
- What is explicitly out of scope?
- Which acceptance criteria would affect release confidence?

Do not give Copilot the pull request summary yet. Build the first view from the request and issue.

## Phase 2: Build an evidence matrix (35 min)

Read:

1. `starter/pull-request-87.md`
2. `starter/diff-evidence.txt`
3. `starter/checks.json`

Copy `starter/evidence-matrix-template.md`. Ask GitHub Copilot to compare the new evidence with the Phase 1 findings. For each material claim, choose one state:

- **Verified:** directly supported by a named artifact.
- **Inferred:** reasonable but not directly proven.
- **Generated:** stated by an AI-generated summary and not yet checked.
- **Unknown:** evidence is missing, unclear, or contradictory.

Use this prompt:

```text
Compare these artifacts for a product manager. Build a table with claim,
supporting artifact, evidence state, product impact, and follow-up question.
Treat generated summaries as unverified until another artifact supports them.
```

Check the answer against the supplied evidence. Correct any claim that cites the PR summary as its only proof.

## Phase 3: Assess impact and risk (35 min)

Ask GitHub Copilot to identify product impact, release risk, missing evidence, and the owner for each open question. Then decide whether to:

- **Proceed:** evidence supports the intended outcome and release boundaries.
- **Request changes:** the direction is sound, but material evidence or work is missing.
- **Pause:** the proposed work conflicts with the requirement or creates an unresolved high-impact risk.

Assess these areas:

| Area | Question |
| --- | --- |
| User impact | What changes in the coordinator's workflow? |
| Scope | Does the proposed work match the issue and exclude unrelated work? |
| Quality | Which criteria have direct test or review evidence? |
| Accessibility | Is keyboard and assistive-technology behavior proven? |
| Operations | Could reminder timing or volume create support load? |
| Release | Which failed, skipped, or missing evidence blocks confidence? |

Use a focused follow-up prompt when an answer lacks evidence:

```text
For each risk, cite the supplied artifact, state what remains unknown, and name
the owner who must answer it. Do not claim that a skipped or missing check passed.
```

For every material risk, name:

1. the evidence;
2. likely product effect;
3. severity and confidence;
4. owner;
5. next action.

## Phase 4: Write and review the brief (30 min)

Copy `starter/product-impact-risk-brief-template.md`. Ask GitHub Copilot to draft the brief from your completed evidence matrix. Keep the completed brief to one page when rendered or printed.

The brief must contain:

- decision and confidence;
- requested outcome and user impact;
- verified scope;
- evidence table;
- risks and unknowns;
- review boundaries;
- next action and owner.

Pair review:

- Can the reviewer trace every material claim to a named artifact?
- Are generated statements labelled?
- Are inferences separate from facts?
- Does the decision follow from the evidence?
- Does the brief escalate specialist decisions instead of pretending to resolve them?

Review every Copilot claim against the evidence. Then compare your work with `solution/product-impact-risk-brief.md`.

## Deliverable

Submit one completed product impact and risk brief based on `product-impact-risk-brief-template.md`. Keep it to one rendered or printed page. A reviewer must be able to trace each material claim to an artifact and see which decisions still need a specialist or accountable owner.

## Copilot troubleshooting

If Copilot cannot use several files in one request, add one artifact at a time and ask it to update the same analysis. Keep the artifact name in every prompt.

If Copilot produces an unsupported claim, mark it **generated**. Ask for the source, narrow the prompt, and check the answer again.

If Copilot stops working, pause the lab. Resolve access before you continue.

## Review boundaries

You are reviewing product and delivery evidence. You are not certifying code correctness, accessibility, security, privacy, or production readiness.

Escalate:

- the skipped accessibility check to the accessibility or UX owner;
- reminder timing and volume to the notification service owner;
- any mismatch between criteria and implementation to the product owner and engineering lead;
- release approval to the accountable release owner.

## Completion checklist

- [ ] The brief fits on one page.
- [ ] GitHub Copilot was used to analyze and question the supplied evidence.
- [ ] The user impact is written in business language.
- [ ] Every material fact names its evidence.
- [ ] Generated, inferred, and unknown claims are marked.
- [ ] Failed, skipped, and missing checks are not described as passing.
- [ ] The decision is proceed, request changes, or pause.
- [ ] Specialist review boundaries and owners are explicit.
- [ ] No customer or source organization names appear.
