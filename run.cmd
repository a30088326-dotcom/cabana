@echo off
setlocal
cd /d "%~dp0"
node "%~dp0scripts\run.mjs" %*
exit /b %errorlevel%
