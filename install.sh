#!/usr/bin/env bash
# Install the 模型定制 (Model Customization) plugin into a dsh profile.
#
# Usage: ./install.sh [profile-dir]
#   profile-dir defaults to ${DSH_HOME:-$HOME/.dsh}/profiles/web
#
# Idempotent: safe to re-run after updating the package files.
set -euo pipefail

PROFILE_DIR="${1:-${DSH_HOME:-$HOME/.dsh}/profiles/web}"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIRNAME="model-customization"
PKG_NAME="dsh-model-customization"
ROW_ID="model-customization"

if [ ! -f "$PROFILE_DIR/cordis.patch.yml" ]; then
  echo "error: $PROFILE_DIR/cordis.patch.yml not found — is this a dsh profile directory?" >&2
  echo "usage: $0 [profile-dir]" >&2
  exit 1
fi
command -v node >/dev/null 2>&1 || { echo "error: node is required" >&2; exit 1; }

echo "→ copying package into $PROFILE_DIR/$PLUGIN_DIRNAME"
mkdir -p "$PROFILE_DIR/$PLUGIN_DIRNAME/lib"
cp "$SRC_DIR/package.json" "$PROFILE_DIR/$PLUGIN_DIRNAME/package.json"
cp "$SRC_DIR/lib/index.js" "$SRC_DIR/lib/client.js" "$PROFILE_DIR/$PLUGIN_DIRNAME/lib/"

WORKSPACE_FILE="$PROFILE_DIR/pnpm-workspace.yaml"
if [ ! -f "$WORKSPACE_FILE" ]; then
  echo "→ creating $WORKSPACE_FILE"
  printf 'packages:\n  - .\n  - %s\nnodeLinker: hoisted\n' "$PLUGIN_DIRNAME" > "$WORKSPACE_FILE"
elif ! grep -qE "^[[:space:]]+-[[:space:]]+${PLUGIN_DIRNAME}[[:space:]]*$" "$WORKSPACE_FILE"; then
  echo "→ registering workspace package"
  awk -v item="  - $PLUGIN_DIRNAME" '
    { out[NR] = $0 }
    /^packages:[[:space:]]*$/ { pk = NR }
    pk && !done && /^[[:space:]]+- / { last = NR; done = 1 }
    END {
      for (i = 1; i <= NR; i++) {
        print out[i]
        if (pk && !done && i == pk) print item
        if (done && i == last) print item
      }
    }
  ' "$WORKSPACE_FILE" > "$WORKSPACE_FILE.tmp"
  mv "$WORKSPACE_FILE.tmp" "$WORKSPACE_FILE"
fi

echo "→ adding profile dependency on $PKG_NAME"
node -e '
  const fs = require("node:fs");
  const path = process.argv[1];
  const name = process.argv[2];
  const j = JSON.parse(fs.readFileSync(path, "utf8"));
  j.dependencies = { ...(j.dependencies ?? {}), [name]: "workspace:*" };
  fs.writeFileSync(path, JSON.stringify(j, null, 2) + "\n");
' "$PROFILE_DIR/package.json" "$PKG_NAME"

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

if command -v pnpm >/dev/null 2>&1; then
  echo "→ pnpm install in profile"
  (cd "$PROFILE_DIR" && pnpm install)
else
  echo "warn: pnpm not found — run 'pnpm install' in $PROFILE_DIR manually"
fi

echo ""
echo "done. Restart dsh (e.g. re-run 'dsh web') to pick up the 模型定制 settings section."
