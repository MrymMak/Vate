const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store session data in memory
let sessionData = {};

// API endpoint to retrieve session template data
app.get("/api/session/:id", (req, res) => {
    const sessionId = req.params.id;

    // Check if the session ID exists
    if (!sessionData[sessionId]) {
        return res.status(404).json({ message: "Session not found" });
    }

    // Respond with the selected template data
    const { selectedTemplate } = sessionData[sessionId];
    res.json({ selectedTemplate });
});

// API endpoint to create a session with the selected template
app.post("/api/session", (req, res) => {
    try {
        const { selectedTemplate } = req.body;

        if (!selectedTemplate) {
            return res.status(400).json({ message: "Template is required." });
        }

        // Generate a session ID and store the data
        const sessionId = Date.now().toString();
        sessionData[sessionId] = {
            selectedTemplate,
        };

        res.json({ sessionId });
    } catch (error) {
        console.error("Error creating session:", error.message);
        res.status(500).json({ message: "Error creating session." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});