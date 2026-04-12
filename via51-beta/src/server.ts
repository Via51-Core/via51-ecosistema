import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TAITA_DATA = {
    img: "/ceo-lima.png",
    thoughts: [
        "Primero en calificaciones y al fondo de la cedula para moverles el piso a los corruptos.",
        "Hay taita lindo, hasta que al fin te revelaste como morado, taitita es peruano."
    ]
};

app.post("/api/v1/gatekeeper", (req, res) => {
    const { action } = req.body;
    if (action === "GET_PORTADA") return res.json(TAITA_DATA);
    res.json({ status: "OK", server: "hub.via51.org" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[BETA] Hub en puerto ${PORT}`));
