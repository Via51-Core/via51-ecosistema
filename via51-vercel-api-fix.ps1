# VIA51 ANTIGRAVITY - VERCEL API CONVENTION B-23
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"
$BetaPath = "$RootPath\via51-beta"

Write-Host "--- RE-ESTRUCTURANDO BETA PARA CONVENCION VERCEL API ---" -ForegroundColor Cyan

# 1. CREAR CARPETA API (Si no existe)
if (!(Test-Path "$BetaPath\api")) { New-Item -ItemType Directory -Path "$BetaPath\api" }

# 2. CREAR EL NUEVO PUNTO DE ENTRADA (api/index.ts)
# Este archivo es el que Vercel busca por defecto para levantar el Hub.
$ApiIndexContent = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "../src/core/blackbox_main";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// RUTA RAIZ: Ahora Vercel la encontrara aqui
app.get("/", (req, res) => {
    res.status(200).send("VIA51 HUB OPERATIVO - MODO API ACTIVO");
});

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ONLINE", node: "BETA-HUB", pulse: Date.now() });
});

app.post("/api/v1/gatekeeper", async (req, res) => {
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(output);
    } catch (e: any) {
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

export default app;
'@
Set-Content -Path "$BetaPath\api\index.ts" -Value $ApiIndexContent
Write-Host "[OK] api/index.ts creado." -ForegroundColor Green

# 3. ELIMINAR VERCEL.JSON (Ya no es necesario con la carpeta api)
if (Test-Path "$BetaPath\vercel.json") { 
    Remove-Item "$BetaPath\vercel.json" -Force 
    Write-Host "[OK] vercel.json eliminado para usar convencion nativa." -ForegroundColor Yellow
}

# 4. ACTUALIZAR PACKAGE.JSON
$BetaPackage = @'
{
  "name": "via51-beta",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "npx tsx watch api/index.ts",
    "start": "npx tsx api/index.ts"
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
Write-Host "[OK] package.json actualizado." -ForegroundColor Green

Write-Host "--- RE-ESTRUCTURACION COMPLETADA. PROCEDA CON GIT PUSH ---" -ForegroundColor Green