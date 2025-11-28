import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import heroimage from "../assets/heroimage.png";
import paw from "../assets/paw.png";
import heart from "../assets/heart.png";
import calendar from "../assets/calendar.png";
import "../styles/Home.css";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';




const Home = () => {

  const isLoggedIn = auth.currentUser || localStorage.getItem("email"); //check if there is a login session
    const role = localStorage.getItem("role");
    const handleButtonView = async () => {

      const role = localStorage.getItem("role");
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


  const navigate = useNavigate();
  const handleFind = () => {
  navigate("/allListings");
}
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
            <button className="btn-primary" onClick={handleFind}>Find A Pet</button>
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
          <Link to="/login" className="btn-primary">Login</Link>
        </div>
      </section>
      <section className="cta-section">
        {/* DEMO MODE - show all buttons when NOT logged in - This will not show in production*/}
          {!isLoggedIn && (
            <>
            <p>***DEMO NAVIGATION**</p>
              <Link to="/owner/dashboard" className="btn-primary">Pet Owner</Link>
              <Link to="/seeker/dashboard" className="btn-primary">Pet Seeker</Link>
              {/* <Link to="/admin/reservation" className="btn-primary">Admin Reservation View</Link> */}
              <Link to="/admin/dashboard" className="btn-primary">Admin Dashboard</Link>
            </>
          )}

          {/* OWNER */}
          {isLoggedIn && role === "owner" && (
            <Link to="/owner/dashboard" className="btn-primary">My Dashboard</Link>
          )}

          {/* SEEKER */}
          {isLoggedIn && role === "seeker" && (
            <Link to="/seeker/dashboard" className="btn-primary">My Dashboard</Link>
          )}

          {/* ADMIN */}
          {isLoggedIn && role === "administrator" && (
            <>
              {/* <Link to="/admin/reservation" className="btn-primary">Reservation View</Link> */}
              <Link to="/admin/dashboard" className="btn-primary">My Dashboard</Link>
            </>
          )}

      {/* <p>***DEMO NAVIGATION**</p>
        <div className="cta-buttons">
          <Link to="/owner/dashboard" className="btn-primary">Pet Owner</Link>
          <Link to="/seeker/dashboard" className="btn-primary">Pet Seeker</Link>
          <Link to="/admin/reservation" className="btn-primary">Admin reservation View</Link>
          <Link to="/admin/dashboard" className="btn-primary">Admin Dashboard</Link>
          <Link to="/admin/dashboard" className="btn-primary">Admin reservation View</Link>
        </div> */}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
