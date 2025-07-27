#!/bin/bash
# deploy.sh - Automated deployment script for the zhblogs V4 project.
# Author: MYXXTS
# Date: 2025-07-27
# Description: This script automates the deployment process for the zhblogs V4 project.

echo "======Starting deployment script...======"
# Navigate to the project root directory
cd "$(git rev-parse --show-toplevel)" || exit 1
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
# Start the project
echo "Start the project with PM2..."
pm2 start ./configs/ecosystem.config.js  || { echo "Failed to reload PM2"; exit 1; }
