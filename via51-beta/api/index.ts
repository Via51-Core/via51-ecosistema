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
