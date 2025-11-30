# Ukrainian Statistics MCP Server - Installation Script (Windows PowerShell)
# This script installs dependencies, builds the project, and makes the command globally available

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Ukrainian Statistics MCP Server - Installation" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Error: Node.js is not installed." -ForegroundColor Red
    Write-Host "Please install Node.js 18 or higher from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build project" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Project built successfully" -ForegroundColor Green
Write-Host ""

# Link globally
Write-Host "🔗 Linking globally (making command available system-wide)..." -ForegroundColor Cyan
npm link
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Failed to link globally" -ForegroundColor Yellow
    Write-Host "You may need to run PowerShell as Administrator:" -ForegroundColor Yellow
    Write-Host "   Right-click PowerShell -> Run as Administrator" -ForegroundColor Yellow
    Write-Host "   Then run: .\install.ps1" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Globally linked" -ForegroundColor Green
Write-Host ""

# Verify installation
$command = Get-Command ukrainian-stats-mcp -ErrorAction SilentlyContinue
if ($command) {
    Write-Host "✅ Installation successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "The 'ukrainian-stats-mcp' command is now available globally." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Add to Claude Desktop configuration:" -ForegroundColor White
    Write-Host ""
    Write-Host "   Windows: $env:APPDATA\Claude\claude_desktop_config.json" -ForegroundColor Gray
    Write-Host ""
    Write-Host '   {' -ForegroundColor Gray
    Write-Host '     "mcpServers": {' -ForegroundColor Gray
    Write-Host '       "ukrainian-stats": {' -ForegroundColor Gray
    Write-Host '         "command": "ukrainian-stats-mcp"' -ForegroundColor Gray
    Write-Host '       }' -ForegroundColor Gray
    Write-Host '     }' -ForegroundColor Gray
    Write-Host '   }' -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Restart Claude Desktop" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Try asking: 'List all available Ukrainian statistical dataflows'" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "⚠️  Warning: Command not found in PATH" -ForegroundColor Yellow
    Write-Host "You may need to restart your terminal" -ForegroundColor Yellow
}

Read-Host "Press Enter to exit"
