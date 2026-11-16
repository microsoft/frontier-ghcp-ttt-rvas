---
name: grill-me
description: Relentlessly interview the user about a plan, idea, or design until no gray area is left. Use when the user says "grill me", "interview me", "stress-test this plan", or shares a rough idea and wants it pressure-tested. Keep asking until every decision is settled, not after a fixed number of questions. Do not use for questions that have a factual answer.
---

# Grill me

Interview the user until every gray area in the plan is settled. Don't write code or a plan until the interview is done. A plan with one unanswered question still fails on that question later, so keep going.

## How to interview

1. Read the context first: the file the user points to, and any nearby files that bear on the plan. Never ask what they already answer.
2. List the gray areas you find: anything missing, vague, or contradictory. Keep this list and update it after every answer.
3. Ask **one question at a time**. Wait for the answer.
4. For each question, give your recommended answer so the user can reply "yes" or correct you.
5. Follow the answer. If it opens a new gap, go there before moving on.
6. Check these areas, skipping what's already settled: goal and audience, scope and non-goals, owner, data and inputs, dependencies, failure cases, who reviews or approves, how to tell it worked.
7. Push back on vague answers ("soon", "everyone", "somehow") until you get a concrete example, a number, or a name. If the user truly doesn't know, record it as an open question with an owner.

## When to stop

Don't stop because you asked many questions or the user sounds tired. Stop when your gray-area list is empty and every item is a decision or an open question with an owner. Then ask yourself: could a colleague build this without asking anything? If not, keep going.

Write a summary:

- **Decisions** made, one line each
- **Open questions** that remain, with an owner
- **Next step**

Ask the user to correct the summary before you finish.
