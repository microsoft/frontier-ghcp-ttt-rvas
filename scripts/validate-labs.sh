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
      session-13-actions-workflows/lab/starter/broken-workflows/broken-ci.yml | \
      session-27-python-repair-refactor/lab/starter/inventory_reconciliation/cli.py | \
      session-27-python-repair-refactor/lab/starter/inventory_reconciliation/service.py)
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
    -not -path '*/.pytest_cache/*' \
    -not -path '*/.venv/*' \
    -not -path '*/__pycache__/*' \
    -not -path '*/bin/*' \
    -not -path '*/node_modules/*' \
    -not -path '*/obj/*' \
    -not -path '*/target/*' \
    -print0 | sort -z
)

session_26="$labs_root/session-26-java-to-dotnet-modernization/lab"
if [[ -d "$session_26" ]]; then
  java_starter="$session_26/starter/legacy-java-order-service"
  dotnet_starter="$session_26/starter/modern-dotnet-order-service"
  dotnet_solution="$session_26/solution/modern-dotnet-order-service"

  validate \
    "$java_starter" \
    bash -c "cd '$java_starter' && ./mvnw -q test"
  validate \
    "$dotnet_starter/OrderPricing.slnx" \
    dotnet build "$dotnet_starter/OrderPricing.slnx" --nologo --verbosity minimal
  validate \
    "$dotnet_solution/OrderPricing.slnx" \
    dotnet build "$dotnet_solution/OrderPricing.slnx" --nologo --verbosity minimal
  validate \
    "$dotnet_solution/OrderPricing.ContractTests/OrderPricing.ContractTests.csproj" \
    dotnet run \
      --project "$dotnet_solution/OrderPricing.ContractTests/OrderPricing.ContractTests.csproj"

  rm -rf \
    "$java_starter/target" \
    "$dotnet_starter/OrderPricing.Api/bin" \
    "$dotnet_starter/OrderPricing.Api/obj" \
    "$dotnet_solution/OrderPricing.Api/bin" \
    "$dotnet_solution/OrderPricing.Api/obj" \
    "$dotnet_solution/OrderPricing.ContractTests/bin" \
    "$dotnet_solution/OrderPricing.ContractTests/obj"
fi

session_27="$labs_root/session-27-python-repair-refactor/lab"
if [[ -d "$session_27" ]]; then
  starter_output="$(
    cd "$session_27/starter" &&
      python -m inventory_reconciliation \
        --warehouse fixtures/input/warehouse.csv \
        --ledger fixtures/input/ledger.csv \
        --output-dir build 2>&1
  )"
  starter_status=$?
  if ((starter_status == 0)); then
    report_failure \
      "$session_27/starter" \
      "The intentionally broken starter completed successfully; expected SYN-01."
  elif ! grep -Fq "expected ':'" <<<"$starter_output"; then
    report_failure \
      "$session_27/starter" \
      "The starter did not stop at SYN-01 as documented:\n$starter_output"
  fi
  checked=$((checked + 1))

  validate \
    "$session_27/solution" \
    bash -c "cd '$session_27/solution' && python -m pytest -q"
fi

if ((failures > 0)); then
  printf 'Lab validation failed with %d error(s).\n' "$failures"
  exit 1
fi

printf 'Lab validation passed for %d files.\n' "$checked"
