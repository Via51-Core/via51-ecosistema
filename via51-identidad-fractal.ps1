# VIA51 ANTIGRAVITY - IDENTIDAD FRACTAL A-45 / B-40
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL / ARCHIVOS AL 100%

$RootPath = "C:\via51-fractal"
$BetaApi = "$RootPath\via51-beta\api"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- SELLANDO PROTOCOLO DE IDENTIDAD FRACTAL ---" -ForegroundColor Cyan

# 1. ACTUALIZACION: api/core/blackbox_main.ts (EL CEREBRO)
$BlackBox = @'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any, ip: string): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        if (action === "GET_SMART_CANVAS") {
            return { status: "SUCCESS", config: { bg_img: "/ceo-lima.png", thoughts: ["Primero en calificaciones...", "Hay taita lindo..."], interval: 8000 } };
        }

        if (action === "CHECK_IDENTITY") {
            const dni = payload.dni;
            
            // A. Obtener Geo-Data (Simulado o via API externa en produccion)
            const geo = { city: "Lima", region: "Lima", country: "Peru" };

            // B. Consultar Registro Maestro
            let { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", dni).single();

            // C. Si es INEXISTENTE (Confirmado por humano), denegar amablemente
            if (actor && actor.auth_status === "INEXISTENTE") {
                return { status: "DENIED_AMABLE", msg: "Lo sentimos, el registro no pudo ser validado." };
            }

            // D. Si no existe, registrar como nuevo (Nivel 1)
            if (!actor) {
                const { data: newActor } = await supabase.from("sys_registry").insert([{
                    dni: dni,
                    full_name: "Ciudadano Nuevo",
                    role: "CITIZEN",
                    hierarchy_level: 1,
                    auth_status: "POR_VERIFICAR"
                }]).select().single();
                actor = newActor;
            }

            // E. Sellar evento con IP y Geo
            const targetTable = (v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";
            await supabase.from(targetTable).insert([{
                actor_id: actor.id,
                action_type: "SINAPSIS_IDENTIDAD",
                payload: { ip, geo, timestamp: new Date().toISOString(), level: actor.hierarchy_level }
            }]);

            return { 
                status: "SUCCESS", 
                user: { name: actor.full_name, level: actor.hierarchy_level, status: actor.auth_status } 
            };
        }

        return { status: "ERROR" };
    }
}
'@
Set-Content -Path "$BetaApi\core\blackbox_main.ts" -Value $BlackBox

# 2. ACTUALIZACION: api/index.ts (EL HUB)
$HubCode = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => res.send("VIA51 HUB ONLINE - B-40"));

app.post("/api/v1/gatekeeper", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "0.0.0.0";
    const output = await Via51BlackBox.handleSinapsis(req.body, String(ip));
    res.status(200).json(output);
});

export default app;
'@
Set-Content -Path "$BetaApi\index.ts" -Value $HubCode

# 3. ACTUALIZACION: App.tsx (LA CARA)
$AlfaCode = @'
import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); 
    const [dni, setDni] = useState("");
    const [user, setUser] = useState<any>(null);
    const [thoughtIdx, setIdx] = useState(0);
    const [config, setConfig] = useState({ bg_img: "/ceo-lima.png", thoughts: ["VIA51 ANTIGRAVITY"], interval: 8000 });

    const API_URL = "https://hub.via51.org";

    useEffect(() => {
        fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "GET_SMART_CANVAS", v51_dna: { node: "ALFA", env: "LAB" } })
        }).then(r => r.json()).then(data => { if(data.config) setConfig(data.config); });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setIdx(i => (i + 1) % config.thoughts.length), config.interval);
        return () => clearInterval(timer);
    }, [config]);

    const handleAuth = async () => {
        if (dni.length !== 8) return;
        const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "CHECK_IDENTITY", payload: { dni }, v51_dna: { node: "ALFA", env: "LAB" } })
        });
        const out = await res.json();
        
        if (out.status === "SUCCESS") {
            setUser(out.user);
            setView("PROFILE");
            setDni("");
        } else if (out.status === "DENIED_AMABLE") {
            alert(out.msg);
            setDni("");
            setView("CANVAS");
        }
    };

    const MainUI = ({ isMob }: { isMob: boolean }) => (
        <div className="h-full w-full relative flex flex-col items-center justify-end overflow-hidden bg-black font-sans">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url("${config.bg_img}")` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className={`relative z-10 text-center w-full px-12 ${isMob ? 'pb-24' : 'pb-40'}`}>
                <p className="text-white font-black italic uppercase leading-tight text-2xl md:text-6xl">
                    {config.thoughts[thoughtIdx]}
                </p>
                <div className="h-1.5 w-20 bg-purple-600 mx-auto my-6"></div>
                <p className="text-green-500 font-bold tracking-[0.4em] text-[10px] uppercase">Soberania Digital</p>
            </div>
            <button onClick={() => setView("LOGIN")} className="absolute bottom-10 right-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-50">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-[2] border-r border-white/5"><MainUI isMob={false} /></div>
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    {view === "CANVAS" && <MainUI isMob={true} />}
                    {view === "LOGIN" && (
                        <div className="absolute inset-0 bg-black/95 z-[100] p-10 flex flex-col justify-center text-center">
                            <button onClick={() => setView("CANVAS")} className="absolute top-12 right-8 text-zinc-600">✕</button>
                            <h2 className="text-white text-2xl font-black mb-10 uppercase italic">Identidad</h2>
                            <input type="text" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, "").slice(0,8))} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center text-white outline-none focus:border-purple-500 mb-10" />
                            <button onClick={handleAuth} className="w-full bg-purple-600 text-white font-black p-5 uppercase text-xs tracking-widest hover:bg-purple-500">Validar</button>
                        </div>
                    )}
                    {view === "PROFILE" && (
                        <div className="absolute inset-0 bg-black/95 z-[100] p-10 flex flex-col justify-center text-center animate-in zoom-in">
                            <p className="text-green-500 text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black text-white uppercase mb-2">{user.name}</h2>
                            <p className="text-[10px] text-purple-500 font-bold uppercase tracking-widest">Nivel de Acceso: {user.level}</p>
                            <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 text-left">
                                <p className="text-[8px] text-zinc-500 uppercase font-black">Estado Registral</p>
                                <p className="text-xs text-green-400 font-bold">{user.status}</p>
                            </div>
                            <button onClick={() => setView("CANVAS")} className="mt-12 text-[9px] text-zinc-600 underline uppercase">Cerrar Sesion</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode

Write-Host "--- PROTOCOLO DE IDENTIDAD SELLADO AL 100% ---" -ForegroundColor Green