# VIA51 ANTIGRAVITY - MASTER SYNC V2
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL / ARCHIVOS AL 100%

$RootPath = "C:\via51-fractal"
$BetaApi = "$RootPath\via51-beta\api"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- RECONSTRUYENDO SINAPSIS TOTAL (ZERO ERRORS) ---" -ForegroundColor Cyan

# 1. ACTUALIZACION: api/core/validator.ts (LA ADUANA)
$ValidatorCode = @'
export class CoreValidator {
    public static validate(input: any): boolean {
        // Validacion minimalista para asegurar la sinapsis en Laboratorio
        const hasDna = input && input.v51_dna && input.v51_dna.node;
        const hasPayload = input && input.payload && input.payload.dni;
        return !!(hasDna && hasPayload);
    }
}
'@
Set-Content -Path "$BetaApi\core\validator.ts" -Value $ValidatorCode

# 2. ACTUALIZACION: api/core/blackbox_main.ts (EL NUCLEO)
$BlackBoxCode = @'
import { CoreValidator } from "./validator.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any): Promise<any> {
        // 1. VALIDACION DE ESTRUCTURA
        if (!CoreValidator.validate(pkg)) {
            return { status: "ERROR", msg: "ESTRUCTURA_INVALIDA" };
        }

        try {
            // 2. CONTRASTE EN REGISTRO MAESTRO
            const { data: actor, error: actorErr } = await supabase
                .from("sys_registry")
                .select("*")
                .eq("dni", pkg.payload.dni)
                .single();

            if (actorErr || !actor) {
                return { status: "DENIED", msg: "DNI_NO_ENCONTRADO" };
            }

            // 3. SELLADO EN TABLA ESPEJO (LAB) O REAL (PROD)
            const targetTable = (pkg.v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";
            const { data: event, error: eventErr } = await supabase
                .from(targetTable)
                .insert([{
                    actor_id: actor.id,
                    action_type: "SINAPSIS_VITALICIA",
                    payload: { dni: pkg.payload.dni, env: pkg.v51_dna.env }
                }])
                .select();

            if (eventErr) throw eventErr;

            return { 
                status: "SUCCESS", 
                tx_id: event[0].id, 
                user: { name: actor.full_name, role: actor.role, vitalicio: actor.is_vitalicio, auth: actor.auth_level } 
            };

        } catch (e: any) {
            return { status: "ERROR", msg: e.message };
        }
    }
}
'@
Set-Content -Path "$BetaApi\core\blackbox_main.ts" -Value $BlackBoxCode

# 3. ACTUALIZACION: api/index.ts (EL HUB)
$HubCode = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => res.send("VIA51 HUB ONLINE - B-35"));

app.post("/api/v1/gatekeeper", async (req, res) => {
    const output = await Via51BlackBox.handleSinapsis(req.body);
    const statusCode = output.status === "SUCCESS" ? 200 : (output.status === "DENIED" ? 403 : 400);
    res.status(statusCode).json(output);
});

export default app;
'@
Set-Content -Path "$BetaApi\index.ts" -Value $HubCode

# 4. ACTUALIZACION: App.tsx (ALFA)
$AlfaCode = @'
import React, { useState } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [user, setUser] = useState<any>(null);

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return;
        setStatus("PROCESSING");
        try {
            const res = await fetch("https://hub.via51.org/api/v1/gatekeeper", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-38", env: "LAB" },
                    payload: { dni }
                })
            });
            const out = await res.json();
            if (res.ok && out.status === "SUCCESS") {
                setUser(out.user);
                setStatus("SUCCESS");
                setDni("");
            } else {
                alert(out.msg || "RECHAZADO");
                setStatus("IDLE");
            }
        } catch (e) {
            alert("ERROR_CONEXION");
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
                            <input type="text" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, "").slice(0,8))} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-5xl font-bold text-center outline-none focus:border-green-500 mb-10" />
                            <button onClick={triggerSinapsis} disabled={status === "PROCESSING" || dni.length !== 8} className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${dni.length === 8 ? "bg-green-600 text-black" : "bg-zinc-800 text-zinc-500"}`}>
                                {status === "PROCESSING" ? "VALIDANDO..." : "INICIAR SINAPSIS"}
                            </button>
                        </>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-500">
                            <p className="text-green-500 font-black text-5xl mb-4">✓</p>
                            <h2 className="text-xl font-black uppercase italic">{user.name}</h2>
                            <p className="text-[10px] text-purple-500 font-bold mt-2 uppercase">{user.role} {user.vitalicio ? "VITALICIO" : ""}</p>
                            <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 text-left">
                                <p className="text-[8px] text-zinc-500 uppercase font-black">Autenticacion</p>
                                <p className="text-xs text-green-400 font-bold">{user.auth}</p>
                            </div>
                            <button onClick={() => { setStatus("IDLE"); setUser(null); }} className="mt-12 text-[9px] text-zinc-600 underline uppercase">Cerrar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode

Write-Host "--- SINAPSIS RECONSTRUIDA AL 100% ---" -ForegroundColor Green
Write-Host "PROCEDA CON GIT PUSH ORIGIN DEV" -ForegroundColor White