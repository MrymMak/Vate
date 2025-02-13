const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const createSession = require("./actions/createSession");
const getSessionById = require("./actions/getSessionById");
const getAllSessions = require("./actions/getAllSessions");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Load API Keys
const API_KEY = process.env.API_KEY || process.env.RENDER_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// CORS options
const corsOptions = {
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "Content-Type, x-api-key",
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware to Check API Key (Only on Production)
const isLocal = process.env.NODE_ENV !== "production";

app.use((req, res, next) => {
    if (isLocal) {
        return next(); // Skip API key check in local development
    }

    const providedKey = req.headers["x-api-key"];
    if (!providedKey || providedKey.trim() !== API_KEY?.trim()) {
        return res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }
    next();
});

const buildPath = path.join(__dirname, "../build");

// Serve React static files
app.use(express.static(buildPath));

// Handle React Router fallback
app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});

// API Routes
app.post("/api/session", createSession);
app.get("/api/session/:id", getSessionById);
app.get("/api/session", getAllSessions);

// Proxy Route for Session Data (Fixes OpenAI Key Issue)
app.get("/proxy/session/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const response = await fetch(`https://vate.onrender.com/api/session/${id}`, {
            headers: {
                "x-api-key": API_KEY,
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ message: "Session not found or error fetching data" });
        }

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Root Route for Health Check
app.get("/", (req, res) => {
    res.send("Vate Backend is Running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});