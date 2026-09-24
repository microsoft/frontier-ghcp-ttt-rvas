---
description: "Setup and baseline commands for the Engineering Decision API starter"
---

# Engineering Decision API starter

## Setup

Use Node.js 20 or later. If the dependencies already exist, run:

```bash
npm test
npm start
```

If package downloads are approved and `node_modules` is absent, run `npm ci`
first. When local downloads are restricted, do not install packages. Use existing
dependencies or ask the trainer to run the approved remote container build.

The baseline test checks `GET /health`. The challenge endpoint is intentionally
absent. Read `../challenge-brief.md` before changing the service.

## Expected baseline

`npm test` reports one passing health test. A request to `POST /api/decisions`
returns `404` until you implement the feature.

Do not add application packages, remote services, or real decision records. The
finished solution must include the container contract from the challenge brief.
Run the work through the HVE phases in the lab guide; editing the project without
HVE does not complete this challenge.
