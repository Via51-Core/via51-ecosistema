# VIA51 ANTIGRAVITY - SOVEREIGN SYNC B-35 / A-37
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL / ARCHIVOS AL 100%

$RootPath = "C:\via51-fractal"
$BetaIndex = "$RootPath\via51-beta\api\index.ts"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- INICIANDO SELLADO DE ARCHIVOS AL 100% ---" -ForegroundColor Cyan

# 1. ACTUALIZACION AL 100%: api/index.ts (BETA)
$BetaCode = @'
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL || "", 
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

app.get("/", (req, res) => res.status(200).send("VIA51 HUB OPERATIVO - MODO SOBERANO"));

app.post("/api/v1/gatekeeper", async (req, res) => {
    const { v51_dna, payload } = req.body;

    try {
        // 1. BUSQUEDA EN REGISTRO MAESTRO
        const { data: actor, error: actorErr } = await supabase
            .from("sys_registry")
            .select("*")
            .eq("dni", payload.dni)
            .single();

        if (actorErr || !actor) {
            return res.status(403).json({ status: "DENIED", msg: "IDENTIDAD_NO_REGISTRADA" });
        }

        // 2. SELLADO DE EVENTO VINCULADO
        const targetTable = (v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";
        const { data: event, error: eventErr } = await supabase
            .from(targetTable)
            .insert([{
                actor_id: actor.id,
                action_type: "ACCESO_AUTORIZADO",
                payload: { 
                    auth: actor.auth_level,
                    is_vitalicio: actor.is_vitalicio,
                    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress
                }
            }])
            .select();

        if (eventErr) throw eventErr;

        // 3. RESPUESTA CON CUALIFICACIONES
        res.status(200).json({ 
            status: "SUCCESS", 
            tx_id: event[0].id,
            user: {
                name: actor.full_name,
                role: actor.role,
                vitalicio: actor.is_vitalicio,
                auth: actor.auth_level
            }
        });

    } catch (e: any) {
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

export default app;
'@
Set-Content -Path $BetaIndex -Value $BetaCode
Write-Host "[OK] Beta Hub sellado al 100%." -ForegroundColor Green

# 2. ACTUALIZACION AL 100%: src/App.tsx (ALFA)
$AlfaCode = @'
/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-37", env: "LAB" }
 */
import React, { useState } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [user, setUser] = useState<any>(null);

    const API_URL = "https://hub.via51.org";

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, ""); 
        if (val.length <= 8) setDni(val);
    };

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return;
        setStatus("PROCESSING");
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-37", env: "LAB", pulse: Date.now() },
                    payload: { dni }
                })
            });
            const out = await res.json();
            if (out.status === "SUCCESS") {
                setUser(out.user);
                setStatus("SUCCESS");
                setDni("");
            } else { 
                alert(out.msg || "Acceso Denegado");
                setStatus("IDLE"); 
            }
        } catch (e) { 
            alert("Error de conexion con el Hub");
            setStatus("IDLE"); 
        }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6 overflow-hidden">
            <div className="w-full max-w-[420px] h-[750px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3.5rem] relative flex flex-col shadow-2xl overflow-hidden">
                <div className="p-12 text-center">
                    <h1 className="text-2xl font-[1000] italic tracking-tighter">VIA51 <span className="text-green-500 uppercase">Antigravity</span></h1>
                </div>

                <div className="flex-1 px-10 flex flex-col justify-center">
                    {status !== "SUCCESS" ? (
                        <>
                            <p className="text-[10px] text-zinc-600 uppercase text-center mb-4 tracking-widest">Identidad Soberana</p>
                            <input type="text" value={dni} onChange={handleInput} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-5xl font-bold text-center outline-none focus:border-green-500 mb-10 transition-all" />
                            <button onClick={triggerSinapsis} disabled={status === "PROCESSING" || dni.length !== 8} className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${dni.length === 8 ? "bg-green-600 text-black hover:bg-white" : "bg-zinc-800 text-zinc-500"}`}>
                                {status === "PROCESSING" ? "VALIDANDO..." : "INICIAR SINAPSIS"}
                            </button>
                        </>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-500">
                            <p className="text-green-500 font-black text-5xl mb-4">✓</p>
                            <h2 className="text-xl font-black uppercase italic">{user.name}</h2>
                            <p className="text-[10px] text-purple-500 font-bold tracking-widest mt-2 uppercase">
                                {user.role} {user.vitalicio ? "VITALICIO" : ""}
                            </p>
                            <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 text-left">
                                <p className="text-[8px] text-zinc-500 uppercase font-black">Nivel de Autenticacion</p>
                                <p className="text-xs text-green-400 font-bold">{user.auth}</p>
                            </div>
                            <button onClick={() => { setStatus("IDLE"); setUser(null); }} className="mt-12 text-[9px] text-zinc-600 underline uppercase tracking-widest">Cerrar Sesion</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode
Write-Host "[OK] Alfa App sellada al 100%." -ForegroundColor Green

Write-Host "--- PROCESO COMPLETADO. PROCEDA CON GIT PUSH ---" -ForegroundColor Yellow