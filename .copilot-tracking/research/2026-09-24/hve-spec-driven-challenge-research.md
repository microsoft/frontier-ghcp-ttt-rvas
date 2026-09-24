<!-- markdownlint-disable-file -->

# HVE spec-driven challenge research

## Scope

Add a branch-backed HVE challenge to the GitHub Copilot Train-the-Trainer
curriculum. The source checkout at
`C:\Users\vzisiadis\repos\hve-all\hve-showcase` remains read-only.

## Evidence

* The HVE showcase was read at commit
  `598ba5fbc937abf0dce622b97bcafda63bbc2dd1`.
* Its seven demos cover full RPI delivery, daily engineering work, product
  planning, Git operations, prompt engineering, security planning, and local
  customization.
* The showcase contains facilitation scripts and expected artifact shapes. It
  does not contain the advertised runnable `demo-app/` or a completed solution.
* The checkout has no repository-level license file. Its README mentions the
  HVE Core MIT license, which does not establish reuse rights for the demo text.
* This curriculum publishes challenge material through complete sessions. A
  track page alone would omit the catalog, slides, lab assets, trainer guide,
  navigation, and validation contract.

Detailed findings:

* `.copilot-tracking/research/subagents/2026-09-24/hve-showcase-scenarios-research.md`
* `.copilot-tracking/research/subagents/2026-09-24/hve-curriculum-integration-research.md`

## Selected approach

Create optional Session 20, `session-20-hve-challenge`, and a dedicated HVE
Challenge track using Sessions 17, 18, and 20. Session 20 remains in Module 5 and
runs before the existing Session 19 capstone when both are delivered.

The lab uses a new Engineering Decision API. Learners implement one bounded POST
endpoint from a prepared brief. This avoids repeating Session 19's Bookmark API
while preserving a real code and test surface.

The challenge maps the source demos to original tasks:

| HVE scenario | Challenge task |
| --- | --- |
| Full RPI new app | Produce research, plan, implementation, and review evidence for one endpoint |
| Day-to-day RPI | Keep implementation bounded to a small multi-file feature with focused tests |
| Product owner and TPM | Trace acceptance criteria and non-goals into the task plan |
| Git operations | Prepare commit and pull-request text without changing remote state |
| Prompt engineering | Add and test one targeted review instruction |
| Security planning | Record input and data-boundary risks in the review |
| Customization | Add repository context and prove that the targeted instruction activates |

## Rejected approaches

* Extending Session 18 would make its existing two-hour lab exceed the published
  duration.
* A track-only challenge would bypass the repository's session contract.
* Reusing the Session 19 Bookmark API would blur the distinction between the HVE
  specialization and the capstone.
* Copying showcase prompts or templates would create an avoidable license risk.

## Success criteria

* Session 20 passes the session-format validator.
* Starter tests pass before learner work; solution tests pass after the reference
  implementation.
* Catalog, site navigation, homepage, track pages, counts, and browser tests agree
  on 20 sessions and seven tracks.
* Every source scenario maps to a core, stretch, or excluded task.
* The showcase checkout remains clean at the recorded commit.
