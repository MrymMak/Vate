import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import HomePage from "./pages/HomePage";
import Docs from "./pages/Docs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TechnicalDocs from "./pages/TechnicalDocs";
import OverviewTopics from "./pages/OverviewTopics";
import TempDocsOverviewIndex1 from "./pages/TempDocsOverviewIndex1";


// Placeholder components for missing pages
const NotFound = () => <h1>404: Page Not Found</h1>;

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Auth Pages */}
                <Route path="/" element={<LoginSignupPage />} />

                {/* Template Route */}
                <Route path="/TempDocsOverviewIndex1" element={<TempDocsOverviewIndex1 />} />

                {/* Main Pages */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                {/* Template Pages */}
                <Route path="/technical-docs" element={<TechnicalDocs />} />
                <Route path="/overview-topics" element={<OverviewTopics />} />


                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;