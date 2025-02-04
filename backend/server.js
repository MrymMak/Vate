const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const createSession = require("./actions/createSession");
const getSessionById = require("./actions/getSessionById");
const getAllSessions = require("./actions/getAllSessions");

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;

// Load API Keys
const API_KEY = process.env.API_KEY || process.env.RENDER_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// CORS options
const corsOptions = {
    origin: "*", // Allow all origins temporarily
    methods: "GET, POST",
    allowedHeaders: "Content-Type, x-api-key",
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware to Check API Key (Only on Production)
const isLocal = process.env.NODE_ENV !== "production"; // Check if running locally

app.use((req, res, next) => {
    if (isLocal) {
        return next(); // Skip API key check in local development
    }

    const providedKey = req.headers["x-api-key"];

    // Log the raw key values using JSON.stringify to reveal whitespace or newlines
    console.log("Received API Key (raw):", JSON.stringify(providedKey), "Length:", providedKey ? providedKey.length : 0);
    console.log("Expected API Key (raw):", JSON.stringify(API_KEY), "Length:", API_KEY ? API_KEY.length : 0);

    // Compare trimmed keys to eliminate accidental whitespace issues
    if (!providedKey || providedKey.trim() !== API_KEY.trim()) {
        console.log("API Key Mismatch! Access Denied.");
        return res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }
    next();
});

// API Routes
app.post("/api/session", createSession);
app.get("/api/session/:id", getSessionById);
app.get("/api/session", getAllSessions);

// Proxy Route for Session Data (Fixes OpenAI Key Issue)
app.get("/proxy/session/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching session data for ID: ${id}`);

        const response = await fetch(`https://vate.onrender.com/api/session/${id}`, {
            headers: {
                "x-api-key": API_KEY,
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ message: "Session not found or error fetching data" });
        }

        const data = await response.json();
        console.log("Session Data Retrieved:", data);
        return res.json(data);
    } catch (error) {
        console.error("Error in proxy session retrieval:", error);
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