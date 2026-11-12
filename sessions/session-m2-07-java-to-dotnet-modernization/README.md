# Session M2-07: Migrate a legacy Java service to modern .NET

**Module:** Module 2: Copilot in Practice

**Difficulty:** Advanced

**Prerequisites:** Sessions M1-01 to M1-03, M2-01 to M2-04

**Duration:** 3 hours (1 hour trainer content + 2 hours lab)

## Overview

Migrate one order-pricing slice from a Java 8-compatible HTTP service to a .NET 10
ASP.NET Core Minimal API. Run the legacy service, trace its request path, record
the behavior that must survive, then implement the same contract in .NET and
prove parity with shared JSON cases.

The exercise uses synthetic orders and integer-cent arithmetic. It needs no
database, cloud service, or production data.

## Learning outcomes

- map a legacy request from HTTP entry point to domain calculation and response;
- separate observed behavior from incidental Java structure;
- capture pricing rules in shared contract fixtures;
- migrate one vertical slice to a .NET 10 Minimal API and keep rounding, validation, shipping, discount, and tax behavior;
- compare Java and .NET results with repeatable tests;
- write a migration backlog instead of a full rewrite.

## Scenario

The legacy service prices synthetic orders through `POST /orders/price`. The rules
are small enough to inspect. These details can break a migration:

- discounts run in a fixed order;
- all amounts use integer cents;
- percentage calculations round half up;
- free shipping uses the discounted merchandise amount;
- tax applies to discounted merchandise, not shipping;
- invalid enum-like values and line items return clear errors.

You migrate this slice. Leave the health and sample-order endpoints in Java and
record them as backlog items.

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
3.9.9, so you don't need a global Maven install. You also need GitHub Copilot.

The lab includes a short native setup route for learners who can't use the container.

## Scope

**In scope:** local HTTP services, synthetic JSON, behavior extraction, one pricing
endpoint with validation, calculation, and response handling, package-free .NET
contract tests, and a migration backlog.

**Out of scope:** databases, messaging, authentication, cloud hosting, a
whole-service rewrite, and production performance claims.
