@echo off
REM Ukrainian Statistics MCP Server - Installation Script (Windows)
REM This script installs dependencies, builds the project, and makes the command globally available

echo ================================================
echo Ukrainian Statistics MCP Server - Installation
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js 18 or higher from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js detected
node --version
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo Dependencies installed
echo.

REM Build the project
echo Building project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Failed to build project
    pause
    exit /b 1
)

echo Project built successfully
echo.

REM Link globally
echo Linking globally (making command available system-wide)...
call npm link
if %ERRORLEVEL% NEQ 0 (
    echo Failed to link globally
    echo You may need to run this script as Administrator
    pause
    exit /b 1
)

echo Globally linked
echo.

REM Verify installation
where ukrainian-stats-mcp >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Installation successful!
    echo.
    echo The 'ukrainian-stats-mcp' command is now available globally.
    echo.
    echo Next steps:
    echo.
    echo 1. Add to Claude Desktop configuration:
    echo.
    echo    Windows: %%APPDATA%%\Claude\claude_desktop_config.json
    echo.
    echo    {
    echo      "mcpServers": {
    echo        "ukrainian-stats": {
    echo          "command": "ukrainian-stats-mcp"
    echo        }
    echo      }
    echo    }
    echo.
    echo 2. Restart Claude Desktop
    echo.
    echo 3. Try asking: 'List all available Ukrainian statistical dataflows'
    echo.
) else (
    echo Warning: Command not found in PATH
    echo You may need to restart your terminal
)

pause
