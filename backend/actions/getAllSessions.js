const { sessionData } = require("./createSession");

const getAllSessions = (req, res) => {
    res.json(sessionData);
};

module.exports = getAllSessions;