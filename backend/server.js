const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const createSession = require("./actions/createSession");
const getSessionById = require("./actions/getSessionById");
const getAllSessions = require("./actions/getAllSessions");

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;

// CORS options
const corsOptions = {
    origin: "*", // Allow all origins temporarily
    methods: "GET, POST",
    allowedHeaders: "Content-Type, x-api-key",
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware to Check API Key
const API_KEY = process.env.API_KEY;
app.use((req, res, next) => {
    const providedKey = req.headers["x-api-key"];
    if (!providedKey || providedKey !== API_KEY) {
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
        console.log(`Fetching session data for ID: ${id}`);

        const response = await fetch(`https://vate.onrender.com/api/session/${id}`, {
            headers: { "x-api-key": API_KEY },
        });

        if (!response.ok) {
            return res.status(response.status).json({ message: "Session not found or error fetching data" });
        }

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error("Error in proxy session retrieval:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Root route
app.get("/", (req, res) => {
    res.send("Vate Backend is Running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});