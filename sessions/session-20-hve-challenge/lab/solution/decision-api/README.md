---
description: "Setup and behavior summary for the Engineering Decision API reference solution"
---

# Engineering Decision API reference solution

## HVE workflow

Use this project only after learners have run the HVE phases in the lab guide.
The reference customization files show the expected repository context, targeted
JavaScript/API practices, and bounded review agent. The code is the result to
review; it is not a substitute for Research, Plan, Implement, and Review artifacts.

## Run the solution

Use Node.js 20 or later. When the committed dependencies are already available,
run:

```bash
npm test
npm start
```

Run `npm ci` first only in an environment approved for package downloads.

## Build the container

The image build runs the full test suite, installs production-only dependencies,
and creates a non-root runtime image with a health check.

Use an approved local Docker engine:

```bash
docker build --tag hve-decision-api:validation .
docker run --rm --publish 3000:3000 hve-decision-api:validation
```

When local downloads are restricted, use an approved Azure Container Registry:

```azurecli
az acr build \
  --registry <registry-name> \
  --image hve-decision-api:validation \
  .
```

Record the remote build ID and result. A successful offline contract test does not
replace an actual image build.

The solution keeps records inside each app instance. Restarting the process clears
them. The route trims required strings, checks duplicate titles without regard to
case, creates a UUID, and stores a UTC timestamp.

The tests cover the health route, the complete create contract, and the Dockerfile
contract. See `../reference-evidence.md` for the criterion map and scoring notes.
