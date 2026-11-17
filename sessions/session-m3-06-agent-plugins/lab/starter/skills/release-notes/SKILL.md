---
name: release-notes
description: Write release notes or a CHANGELOG entry from a list of merged pull requests. Use when the user asks for release notes, a changelog entry, "what shipped", or a version summary, even if they don't name the format. Don't use for commit messages, PR descriptions, or marketing copy.
---

# Release notes

Write the entry the way the project's existing `CHANGELOG.md` does, so readers see one consistent style.

## Steps

1. Read the top two entries of `CHANGELOG.md`. Copy their structure and tone.
2. Read the list of merged PRs. Ask for it if you don't have one.
3. Group PRs using [references/format.md](references/format.md).
4. Write one line per user-visible change, in plain words, ending with the PR number.
5. Skip internal work: refactors, dependency bumps, typo fixes. Readers can't act on them.
6. If any PR is labeled `breaking`, add it under **Upgrade notes** with what the reader must do.
7. Insert the new entry above the previous one. Don't rewrite older entries.

## Why these rules

The changelog is the one place users learn what changed. Noise buries the two lines they need, so keep only what changes their behavior. State the upgrade action explicitly because people skim for it.

## Ask before guessing

If the version number or release date is missing, ask. Never invent one.
