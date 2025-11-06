import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import heroimage from "../assets/heroimage.png";
import paw from "../assets/paw.png";
import heart from "../assets/heart.png";
import calendar from "../assets/calendar.png";
import "../styles/Home.css";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home-page">
      <Header />

      {/* HERO */}
      <section className="hero-section wrap">
        <div className="hero-content">
          <div className="hero-left">
            <h1>
              Find a furry friend<br />for the moments<br />that matter
            </h1>
            <button className="btn-primary">Find A Pet</button>
          </div>

          <div className="hero-right">
            <img src={heroimage} alt="woman with dog" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2>How it works</h2>
        <div className="how-grid">
          <div className="how-item">
            <img src={paw} alt="Browse Pets" />
            <p>Browse Pets<br />Near You</p>
          </div>
          <div className="how-item">
            <img src={calendar} alt="Book Hangout" />
            <p>Book a<br />Hangout</p>
          </div>
          <div className="how-item">
            <img src={heart} alt="Enjoy" />
            <p>Enjoy!</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section wrap">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Fun social experience</li>
          <li>Flexible short-term companionship</li>
          <li>Safe and trusted community</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <p>Ready to meet a new furry friend?</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn-primary">Sign Up</Link>
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/owner/dashboard" className="btn-outline">Pet Owner</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
