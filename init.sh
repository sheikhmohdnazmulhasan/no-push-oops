#!/bin/bash

# Initialization script for no-push-oops development
# This script sets up the development environment

set -e

echo "Initializing no-push-oops development environment..."
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js >= 14.0.0"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "[ERROR] Node.js version must be >= 14.0.0. Current: $(node -v)"
    exit 1
fi
echo "[OK] Node.js version: $(node -v)"
echo ""

# Check npm
echo "Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed."
    exit 1
fi
echo "[OK] npm version: $(npm -v)"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
echo "[OK] Dependencies installed"
echo ""

# Build the project
echo "Building the project..."
npm run build
echo "[OK] Build complete"
echo ""

# Run tests
echo "Running tests..."
npm test
echo "[OK] Tests passed"
echo ""

# Run linter
echo "Running linter..."
npm run lint
echo "[OK] Linting passed"
echo ""

echo "Setup complete! You're ready to develop no-push-oops!"
echo ""
echo "Next steps:"
echo "  - Run 'npm run dev' to start development mode"
echo "  - Run 'npm test -- --watch' for test watch mode"
echo "  - Read SETUP.md for detailed development guide"
echo "  - Read PROJECT_SUMMARY.md for project overview"
echo ""
echo "Happy coding!"
