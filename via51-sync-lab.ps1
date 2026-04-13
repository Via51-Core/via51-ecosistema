# VIA51 ANTIGRAVITY - LABORATORY SYNC SCRIPT
# SEQUENCE: [V51-SYNC-M05-M07-A24]

$RootPath = "C:\via51-fractal"
$BetaCore = "$RootPath\via51-beta\src\core"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- INICIANDO SELLADO DE ARCHIVOS AL 100% ---" -ForegroundColor Cyan

# 1. ACTUALIZACION: event_log.ts (MECANICA 05)
$EventLog = @'
/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-05-MIRROR" }
 * MECANICA 05: SELLADO EN SUPABASE CON PROTOCOLO ESPEJO
 */
import { createClient } from "@supabase/supabase-js";
import { V51_Result } from "./processor";

const supabase = createClient(
    process.env.SUPABASE_URL || "", 
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export class CoreEventLog {
    public static async seal(result: V51_Result, env: string): Promise<string> {
        // DECISOR DE TABLA: SOBERANIA DE ENTORNO
        const targetTable = (env === "LAB") ? "dev_sys_events" : "sys_events";
        
        console.log(`[EVENT_LOG] Registrando en: ${targetTable.toUpperCase()}`);

        try {
            const { data, error } = await supabase
                .from(targetTable)
                .insert([{
                    actor_id: result.dna_origin,
                    action_type: result.action_performed,
                    payload: result.payload_out
                }])
                .select();

            if (error) throw error;
            return data[0].id;
        } catch (e: any) {
            console.error(`[EVENT_LOG] FALLO: ${e.message}`);
            return "ERROR_UNSEALED";
        }
    }
}
'@
Set-Content -Path "$BetaCore\event_log.ts" -Value $EventLog

# 2. ACTUALIZACION: blackbox_main.ts (MECANICA 07)
$BlackBox = @'
/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-07-DB" }
 * MECANICA 07: INTERFAZ DE LA CAJA NEGRA (THE BLACK BOX)
 */
import { CoreValidator, V51_Package } from "./validator";
import { CoreProcessor } from "./processor";
import { CoreOrchestrator } from "./orchestrator";
import { CoreHangar } from "./hangar";
import { CoreEventLog } from "./event_log";

export class Via51BlackBox {
    public static async handleSinapsis(pkg: V51_Package): Promise<any> {
        console.log(`[BLACKBOX] Pulso de ${pkg.v51_dna.node} [ENV: ${pkg.v51_dna.env || 'PROD'}]`);

        if (!CoreValidator.validate(pkg)) {
            return { status: "ERROR", msg: "SINAPSIS_RECHAZADA" };
        }

        const scenario = CoreHangar.loadScenario("ASUNTOS-PUBLICOS");
        if (!scenario) return { status: "ERROR", msg: "SCENARIO_MISSING" };

        const result = await CoreProcessor.process(pkg);

        // EXTRAER ENTORNO DEL DNA PARA EL SELLO
        const env = (pkg.v51_dna as any).env || "PROD";
        const tx_id = await CoreEventLog.seal(result, env);
        
        const dispatchPlan = CoreOrchestrator.orchestrate(result);

        return { ...result, tx_id, plan: dispatchPlan };
    }
}
'@
Set-Content -Path "$BetaCore\blackbox_main.ts" -Value $BlackBox

# 3. ACTUALIZACION: App.tsx (DRIVER ALFA - NIVEL 0)
$AlfaContent = @'
/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-24", env: "LAB" }
 */
import React, { useState } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [result, setResult] = useState<any>(null);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return alert("DNI requiere 8 digitos.");
        setStatus("PROCESSING");
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-24", env: "LAB", pulse: Date.now() },
                    action: "GET_LIFE_DATA",
                    payload: { dni }
                })
            });
            const output = await res.json();
            setResult(output);
            setStatus("SUCCESS");
        } catch (e) { setStatus("ERROR"); }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6">
            <div className="w-full max-w-[420px] h-[750px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3rem] relative flex flex-col overflow-hidden shadow-2xl">
                <div className="p-8 pb-4">
                    <h1 className="text-xl font-black italic tracking-tighter">VIA51 <span className="text-yellow-500">LAB</span></h1>
                    <p className="text-[8px] text-zinc-600 font-mono uppercase">Sinapsis: Mirror Protocol</p>
                </div>
                <div className="flex-1 px-10 py-4">
                    {!result ? (
                        <div className="mt-20">
                            <input value={dni} onChange={(e) => setDni(e.target.value)} placeholder="DNI" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center outline-none focus:border-yellow-500 mb-10" />
                            <button onClick={triggerSinapsis} className="w-full bg-yellow-500 text-black font-black p-5 uppercase text-xs tracking-widest hover:bg-white transition-all">
                                {status === "PROCESSING" ? "Simbiosis..." : "Iniciar Sinapsis"}
                            </button>
                        </div>
                    ) : (
                        <div className="animate-in zoom-in duration-500">
                            <h2 className="text-2xl font-black text-white uppercase italic mb-6">Resultado Autorizado</h2>
                            <div className="space-y-3">
                                <div className="bg-zinc-900 p-4 border-l-2 border-yellow-500">
                                    <p className="text-[8px] text-zinc-500 uppercase font-black">Registro Trazable</p>
                                    <p className="text-[10px] text-zinc-300 font-mono break-all mt-2">{result.tx_id}</p>
                                </div>
                                <p className="text-[9px] text-zinc-600 text-center mt-6 uppercase">Los datos han sido sellados en dev_sys_events</p>
                                <button onClick={() => setResult(null)} className="w-full text-[9px] text-zinc-500 underline mt-4">VOLVER</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path "$AlfaApp" -Value $AlfaContent

Write-Host "--- ACTUALIZACION COMPLETADA AL 100% ---" -ForegroundColor Green
Write-Host "ARCHIVOS SELLADOS. PROCEDA CON GIT PUSH ORIGIN DEV." -ForegroundColor White