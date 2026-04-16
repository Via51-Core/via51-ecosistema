# VIA51 ANTIGRAVITY - CLOUD IGNITION B-20
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"
$BetaPath = "$RootPath\via51-beta"

Write-Host "--- INICIANDO CONFIGURACION DE DESPLIEGUE CLOUD ---" -ForegroundColor Cyan

# 1. CREACION DE VERCEL.JSON (El mapa para que Vercel reconozca el servidor)
$VercelConfig = @'
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.ts"
    }
  ]
}
'@
Set-Content -Path "$BetaPath\vercel.json" -Value $VercelConfig
Write-Host "[OK] vercel.json creado en Beta." -ForegroundColor Green

# 2. ASEGURAR DEPENDENCIAS DE NUBE EN PACKAGE.JSON
$BetaPackage = @'
{
  "name": "via51-beta",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "npx tsx watch src/server.ts",
    "start": "npx tsx src/server.ts"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "@supabase/supabase-js": "^2.39.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "tsx": "^4.0.0",
    "typescript": "^5.0.4",
    "@vercel/node": "^3.0.0"
  }
}
'@
Set-Content -Path "$BetaPath\package.json" -Value $BetaPackage
Write-Host "[OK] package.json actualizado con tipos de Vercel." -ForegroundColor Green

Write-Host "--- CONFIGURACION LISTA. PROCEDA CON GIT PUSH ---" -ForegroundColor Yellow