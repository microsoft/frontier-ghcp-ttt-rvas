# Migration backlog

| Priority | Slice | Current Java entry point | Proposed .NET boundary | Proof required | Risk or dependency |
| --- | --- | --- | --- | --- | --- |
| P0 | Order pricing | `POST /orders/price` | Minimal API endpoint and pricing engine | Shared contract cases and HTTP comparison | Rounding and validation parity |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

## Keep in Java for now

List behavior that should remain in the legacy service until its contract and
dependencies are understood.

- _Add behavior that stays in Java here._

## Remove only after

State the evidence required before deleting the Java pricing path.

- _Add removal conditions here._
