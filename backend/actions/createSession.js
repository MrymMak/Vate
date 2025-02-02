const sessionData = {};

const createSession = (req, res) => {
    try {
        const { selectedTemplate } = req.body;
        if (!selectedTemplate) {
            return res.status(400).json({ message: "Template is required." });
        }

        const sessionId = Date.now().toString(); // Generate unique session ID
        sessionData[sessionId] = { selectedTemplate };

        res.status(201).json({ sessionId });
    } catch (error) {
        console.error("Error creating session:", error.message);
        res.status(500).json({ message: "Error creating session." });
    }
};

module.exports = { createSession, sessionData };