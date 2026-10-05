---
description: "Build and verify a reliable TypeScript agent application with the GitHub Copilot SDK"
---

# Session 17: Build Reliable Agent Applications with the GitHub Copilot SDK

**Module:** Module 6: Advanced Topics & Capstone

**Difficulty:** Advanced

**Prerequisites:** Sessions 01 to 12

**Duration:** 3 hours (1 hour trainer content, 2 hour lab)

## Overview

This session moves from using an agent to building an application around one.
Learners create a TypeScript CLI that assesses whether a synthetic software change
is ready to proceed.

The session treats reliability as application code. The CLI owns the client and
session lifecycle, streams progress, limits tool use, exposes denied actions,
records failures, and closes resources. Tests check the control path. An
OpenTelemetry Collector sends traces to Jaeger so learners can inspect the same
run outside the terminal.

## Learning outcomes

By the end of this session, learners can:

- manage `CopilotClient` and session startup, use, and shutdown;
- subscribe to streaming session events without printing duplicate final output;
- define a typed custom tool over deterministic synthetic data;
- separate tool availability, permission handling, and pre-tool policy;
- use pre-tool, failed-tool, error, and session-end hooks;
- make a denied action visible to the user and trace;
- test the allowed, denied, failed, and cleanup paths;
- send SDK traces through an OpenTelemetry Collector to Jaeger.

## Required access

Learners need all of the following:

- authenticated GitHub Copilot SDK access;
- Node.js and npm;
- Docker with Docker Compose;
- a terminal that can run the supplied TypeScript project.

**There is no fallback route.** If GitHub Copilot access, Node.js, npm, Docker, or
Docker Compose is unavailable, stop before the lab. Fix the approved environment
or reschedule the hands-on work.

## Scenario

The application is a **change readiness assistant**. It reads deterministic
synthetic change records, asks Copilot to assess the selected change, and returns
`ready` or `needs-review` with the supporting gaps.

One request targets a restricted synthetic record. The application denies that
lookup before execution and shows the reason. No customer data, production
repository, or external business system is used.

## Session structure

| Block | Duration | Content |
| --- | ---: | --- |
| Trainer content | 60 min | [Slides](slides.md), concepts, and prepared demo |
| Lab | 120 min | [Build and verify the CLI](lab/README.md) |

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Starter project | `lab/starter/sdk-readiness-assistant/` |
| Reference solution | `lab/solution/sdk-readiness-assistant/` |

## Scope

The required path covers:

- local `CopilotClient` and session lifecycle;
- TypeScript streaming event handlers;
- one application-owned readiness tool;
- explicit permission decisions;
- pre-tool, post-tool-failure, error, and session-end hooks;
- a visible denied action;
- focused automated tests;
- OTLP export through an OpenTelemetry Collector;
- trace inspection in Jaeger.

The session does not cover dynamic workflows, fleet, cloud or remote sessions,
BYOK, plugin packaging, production deployment, external business systems, or
implementations in other languages.

## Product references

These official GitHub sources were verified on **October 5, 2026**. The GitHub
Copilot SDK became generally available on June 2, 2026. Trainers should still
recheck API names and package requirements before delivery.

- [General availability announcement](https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/)
- [GitHub Copilot SDK documentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk)
- [Authentication](https://docs.github.com/en/copilot/how-tos/copilot-sdk/auth/authenticate)
- [Streaming session events](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/streaming-events)
- [Session hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/hooks-overview)
- [Pre-tool use hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/pre-tool-use)
- [Error handling hook](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/error-handling)
- [Session lifecycle hooks](https://docs.github.com/en/copilot/how-tos/copilot-sdk/hooks/session-lifecycle)
- [OpenTelemetry instrumentation](https://docs.github.com/en/copilot/how-tos/copilot-sdk/observability/opentelemetry)
- [TypeScript SDK reference and examples](https://github.com/github/copilot-sdk/blob/main/nodejs/README.md)

## Trainer note

Keep the lesson on application reliability. Do not expand the demo into
orchestration, remote execution, provider selection, or deployment.
