import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SeekerDashboard.css";

export default function PetSeekerDashboard() {

  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className="seeker-dashboard">
      <Header />

      {/* Top Navigation for Seeker */}
      <div className="dashboard-nav">
        <button className={activeTab === "browse" ? "active" : ""} onClick={() => setActiveTab("browse")}>
          Browse Pets
        </button>
        <button className={activeTab === "reservations" ? "active" : ""} onClick={() => setActiveTab("reservations")}>
          Reservations
        </button>
        <button className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>
          Messages
        </button>
        <button className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
          Reviews
        </button>
      </div>

      {/* ----------- CONTENT AREAS ----------- */}

      {activeTab === "browse" && (
        <section className="browse-section">
          <h2>Browse Pets</h2>
          <p>Find pets available near you and request a hangout.</p>

          <div className="pet-grid">
            {/* Example cards - later will map from backend */}
            <div className="pet-card">
              <img src="/example-pet-1.jpg" alt="Buddy" />
              <h3>Buddy</h3>
              <p>Golden Retriever • 3 yrs</p>
              <button className="btn-primary">View Profile</button>
            </div>

            <div className="pet-card">
              <img src="/example-pet-2.jpg" alt="Luna" />
              <h3>Luna</h3>
              <p>French Bulldog • 1 yr</p>
              <button className="btn-primary">View Profile</button>
            </div>
          </div>
        </section>
      )}

      {activeTab === "reservations" && (
        <section className="reservations-section">
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

      {activeTab === "messages" && (
        <section className="messages-section">
          <h2>Messages</h2>
          <p>Select a conversation to start.</p>
          {/* Chat UI later */}
        </section>
      )}

      {activeTab === "reviews" && (
        <section className="reviews-section">
          <h2>Your Reviews</h2>
          <p>You haven't left any reviews yet.</p>
        </section>
      )}

      <Footer />
    </div>
  );
}
