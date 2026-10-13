# Repository instructions

## Writing

### Writing gate

Before drafting, editing, or returning repository prose, invoke
`/humanize-writing`. This includes technical documentation, session kits,
runbooks, Markdown, slide content, and user-facing explanations.

In this repository, use the skill to simplify wording and remove AI-patterns from
technical content. Its general technical-writing exclusion does not apply here.

Use the `clear-thinker` voice unless the user requests another voice.

Before finishing, complete both checks:
1. Apply the prose simplification rules in this file.
2. Apply the `/humanize-writing` AI-pattern dictionary and revise the draft until
   it passes.

### Default writing style

Write like a senior engineer explaining something to another competent engineer.

Prefer:
- short, direct sentences;
- concrete verbs over abstract nouns;
- active voice when the actor matters;
- ordinary words over formal or bureaucratic alternatives;
- one main idea per sentence;
- explicit subjects: say who does what;
- the shortest wording that preserves the technical meaning.

Write technical content clearly. Complexity should come from the subject, not from the prose.

Bad:
"If the earlier controls were implemented outside this series, confirm the required state in the table below."

Better:
"If you already implemented these controls elsewhere, check that they match the requirements below."

Bad:
"Completion of the configuration enables the establishment of the required governance posture."

Better:
"Complete this configuration to apply the required governance controls."

Bad:
"This section provides guidance for the implementation of controls that enable organizations to..."

Better:
"This section shows how to implement controls for..."

### Avoid bureaucratic prose

Do not turn verbs into abstract nouns when a verb works:
- "perform validation of" -> "validate"
- "make a determination" -> "decide"
- "provide configuration of" -> "configure"
- "enable the establishment of" -> "establish"
- "conduct an assessment of" -> "assess"

Avoid vague institutional phrases such as:
- "required state"
- "desired state"
- "in the context of"
- "with respect to"
- "in order to"
- "as part of this exercise"
- "the implementation of"
- "the configuration of"
- "it is important to note"
- "this enables organizations to"
- "the following section provides"
- "where applicable"
- "as appropriate"

Use them only when they carry necessary technical meaning.

### Curriculum wording

Write instructions as actions, not policy summaries.

Prefer:
- "Learners need GitHub Copilot and Python 3.10 or later."
- "Check the current GitHub docs before the demo."
- "If Agent mode is unavailable, stop the lab."
- "Run `npm test` and save the output."

Avoid:
- "approved editor," "approved path," or "approved environment" when no person
  makes an approval decision;
- "live route," "access gate," "delivery baseline," and "required capability"
  when "lab," "before the lab," or the tool name is enough;
- repeating the shared safety policy in every session;
- abstract labels such as "evidence," "bounded," "explicit," "durable," or
  "observable" when the exact file, command, result, or limit can be named.

Use **approved** only when an approval is real and relevant. Name what is approved:
repository access, data use, package installation, or a production action.

Name the proof. Write "test output," "diff," "review comment," or "decision log"
instead of "evidence" when one of those is what you mean.

Use one checking verb. Prefer **check**. Use **verify** or **confirm** only when
they describe a different action.

Session files should link to `sessions/learning-safety-baseline.md` instead of
copying its policy text. Add session-specific rules only when that session needs
them.

Before finishing curriculum prose, search the changed text for these words:
`approved`, `applicable`, `bounded`, `durable`, `evidence`, `explicit`, `verify`,
and `confirm`. Keep each use only when a simpler, more concrete phrase would lose
meaning.

### Do not over-explain

State the point, explain why it matters when necessary, and move on.

Do not add:
- introductory sentences that merely announce the next paragraph;
- conclusions that repeat the preceding paragraph;
- obvious explanations for expert readers;
- generic benefits;
- artificial transitions between every section;
- exhaustive qualification of straightforward statements.

Do not make a sentence more formal simply because it is documentation.

> [!IMPORTANT]
> Include enough detail for the reader to act. Stop when more text would not
> improve understanding or change a decision. Simpler is better.

Add some strategic bold text.

### Final prose pass

After drafting, read every sentence as if you had to say it aloud to a colleague.

For each sentence ask:
1. Could this be shorter without losing meaning?
2. Is there a simpler verb?
3. Is the subject clear?
4. Is an abstract noun hiding a simple action?
5. Would an experienced engineer actually say this?
6. Does the sentence contain information worth keeping?

Rewrite or delete sentences that fail this test.

Then apply the `/humanize-writing` AI-pattern dictionary.

Preserve technical facts, Microsoft product names, dates, citations, and governance terminology exactly.
