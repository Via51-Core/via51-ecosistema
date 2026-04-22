# VIA51 ANTIGRAVITY - COMPOSITION ENGINE A-49 / B-27
# PROTOCOLO: SIN ACENTOS EN CODIGO / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"
$BetaApi = "$RootPath\via51-beta\api"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- REESTRUCTURANDO COMPOSICION DINAMICA ---" -ForegroundColor Cyan

# 1. ACTUALIZACION: blackbox_main.ts (EL GUIONISTA ESTRUCTURAL)
$BlackBox = @'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any, ip: string): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        // EL NUCLEO ENTREGA EL GUION ESTRUCTURAL (COMPOSICION)
        if (action === "GET_SMART_CANVAS") {
            return {
                status: "SUCCESS",
                config: {
                    bg_img: "/ceo-lima.png",
                    thoughts: [
                        "Primero en calificaciones y al final de la cedula para moverles el piso a los corruptos.",
                        "Hay taita lindo, hasta que al fin te revelaste como morado, taitita es peruano."
                    ],
                    // AJUSTES DE COMPOSICION POR MARCO
                    styles: {
                        desktop: { textScale: "4vw", lineMargin: "mt-16", padding: "pt-[45vh]" },
                        mobile: { textScale: "7vw", lineMargin: "my-6", padding: "justify-end pb-24" }
                    },
                    interval: 9000
                }
            };
        }

        if (action === "SIGN_PROTOCOL") {
            const { dni, whatsapp } = payload;
            let { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", dni).single();
            if (!actor) {
                const { data: n } = await supabase.from("sys_registry").insert([{ dni, full_name: "Por Validar", role: "CITIZEN", hierarchy_level: 1 }]).select().single();
                actor = n;
            }
            await supabase.from((v51_dna.env === "LAB" ? "dev_sys_events" : "sys_events")).insert([{
                actor_id: actor.id,
                action_type: "ACEPTACION_PROTOCOLO",
                payload: { dni, whatsapp, ip, timestamp: new Date().toISOString() }
            }]);
            return { status: "SUCCESS", user: actor.full_name };
        }
        return { status: "ERROR" };
    }
}
'@
Set-Content -Path "$BetaApi\core\blackbox_main.ts" -Value $BlackBox

# 2. ACTUALIZACION: App.tsx (EL MOTOR DE RENDERIZADO FLUIDO)
$AlfaCode = @'
import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); 
    const [lang, setLang] = useState("ES");
    const [thoughtIdx, setIdx] = useState(0);
    const [config, setConfig] = useState<any>(null);

    const API_URL = "https://hub.via51.org";

    useEffect(() => {
        fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "GET_SMART_CANVAS", v51_dna: { node: "ALFA", env: "LAB" } })
        }).then(r => r.json()).then(data => { if(data.config) setConfig(data.config); });
    }, []);

    useEffect(() => {
        if (!config) return;
        const timer = setInterval(() => setIdx(i => (i + 1) % config.thoughts.length), config.interval);
        return () => clearInterval(timer);
    }, [config]);

    const MainUI = ({ mode }: { mode: "desktop" | "mobile" }) => {
        const isMob = mode === "mobile";
        const layout = config?.styles[mode] || { textScale: "5vw", padding: "pt-20", lineMargin: "my-4" };
        
        return (
            <div className={`h-full w-full relative flex flex-col items-center overflow-hidden bg-black font-sans ${layout.padding}`}>
                {/* FONDO SOBERANO - ASEGURANDO COBERTURA TOTAL */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ 
                        backgroundImage: `url("${config?.bg_img || '/ceo-lima.png'}")`,
                        opacity: isMob ? 0.8 : 0.5,
                        backgroundSize: 'cover'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="relative z-10 text-center w-full px-10">
                    <div className={`${isMob ? 'min-h-[140px]' : 'min-h-[220px]'} flex items-center justify-center`}>
                        <p 
                            className="text-white font-[1000] italic uppercase leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000"
                            style={{ fontSize: layout.textScale }}
                        >
                            {config?.thoughts[thoughtIdx] || "VIA51"}
                        </p>
                    </div>
                    
                    <div className={`bg-purple-600 mx-auto shadow-[0_0_25px_purple] transition-all ${layout.lineMargin} ${isMob ? 'h-1 w-16' : 'h-1.5 w-32'}`}></div>
                    
                    <p className="text-green-500 font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase opacity-80">
                        VIA51 Antigravity
                    </p>
                </div>

                <button onClick={() => setView("LOGIN")} className="absolute bottom-10 right-10 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center z-50 animate-pulse">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </button>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-row overflow-hidden">
            {/* MARCO MONITOR (DESKTOP) */}
            <div className="hidden lg:flex flex-[2] bg-zinc-950 items-center justify-center border-r border-white/5">
                <div className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-700">
                    <MainUI mode="desktop" />
                </div>
            </div>
            
            {/* MARCO CELULAR (MÓVIL) */}
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    {view === "CANVAS" && <MainUI mode="mobile" />}
                    {view === "LOGIN" && (
                        <div className="absolute inset-0 bg-black/95 z-[100] p-10 flex flex-col justify-center text-center animate-in slide-in-from-bottom duration-500">
                            <h2 className="text-white text-xl font-black mb-10 uppercase italic">Identidad Soberana</h2>
                            <button onClick={() => setView("CANVAS")} className="mt-6 text-[9px] text-zinc-600 underline uppercase">Regresar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode

Write-Host "--- COMPOSICION DINAMICA SELLADA. PROCEDA CON GIT PUSH ---" -ForegroundColor Green