import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Header from "../components/Header";
import pawIcon from "../assets/paw.png";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let accountId = null; 
  let cRole = null; 
  //for password reset
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  
      const handleReset = async () => {
      if (!resetEmail) {
        alert("Please enter your email.");
        return;
      }

      try {
        await sendPasswordResetEmail(auth, resetEmail);
        alert("Password reset link sent! Check your inbox.");
        setShowReset(false);
        setResetEmail("");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
     const user = userCredential.user;
     //const firebaseUID = user.uid; uid in the token
     const token = await user.getIdToken(); //send this in the header
     localStorage.setItem("token", token); //save in local storage for axiosClient to receive

     const res = await axiosClient.get("/api/customerAccount/userRole"); 

      accountId = res.data.id; // the request will send the user id
      cRole = res.data.role; 

      localStorage.setItem("accountId", accountId);
      localStorage.setItem("role", cRole);
      localStorage.setItem("email", email);
      

      alert("Login successful! 🐾");
      
      if (cRole === "owner") 
      { 
        navigate("/owner/dashboard"); 

      } 
      else if (cRole === "seeker") { 
      navigate("/seeker/dashboard"); 
      }else{
        navigate("/admin/dashboard"); 
      }

    } catch (err) {
      // alert(err);
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

          <Link to="#" className="forgot-link"
          onClick={(e) => {
            e.preventDefault();
            setShowReset(true)
          }}>
            Forgot Password?
          </Link>
          {showReset && (
          <div className="reset-box">
        <h4>Reset Password</h4>
        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          className="reset-input"
        />

    <button
      className="reset-button"
      onClick={handleReset}
    >
      Send Reset Link
    </button>

    <p className="reset-close" onClick={() => setShowReset(false)}>
      Cancel
    </p>
  </div>
)}

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
