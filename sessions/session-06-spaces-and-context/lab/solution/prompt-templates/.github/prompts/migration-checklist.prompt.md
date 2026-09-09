---
description: "Create a migration checklist for a dependency upgrade"
---

Create a checklist for upgrading this dependency.

**Package:** {{ package_name }}
**From version:** {{ current_version }}
**To version:** {{ target_version }}

## 1. Before the migration

- [ ] Read the official changelog and release notes for every version between the current and target versions
- [ ] Identify breaking changes that affect our codebase
- [ ] Check for deprecated APIs we currently use
- [ ] Review the migration guide (if available)
- [ ] Check peer dependency compatibility

## 2. Assess the impact

List each file that imports or uses this package. For each file, identify:

- Which APIs/features are used
- Whether those APIs have breaking changes
- What code modifications are needed

## 3. Change the code

For every breaking change:

- Show the before/after code change
- Explain why it is needed
- Note any behavioral differences

## 4. Test the upgrade

- [ ] All existing tests pass after the upgrade
- [ ] New tests added for changed behavior
- [ ] Manually test critical paths
- [ ] Performance comparison (if relevant)

## 5. Roll back if needed

- How to revert if the upgrade causes issues
- What to monitor after deployment
- When to make the rollback decision

## 6. Runbook

- [ ] Create a feature branch
- [ ] Update package.json
- [ ] Run npm install
- [ ] Apply code modifications
- [ ] Run full test suite
- [ ] Manual verification
- [ ] Create PR with migration notes
- [ ] Deploy to staging
- [ ] Monitor for 24 hours
- [ ] Deploy to production
