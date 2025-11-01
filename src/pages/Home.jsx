import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/Header.css';
import '../styles/how.css';
import Header from "../components/Header";
import heroimage from "../assets/heroimage.png";
import paw from "/src/assets/paw.png"
import heart from "/src/assets/heart.png"
import calendar from "/src/assets/calendar.png"




const Home = () => {
  return (
    <>
    <div className="page">
     <Header />
      {/* HERO */}
      <section className='wrap'>
      <section className="hero">
      <div className="horizontalContainer">
     <div className="hero-left">
      <h1 className="hero-title">
        Find a furry friend<br/>for the moments<br/>that matter
      </h1>
      <button className="btn btn-primary">Find A Pet</button>
     </div>
     <div className="hero-right">
      <img src={heroimage} alt="woman with dog" />
     </div>
  </div>
  </section>
  </section>


{/* HOW IT WORKS */}
<section className="how" id="how">
  <h2>How it works</h2>
  
  <div className="how-container">
    <div className="how-item">
      <img src={paw} alt="Browse Pets" className="how-icon" />
      <p>Browse Pets<br />Near You</p>
    </div>

    <div className="how-item">
      <img src={calendar} alt="Book a Hangout" className="how-icon" />
      <p>Book a<br />Hangout</p>
    </div>

    <div className="how-item">
      <img src={heart} alt="Enjoy" className="how-icon" />
      <p>Enjoy!</p>
    </div>
  </div>
</section>

{/* WHY CHOOSE US */}
<section className="why" id="about">
  <div className="container">
    <section className='wrap'>
    <h2>Why Choose Us?</h2>
    <ul className="why-list">
      <li>Fun social experience</li>
      <li>Flexible short-term companionship</li>
      <li>Safe and trusted community</li>
    </ul>
    </section>
  </div>
</section>

{/* CTA */}
<section className="cta">
   <div className="container">
    <p>Ready to meet a new furry friend?</p>
    <Link to="/Register">
    <button className="btn btn-primary">Sign Up</button>
    </Link>
    <Link to="/Login" className="btn btn-primary">Login</Link>
  </div>
</section>
    </div>
    </>
  );
};

export default Home;