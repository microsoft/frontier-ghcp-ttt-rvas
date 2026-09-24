<!-- markdownlint-disable-file -->

# HVE Showcase Scenarios Research

## Research scope

Analyze every demo under `demos/01` through `demos/07` in the source repository
`C:\Users\vzisiadis\repos\hve-all\hve-showcase`. Read only the minimum supporting
documentation needed to interpret those demos.

Answer these questions:

* What is the exact structure and duration of each scenario?
* What prompts and workflows does the user follow, and what artifacts result?
* Which starter and solution assets can be reused, by source-relative path?
* How should the scenarios map to one advanced two-hour challenge lab in the target repository?
* Which scenarios belong in the core, stretch, or excluded scope, and why?
* What attribution and license constraints apply?

## Source integrity

The source repository was inspected at commit
`598ba5fbc937abf0dce622b97bcafda63bbc2dd1`, dated 2026-03-19. Its configured
origin is `https://github.com/caip-csa-grcymt-team/hve-showcase.git`.

The worktree was clean before research. All source operations were read-only:
file reads, directory listings, `git status`, `git rev-parse`, `git log`,
`git ls-files`, and existence checks. Git commands used
`--no-optional-locks` where available. A final clean-state check appears in the
validation section.

The minimum supporting documents read were:

* `README.md`
* `.github/copilot-instructions.md`
* `docs/framework-overview.md`
* `docs/rpi-engineering-guide.md`
* `docs/product-planning-guide.md`
* `docs/customization-guide.md`

These files explain the RPI artifact chain, product handoffs, extension
requirements, and customization model used by the demos.

## Findings

### Scenario structure and duration

#### Demo 01: Full RPI new app

Source: `demos/01-full-rpi-new-app/README.md`

The script builds a C# ASP.NET Core Task Management API from an empty repository.
It has two parts.

| Part | Structure | Published duration | Timing caveat |
|------|-----------|--------------------|---------------|
| A | Eleven numbered steps using standalone research, plan, implement, review, commit, and PR commands. Step 7 is included in Step 6. | 36 min | The stated step times total 42 min, not 36 min. |
| B | Five steps using autonomous RPI, discovery continuation, and checkpointing. | 10 min | No per-step times are given. |
| Full | Part A plus Part B | 46 min | The published total follows 36 + 10, not the 42-minute Part A detail. |

Part A starts with a 2-minute setup, then allocates 10 minutes to research,
5 minutes to planning, 10 minutes to implementation, and 8 minutes to review.
Artifact inspection and Git handoff consume the remaining published time.

Part B adds JWT authentication through one autonomous command, reviews the
Discover suggestions, continues the first suggestion, then saves a checkpoint.

#### Demo 02: Day-to-day RPI

Source: `demos/02-day-to-day-rpi/README.md`

Five independent sub-scenarios apply the combined RPI workflow to an existing
Task Management API.

| Sub-scenario | Work | Duration |
|--------------|------|----------|
| 2A | Fix delete of a missing task so it returns `404` instead of `500` | 5-7 min |
| 2B | Add task priority with enum validation and GET filtering | 8-10 min |
| 2C | Extract in-memory storage behind a repository interface | 8-10 min |
| 2D | Find and fill documentation gaps | 5 min |
| 2E | Start pagination, checkpoint, clear context, restore, and resume | 5-7 min |

The README gives 25-50 minutes for the set. The listed sub-scenario ranges total
31-39 minutes. Each item can run alone, though 2B and 2C assume the Task API from
Demo 01 and work best in sequence.

#### Demo 03: Product owner and TPM

Source: `demos/03-product-owner-tpm/README.md`

The 45-minute script has three 15-minute acts.

| Act | Steps | Expected output |
|-----|-------|-----------------|
| 1: Requirements capture | BRD Builder, Product Manager Advisor, PRD Builder | BRD at `docs/brds/customer-feedback-portal-brd.md`; PRD at `docs/prds/customer-feedback-portal.md` |
| 2: Architecture and design | System Architecture Reviewer, ADR Creation, UX UI Designer | Architecture findings; ADR at `docs/decisions/YYYY-MM-DD-cosmos-db-feedback-storage-v01.md`; JTBD, journey, and accessibility findings |
| 3: Backlog and delivery | Azure DevOps path or GitHub path | Work-item or issue handoff, created backlog entries, triage results, sprint plan |

Act 3 offers two paths. The Azure DevOps path totals 15 minutes from its stated
steps. The GitHub path totals 12 minutes, although the act remains budgeted at
15 minutes. Showing both paths would exceed the act budget and cause live writes
to two external systems.

#### Demo 04: Git operations

Source: `demos/04-git-operations/README.md`

The 10-15 minute script has four steps:

1. Verify Git configuration with `/git-setup`.
2. Generate and create a conventional commit with `/git-commit`.
3. Run a guarded merge or rebase with `/git-merge`.
4. Generate a PR description, with optional PR creation, using `/pull-request`.

The prompt library also includes a commit-message preview, explicit branch
arguments, GitHub PR creation, and Azure DevOps PR creation.

#### Demo 05: Prompt engineering

Source: `demos/05-prompt-engineering/README.md`

The 10-15 minute flow runs three commands in order:

1. `/prompt-analyze` scores an existing prompt artifact.
2. `/prompt-build` creates or updates an instruction, prompt, or agent.
3. `/prompt-refactor` revises an existing prompt.

Expected evidence includes the quality assessment, generated frontmatter and
scope, before-and-after diffs, and sandbox output under
`.copilot-tracking/sandbox/`.

#### Demo 06: Security planning

Source: `demos/06-security-planning/README.md`

The 10-15 minute script has two independent steps:

1. `/incident-response` turns an incident description into severity, timeline,
	 root-cause, impact, and action-item sections.
2. `/risk-register` produces a probability-by-impact assessment with mitigations
	 and owners.

The demo names RCA and security-plan templates, but those files are not in this
repository. They are extension dependencies.

#### Demo 07: Customization and extensibility

Source: `demos/07-customization-extensibility/README.md`

The script presents seven independent methods from local context to organization
distribution.

| Sub-scenario | Method | Duration | Result |
|--------------|--------|----------|--------|
| 7A | Workspace instructions | 5 min | `.github/copilot-instructions.md` |
| 7B | Targeted coding standards | 8-10 min | `.github/instructions/coding-standards/typescript.instructions.md` |
| 7C | VS Code user or workspace settings | 5 min | User settings or `.vscode/settings.json` |
| 7D | Template override | 5-7 min | `docs/templates/brd-template.md` |
| 7E | Agent copy and eject | 8-10 min | Five local RPI agents plus `.hve-tracking.json` |
| 7F | Custom agent and prompt | 8-10 min | `.github/agents/org-arch-review.agent.md` and `.github/prompts/org-arch-review.prompt.md` |
| 7G | Organization distribution | 8-10 min | A template-repository design and distribution decision |

The overview advertises about 40 minutes for the full set. The minimum of the
seven listed durations is 47 minutes. The 15-minute quick route uses 7A, 7B,
and 7D. The 25-minute engineering-lead route uses 7A through 7D, then 7G.

### User-facing prompts and expected artifacts

The prompt text below is taken from each demo's prompt library at the source
revision. Command availability should be checked against the installed HVE Core
version before a new lab ships.

| Scenario | User workflow | Expected artifacts or state |
|----------|---------------|-----------------------------|
| 01A | `/task-research topic=design a REST API task management service with C# ASP.NET Core, including CRUD endpoints, in-memory storage, and a simple HTML frontend` then `/task-plan`, `/task-implement`, `/task-review`, `/git-commit`, `/pull-request`; clear context and attach the prior artifact between major phases | Research, plan, details, planning log, code, changes log, review log, phase validations, commit text, PR text |
| 01B | `/rpi task=add JWT authentication to the task management API, including login/register endpoints, token validation middleware, and protected routes auto=true`; `/rpi continue=1`; `/checkpoint` | A second RPI artifact chain, discovery suggestions, continued work, memory file |
| 02A | `/rpi task=fix bug where deleting a task that does not exist returns 500 instead of 404`; `/git-commit` | Minimal endpoint fix, regression evidence, review, conventional commit |
| 02B | `/rpi task=add a priority field (low, medium, high) to tasks with filtering support on the GET endpoint`; `/git-commit` | Model, endpoint, and UI changes; filtering evidence; discovery suggestions |
| 02C | `/rpi task=extract the in-memory task storage into a repository pattern to prepare for database migration`; `/git-commit` | Repository interface, in-memory implementation, controller wiring, DI change, no-behavior-change evidence |
| 02D | `/doc-ops-update scope=docs focus=missing`; `/git-commit` | API and architecture documentation with repository Markdown conventions |
| 02E | `/rpi task=add pagination to the task list endpoint`; `/checkpoint description=pagination-work`; `/clear`; `/checkpoint mode=continue description=pagination`; `/rpi continue=1`; `/git-commit` | Saved session state, restored context, completed pagination, commit |
| 03 Act 1 | Invoke `@BRD Builder`, describe the feedback portal, use `@Product Manager Advisor`, then `@PRD Builder` | BRD, prioritization matrix and handoff, PRD with FR/NFR identifiers |
| 03 Act 2 | Use `@System Architecture Reviewer`, `@ADR Creation`, and `@UX UI Designer` with the prompts in `demos/03-product-owner-tpm/prompts.md` | Architecture review, Cosmos DB ADR, user research artifacts |
| 03 Act 3A | `@AzDO PRD to WIT`, `/ado-update-wit-items`, `/ado-get-my-work-items`, `/ado-process-my-work-items-for-task-planning`, then `@Agile Coach` | ADO hierarchy and handoff, created work items, enriched stories, acceptance criteria |
| 03 Act 3B | `/github-discover-issues`, `/github-execute-backlog`, `/github-triage-issues`, `/github-sprint-plan` | Issue handoff, created issues, labels, milestone advice, coverage matrix |
| 04 | `/git-setup`; `/git-commit` or `/git-commit-message`; `/git-merge source=feature/auth target=main`; `/pull-request` with optional creation | Configuration audit, commit, merge result, PR body or created PR |
| 05 | `/prompt-analyze`; `/prompt-build files=src/auth/*.ts promptFiles=.github/instructions/auth.instructions.md`; `/prompt-refactor requirements=reduce verbosity` | Prompt score, generated artifact, revised artifact, sandbox evidence |
| 06 | `/incident-response incident-description=database connection pool exhaustion in production severity=2`; `/risk-register feedback-portal focus-area=authentication` | RCA document and risk register |
| 07A | Create workspace instructions manually or with `/prompt-build`, then run repository research | Workspace context file and research evidence that context activated |
| 07B | `/prompt-build files=.github/instructions/coding-standards/typescript.instructions.md`; generate a TypeScript validator through `/rpi` | Targeted instruction and code that follows it |
| 07C | Add `codeGeneration.instructions`, then ask RPI for a date helper | User or workspace setting plus generated code evidence |
| 07D | Add a custom BRD template, then invoke `@BRD Builder` | Template and BRD Q&A that includes the added sections |
| 07E | Ask `@HVE Core Installer` to copy the RPI core agents | Local agent files and provenance state in `.hve-tracking.json` |
| 07F | Build an organization architecture-review agent and matching prompt, reload VS Code, run `/org-arch-review`, then analyze it | Agent, prompt, architecture review, prompt assessment |
| 07G | Research and plan an organization template repository | Research, plan, repository tree, distribution decision |

### Reusable source assets

The source repository contains **no runnable starter application and no completed
solution application**. The root README and Demos 02 and 07 refer to `demo-app/`,
but that path does not exist in the inspected checkout. The useful source assets
are scripts, prompt libraries, expected-output shapes, and copyable examples.

#### RPI assets

* `demos/01-full-rpi-new-app/README.md`
* `demos/01-full-rpi-new-app/prompts.md`
* `demos/01-full-rpi-new-app/expected-outputs/research-sample.md`
* `demos/01-full-rpi-new-app/expected-outputs/plan-sample.md`
* `demos/01-full-rpi-new-app/expected-outputs/details-sample.md`
* `demos/01-full-rpi-new-app/expected-outputs/changes-sample.md`
* `demos/01-full-rpi-new-app/expected-outputs/review-sample.md`
* `demos/02-day-to-day-rpi/README.md`
* `demos/02-day-to-day-rpi/prompts.md`
* `demos/02-day-to-day-rpi/2a-bug-fix.md`
* `demos/02-day-to-day-rpi/2b-feature-add.md`
* `demos/02-day-to-day-rpi/2c-refactoring.md`
* `demos/02-day-to-day-rpi/2d-doc-update.md`
* `demos/02-day-to-day-rpi/2e-session-continuity.md`

The five expected-output files are outlines with `[HVE generates this section]`
placeholders. They are good rubrics. They are not completed learner solutions.

#### Product and delivery assets

* `demos/03-product-owner-tpm/README.md`
* `demos/03-product-owner-tpm/prompts.md`
* `demos/03-product-owner-tpm/act1-brd-prd.md`
* `demos/03-product-owner-tpm/act2-architecture-design.md`
* `demos/03-product-owner-tpm/act3-backlog-delivery.md`
* `demos/04-git-operations/README.md`
* `demos/04-git-operations/prompts.md`
* `demos/05-prompt-engineering/README.md`
* `demos/05-prompt-engineering/prompts.md`
* `demos/06-security-planning/README.md`
* `demos/06-security-planning/prompts.md`

These are facilitation assets. Demo 03 requires external backlog access for its
delivery act. Demo 04 can change Git history or create remote PRs. Demo 06 depends
on templates supplied elsewhere.

#### Customization assets

* `demos/07-customization-extensibility/README.md`
* `demos/07-customization-extensibility/prompts.md`
* `demos/07-customization-extensibility/expected-outputs/customization-samples.md`
* `demos/07-customization-extensibility/7a-workspace-instructions.md`
* `demos/07-customization-extensibility/7b-custom-coding-standards.md`
* `demos/07-customization-extensibility/7c-vscode-user-settings.md`
* `demos/07-customization-extensibility/7d-template-overrides.md`
* `demos/07-customization-extensibility/7e-agent-copy-eject.md`
* `demos/07-customization-extensibility/7f-custom-agents-prompts.md`
* `demos/07-customization-extensibility/7g-organization-distribution.md`

The expected-output file contains directly useful workspace and TypeScript
instruction examples. The 7D and 7F scripts contain larger BRD-template and agent
examples. Reuse remains subject to the license gap described below.

### Reusable target assets

The target repository already has a bounded Node.js exercise with starter and
solution code. It removes the largest risk in the HVE demos: waiting for a live
agent to build a greenfield application.

Use these starter assets:

* `sessions/session-19-capstone/lab/starter/capstone-brief.md`
* `sessions/session-19-capstone/lab/starter/capstone-checklist.md`
* `sessions/session-19-capstone/lab/starter/trainer-delivery-plan-template.md`
* `sessions/session-19-capstone/lab/starter/capstone-project/README.md`
* `sessions/session-19-capstone/lab/starter/capstone-project/package.json`
* `sessions/session-19-capstone/lab/starter/capstone-project/src/index.js`

Use these trainer-only solution assets:

* `sessions/session-19-capstone/lab/solution/capstone-project/src/index.js`
* `sessions/session-19-capstone/lab/solution/capstone-project/src/models/bookmark.js`
* `sessions/session-19-capstone/lab/solution/capstone-project/src/routes/bookmarks.js`
* `sessions/session-19-capstone/lab/solution/capstone-project/tests/bookmarks.test.js`
* `sessions/session-19-capstone/lab/solution/capstone-project/.github/agents/api-builder.md`
* `sessions/session-19-capstone/lab/solution/capstone-project/.github/workflows/ci.yml`
* `sessions/session-19-capstone/lab/solution/capstone-project/copilot-instructions.md`
* `sessions/session-19-capstone/lab/solution/capstone-project/mcp.json`

The route and test files cover more than the recommended single endpoint. Trainers
should use them as answer material, not ask learners to reproduce the full solution.

## Challenge lab recommendation

### Proposed lab: Governed RPI feature delivery

Keep the existing Bookmark Manager starter. Ask learners to deliver one bounded
feature: `POST /api/bookmarks` with validation, duplicate detection, response-shape
rules, and tests. This fits the current capstone contract and gives RPI a real code
surface from minute one.

**Delivery rule:** learners may use HVE commands that exist in their approved
installation, but the lab grades files and evidence rather than command names.
Every phase must have a manual fallback. This matters because the source demos
target HVE Core 3.0.2 and several commands may have moved by 2026-09-24.

### Two-hour task map

| Time | Task | Source scenario mapping | Learner evidence |
|------|------|-------------------------|------------------|
| 0-10 min | Run preflight, choose the local delivery path, read the brief, and confirm the source is synthetic | Demo 01 setup; target capstone preflight | Selected path, stop guard, reviewer, and baseline command in `capstone-checklist.md` |
| 10-25 min | Add concise repository context and one targeted API-review instruction | Demo 07A and the activation model from 07B | `.github/copilot-instructions.md`; `.github/instructions/api-review.instructions.md`; one activation check |
| 25-40 min | Research only the existing route boundary, validation rules, and test setup | Demo 01 research; Demo 02A's narrow-scope pattern | A short research artifact naming relevant files, constraints, and rejected scope |
| 40-55 min | Plan the POST slice with file-level steps, tests, non-goals, and review gate | Demo 01 planning; Demo 03's requirement traceability | Plan and details artifacts tied to the brief's observable criteria |
| 55-90 min | Implement the endpoint and focused tests, then run the existing test command | Demo 01 implementation; Demo 02B's multi-file feature pattern | Route or model changes, tests, command output, changes log |
| 90-110 min | Review every criterion and add a small authentication/data risk assessment | Demo 01 review; Demo 06 risk register | Review verdict, pass/fail evidence, focused risk entries, deferred work |
| 110-120 min | Generate a commit-message preview and PR handoff without changing remote state | Demo 04 preview flow | Commit text, PR body, reviewer, and next action |

The required artifact set should be:

* One scoped issue or task statement with acceptance criteria and non-goals
* Repository and targeted review instructions
* Research, plan, details, changes, and review records
* Implemented `POST /api/bookmarks` behavior or a prepared patch fallback
* Focused test or manual verification evidence
* A short risk section covering input handling and data boundaries
* Commit-message preview and PR description
* Completed capstone checklist with a human decision

### Core scenarios

* Demo 01 Part A, compressed to research, plan, implement, and review. It supplies
	the evidence chain that makes this more than an agent-mode coding exercise.
* Demo 02B as the implementation shape. It demonstrates a bounded feature that
	touches behavior and tests without becoming an application build.
* Demo 04 in preview mode only. Commit text and a PR body make the work
	handoff-ready without mutating branches or remotes.
* Demo 06 risk assessment, narrowed to the endpoint's validation and in-memory
	data boundary. It supports the target curriculum's governance requirement.
* Demo 07A and the file-targeting idea from 07B. Learners should prove that local
	instructions affect the agent before relying on them.

### Stretch scenarios

* Demo 01 Part B: run a follow-up RPI task for one deferred criterion after the
	core review is complete.
* Demo 02C: extract storage behind a repository abstraction, provided endpoint
	behavior and tests stay unchanged.
* Demo 02D: update API documentation after code and review are complete.
* Demo 02E: checkpoint at the plan boundary, clear context, then restore it. The
	RPI guide recommends phase boundaries rather than the demo's mid-implementation
	interruption.
* Demo 05: analyze and refine the targeted review instruction created earlier.
* Demo 07F: build a small API review agent only after the core feature passes.

Stretch work must not replace the review or handoff. A learner who finishes the
code at minute 115 has no stretch budget.

### Excluded scenarios

* Demo 01's greenfield Task Management API and JWT Part B are excluded. They are
	too broad, depend on live generation speed, and have no source starter snapshot.
* Demo 02A is excluded as a separate task because the lab already requires
	error-path tests. Its surgical review pattern is still useful.
* Demo 03's full BRD-to-backlog flow is excluded. It consumes 45 minutes and its
	delivery act writes to Azure DevOps or GitHub. The capstone brief already gives
	the requirement seed.
* Demo 04 merge, commit, and create-PR actions are excluded. The lab should produce
	previews and handoff text without changing shared Git state.
* Demo 06 incident response is excluded because no incident exists in the lab.
	Inventing one would pull attention away from the feature.
* Demo 07C is excluded because it changes personal or workspace editor settings
	and is hard to grade consistently.
* Demo 07D is excluded because BRD templates do not serve the endpoint task.
* Demo 07E is excluded because it requires a clone-based HVE install and takes
	learners into upgrade ownership.
* Demo 07G is excluded because organization distribution is a governance design
	topic, not a bounded implementation task.

### Source defects to avoid carrying forward

The new lab should correct these source inconsistencies instead of repeating them:

* Demo 01 publishes 36 minutes for Part A, while its listed steps total 42.
* Demo 07 publishes 40 minutes for all methods, while their minimum times total 47.
* Demo 02 says checkpoints write under `.copilot-memory/`; the RPI guide and Demo 01
	use `.copilot-tracking/memory/`.
* Product planning names templates under `.github/templates/`; Demo 07 and the
	customization guide name `docs/templates/`.
* Demo 06 names `docs/templates/security-plan-template.md`; Demo 07 names both
	`docs/templates/security-plan.md` and a template-repository file named
	`security-plan-template.md`.
* Demo 07B says HVE does not cover TypeScript, while the inspected target
	environment has its own TypeScript tooling. State the intended instruction gap
	for the lab rather than repeating that broad claim.
* The source README advertises `demo-app/`, but the directory is absent.

## Source and license constraints

The source repository does **not** contain a tracked `LICENSE` or `LICENSE.*` file
at the inspected commit. The root README ends with `HVE Core v3.0.2 | MIT License`,
but that statement describes HVE Core and does not clearly grant a license for the
`hve-showcase` repository's demo text or samples.

This distinction matters. The target repository has its own license, but license
compatibility cannot be assessed until the source owner states the demo
repository's terms.

Use these constraints:

* Treat the source as reference-only until the repository owner supplies a license
	or confirms that the demo content is covered by HVE Core's MIT license.
* Do not copy the demo scripts, prompt text, templates, or expected-output samples
	verbatim into the target repository before that confirmation.
* Facts, workflow ideas, and independently rewritten lab instructions can inform
	the target design. Keep wording original and validate current command behavior.
* Preserve Microsoft, GitHub Copilot, VS Code, Azure DevOps, and HVE product names
	accurately. Do not imply that the target curriculum is an official derivative
	or endorsed package unless that status is documented.
* If reuse is approved, retain any required license notice and add source
	attribution near the adapted material.

A practical attribution line is:

> Adapted from HVE Demo Showcase, commit
> `598ba5fbc937abf0dce622b97bcafda63bbc2dd1`, source repository
> `https://github.com/caip-csa-grcymt-team/hve-showcase.git`, accessed
> 2026-09-24. Original demo files identify Microsoft or Microsoft ISE as author.
> Modified for the GitHub Copilot Train-the-Trainer curriculum.

Do not label the source as `microsoft/hve-showcase`. The configured origin in this
checkout is the `caip-csa-grcymt-team/hve-showcase` repository.

## Open questions

* Does the owner intend the HVE Core MIT license to cover this demo repository?
* Which HVE Core version will the target lab require, and do all named slash
	commands still exist in that version?
* Should this challenge replace the current Session 19 lab, become an alternate
	path, or live as a separate advanced session?
* Is the target audience allowed to create repository instruction files during the
	lab, or must the starter include pre-approved versions?

## Validation

Final checks completed on 2026-09-24:

* Source `git status --porcelain=v1 --untracked-files=all` returned zero entries.
* The report begins with `<!-- markdownlint-disable-file -->`.
* VS Code reported no diagnostics for the report.
* The report contains no em dash characters or terms from the repository's
	high-signal AI-writing word list.
* The only artifact created for this research is this report.