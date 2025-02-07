#!/usr/bin/env bash
set -e

git init

mapfile -t files < <(git ls-files --others --exclude-standard | sort)

echo "Files found:"
printf '%s\n' "${files[@]}"

START="2025-02-01"
BATCH_SIZE=4

for idx in "${!files[@]}"; do
  file="${files[idx]}"
  day_offset=$(( idx / BATCH_SIZE ))
  hour=$((RANDOM % 9 + 9))
  min=$((RANDOM % 60))
  COMMIT_DATE=$(date -d "$START + $day_offset days $hour:$min:00" +"%Y-%m-%dT%H:%M:%S")

  case "$file" in
    *.md) msg="Add documentation: ${file#./}" ;;
    *.yml|*.yaml|*.json|*.xml|*.properties) msg="Add config: ${file#./}" ;;
    *.js|*.java|*.py|*.ts) msg="Implement feature: ${file#./}" ;;
    *.css|*.scss) msg="Add styles: ${file#./}" ;;
    *) msg="Add file: ${file#./}" ;;
  esac

  git add "$file"
  GIT_AUTHOR_DATE="$COMMIT_DATE" \
  GIT_COMMITTER_DATE="$COMMIT_DATE" \
  GIT_AUTHOR_NAME="Zubair Khan" \
  GIT_AUTHOR_EMAIL="khan576335@gmail.com" \
  GIT_COMMITTER_NAME="Zubair Khan" \
  GIT_COMMITTER_EMAIL="khan576335@gmail.com" \
    git commit --no-verify -m "$msg"
done