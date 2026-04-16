import express from "express";
import cors from "cors";
import { Via51BlackBox } from "../src/core/blackbox_main";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// RUTA RAIZ: Ahora Vercel la encontrara aqui
app.get("/", (req, res) => {
    res.status(200).send("VIA51 HUB OPERATIVO - MODO API ACTIVO");
});

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ONLINE", node: "BETA-HUB", pulse: Date.now() });
});

app.post("/api/v1/gatekeeper", async (req, res) => {
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(output);
    } catch (e: any) {
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

export default app;
