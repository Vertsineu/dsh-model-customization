#!/usr/bin/env sh
# Uninstall the 模型定制 (Model Customization) plugin from a dsh profile.
#
# Usage: ./uninstall.sh [profile-dir]
#   profile-dir defaults to ${DSH_HOME:-$HOME/.dsh}/profiles/web
#
# Reverse of install.sh:
#   1. removes the cordis.patch.yml row that mounts the plugin
#      (the two comment lines this repo's installer wrote are removed too)
#   2. removes the pnpm dependency
#      (== `dsh plugin --profile <name> remove -w dsh-model-customization`)
#
# Idempotent: safe to re-run. Restart dsh afterwards.
# POSIX sh: safe to pipe into `sh` or `bash` alike.
set -eu

PROFILE_DIR="${1:-${DSH_HOME:-$HOME/.dsh}/profiles/web}"
PKG_NAME="dsh-model-customization"
ROW_ID="model-customization"

if [ ! -f "$PROFILE_DIR/cordis.patch.yml" ]; then
  echo "error: $PROFILE_DIR/cordis.patch.yml not found — is this a dsh profile directory?" >&2
  echo "usage: $0 [profile-dir]" >&2
  exit 1
fi

echo "→ removing cordis row"
if grep -qE "^[[:space:]]+-[[:space:]]+id:[[:space:]]+${ROW_ID}[[:space:]]*$" "$PROFILE_DIR/cordis.patch.yml"; then
  awk -v rowid="$ROW_ID" '
    { lines[NR] = $0 }
    END {
      for (i = 1; i <= NR; i++) {
        if (lines[i] ~ ("^[ \t]*- id: " rowid "[ \t]*$")) {
          del[i] = 1
          # the "name:" line directly below (when present)
          if (lines[i+1] ~ /^[ \t]+name:[ \t]*/) del[i+1] = 1
          # walk up: the "- insert:" line, then the two comment lines
          # written by the repo installer above the block
          j = i - 1
          if (j >= 1 && lines[j] ~ /^[ \t]*- insert:[ \t]*$/) { del[j] = 1; j-- }
          if (j >= 1 && lines[j] ~ /^[ \t]*#.*github\.com\/Vertsineu\/dsh-model-customization[ \t]*$/) { del[j] = 1; j-- }
          if (j >= 1 && lines[j] ~ /^[ \t]*#.*模型定制/) del[j] = 1
        }
      }
      for (i = 1; i <= NR; i++) if (!del[i]) print lines[i]
    }
  ' "$PROFILE_DIR/cordis.patch.yml" > "$PROFILE_DIR/cordis.patch.yml.tmp"
  mv "$PROFILE_DIR/cordis.patch.yml.tmp" "$PROFILE_DIR/cordis.patch.yml"
else
  echo "  (row not present — nothing to remove)"
fi

echo "→ pnpm remove $PKG_NAME"
if grep -q "\"$PKG_NAME\"" "$PROFILE_DIR/package.json"; then
  command -v pnpm >/dev/null 2>&1 || {
    echo "error: pnpm not found, but $PROFILE_DIR/package.json still lists $PKG_NAME." >&2
    echo "  (manual: dsh plugin --profile <name> remove -w $PKG_NAME)" >&2
    exit 1
  }
  if [ -f "$PROFILE_DIR/pnpm-workspace.yaml" ]; then
    (cd "$PROFILE_DIR" && pnpm remove -w "$PKG_NAME")
  else
    (cd "$PROFILE_DIR" && pnpm remove "$PKG_NAME")
  fi
else
  echo "  (dependency not present — nothing to remove)"
fi

echo ""
echo "done. Restart dsh (e.g. re-run 'dsh web') to drop the 模型定制 settings section."
