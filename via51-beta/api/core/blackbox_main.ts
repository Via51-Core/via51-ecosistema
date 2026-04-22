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
