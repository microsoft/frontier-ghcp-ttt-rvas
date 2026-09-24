---
description: "Product intent for the Engineering Decision API HVE challenge"
---

# Engineering Decision API product intent

Engineering decisions are currently scattered across chat threads and meeting
notes. Technical leads want a consistent way to record a decision while its
context is still fresh.

The first product slice should let a developer create one decision record through
an HTTP API. A record contains a title, context, decision, lifecycle status, and
generated metadata. The team wants predictable validation and conflict responses
so clients can handle mistakes without parsing free-form text.

## Intended outcome

Teams can capture a decision in a stable structure before it disappears into chat
history. This slice proves the create contract; it does not prove discovery,
adoption, or durable retention.

## Known constraints

* Use the existing Express starter and health endpoint.
* Keep records in process memory for this challenge.
* Do not add authentication, persistence, list, update, or delete operations.
* Use synthetic decision data only.
* Package the reviewed service as a non-root production container.

## Product questions

* Which role owns the quality of a submitted decision?
* What evidence would show that a create-only endpoint is useful?
* When does process-local storage stop being an acceptable experiment?
* Which acceptance criteria belong in this slice, and which belong in follow-up work?