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
