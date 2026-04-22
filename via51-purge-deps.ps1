# VIA51 ANTIGRAVITY - PURGE DEPS FOR CLEAN BUILD
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"

Write-Host "--- PURGANDO MOCHILA DE DEPENDENCIAS ---" -ForegroundColor Cyan

# Eliminar carpetas y locks en todos los niveles para evitar bucles
Get-ChildItem -Path $RootPath -Include "node_modules","package-lock.json" -Recurse | Remove-Item -Recurse -Force

Write-Host "[OK] Mochila purgada. El sistema esta ligero." -ForegroundColor Green