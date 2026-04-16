const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Signature du développeur
const DEVELOPER_NAME = "Mohamed Khallaoui";

const PORT = process.env.PORT || 3000;
const FILE = path.join(__dirname, "visits.json");
let lock = false;

function readCounter() {
    try {
        if (!fs.existsSync(FILE)) {
            fs.writeFileSync(FILE, JSON.stringify({ count: 0 }));
        }
        const data = fs.readFileSync(FILE);
        return JSON.parse(data).count;
    } catch (err) {
        return 0;
    }
}

function writeCounter(count) {
    try {
        fs.writeFileSync(FILE, JSON.stringify({ count }, null, 2));
    } catch (err) {
        console.error("Erreur écriture JSON:", err);
    }
}

app.get("/", async (req, res) => {
    while (lock) { await new Promise(r => setTimeout(r, 10)); }
    lock = true;
    try {
        let count = readCounter();
        count++;
        writeCounter(count);

        res.send(`
            <h1 style="color: #0078d4;">Système de Comptage Dockerisé</h1>
            <p>Développeur : <strong>${DEVELOPER_NAME}</strong></p>
            <p>Nombre de visites : <strong>${count}</strong></p>
            <p>Statut : Conteneurisé sur Azure ACR</p>
        `);
    } finally {
        lock = false;
    }
});

app.listen(PORT, () => {
    console.log(`Application de Mohamed Khallaoui sur le port ${PORT}`);
});