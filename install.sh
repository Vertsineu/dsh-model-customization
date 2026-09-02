#!/usr/bin/env sh
# Install the 模型定制 (Model Customization) plugin into a dsh profile.
#
# Usage: ./install.sh [profile-dir]
#   profile-dir defaults to ${DSH_HOME:-$HOME/.dsh}/profiles/web
#
# One-liner:
#   curl -fsSL https://raw.githubusercontent.com/Vertsineu/dsh-model-customization/main/install.sh | sh
#
# Does the two halves of the install:
#   1. pnpm add -w dsh-model-customization in the profile directory
#      (== `dsh plugin --profile <name> add -w dsh-model-customization`)
#   2. inserts the cordis.patch.yml row that mounts the client plugin
#
# Idempotent: safe to re-run (also the upgrade path). Re-running on a
# profile an older script version already appended to repairs the file.
# POSIX sh: safe to pipe into `sh` or `bash` alike.
set -eu

PROFILE_DIR="${1:-${DSH_HOME:-$HOME/.dsh}/profiles/web}"
PKG_NAME="dsh-model-customization"
ROW_ID="model-customization"
PATCH_FILE="$PROFILE_DIR/cordis.patch.yml"

if [ ! -f "$PATCH_FILE" ]; then
  echo "error: $PATCH_FILE not found — is this a dsh profile directory?" >&2
  echo "usage: $0 [profile-dir]" >&2
  exit 1
fi
command -v pnpm >/dev/null 2>&1 || {
  echo "error: pnpm not found." >&2
  echo "  (equivalent manual step: dsh plugin --profile <name> add -w $PKG_NAME)" >&2
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

echo "→ inserting cordis row"
# The profile template seeds cordis.patch.yml with a top-level `[]` (the
# empty patch array). A `[]` document followed by block items is NOT valid
# YAML, so appending blindly after the template leaves a stray `[]` and
# breaks every dsh boot. The placeholder line is therefore dropped first:
# on a fresh profile the row takes its place, and re-running on a file an
# older installer already appended to repairs it.
ROW_PRESENT=0
if grep -qE "^[[:space:]]+-[[:space:]]+id:[[:space:]]+${ROW_ID}[[:space:]]*$" "$PATCH_FILE"; then
  ROW_PRESENT=1
fi
awk -v rowpresent="$ROW_PRESENT" -v rowid="$ROW_ID" -v pkg="$PKG_NAME" '
  {
    line = $0
    sub(/\r$/, "", line)
    if (line ~ /^\[\][ \t]*$/) next   # drop the template empty-array placeholder
    print
  }
  END {
    if (rowpresent == 1) exit
    print ""
    print "# 模型定制 (Model Customization) — per-route / per-model model customization UI."
    print "# https://github.com/Vertsineu/dsh-model-customization"
    print "- insert:"
    print "    - id: " rowid
    print "      name: \047" pkg "\047"
  }
' "$PATCH_FILE" > "$PATCH_FILE.tmp" && mv "$PATCH_FILE.tmp" "$PATCH_FILE"

# Defensive: the row must be in the file now, and no top-level `[]` may
# remain — a file in either state is exactly the pre-fix bug.
grep -qE "^[[:space:]]+-[[:space:]]+id:[[:space:]]+${ROW_ID}[[:space:]]*$" "$PATCH_FILE" || {
  echo "error: failed to write the $ROW_ID row into $PATCH_FILE" >&2
  exit 1
}
if grep -q '^\[\]$' "$PATCH_FILE"; then
  echo "error: a top-level [] placeholder still remains in $PATCH_FILE" >&2
  exit 1
fi

echo ""
echo "done. Restart dsh (e.g. re-run 'dsh web') to pick up the 模型定制 settings section."
echo "upgrade later with: dsh plugin --profile <name> update -w $PKG_NAME"
echo "uninstall with:     <repo>/uninstall.sh [profile-dir]"
