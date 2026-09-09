#!/usr/bin/env bash
# setup.sh — Install and pin dependencies for the lab

set -e

echo "Setting up Spec Kit lab environment..."

# Install specify-cli with PINNED version
echo "Installing specify-cli (pinned to 0.8.5)..."
uv tool install 'specify-cli==0.8.5'

# Verify installation
echo "Verifying installation..."
specify --version
# Expected: "specify-cli 0.8.5"

# Copy this into your project setup documentation:
cat > SETUP_GUIDE.md << 'EOF'
# Setup Guide

## Prerequisites

1. Python 3.10+ installed
2. `uv` package manager installed
3. GitHub Copilot CLI installed (standalone `copilot` binary)

## Installation Steps

```bash
# 1. Install pinned specify-cli
uv tool install 'specify-cli==0.8.5'

# 2. Verify version
specify --version
# Expected: specify-cli 0.8.5

# 3. Generate lock file
uv sync --locked

# 4. Commit lock file
git add uv.lock setup.sh SETUP_GUIDE.md
git commit -m "Pin dependencies for reproducible setup"
```

## Version Management

- Always use `specify-cli==0.8.5` (pinned version)
- Do NOT use `uv tool install specify-cli` (unpinned — risky for pre-1.0 tools)
- Lock file ensures reproducible installs across team

## Verify Setup

```bash
specify init test-project --integration copilot
cd test-project
specify lint
```

If all three commands succeed, setup is complete.
EOF

echo "✓ Setup complete"
echo "✓ specify-cli installed and pinned to 0.8.5"
echo "✓ Read SETUP_GUIDE.md for full instructions"
