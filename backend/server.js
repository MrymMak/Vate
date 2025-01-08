const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = 5000;
const upload = multer({ dest: "uploads/" }); // Store uploaded files in a temporary "uploads" directory

// Create a temporary storage directory if it doesn't exist
const tempStorageDir = path.join(__dirname, "temp-storage");
if (!fs.existsSync(tempStorageDir)) {
    fs.mkdirSync(tempStorageDir);
}

// Middleware
app.use(cors());
app.use(express.json());

// Store session data in memory
let sessionData = {};

// API endpoint to handle file uploads and templates
app.post("/api/vategpt", upload.single("file"), async (req, res) => {
    try {
        const { selectedTemplate } = req.body;
        const uploadedFile = req.file;

        if (!selectedTemplate || !uploadedFile) {
            return res.status(400).json({
                message: "Template and file are required.",
            });
        }

        // Move uploaded file to temporary storage
        const tempFilePath = path.join(tempStorageDir, uploadedFile.filename);
        fs.renameSync(uploadedFile.path, tempFilePath);

        // Generate a session ID and store the data
        const sessionId = Date.now().toString();
        sessionData[sessionId] = {
            selectedTemplate,
            tempFilePath,
            originalFileName: uploadedFile.originalname,
        };

        // Generate URL for VateGPT redirection
        const vateGPTUrl = `https://chat.openai.com/?session=${sessionId}`;
        res.json({ url: vateGPTUrl });
    } catch (error) {
        console.error("Error processing the request:", error.message);
        res.status(500).json({
            message: "Error processing the request. Please try again.",
        });
    }
});

// API endpoint to retrieve session data
app.get("/api/session/:id", (req, res) => {
    const sessionId = req.params.id;

    if (!sessionData[sessionId]) {
        return res.status(404).json({ message: "Session not found" });
    }

    res.json(sessionData[sessionId]);
});

// Start cleanup process to remove old files and sessions
setInterval(() => {
    const now = Date.now();
    const expirationTime = 3600000; // 1 hour

    Object.keys(sessionData).forEach((sessionId) => {
        const { tempFilePath } = sessionData[sessionId];
        if (now - parseInt(sessionId) > expirationTime) {
            // Delete the file
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            // Remove the session data
            delete sessionData[sessionId];
        }
    });
}, 60000); // Run cleanup every minute

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});