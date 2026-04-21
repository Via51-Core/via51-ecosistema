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
