const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const createSession = require("./actions/createSession");
const getSessionById = require("./actions/getSessionById");
const getAllSessions = require("./actions/getAllSessions");

dotenv.config(); // Load environment variables

const app = express(); // ✅ Move this above middleware
const PORT = 5000;

// ✅ CORS options
const corsOptions = {
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions)); // ✅ Now app is defined before use
app.use(express.json()); // ✅ Allow JSON requests

// ✅ API Routes
app.post("/api/session", createSession);
app.get("/api/session/:id", getSessionById);
app.get("/api/session", getAllSessions);

// ✅ Root route
app.get("/", (req, res) => {
    res.send("Vate Backend is Running!");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});