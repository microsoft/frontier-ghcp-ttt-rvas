#!/usr/bin/env bash

set -uo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
labs_root="${LABS_ROOT:-"$repo_root/sessions"}"
failures=0
checked=0

report_failure() {
  local file="$1"
  local output="$2"
  printf '::error file=%s::Lab validation failed for %s\n' "$file" "$file"
  printf '%s\n' "$output"
  failures=$((failures + 1))
}

validate() {
  local file="$1"
  shift
  local output

  if ! output=$("$@" 2>&1); then
    report_failure "$file" "$output"
  fi
  checked=$((checked + 1))
}

if [[ ! -d "$labs_root" ]]; then
  printf '::error::Lab root does not exist: %s\n' "$labs_root"
  exit 1
fi

while IFS= read -r -d '' session; do
  session_name="$(basename "$session")"
  starter="$session/lab/starter"
  solution="$session/lab/solution"

  if [[ ! -d "$starter" ]]; then
    report_failure "$session/lab" "Missing starter directory for $session_name"
  fi

  if [[ ! -d "$solution" ]]; then
    report_failure "$session/lab" "Missing solution directory for $session_name"
  fi
done < <(find "$labs_root" -mindepth 1 -maxdepth 1 -type d -name 'session-*' -print0 | sort -z)

while IFS= read -r -d '' file; do
  relative="${file#"$labs_root"/}"
  case "$relative" in
    session-07-code-review-prs/lab/starter/conflict-scenario/utils-with-conflict.js | \
      session-13-actions-workflows/lab/starter/broken-workflows/broken-ci.yml)
      printf 'Skipping intentional syntax exercise: %s\n' "$relative"
      continue
      ;;
  esac

  case "$file" in
    *.py) validate "$file" python -m py_compile "$file" ;;
    *.js | *.mjs | *.cjs | *.ts | *.tsx) validate "$file" node --check "$file" ;;
    *.sh | *.bash) validate "$file" bash -n "$file" ;;
    *.json) validate "$file" python -m json.tool "$file" ;;
    *.yml | *.yaml) validate "$file" ruby -e 'require "yaml"; Psych.parse_stream(File.read(ARGV[0]))' "$file" ;;
    *.tf) validate "$file" terraform fmt -write=false "$file" ;;
    *.bicep) validate "$file" az bicep build --file "$file" --stdout ;;
  esac
done < <(
  find "$labs_root" -type f \
    \( -path '*/lab/starter/*' -o -path '*/lab/solution/*' \) \
    -print0 | sort -z
)

if ((failures > 0)); then
  printf 'Lab validation failed with %d error(s).\n' "$failures"
  exit 1
fi

printf 'Lab validation passed for %d files.\n' "$checked"
