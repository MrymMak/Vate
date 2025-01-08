import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import TemplateLibraryPage from "./components/TemplateLibraryPage"; // Next page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginSignupPage />} />
                <Route path="/template-library" element={<TemplateLibraryPage />} />
            </Routes>
        </Router>
    );
}

export default App;