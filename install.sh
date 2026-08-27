#!/usr/bin/env bash
# Install the 模型定制 (Model Customization) plugin into a dsh profile.
#
# Usage: ./install.sh [profile-dir]
#   profile-dir defaults to ${DSH_HOME:-$HOME/.dsh}/profiles/web
#
# Does the two halves of the install:
#   1. pnpm add -w dsh-model-customization in the profile directory
#      (== `dsh plugin --profile <name> add -w dsh-model-customization`)
#   2. appends the cordis.patch.yml row that mounts the client plugin
#
# Idempotent: safe to re-run (also the upgrade path).
set -euo pipefail

PROFILE_DIR="${1:-${DSH_HOME:-$HOME/.dsh}/profiles/web}"
PKG_NAME="dsh-model-customization"
ROW_ID="model-customization"

if [ ! -f "$PROFILE_DIR/cordis.patch.yml" ]; then
  echo "error: $PROFILE_DIR/cordis.patch.yml not found — is this a dsh profile directory?" >&2
  echo "usage: $0 [profile-dir]" >&2
  exit 1
fi
command -v pnpm >/dev/null 2>&1 || {
  echo "error: pnpm not found." >&2
  echo "  (equivalent manual step: dsh plugin --profile <name> add $PKG_NAME)" >&2
  exit 1
}

echo "→ pnpm add $PKG_NAME in $PROFILE_DIR"
# -w targets the profile root: required when the workspace holds other
# packages, harmless otherwise. Plain `add` only for non-workspace dirs.
if [ -f "$PROFILE_DIR/pnpm-workspace.yaml" ]; then
  (cd "$PROFILE_DIR" && pnpm add -w "$PKG_NAME")
else
  (cd "$PROFILE_DIR" && pnpm add "$PKG_NAME")
fi

echo "→ appending cordis row"
if ! grep -qE "^[[:space:]]+-[[:space:]]+id:[[:space:]]+${ROW_ID}[[:space:]]*$" "$PROFILE_DIR/cordis.patch.yml"; then
  {
    printf '\n# 模型定制 (Model Customization) — per-route / per-model model customization UI.\n'
    printf '# https://github.com/Vertsineu/dsh-model-customization\n'
    printf -- '- insert:\n'
    printf '    - id: %s\n' "$ROW_ID"
    printf "      name: '%s'\n" "$PKG_NAME"
  } >> "$PROFILE_DIR/cordis.patch.yml"
fi

echo ""
echo "done. Restart dsh (e.g. re-run 'dsh web') to pick up the 模型定制 settings section."
echo "upgrade later with: dsh plugin --profile <name> update -w $PKG_NAME"
