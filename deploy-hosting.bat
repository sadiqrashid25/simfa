@echo off
title Deploy SiMFa ke Firebase Hosting
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"
cd /d "C:\Users\PhIS\.gemini\antigravity\scratch\simfa"
echo ========================================================
echo Memulakan Proses Deploy SiMFa ke: simfa-pkd-sik
echo ========================================================
echo.
"%LOCALAPPDATA%\Programs\nodejs\firebase.cmd" login
echo.
echo Sedang muat naik fail SiMFa ke Cloud Hosting...
"%LOCALAPPDATA%\Programs\nodejs\firebase.cmd" deploy --only hosting --project simfa-pkd-sik
echo.
echo ========================================================
echo Selesai! Tekan sebarang kekunci untuk tutup.
echo ========================================================
pause