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
