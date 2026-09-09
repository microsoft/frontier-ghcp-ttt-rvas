# Session 11 Lab — Custom Agents & Agent Profiles

**Duration:** 2 hours · **Difficulty:** Advanced
**Prerequisites:** Sessions 01–07 and 10 · **Deliverable:** Reviewed agent profiles and test evidence

## Before you start

Read the [course safety baseline](../../learning-safety-baseline.md). Confirm that the repository, agent surface, data classification, and tools are approved. For metered work, set the customer-owned threshold, escalation contact, and stop guard.

If a live surface is unavailable, create and peer-review the profile files, perform the tasks manually, and use the same acceptance criteria.

| Exercise | Task | Time |
| --- | --- | --- |
| 1 | Test-writer profile | 40 min |
| 2 | Documentation profile | 30 min |
| 3 | Data-analyst profile with approved MCP | 30 min |
| 4 | Compare supported surfaces or manual fallback | 20 min |

## 1. Test-writer profile

```bash
cd lab/starter/agent-project
npm install
mkdir -p .github/agents
```

Create `.github/agents/test-writer.md`. Use the solution only after your review: `lab/solution/agent-project/.github/agents/test-writer.md`.

The profile should read the target and nearby tests, edit tests only, map acceptance criteria to success and error cases, run `npm test`, and ask for review. Test `src/user-service.js`, then `src/order-service.js`. Check each exported function and error case, then review the test result. Do not claim coverage that you did not measure.

## 2. Documentation profile

Read `lab/starter/docs-agent-template.md`, then create `.github/agents/docs-generator.md`. It must document only verified code, use runnable examples, and avoid invented interfaces. Draft a README and JSDoc for the supplied services to test it. Review the output against the source, then compare it with `lab/solution/docs-agent/`.

## 3. Data-analyst profile

Read `lab/starter/mcp-agent-template.md`. Create the profile only after approval for the Session 10 SQLite server and synthetic database. Inspect the schema before querying, use explicit columns, validate relationships before joins, present the query with results, and keep access read-only.

To copy the synthetic database:

```bash
cp -r ../../../../session-10-mcp-servers/lab/starter/db-project/data ./data
```

Ask for product-category revenue and inactive-customer analysis. Verify the tool calls and results. If MCP is unavailable, write the profile and trace the intended schema-first procedure manually.

## 4. Evaluate behavior

Test each approved profile on a bounded task. Compare the result with `lab/starter/agent-test-scenarios.md` and record:

- whether the profile was available on the tested surface;
- paths and tools used;
- acceptance criteria and check results;
- one instruction to tighten, if observed evidence supports it;
- the human review decision.

Do not push, open issues, assign `@copilot`, or run CLI commands unless customer policy and the exact surface permit it.

## Completion checklist

- [ ] Test-writer profile is reviewed and has test evidence.
- [ ] Documentation profile is reviewed against source.
- [ ] Data-analyst profile is approved or has a manual fallback record.
- [ ] Each profile has a bounded scope, stop rule, and human owner.
- [ ] Results are documented for at least two approved surfaces or the manual fallback.
