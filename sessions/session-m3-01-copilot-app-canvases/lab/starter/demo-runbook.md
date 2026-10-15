# Prepared Demo Runbook

Run commands from this directory.

## Initialize the working state

```bash
node src/demo.mjs init
```

## Inspect the starting state

```bash
node src/demo.mjs show
```

## Direct human update

```bash
node src/demo.mjs status WEB-318 ready
```

## Agent-requested update

```bash
node src/demo.mjs status API-204 review
```

## Planned rejection

```bash
node src/demo.mjs status DOC-101 ready
```

Expected: the command exits with an error and reports that evidence is required.

## Recovery

```bash
node src/demo.mjs evidence DOC-101 docs://operator-guide-review
node src/demo.mjs status DOC-101 ready
```

Each accepted command updates `working-state.json`. A rejected command leaves the file unchanged. Run `init` to reset the exercise.
