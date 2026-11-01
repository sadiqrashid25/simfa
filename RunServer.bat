@echo off
title SiMFa Designer Local Server
echo ===================================================
echo     SiMFa DESIGNER - LOCAL WEB SERVER LAUNCHER
echo ===================================================
echo.
echo Starting server on http://localhost:8080/ ...
echo Please keep this window open while using the application.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$port = 8080;" ^
  "$webroot = '%~dp0';" ^
  "$listener = New-Object System.Net.HttpListener;" ^
  "$listener.Prefixes.Add('http://localhost:' + $port + '/');" ^
  "$listener.Prefixes.Add('http://127.0.0.1:' + $port + '/');" ^
  "try { $listener.Start(); Write-Host 'Server started successfully on http://localhost:8080/'; Start-Process 'http://localhost:8080/' } catch { Write-Error ('Failed to start: ' + $_); pause; exit 1 };" ^
  "while ($listener.IsListening) {" ^
  "  try {" ^
  "    $context = $listener.GetContext();" ^
  "    $request = $context.Request;" ^
  "    $response = $context.Response;" ^
  "    $rawPath = $request.Url.LocalPath;" ^
  "    if ($rawPath -eq '/') { $rawPath = '/index.html' };" ^
  "    $decodedPath = [System.Uri]::UnescapeDataString($rawPath);" ^
  "    $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($webroot, $decodedPath.TrimStart('/')));" ^
  "    if ($filePath.StartsWith($webroot) -and (Test-Path $filePath -PathType Leaf)) {" ^
  "      $extension = [System.IO.Path]::GetExtension($filePath).ToLower();" ^
  "      $contentType = 'text/html; charset=utf-8';" ^
  "      if ($extension -eq '.js') { $contentType = 'application/javascript; charset=utf-8' }" ^
  "      elseif ($extension -eq '.css') { $contentType = 'text/css; charset=utf-8' }" ^
  "      elseif ($extension -eq '.json') { $contentType = 'application/json; charset=utf-8' }" ^
  "      elseif ($extension -eq '.png') { $contentType = 'image/png' }" ^
  "      elseif ($extension -eq '.jpg' -or $extension -eq '.jpeg') { $contentType = 'image/jpeg' }" ^
  "      elseif ($extension -eq '.svg') { $contentType = 'image/svg+xml; charset=utf-8' };" ^
  "      $response.ContentType = $contentType;" ^
  "      $bytes = [System.IO.File]::ReadAllBytes($filePath);" ^
  "      $response.ContentLength64 = $bytes.Length;" ^
  "      $response.OutputStream.Write($bytes, 0, $bytes.Length)" ^
  "    } else {" ^
  "      $response.StatusCode = 404;" ^
  "      $response.ContentType = 'text/plain; charset=utf-8';" ^
  "      $bytes = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found');" ^
  "      $response.ContentLength64 = $bytes.Length;" ^
  "      $response.OutputStream.Write($bytes, 0, $bytes.Length)" ^
  "    };" ^
  "    $response.Close()" ^
  "  } catch {}" ^
  "}"
pause
