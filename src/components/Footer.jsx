import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <span role="img" aria-label="paw" className="paw">🐾</span>
          <h3>My Pet, Your Pet</h3>
        </div>

        <p className="footer-tagline">Connecting pet lovers, one moment at a time.</p>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} My Pet, Your Pet. All rights reserved.</p>
      </div>
    </footer>
  );
}
