// src/pages/Login.js
import React, { useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [formType, setFormType] = useState("login"); // login, signup, or forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (formType) {
      case "login":
        if (email && password) {
          localStorage.setItem("username", email);
          alert("Login successful!");
          const previousPath = localStorage.getItem("previousPath");
          navigate(previousPath || "/checkout");
          localStorage.removeItem("previousPath");
        } else {
          alert("Please enter email and password");
        }
        break;
      case "signup":
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        if (email && password && username) {
          alert("Account created successfully! Please login.");
          setFormType("login");
          setPassword("");
          setConfirmPassword("");
        } else {
          alert("Please fill all fields");
        }
        break;
      case "forgot":
        if (email) {
          alert("Password reset link sent to your email!");
          setFormType("login");
        } else {
          alert("Please enter your email");
        }
        break;
      default:
        break;
    }
  };

  const renderForm = () => {
    switch (formType) {
      case "login":
        return (
          <>
            <h2>Login</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Login</button>
              <div className="form-links">
                <button type="button" onClick={() => setFormType("forgot")} className="text-btn">
                  Forgot Password?
                </button>
                <button type="button" onClick={() => setFormType("signup")} className="text-btn">
                  Create Account
                </button>
              </div>
            </form>
          </>
        );
      case "signup":
        return (
          <>
            <h2>Create Account</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Sign Up</button>
              <button type="button" onClick={() => setFormType("login")} className="text-btn">
                <FaArrowLeft /> Back to Login
              </button>
            </form>
          </>
        );
      case "forgot":
        return (
          <>
            <h2>Reset Password</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Send Reset Link</button>
              <button type="button" onClick={() => setFormType("login")} className="text-btn">
                <FaArrowLeft /> Back to Login
              </button>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {renderForm()}
      </div>
    </div>
  );
};

export default Login;
