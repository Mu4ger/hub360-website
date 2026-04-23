#!/usr/bin/env bash
# Create github.com/<you>/hub360-website if needed and push main.
# One-time: run `gh auth login` in this folder (or anywhere) first.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI first, for example: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in to GitHub. Run this once, then re-run this script:"
  echo "  gh auth login"
  exit 1
fi

LOGIN="$(gh api user -q .login)"
REMOTE_URL="https://github.com/${LOGIN}/hub360-website.git"
git remote set-url origin "${REMOTE_URL}"

if gh repo view "${LOGIN}/hub360-website" >/dev/null 2>&1; then
  echo "Remote repo already exists: https://github.com/${LOGIN}/hub360-website"
else
  echo "Creating public repository ${LOGIN}/hub360-website ..."
  gh repo create hub360-website \
    --public \
    --description "HUB360 marketing site — Sunshine Act / Open Payments meal compliance"
fi

git push -u origin main
echo "Done: https://github.com/${LOGIN}/hub360-website"
