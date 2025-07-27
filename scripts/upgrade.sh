#!/bin/bash
# deploy.sh - Automated upgrade script for the zhblogs V4 project.
# Author: MYXXTS
# Date: 2025-07-27
# Description: This script automates the upgrade process for the zhblogs V4 project with github webhook.

echo "======Starting deployment script...======"
# Navigate to the project root directory
cd "$(git rev-parse --show-toplevel)" || exit 1
echo "Navigated to project root: $(pwd)"
# Store the old commit hash
OLD_COMMIT=$(git rev-parse HEAD)
# Pull the latest changes from the main branch
echo "Pulling latest changes from main branch..."
git pull origin main || { echo "Failed to pull latest changes"; exit 1; }
# Check if the commit hash has changed
NEW_COMMIT=$(git rev-parse HEAD)
# Check commit hash
if [ "$OLD_COMMIT" = "$NEW_COMMIT" ]; then
  exit 90
fi
echo "New changes detected, proceeding with upgrade."
# Check if there are any changes in the .env.example file
if git diff --name-only "$OLD_COMMIT" "$NEW_COMMIT" -- .env.example | grep -q .env.example; then
  exit 91
else
  echo "No changes in .env.example, continuing with existing environment file."
fi
# Install dependencies
echo "Installing dependencies..."
pnpm -r install || { echo "Failed to install dependencies"; exit 1; }
# Build the project
echo "Building the project..."
pnpm build || { echo "Build failed"; exit 1; }
# Reload the project
echo "Reload the project with PM2..."
pm2 reload ./configs/ecosystem.config.js --only "zhblogs-server,zhblogs-web" || { echo "Failed to reload PM2"; exit 1; }

