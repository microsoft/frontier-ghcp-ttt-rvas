#!/usr/bin/env bash
set -euo pipefail

# Generate slide decks (PDF + HTML) for all sessions
# Usage: ./scripts/build-slides.sh [session-number]
# Examples:
#   ./scripts/build-slides.sh        # Build all sessions
#   ./scripts/build-slides.sh 04     # Build session 04 only

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
THEME="$REPO_ROOT/themes/ghcp-ttt.css"
ENGINE="$REPO_ROOT/scripts/marp-engine.cjs"
OUTPUT_DIR="$REPO_ROOT/output"

mkdir -p "$OUTPUT_DIR/pdf" "$OUTPUT_DIR/html"

build_session() {
  local session_dir="$1"
  local session_name
  session_name="$(basename "$session_dir")"
  local slides_file="$session_dir/slides.md"

  if [[ ! -f "$slides_file" ]]; then
    echo "⚠️  No slides.md in $session_name — skipping"
    return 0
  fi

  echo "📊 Building slides for $session_name..."

  # Generate HTML
  npx @marp-team/marp-cli \
    "$slides_file" \
    --engine "$ENGINE" \
    --theme "$THEME" \
    --html \
    --output "$OUTPUT_DIR/html/${session_name}.html" \
    2>/dev/null

  # Generate PDF
  npx @marp-team/marp-cli \
    "$slides_file" \
    --engine "$ENGINE" \
    --theme "$THEME" \
    --html \
    --pdf \
    --output "$OUTPUT_DIR/pdf/${session_name}.pdf" \
    2>/dev/null

  echo "  ✅ HTML: output/html/${session_name}.html"
  echo "  ✅ PDF:  output/pdf/${session_name}.pdf"
}

if [[ $# -eq 1 ]]; then
  # Build specific session
  matches=("$REPO_ROOT"/sessions/session-"$1"-*)
  if [[ -d "${matches[0]}" ]]; then
    build_session "${matches[0]}"
  else
    echo "❌ No session found matching session-$1-*"
    exit 1
  fi
else
  # Build all sessions
  for session_dir in "$REPO_ROOT"/sessions/session-*/; do
    build_session "$session_dir"
  done
fi

echo ""
echo "🎉 Done! Slides are in output/pdf/ and output/html/"
