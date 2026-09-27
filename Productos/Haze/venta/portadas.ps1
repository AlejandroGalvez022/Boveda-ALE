# Haze - genera las portadas de la ficha de venta en venta/portadas/.
# Uso: powershell -ExecutionPolicy Bypass -File portadas.ps1
. "C:\Users\galve\Documents\BOVEDA\RELOAD\Reload interno\Herramientas\cdp.ps1"
$ErrorActionPreference = 'Stop'
$port = 9401
$out = Join-Path $PSScriptRoot "portadas"
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out | Out-Null }
$page = "file:///" + (Join-Path $PSScriptRoot "portada.html").Replace([char]92, [char]47)
# nombre, query, ancho, alto
$shots = @(
  @("01-haze-portada-1600x1200",  "m=trio&t=12&label=1",                      1600, 1200),
  @("02-caustics-1600x1200",      "m=caustics&p=lagoon&t=14&e=0.5",           1600, 1200),
  @("03-ribbons-1600x1200",       "m=ribbons&p=dusk&t=9&e=0.55",              1600, 1200),
  @("04-chrome-1600x1200",        "m=chrome&p=steel&t=3&e=0.5",               1600, 1200),
  @("05-haze-portada-1920x1080",  "m=trio&t=12&label=1",                      1920, 1080),
  @("06-caustics-magma-1600x1200","m=caustics&p=magma&t=40&e=0.45",           1600, 1200),
  @("07-ribbons-violet-1600x1200","m=ribbons&p=violet&t=31&e=0.5",            1600, 1200),
  @("08-chrome-lagoon-1600x1200", "m=chrome&p=lagoon&t=17&e=0.35",            1600, 1200)
)
$S = Start-Cdp $port
try {
  foreach ($shot in $shots) {
    Set-Viewport $S $shot[2] $shot[3]
    Open-Page $S ($page + "?" + $shot[1]) 2500
    Save-Shot $S (Join-Path $out ($shot[0] + ".png")) | Out-Null
    Write-Output ("  " + $shot[0] + ".png")
  }
} finally {
  Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -like "*cdp-prof-$port*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}
