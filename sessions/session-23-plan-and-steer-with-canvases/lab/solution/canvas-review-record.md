# Canvas Review Record

## Generated canvas

- **Name:** Service Request Portal delivery plan
- **Location:** Project extension under `.github/extensions`
- **Created with `/create-canvas`:** Yes

## State review

Keep issue identity, GitHub state, planning status, owner, dependency, risk, decision, and next action. Remove generated fields that do not affect a planning decision.

## Action review

Keep refresh, planning-status update, risk update, decision record, and summary. Remove direct issue closure, reassignment, and publication actions.

## Verification

The learner records live issue values. The visible canvas and Copilot report must match. Any difference between planning status and GitHub state must be explicit.

## Review decision

- **Approve / Revise / Pause:** Approve
- **Reviewer:** Delivery reviewer
- **Reason:** The canvas provides a useful planning view without hidden external writes.

## Drift and reconciliation

- **GitHub change:** A reviewed issue comment recorded that implementation waits
  for the public status vocabulary decision.
- **Canvas state before refresh:** The child issue remained ready to start.
- **Mismatch detected:** The fresh GitHub read showed a blocker newer than the
  canvas's last refresh.
- **Refresh action:** Copilot called the approved canvas refresh capability.
- **Canvas state after refresh:** Planning status changed to blocked and the next
  action named the product-owner decision.
- **Fresh-read evidence:** The visible issue number, comment, blocker, and refresh
  time matched the GitHub read.

## Ownership

- **Owner:** Delivery lead
- **Refresh procedure:** Retrieve current issue state through GitHub MCP, then call
  the canvas refresh capability and compare the refresh time.
- **Recovery procedure:** Stop updates, refresh GitHub state, compare the last visible records, and resume only after the views match.
- **Retirement trigger:** The initiative closes or the team moves the required planning state into an authoritative system.
- **Next safe action:** Use the canvas to select independent workstreams for Session 24.
