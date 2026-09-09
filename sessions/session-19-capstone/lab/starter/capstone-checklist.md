# Capstone Phase Checklist

Track work in each phase. Check off items as you complete them.

---

## Phase 1: Project Setup & Copilot Space (15 min)

- [ ] GitHub repository created (`capstone-bookmark-api`)
- [ ] Starter project copied and runs locally (`npm start` returns a working health check)
- [ ] Pushed to GitHub
- [ ] Copilot Space created with repo + project brief
- [ ] Space instructions set
- [ ] Tested Space with a grounded question

## Phase 2: Custom Instructions & Agents (15 min)

- [ ] `.github/copilot-instructions.md` created with project conventions
- [ ] `.github/agents/api-builder.md` created with agent profile
- [ ] Agent tested; follows project conventions in responses
- [ ] Committed and pushed

## Phase 3: MCP Server Configuration (10 min)

- [ ] `mcp.json` created with GitHub MCP server config
- [ ] MCP server tested in agent mode (queried repo issues)
- [ ] Config committed (token NOT in repo)

## Phase 4: CI/CD Pipeline (15 min)

- [ ] `.github/workflows/ci.yml` generated with Copilot
- [ ] CI workflow runs on push to main
- [ ] CI passes (tests and install)
- [ ] `.github/copilot-setup-steps.yml` created for cloud agent
- [ ] Committed and pushed

## Phase 5: Issue Writing & Planning (10 min)

- [ ] Issue #1: POST /api/bookmarks (with acceptance criteria)
- [ ] Issue #2: GET /api/bookmarks with filtering
- [ ] Issue #3: DELETE /api/bookmarks/:id
- [ ] All issues have description, acceptance criteria, and technical notes

## Phase 6: Cloud Agent Development (20 min)

- [ ] Issue #1 assigned to cloud agent (@copilot)
- [ ] Issue #2 assigned to cloud agent
- [ ] Issue #3 assigned to cloud agent
- [ ] Agent created branches and opened draft PRs
- [ ] Agent's code follows custom instructions

## Phase 7: Code Review & Iteration (15 min)

- [ ] Copilot review requested on at least 1 PR
- [ ] Copilot review comments assessed (valid comments vs. noise)
- [ ] Human review comments added (at least 2)
- [ ] Feedback provided in a PR comment; agent iterated
- [ ] At least 1 PR approved and merged

## Phase 8: Integration & Debugging (10 min)

- [ ] All merged changes pulled locally
- [ ] `npm test` passes
- [ ] API endpoints work end-to-end (manual curl tests)
- [ ] Any integration issues fixed with agent mode

## Phase 9: Presentation & Reflection (10 min)

- [ ] README updated with project summary
- [ ] Trainer delivery plan completed
- [ ] Reflection questions answered
- [ ] Final commit pushed
- [ ] (Optional) Presented to group

---

## Stretch work

- [ ] Import/export endpoints added
- [ ] Second custom agent created (e.g., test-writer)
- [ ] Agent skill created for API patterns
- [ ] Second MCP server configured
- [ ] Request logging middleware added
- [ ] Rate limiting added

---

## Handover summary

**Phases completed:** __/ 9  
**Stretch goals completed:**__ / 6  
**Total time:** __ minutes  
**Key learning:** ________________________________________________
