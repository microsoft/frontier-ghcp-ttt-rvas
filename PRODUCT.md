# GitHub Copilot Train-the-Trainer

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Trainers** prepare and deliver GitHub Copilot and Agentic Workflows training.
Learners use the site to choose a track and complete hands-on labs.

## Product purpose

Make training repeatable through reusable session kits and trainer guidance.
Success means a trainer can deliver a session and learners can complete the
assigned task with human review.

## Operating context

Trainers choose a learning track, prepare the environment, and deliver sessions
using the repository's materials. Learners follow session overviews and lab
instructions.

The web site uses MkDocs Material. Markdown files hold the curriculum and learning
materials; preserve their structure and working resource links.

## Capabilities and constraints

- Keep the curriculum organized into learning tracks and sessions with reusable
  trainer guidance and hands-on labs.
- Use **Enterprise Cloud as the governance baseline** and follow customer policy.
- Check required tools, permissions, and accounts before each learner lab.
- Stop the lab when a required tool is unavailable. Keep demo recovery in
  trainer guidance rather than replacing the learner exercise.
- Keep human review in the learning workflow.

## Brand commitments

Keep the name **GitHub Copilot Train-the-Trainer**.
Use the RVAP brand system recorded in `DESIGN.md` across the website and its
training materials. Labs and trainer guides share the same reading layout.
Match the compact RVAP wordmark and stronger blue navigation of
`frontier-agentic-devops-rvas`. The user approved this header-logo exception
to the kit's full-wordmark minimum on September 7, 2026.
The user also requested distinct difficulty and M1-M5 colors. Use the shared
category palette consistently across the catalog and custom sets. These colors
identify curriculum categories; they do not assign RVAP pillar meanings.
Write direct technical prose for a competent engineer. Follow `AGENTS.md` for
repository writing.

## Existing materials

- `README.md` and `curriculum-plan.md` describe the curriculum.
- `tracks/` contains learning paths.
- `sessions/` contains session overviews and labs, with trainer guidance under
  each session's `trainer-content/` directory.
- `track-template/` provides the reusable session structure.

These are training materials. Do not treat them as evidence of measured learning
outcomes or invent adoption claims.

## Product principles

- Help trainers reuse materials without rebuilding a session.
- Define each exercise's scope and require human review.
- State access requirements and stop before the lab when they are not met.
- Offer another setup only when it preserves the same learning objective and
  completion checks.
- Keep linked learning resources easy to find as the curriculum changes.

## Custom session sets

Trainers can select sessions from the shared catalog, add a title and introduction,
and arrange the delivery order. A shareable link opens a page containing only those
sessions, with links to their labs and trainer guides.

Sets live in the URL, without accounts or server storage. The builder preserves
the current draft in its URL across reloads. Anyone with a shared link can read
its title and introduction; users must not include confidential information.
Selecting a subset does not remove the curriculum's preparation requirements.

## Open decisions

No product-specific accessibility standard has been established.
