const { sessionData } = require("./createSession");

const getSessionById = (req, res) => {
    const sessionId = req.params.id;

    if (!sessionData[sessionId]) {
        return res.status(404).json({ message: "Session not found" });
    }

    res.json({ selectedTemplate: sessionData[sessionId].selectedTemplate });
};

module.exports = getSessionById;