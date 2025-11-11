import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { Logo } from "./Logo";


const Header = () => {
  return (
    <header className="site-header">
      {/* BRAND/LOGO section on the left */}
       <Link to="/">
      <div className="brand">
        <Logo size={22}/>
        <span className="brand-name">My Pet, Your Pet</span>
      </div>
      </Link>

      {/* NAVIGATION section on the right */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/howItWorks">How it works</Link>
        <Link to="/allListings" className="btn btn-outline">How it works</Link>
        {/* <button className="btn btn-outline">Contact Us</button> */}
      </nav>
    </header>
  );
};

export default Header;