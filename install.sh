#!/bin/bash

# Ukrainian Statistics MCP Server - Installation Script (Linux/macOS)
# This script installs dependencies, builds the project, and makes the command globally available

set -e  # Exit on error

echo "🇺🇦 Ukrainian Statistics MCP Server - Installation"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "Please install Node.js 18 or higher from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version 18 or higher is required."
    echo "Current version: $(node -v)"
    echo "Please upgrade Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build project"
    exit 1
fi

echo "✅ Project built successfully"
echo ""

# Link globally
echo "🔗 Linking globally (making command available system-wide)..."
npm link

if [ $? -ne 0 ]; then
    echo "⚠️  Failed to link globally. You may need to run with sudo:"
    echo "   sudo ./install.sh"
    echo ""
    echo "Or configure npm to use a user directory:"
    echo "   mkdir ~/.npm-global"
    echo "   npm config set prefix '~/.npm-global'"
    echo "   echo 'export PATH=~/.npm-global/bin:\$PATH' >> ~/.bashrc"
    echo "   source ~/.bashrc"
    echo "   ./install.sh"
    exit 1
fi

echo "✅ Globally linked"
echo ""

# Verify installation
if command -v ukrainian-stats-mcp &> /dev/null; then
    echo "✅ Installation successful!"
    echo ""
    echo "The 'ukrainian-stats-mcp' command is now available globally."
    echo ""
    echo "📝 Next steps:"
    echo ""
    echo "1. Add to Claude Desktop configuration:"
    echo ""
    echo "   macOS: ~/Library/Application Support/Claude/claude_desktop_config.json"
    echo "   Linux: ~/.config/Claude/claude_desktop_config.json"
    echo ""
    echo "   {"
    echo "     \"mcpServers\": {"
    echo "       \"ukrainian-stats\": {"
    echo "         \"command\": \"ukrainian-stats-mcp\""
    echo "       }"
    echo "     }"
    echo "   }"
    echo ""
    echo "2. Restart Claude Desktop"
    echo ""
    echo "3. Try asking: 'List all available Ukrainian statistical dataflows'"
    echo ""
else
    echo "⚠️  Warning: Command not found in PATH"
    echo "You may need to restart your terminal or add npm global bin to PATH"
    echo ""
    echo "Run: npm config get prefix"
    echo "Then add <prefix>/bin to your PATH"
fi
