# Decision-Tree Interview Reference

This reference shows how to run the `grill-me` or `grilling` pattern with GitHub Copilot. It is not a skill-authoring exercise.

## Required access

Open an approved GitHub Copilot surface and test one prompt with a follow-up answer. **Stop and resolve access if the test fails.**

## Start

Give GitHub Copilot:

- the vague request;
- approved context or evidence;
- the decision areas that must close;
- the instruction to wait for shared understanding before drafting.

## Build the tree

Each decision can unlock more decisions. Keep branches visible:

```text
Problem
├── affected user
├── current pain
└── target outcome
    ├── scope
    │   ├── included behavior
    │   └── non-goals
    ├── constraints
    ├── success and failure
    └── ownership and approval
```

The shape will change as answers arrive.

## Ask the frontier

The frontier is the set of decisions that can be answered now. Ask all of them in one round.

Hold a question for a later round when its answer depends on an unsettled decision. For example, failure wording depends on which public statuses are in scope.

## Format each question

```text
Q1: <decision title>
<question and concrete choices>

Recommendation: <proposed answer and short reason>
```

The request owner may accept, reject, or revise each Copilot recommendation.

## Separate facts from decisions

Find facts from approved sources when possible. Ask people to make decisions.

If a fact cannot be verified, record:

```text
Unverified fact:
Owner:
Needed by:
Downstream decisions blocked:
```

## Finish

The interview ends when the frontier is empty or every remaining branch has a named owner and follow-up point. Ask GitHub Copilot to summarize the confirmed decisions. The request owner checks that summary before Copilot drafts the brief.
