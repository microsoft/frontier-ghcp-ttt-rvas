#!/usr/bin/env bash
set -euo pipefail

# Lint all markdown files in the repo
# Usage: ./scripts/lint-markdown.sh [--fix]

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if [[ "${1:-}" == "--fix" ]]; then
  echo "🔧 Fixing markdown lint issues..."
  npx markdownlint-cli2 --fix "**/*.md" "#node_modules" "#.squad" "#**/slides.md" "#output"
else
  echo "🔍 Checking markdown lint..."
  npx markdownlint-cli2 "**/*.md" "#node_modules" "#.squad" "#**/slides.md" "#output"
fi

echo "✅ Markdown lint complete"
