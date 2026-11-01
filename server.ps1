$port = 9091
$webroot = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:${port}/")

try {
    $listener.Start()
    Write-Host "Server running at http://localhost:${port}/"
    Start-Process "http://localhost:${port}/"
} catch {
    Write-Error "Failed to start: $_"
    exit 1
}

while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response
        $rawPath = $req.Url.LocalPath
        if ($rawPath -eq '/') { $rawPath = '/index.html' }
        $decodedPath = [System.Uri]::UnescapeDataString($rawPath)
        $filePath = Join-Path $webroot $decodedPath.TrimStart('/')

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $ct = 'text/html; charset=utf-8'
            if ($ext -eq '.js') { $ct = 'application/javascript; charset=utf-8' }
            elseif ($ext -eq '.css') { $ct = 'text/css; charset=utf-8' }
            elseif ($ext -eq '.json') { $ct = 'application/json; charset=utf-8' }
            elseif ($ext -eq '.png') { $ct = 'image/png' }
            elseif ($ext -eq '.jpg' -or $ext -eq '.jpeg') { $ct = 'image/jpeg' }
            elseif ($ext -eq '.svg') { $ct = 'image/svg+xml; charset=utf-8' }
            elseif ($ext -eq '.webmanifest') { $ct = 'application/manifest+json; charset=utf-8' }

            $res.ContentType = $ct
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
            $res.ContentType = 'text/plain; charset=utf-8'
            $notFound = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $res.ContentLength64 = $notFound.Length
            $res.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        $res.Close()
    } catch {}
}
