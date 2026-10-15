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
    session-m2-04-code-review-prs/lab/starter/conflict-scenario/utils-with-conflict.js | \
      session-m4-01-actions-workflows/lab/starter/broken-workflows/broken-ci.yml | \
      session-m2-06-python-repair-refactor/lab/starter/inventory_reconciliation/cli.py | \
      session-m2-06-python-repair-refactor/lab/starter/inventory_reconciliation/service.py)
      printf 'Skipping intentional syntax exercise: %s\n' "$relative"
      continue
      ;;
  esac

  case "$file" in
    *.py) validate "$file" python -m py_compile "$file" ;;
    *.js | *.mjs | *.cjs) validate "$file" node --check "$file" ;;
    *.ts | *.tsx) ;;
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

migration_lab="$labs_root/session-m2-07-java-to-dotnet-modernization/lab"
if [[ -d "$migration_lab" ]]; then
  java_starter="$migration_lab/starter/legacy-java-order-service"
  dotnet_starter="$migration_lab/starter/modern-dotnet-order-service"
  dotnet_solution="$migration_lab/solution/modern-dotnet-order-service"

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

sdk_lab="$labs_root/session-m6-01-copilot-sdk/lab"
if [[ -d "$sdk_lab" ]]; then
  starter_project="$sdk_lab/starter/sdk-readiness-assistant"
  solution_project="$sdk_lab/solution/sdk-readiness-assistant"

  validate \
    "$starter_project" \
    bash -c "cd '$starter_project' && npm ci --quiet && npm run check"
  validate \
    "$solution_project" \
    bash -c "cd '$solution_project' && npm ci --quiet && npm run check && npm test"
fi

python_lab="$labs_root/session-m2-06-python-repair-refactor/lab"
if [[ -d "$python_lab" ]]; then
  starter_output="$(
    cd "$python_lab/starter" &&
      python -m inventory_reconciliation \
        --warehouse fixtures/input/warehouse.csv \
        --ledger fixtures/input/ledger.csv \
        --output-dir build 2>&1
  )"
  starter_status=$?
  if ((starter_status == 0)); then
    report_failure \
      "$python_lab/starter" \
      "The intentionally broken starter completed successfully; expected SYN-01."
  elif ! grep -Fq "expected ':'" <<<"$starter_output"; then
    report_failure \
      "$python_lab/starter" \
      "The starter did not stop at SYN-01 as documented:\n$starter_output"
  fi
  checked=$((checked + 1))

  validate \
    "$python_lab/solution" \
    bash -c "cd '$python_lab/solution' && python -m pytest -q"
fi

if ((failures > 0)); then
  printf 'Lab validation failed with %d error(s).\n' "$failures"
  exit 1
fi

printf 'Lab validation passed for %d files.\n' "$checked"
