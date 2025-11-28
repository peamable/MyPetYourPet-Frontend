import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { Logo } from "./Logo";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const Header = () => {

   const navigate = useNavigate();
   const auth = getAuth();



   const isLoggedIn = auth.currentUser || localStorage.getItem("email"); //check if there is a login session
    const handleDashboardLink = async () => {

      const cRole = localStorage.getItem("role");
      if(cRole == "owner"){
        navigate("/owner/dashboard");
      }
      else if(cRole == "seeker"){
        navigate("/seeker/dashboard");
      }
      else{
        navigate("/")
      }
    };

   const handleLogout = async () => {
    try {
      await signOut(auth);           // Firebase logout
      localStorage.clear();          // Clean all stored data
      navigate("/");                 // Redirect to home or login
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <header className="site-header">
      {/* BRAND/LOGO section on the left */}
      <div className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <Logo size={22}/>
        <span className="brand-name">My Pet, Your Pet</span>
      </div>

      {/* NAVIGATION section on the right */}
      <nav className="nav">
        <Link to="#"
        onClick={(e) => {
        e.preventDefault();
        handleDashboardLink();}}
        >Home</Link>
        <Link to="/about">About</Link>
        <Link to="/howItWorks">How it works</Link>

        {
          isLoggedIn&& (<button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>)}

        {/* <Link to="/updatePet" className="btn btn-outline">How it works</Link> */}
        {/* <button className="btn btn-outline">Contact Us</button> */}
      </nav>
    </header>
  );
};

export default Header;