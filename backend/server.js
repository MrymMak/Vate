const express = require("express");
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
const API_KEY = process.env.CLOUDFLARE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Check API keys on startup (only in development for safety)
const isLocal = process.env.NODE_ENV !== "production";
if (isLocal) {
    console.log("Loaded API Key (hidden in production):", API_KEY ? "SET" : "NOT SET");
}

// CORS options
const corsOptions = {
    origin: "*", // Allow all origins (adjust for production)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-api-key"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware to Check API Key (Only in Production)
app.use((req, res, next) => {
    if (isLocal || req.path === "/" || req.path === "/favicon.ico") return next();

    const receivedKey = req.headers["x-api-key"]?.trim();
    const expectedKey = API_KEY?.trim();

    if (!receivedKey || receivedKey !== expectedKey) {
        return res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }
    next();
});

// API Routes
app.post("/api/session", createSession);
app.get("/api/session/:id", getSessionById);
app.get("/api/session", getAllSessions);

// Proxy Route for Session Data
app.get("/proxy/session/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const response = await fetch(`https://vate-proxy.vategpt.workers.dev/api/session/${id}`, {
            headers: {
                "x-api-key": API_KEY
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ message: "Session not found or error fetching data" });
        }

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Root Route for Health Check
app.get("/", (_, res) => {
    res.send("Vate Backend is Running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});