#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if ! command -v lychee >/dev/null 2>&1; then
  echo "lychee is required: https://github.com/lycheeverse/lychee" >&2
  exit 127
fi

lychee \
  --no-progress \
  --cache \
  --max-retries 2 \
  --timeout 30 \
  --accept "200..=299,429" \
  --exclude-path "node_modules" \
  --exclude-path "site" \
  "README.md" \
  "curriculum-plan.md" \
  "tracks/**/*.md" \
  "sessions/**/*.md" \
  "track-template/**/*.md"
