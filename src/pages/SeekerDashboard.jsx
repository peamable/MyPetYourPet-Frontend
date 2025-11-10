import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SeekerDashboard.css";

export default function PetSeekerDashboard() {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className="seeker-dashboard">
      <Header />

      {/* Seeker Navigation Tabs */}
      <nav className="dashboard-nav">
        {["browse", "reservations", "messages", "reviews"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* ---------------- BROWSE PETS ---------------- */}
      {activeTab === "browse" && (
        <section className="browse-section wrap">
          <h2>Browse Pets</h2>
          <p>Find pets available near you and request a hangout.</p>

          <div className="pet-grid">
          {[
            { name: "Buddy", breed: "Golden Retriever", age: "3 yrs", img: "https://placedog.net/450/450" },
            { name: "Luna", breed: "French Bulldog", age: "1 yr", img: "https://placedog.net/451/451" }
          ].map(pet => (
            <div className="pet-card" key={pet.name}>
              <img src={pet.img} alt={pet.name} />

              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
                <p className="age">{pet.age}</p>
              </div>

              <button className="btn-primary view-btn">View Profile</button>
            </div>
          ))}
        </div>
        </section>
      )}

      {/* ---------------- RESERVATIONS ---------------- */}
      {activeTab === "reservations" && (
        <section className="reservations-section wrap">
          <h2>Your Reservations</h2>

          <div className="reservation-block">
            <h3>Upcoming</h3>
            <p>No upcoming bookings yet.</p>
          </div>

          <div className="reservation-block">
            <h3>Past</h3>
            <p>No past bookings yet.</p>
          </div>

          <div className="stats">
            <div><strong>0</strong> Total</div>
            <div><strong>0</strong> Pending</div>
            <div><strong>0</strong> Confirmed</div>
            <div><strong>0</strong> Completed</div>
          </div>
        </section>
      )}

      {/* ---------------- MESSAGES ---------------- */}
      {activeTab === "messages" && (
        <section className="messages-section wrap">
          <h2>Messages</h2>
          <p>Select a conversation to start.</p>
        </section>
      )}

      {/* ---------------- REVIEWS ---------------- */}
      {activeTab === "reviews" && (
        <section className="reviews-section wrap">
          <h2>Your Reviews</h2>
          <p>You haven't left any reviews yet.</p>
        </section>
      )}

      <Footer />
    </div>
  );
}
