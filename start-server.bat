@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo GunWorld - starting local server
echo After it says Local, open: http://127.0.0.1:5173
echo Keep this window open while playing. Close it to stop.
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo Cannot find Node.js. Please install it from https://nodejs.org then try again.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo First time setup: installing packages...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

start "" "http://127.0.0.1:5173"
call npm run dev
echo.
echo Server stopped.
pause
