# Session 20 Trainer Guide: Understand Technical Work Without Reading Code

**Duration:** 1 hour  
**Audience:** PMs, POs, BAs, project managers, delivery leads, and other non-developers

## Delivery objective

Learners should leave with a repeatable way to question technical work. The goal is not to make them code reviewers. It is to help them make better product and delivery decisions from evidence, state uncertainty clearly, and involve the right owner.

## One-hour plan

| Time | Segment |
| --- | --- |
| 0:00–0:06 | Frame the decision problem |
| 0:06–0:15 | Build the evidence chain |
| 0:15–0:25 | Ask business-language questions |
| 0:25–0:35 | Separate generated summaries from verified evidence |
| 0:35–0:47 | Service Request Portal walkthrough |
| 0:47–0:55 | Risk and escalation practice |
| 0:55–1:00 | Lab launch |

## Preflight

- Open `slides.md` and every file in `lab/starter/`.
- Keep the reviewed solution closed until the debrief.
- **Confirm every learner has working GitHub Copilot Chat access before the session.**
- Ask learners to sign in, open Chat, submit a prompt, and receive a response.
- Confirm Copilot can use the supplied Markdown, text, and JSON evidence.
- Use only the included synthetic scenario. Do not show customer repositories or name a source organization.

> [!IMPORTANT]
> **Do not start without GitHub Copilot access.** Stop and resolve account, license, policy, or service issues before the session. Do not replace the Copilot work with an alternate exercise.

## Core model: summary, evidence, decision

Use three columns on a whiteboard:

| Summary | Evidence | Decision |
| --- | --- | --- |
| A generated or human-written explanation | The artifact that supports or contradicts it | Proceed, request changes, or pause |

The distinction matters. A polished summary can still omit a skipped test, overstate scope, or treat an inference as fact. Learners should never copy a generated risk rating into a product decision without checking what produced it.

## Business-language question pattern

Teach learners to ask five types of question:

1. **Purpose:** What user or business problem should this work solve?
2. **Change:** Which visible behavior changes, and for whom?
3. **Proof:** Which issue criterion, diff fact, test, or check supports that claim?
4. **Risk:** What failure would users, operations, or the delivery plan notice?
5. **Boundary:** Which decision needs a specialist or accountable owner?

Learners will ask these questions in GitHub Copilot Chat. The questions stay useful across supported Copilot surfaces even when the interface changes.

## Prompt sequence

Use GitHub Copilot with the supplied synthetic evidence. Ask for sources in every answer.

```text
Explain this repository and the current change for a product manager.
Name the artifacts that support each claim. Mark anything you inferred.
```

```text
Compare the issue acceptance criteria with the pull request evidence and checks.
Return a table with: criterion, evidence, status, and question for the owner.
Do not treat the pull request description as proof.
```

```text
Draft a product impact and risk brief. Separate verified facts, inferences,
unknowns, and generated suggestions. Do not recommend release when a required
check failed or material evidence is missing.
```

If the answer lacks traceable sources, narrow the request to one artifact at a time. Keep learners in GitHub Copilot and ask them to check each answer against the named file.

## Prepared walkthrough

Use the Service Request Portal evidence in this order:

1. `repository-overview.md` establishes the product and boundary.
2. `stakeholder-request.md` explains the desired business outcome.
3. `issue-142.md` defines intended scope and acceptance criteria.
4. `pull-request-87.md` provides a generated summary plus author claims.
5. `diff-evidence.txt` records selected facts from the proposed change.
6. `checks.json` shows automated results.

Ask the group to find one claim in each evidence state:

- **Verified:** The issue and diff evidence show that coordinators can assign a due date.
- **Inferred:** Reminder behavior may increase notification volume.
- **Generated:** The PR summary says the change is ready for release.
- **Unknown:** Accessibility behavior for the new date control is not proven because the named check was skipped.

Then ask for a decision. The expected answer is **request changes before release**, with accessibility evidence and notification-owner confirmation as the main next actions.

## Review boundaries

Non-developers can:

- test whether the stated user outcome matches the request;
- trace claims to artifacts;
- identify missing acceptance evidence;
- flag product, rollout, support, and communication risk;
- name the owner needed for the next decision.

They should not:

- approve security, privacy, architecture, or code correctness outside their role;
- treat a passing check as proof of every behavior;
- infer production readiness from a generated summary;
- lower a release gate because the sprint deadline is close.

## Copilot troubleshooting

If Copilot cannot use several files in one request, add one artifact at a time. Ask it to update the same evidence matrix after each file.

If Copilot gives a weak answer, keep it as a teaching artifact. Ask learners to label unsupported claims, cite the missing evidence, and improve the prompt.

If Copilot access fails during the session, pause. Resolve the access problem before continuing the lab.

## Common questions

**Do I need to understand the diff?**  
No. You need a plain-language record of the changed behavior and a technical owner who can confirm material details. The supplied `diff-evidence.txt` models that bridge.

**Can a generated PR summary count as evidence?**  
It can point to evidence. The summary itself remains generated text until the relevant diff, check, issue, or owner confirms the claim.

**What if every check passes?**  
Check whether the right checks ran. Passing configured checks does not prove that omitted, skipped, human, or business validation occurred.

**When should a PM stop and escalate?**  
Stop when the decision depends on expertise, permissions, or evidence you do not have. State the unresolved question and name the owner.

## Product notes verified September 23, 2026

GitHub's current documentation supports these durable workflow statements:

- Copilot Chat on GitHub can answer questions using repository, issue, pull request, commit, and failed-workflow context.
- A pull request can be summarized or explored through questions about its changes and status.
- Status checks report whether configured validations such as builds, tests, scans, or deployments completed successfully.
- Copilot code review can miss problems and make mistakes. GitHub tells users to validate its feedback and add human review.

Availability, billing, policy controls, supported surfaces, review modes, and exact controls can change. Check the official documentation before a live demonstration:

- [Getting started with prompts for Copilot Chat on GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/get-started-with-chat)
- [Using GitHub Copilot to explore pull requests](https://docs.github.com/en/copilot/tutorials/explore-pull-requests)
- [Status checks](https://docs.github.com/en/pull-requests/reference/status-checks)
- [About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
- [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)
