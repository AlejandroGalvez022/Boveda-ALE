# Haze - graba el video de la ficha de venta (venta/haze-video-WxH.mp4).
# Uso: powershell -ExecutionPolicy Bypass -File video.ps1 [-W 1920 -H 1080]
# Necesita ffmpeg: lo trae el paquete de Python imageio-ffmpeg (pip install imageio-ffmpeg).
param([int]$W = 1920, [int]$H = 1080)
. "C:\Users\galve\Documents\BOVEDA\RELOAD\Reload interno\Herramientas\cdp.ps1"
$ErrorActionPreference = 'Stop'
$port = 9404
$ffmpeg = (& python -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())").Trim()
if (-not (Test-Path $ffmpeg)) { throw "Falta ffmpeg: pip install imageio-ffmpeg" }
$frames = Join-Path $env:TEMP "haze-video-frames"
if (Test-Path $frames) { Remove-Item $frames -Recurse -Force }
New-Item -ItemType Directory -Path $frames | Out-Null
$page = "file:///" + (Join-Path $PSScriptRoot "video.html").Replace([char]92, [char]47)
$out = Join-Path $PSScriptRoot ("haze-video-" + $W + "x" + $H + ".mp4")

$S = Start-Cdp $port
try {
  Set-Viewport $S $W $H
  Open-Page $S $page 2500
  $total = [int](Invoke-Js $S "return TOTAL")
  for ($f = 0; $f -lt $total; $f++) {
    Invoke-Js $S "go($f)" | Out-Null
    $r = Invoke-Cdp $S 'Page.captureScreenshot' @{ format = 'jpeg'; quality = 94 } 60000
    [IO.File]::WriteAllBytes((Join-Path $frames ('f{0:D4}.jpg' -f $f)), [Convert]::FromBase64String($r.data))
    if ($f % 60 -eq 0) { Write-Output "  fotograma $f / $total" }
  }
} finally {
  Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -like "*cdp-prof-$port*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}

# H.264 + yuv420p + faststart: lo que reproduce cualquier navegador y cualquier tienda.
& $ffmpeg -y -loglevel error -framerate 30 -i (Join-Path $frames 'f%04d.jpg') -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart $out
Remove-Item $frames -Recurse -Force
Write-Output ("Hecho: " + $out + "  (" + [math]::Round((Get-Item $out).Length / 1MB, 1) + " MB)")
