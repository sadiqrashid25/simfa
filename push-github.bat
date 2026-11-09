@echo off
title Push Update SiMFa ke GitHub
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
cd /d "C:\Users\PhIS\.gemini\antigravity\scratch\simfa"
echo ========================================================
echo Menghantar kod Cloud Firebase SiMFa ke GitHub...
echo ========================================================
git push origin main
echo.
echo Selesai! Kod telah dihantar ke GitHub.
pause