const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import API actions
const { createSession } = require("./actions/createSession");
const getSessionById = require("./actions/getSessionById");
const getAllSessions = require("./actions/getAllSessions");

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.post("/api/session", createSession);
app.get("/api/session/:id", getSessionById);
app.get("/api/session", getAllSessions);

// Root route
app.get("/", (req, res) => {
    res.send("Vate Backend is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});