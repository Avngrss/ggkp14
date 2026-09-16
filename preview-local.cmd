@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\preview-local.ps1"
if errorlevel 1 (
  echo.
  pause
)
endlocal
