#!/usr/bin/env bash

set -uo pipefail

file="${1:-}"
if [[ -z "$file" || ! -f "$file" ]]; then
  echo "usage: $0 <terraform-file>" >&2
  exit 2
fi

failures=0

check_absent() {
  local pattern="$1"
  local message="$2"
  if grep -nE "$pattern" "$file"; then
    echo "FAIL: $message" >&2
    failures=$((failures + 1))
  fi
}

check_present() {
  local pattern="$1"
  local message="$2"
  if ! grep -qE "$pattern" "$file"; then
    echo "FAIL: $message" >&2
    failures=$((failures + 1))
  fi
}

check_absent 'to_port[[:space:]]*=[[:space:]]*65535' "all-port ingress is prohibited"
check_absent 'password[[:space:]]*=[[:space:]]*"[^"]+"' "database passwords must not be hardcoded"
check_absent 'acl[[:space:]]*=[[:space:]]*"public-read"' "public bucket ACL is prohibited"
check_absent 'Action[[:space:]]*=[[:space:]]*"\*"' "wildcard IAM actions are prohibited"
check_present '^[[:space:]]*storage_encrypted[[:space:]]*=[[:space:]]*true' "database storage encryption is required"
check_present '^[[:space:]]*access_logs[[:space:]]*\{' "load balancer access logging is required"

if ((failures > 0)); then
  echo "Security gate failed with $failures finding(s)." >&2
  exit 1
fi

echo "Security gate passed."
