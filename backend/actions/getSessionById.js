const { sessionData } = require("./createSession");

const getSessionById = (req, res) => {
    const sessionId = req.params.id;
    console.log(`🔍 Received request for session ID: ${sessionId}`); // Debugging log

    if (!sessionData[sessionId]) {
        console.log("⚠️ Session not found!");
        return res.status(404).json({ message: "Session not found" });
    }

    console.log(`Sending session data:`, sessionData[sessionId]); // Debugging log
    res.json({ selectedTemplate: sessionData[sessionId].selectedTemplate });
};

module.exports = getSessionById;