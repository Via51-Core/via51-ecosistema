# VIA51 ANTIGRAVITY - SOVEREIGN CLEANER & SEO INJECTOR
# SEQUENCE: [V51-A20-SEO]

$RootPath = "C:\via51-fractal"
$AlfaPath = "$RootPath\via51-alfa"
$BetaPath = "$RootPath\via51-beta"

Write-Host "--- INICIANDO INYECCION DE SEO Y LIMPIEZA ESTRUCTURAL ---" -ForegroundColor Cyan

# 1. INYECCION DE METADATOS EN INDEX.HTML (ALFA)
$SEO_HTML = @'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/ceo-lima.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO BASICO -->
    <title>VIA51 Antigravity | Desarrollo Sostenible de Calidad Mundial</title>
    <meta name="description" content="Plataforma soberana para la gestion ciudadana y el desarrollo sostenible de calidad mundial en una generacion. Peru Soberano." />
    <meta name="keywords" content="via51, antigravity, peru, desarrollo sostenible, calidad mundial, soberania digital, gestion ciudadana" />
    <meta name="author" content="Fredy Bazalar" />

    <!-- METADATOS DE COMPARTICION (OPEN GRAPH) -->
    <meta property="og:title" content="VIA51 Antigravity - Peru Soberano" />
    <meta property="og:description" content="Por un Peru con desarrollo sostenible de calidad mundial en una generacion." />
    <meta property="og:image" content="/ceo-lima.png" />
    <meta property="og:url" content="https://via51.org" />
    <meta property="og:type" content="website" />

    <!-- TWITTER / X CARDS -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="VIA51 Antigravity" />
    <meta name="twitter:description" content="Desarrollo sostenible de calidad mundial en una generacion." />
    <meta name="twitter:image" content="/ceo-lima.png" />

    <!-- ESTRUCTURA SEMANTICA (JSON-LD) PARA GOOGLE -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VIA51 Antigravity",
      "url": "https://via51.org",
      "logo": "https://via51.org/ceo-lima.png",
      "slogan": "Por un Peru con desarrollo sostenible de calidad mundial en una generacion"
    }
    </script>
</head>
<body style="background-color: black; margin: 0;">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
'@
Set-Content -Path "$AlfaPath\index.html" -Value $SEO_HTML
Write-Host "[SEO] Metadatos inyectados en index.html" -ForegroundColor Green

# 2. SELLADO DE INTERFAZ ALFA (App.tsx) - MANTENIENDO GEOMETRIA A-19
$AlfaApp = @'
import React, { useState, useEffect } from "react";

export default function App() {
    const [thoughtIdx, setIdx] = useState(0);
    const [data, setData] = useState({ 
        img: "/ceo-lima.png", 
        thoughts: [
            "Primero en calificaciones y al fondo de la cedula para moverles el piso a los corruptos.",
            "Hay taita lindo, hasta que al fin te revelaste como morado, taitita es peruano."
        ] 
    });

    const API_URL = "https://hub.via51.org"; 

    useEffect(() => {
        const sync = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ dna: { id: "NODE-ALFA-0", seq: "A-20" }, action: "GET_PORTADA" })
                });
                const remote = await res.json();
                if (remote && remote.thoughts) setData(remote);
            } catch (e) { console.warn("Sincronia activa."); }
        };
        sync();
        const timer = setInterval(() => setIdx(i => (i + 1) % 2), 9000);
        return () => clearInterval(timer);
    }, []);

    const MainUI = ({ mode }: { mode: "desktop" | "mobile" }) => {
        const isMob = mode === "mobile";
        return (
            <div className={`h-full w-full relative flex flex-col items-center overflow-hidden bg-black font-sans ${isMob ? "justify-end pb-24" : "justify-start pt-[50vh]"}`}>
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url("${data.img}")`, opacity: isMob ? 0.85 : 0.6 }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div className={`relative z-10 text-center w-full px-12 transition-all duration-1000`}>
                    <div className={`${isMob ? "min-h-[120px]" : "min-h-[200px]"} flex items-center justify-center`}>
                        <p className={`text-white font-black italic uppercase leading-tight animate-in fade-in slide-in-from-bottom duration-1000 ${isMob ? "text-2xl tracking-tighter" : "text-6xl tracking-tight"}`}>
                            {data.thoughts[thoughtIdx]}
                        </p>
                    </div>
                    <div className={`bg-purple-600 mx-auto shadow-[0_0_20px_rgba(168,85,247,0.9)] ${isMob ? "h-1.5 w-20 my-6" : "h-2 w-32 mt-16 mb-10"}`}></div>
                    <p className="text-green-500 font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase">
                        VIA51 Antigravity // hub.via51.org
                    </p>
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-black flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-[2] border-r border-white/5"><MainUI mode="desktop" /></div>
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    <MainUI mode="mobile" />
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path "$AlfaPath\src\App.tsx" -Value $AlfaApp

Write-Host "--- PROCESO COMPLETADO EXITOSAMENTE ---" -ForegroundColor Green
Write-Host "SEO INYECTADO. LISTO PARA GIT PUSH." -ForegroundColor White