import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import HomePage from "./pages/HomePage";
import Docs from "./pages/Docs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TechnicalDocs from "./pages/TechnicalDocs";
import OverviewTopics from "./pages/OverviewTopics";
import FileUploadPage from "./pages/FileUploadPage";

// Placeholder components for missing pages
const NotFound = () => <h1>404: Page Not Found</h1>;
const VateGPTPage = () => <h1>VateGPT Integration Placeholder</h1>;

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Auth Pages */}
                <Route path="/" element={<LoginSignupPage />} />

                {/* Main Pages */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                {/* Template Pages */}
                <Route path="/technical-docs" element={<TechnicalDocs />} />
                <Route path="/overview-topics" element={<OverviewTopics />} />

                {/* File Upload and VateGPT */}
                <Route path="/file-upload" element={<FileUploadPage />} />
                <Route path="/vate-gpt" element={<VateGPTPage />} />

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;