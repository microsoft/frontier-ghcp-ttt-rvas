#!/usr/bin/env bash
#
# Usage: ./run-demo.sh
# Prerequisites:
#   - Node.js 20.19+ or 22.12+
#   - npm dependencies installed with npm ci
#   - Authenticated GitHub Copilot SDK access
#   - Docker Engine and Docker Compose

set -Eeuo pipefail

on_error() {
  printf '\nDemo failed at line %s. Check the error above.\n' "$1" >&2
  printf 'When finished, stop the trace stack with: docker compose down\n' >&2
}
trap 'on_error "$LINENO"' ERR

command -v docker >/dev/null
docker compose version >/dev/null

printf 'Running local reliability tests...\n'
npm test

printf '\nBuilding TypeScript...\n'
npm run build

printf '\nStarting the OpenTelemetry Collector and Jaeger...\n'
docker compose up -d
docker compose ps

printf '\nStarting the authenticated Copilot SDK demo...\n'
printf 'The demo sends accepted, invalid, and denied requests.\n\n'
npm run demo

printf '\nDemo complete. Open http://localhost:16686 to inspect traces.\n'
printf 'When finished, stop the trace stack with: docker compose down\n'
