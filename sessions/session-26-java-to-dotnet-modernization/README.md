# Session 26: Migrate a Legacy Java Service to Modern .NET

**Module:** Module 2: Copilot in Practice

**Difficulty:** Advanced

**Prerequisites:** Sessions 01–07

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Migrate one complete order-pricing slice from a Java 8-compatible HTTP service to
a .NET 10 ASP.NET Core Minimal API. Run the legacy service, trace its request
path, record the behavior that must survive, then implement the same contract in
.NET and prove parity with shared JSON cases.

The exercise uses synthetic orders and integer-cent arithmetic. It needs no
database, cloud service, or production data.

> [!IMPORTANT]
> Confirm GitHub Copilot access in the selected coding environment before the
> session. If access is unavailable, **stop and do not start the lab**. Resolve
> access first.

## Learning outcomes

Learners practice how to:

- map a legacy request from HTTP entry point to domain calculation and response;
- separate observed behavior from incidental Java structure;
- capture pricing rules in shared contract fixtures;
- migrate one vertical slice to a .NET 10 Minimal API;
- preserve rounding, validation, shipping, discount, and tax behavior;
- use GitHub Copilot with bounded prompts and review every generated change;
- compare Java and .NET results with repeatable tests;
- create a migration backlog without turning the exercise into a full rewrite.

## Scenario

The legacy service prices synthetic orders through `POST /orders/price`.

The rules are small enough to inspect, but they contain the traps that break real
migrations:

- discounts run in a fixed order;
- all amounts use integer cents;
- percentage calculations round half up;
- free shipping uses the discounted merchandise amount;
- tax applies to discounted merchandise, not shipping;
- invalid enum-like values and line items return clear errors.

Learners migrate this slice. The health and sample-order endpoints stay in Java
and become backlog items.

## Session structure

| Block | Duration | Work |
| --- | --- | --- |
| Trainer content | 1 hour | Migration boundaries, behavior capture, contract tests, .NET mapping, and prepared demo |
| Lab | 2 hours | Inspect the Java service, implement the .NET slice, prove parity, and write the next backlog |

## Materials

| Resource | Location |
| --- | --- |
| Trainer guide | [`trainer-content/README.md`](trainer-content/README.md) |
| Marp slides | [`slides.md`](slides.md) |
| Lab guide | [`lab/README.md`](lab/README.md) |
| Java baseline, fixtures, and .NET scaffold | [`lab/starter/`](lab/starter/) |
| .NET reference implementation and contract tests | [`lab/solution/`](lab/solution/) |

## Environment

Use the repository Dev Container or Codespaces. It supplies Java 21, which compiles
the legacy source for Java 8, and the .NET 10 SDK. The Maven Wrapper pins Maven
3.9.9 for the baseline.

The lab also includes a short native setup route for learners who cannot use the
container. A global Maven installation is not required.

## Scope

**In scope**

- local HTTP services;
- synthetic JSON;
- behavior extraction;
- one production-shaped pricing slice;
- package-free .NET contract tests;
- a reviewed migration backlog.

**Out of scope**

- databases and persistence migration;
- messaging and distributed transactions;
- authentication and authorization;
- cloud hosting;
- a whole-service rewrite;
- production performance claims.
