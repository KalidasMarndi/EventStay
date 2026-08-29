#!/bin/bash

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null
then
    echo "pnpm could not be found. Installing pnpm globally..."
    npm install -g pnpm
fi

echo "Installing dependencies..."
pnpm install

echo "Starting Next.js development server..."
pnpm dev
