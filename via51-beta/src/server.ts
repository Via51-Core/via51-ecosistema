/**
 * V51_DNA: { node: "SERVER-BETA", type: "DRIVER", seq: "B-14" }
 * HUB CENTRAL: VIA51 HUB (PUERTO 3000)
 */

import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();

// GOBERNANZA DE ACCESO: Permitir sinapsis desde el Laboratorio y Produccion
app.use(cors({
    origin: ["https://via51.org", /vercel\.app$/], // Acepta Vercel Previews
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/**
 * PUERTA DE ENTRADA UNIVERSAL (GATEKEEPER)
 * Recibe el V51_Package y lo entrega al Nucleo Agnóstico.
 */
app.post("/api/v1/gatekeeper", async (req, res) => {
    console.log(`[HUB] Recibiendo peticion de: ${req.body.v51_dna?.node || "DESCONOCIDO"}`);

    try {
        // La peticion entra a la Caja Negra (Mecanica Triple)
        const output = await Via51BlackBox.handleSinapsis(req.body);

        // Si la Caja Negra rechaza por DNA invalido o error de esquema
        if (output.status === "ERROR") {
            return res.status(403).json(output);
        }

        // El HUB devuelve el resultado procesado y el sello de trazabilidad
        res.status(200).json(output);

    } catch (e: any) {
        console.error("[HUB] Fallo critico en la transmision.");
        res.status(500).json({ status: "HUB_ERROR", msg: "SINAPSIS_INTERRUMPIDA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("\n==============================================");
    console.log(`[CARTA MAGNA] NUCLEO BETA EN LINEA (PUERTO ${PORT})`);
    console.log("==============================================\n");
});