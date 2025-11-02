#!/bin/bash

# Quick Deploy Script - Minimal version for experienced users
# Usage: ./quick-deploy.sh "Your commit message"

set -e

cd /home/pruthvi/Desktop/personal_website

echo "🚀 Quick deploying to GitHub Pages..."

# Check if commit message provided
if [ $# -eq 0 ]; then
    COMMIT_MSG="Quick update - $(date '+%Y-%m-%d %H:%M')"
else
    COMMIT_MSG="$1"
fi

# Stage, commit, and push
git add .
git commit -m "$COMMIT_MSG" 2>/dev/null || echo "No changes to commit"
git push origin main

echo "✅ Deployed! Check https://pruthvi54.github.io in 2-3 minutes"
echo "📊 Monitor at: https://github.com/pruthvi54/pruthvi54.github.io/actions"
