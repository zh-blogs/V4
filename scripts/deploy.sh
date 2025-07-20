#!/bin/bash
# deploy.sh - Automated deployment script for the zhblogs V4 project.
# Author: MYXXTS
# Date: 2025-07-17
# Description: This script automates the deployment process for the zhblogs V4 project, including building the project, running migrations, and starting the server. Use with GitHub Webhook for automatic deployment.

echo "======Starting deployment script...======"
# Navigate to the project root directory
cd "$(git rev-parse --show-toplevel)" || exit 1
# Ensure the script is run from the project root
echo "Navigated to project root: $(pwd)"
# Pull the latest changes from the main branch
echo "Pulling latest changes from main branch..."
git pull origin main || { echo "Failed to pull latest changes"; exit 1; }
# Install dependencies
echo "Installing dependencies..."
pnpm -r install || { echo "Failed to install dependencies"; exit 1; }
# Build the project
echo "Building the project..."
pnpm build || { echo "Build failed"; exit 1; }
# RReload the project
echo "Reload the project with PM2..."
nohup pm2 reload ./configs/ecosystem.config.js > ./pm2-reload.log 2>&1 & echo "PM2_PID=$!" || { echo "Failed to reload PM2"; exit 1; }
