import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Header from "../components/Header";
import pawIcon from "../assets/paw.png";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful! 🐾");
      // window.location.href = "/"; // Add redirect later
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <Header />

      {/* HERO SECTION */}
      <section className="login-hero">
        <h1>
          Find a furry friend for the
          <br /> moments that matter
        </h1>
        <ul>
          <li>Book short pet hangouts</li>
          <li>Trusted owners & reviews</li>
          <li>Simple, secure payments</li>
        </ul>
      </section>

      {/* LOGIN CARD */}
      <div className="login-card">
        <div className="login-brand">
          <img src={pawIcon} alt="paw" className="paw-icon" />
          <span>My pet, Your pet</span>
        </div>

        <p className="welcome-text">Welcome Back</p>

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Link to="/reset-password" className="forgot-link">
            Forgot Password?
          </Link>

          <button type="submit" className="btn-primary">Sign in</button>
          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="create-account">
          No Account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
