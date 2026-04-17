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
