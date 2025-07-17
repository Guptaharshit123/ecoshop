// src/pages/Login.js
import React, { useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login logic
    if (email && password) {
      localStorage.setItem("username", email);
      alert("Login successful!");
      // Check if there was a previous path before login
      const previousPath = localStorage.getItem("previousPath");
      navigate(previousPath || "/checkout");
      localStorage.removeItem("previousPath"); // Clean up
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
