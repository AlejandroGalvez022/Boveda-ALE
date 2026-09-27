# Haze - batería de pruebas. Uso: powershell -ExecutionPolicy Bypass -File pruebas.ps1
# Construye dist/, abre suite.html en Chrome headless (WebGL por SwiftShader)
# y enseña lo que pasa y lo que falla. Sale con código 1 si algo falla.
# Además comprueba las páginas de la demo a 1440 y 390: errores de consola y
# desbordes horizontales.
. "C:\Users\galve\Documents\BOVEDA\RELOAD\Reload interno\Herramientas\cdp.ps1"
$ErrorActionPreference = 'Stop'
$port = 9391
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "..\paquete\build.ps1") | Out-Null
$suite = "file:///" + (Join-Path $PSScriptRoot "suite.html").Replace([char]92, [char]47)
$demo  = "file:///" + (Resolve-Path (Join-Path $PSScriptRoot "..\paquete\demo")).Path.Replace([char]92, [char]47) + "/"
$fails = 0
$S = Start-Cdp $port
try {
  Invoke-Cdp $S 'Page.addScriptToEvaluateOnNewDocument' @{ source = "window.__e=[];addEventListener('error',function(e){__e.push(e.message)});var _w=console.warn;console.warn=function(){__e.push([].join.call(arguments,' '))};var _x=console.error;console.error=function(){__e.push('E '+[].join.call(arguments,' '))};" } | Out-Null
  Set-Viewport $S 1280 800
  foreach ($h in @("", "#reduced")) {
    Open-Page $S ($suite + $h) 6000
    Invoke-Cdp $S 'Page.reload' @{ ignoreCache = $true } | Out-Null   # el hash solo no recarga
    Start-Sleep -Milliseconds 6000
    $r = Invoke-Js $S "return {r:window.RESULT, e:window.__e}" 60000
    if (-not $r.r.done) { Write-Output "SUITE$h NO TERMINO. Errores: $($r.e -join ' | ')"; $fails++ ; continue }
    foreach ($o in $r.r.ok)   { Write-Output "  ok    $o" }
    foreach ($f in $r.r.fail) { Write-Output "  FALLA $f"; $fails++ }
    if ($r.e.Count) { Write-Output ("  consola: " + ($r.e -join ' | ')); $fails++ }
    if ($r.r.data.caustics) { Write-Output ("  datos: " + ($r.r.data | ConvertTo-Json -Compress -Depth 4)) }
  }
  $fr = "file:///" + (Join-Path $PSScriptRoot "framer.html").Replace([char]92, [char]47)
  Set-Viewport $S 1200 600
  Open-Page $S $fr 9000
  Start-Sleep -Milliseconds 2000
  $v = Invoke-Js $S "return window.verdict ? window.verdict() : {ok:[],fail:['framer.html no cargo (sin internet?)']}" 60000
  foreach ($o in $v.ok)   { Write-Output "  ok    $o" }
  foreach ($f in $v.fail) { Write-Output "  FALLA $f"; $fails++ }
  foreach ($pg in @("index.html", "examples/minimal.html", "examples/scroll.html", "examples/card.html")) {
    foreach ($w in 1440, 390) {
      Set-Viewport $S $w 844 1 ($w -lt 500)
      Open-Page $S ($demo + $pg) 3500
      $x = Invoke-Js $S "return {e:window.__e, ov:document.documentElement.scrollWidth-document.documentElement.clientWidth, c:document.querySelectorAll('canvas').length}"
      $bad = ($x.ov -gt 0) -or ($x.e.Count -gt 0) -or ($x.c -lt 1)
      if ($bad) { $fails++ }
      Write-Output ("  {0} {1} @{2}: desborde={3}px canvas={4} consola={5}" -f ($(if ($bad) { 'FALLA' } else { 'ok   ' })), $pg, $w, $x.ov, $x.c, ($x.e -join ' | '))
    }
  }
} finally {
  Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -like "*cdp-prof-$port*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}
Write-Output ("`nFALLOS: " + $fails)
if ($fails) { exit 1 }
