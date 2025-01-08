import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignupPage.css"; // Import the CSS file

const LoginSignupPage = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/home"); // Redirect to the Home Page
    };

    return (
        <div className="login-signup-container">
            <div className="login-signup-left">
                <h1>Welcome to <span>Vate</span></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <div className="login-signup-right">
                <div className="form-container">
                    <h2>Sign Up</h2>
                    <p>Already a member? <span className="login-link" onClick={() => navigate("/")}>Log in</span></p>
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-input" />
                        </div>
                        <div className="form-group-checkbox">
                            <label>
                                <input type="checkbox" />
                                I agree to the Terms and Conditions and Privacy Policy
                            </label>
                        </div>
                        <button type="button" onClick={handleSignUp} className="signup-button">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginSignupPage;