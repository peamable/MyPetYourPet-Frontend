import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosClient from "../axiosClient";
import "../styles/OwnerDashboard.css";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("create");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const firebaseUid = localStorage.getItem("uid");
    if (!firebaseUid) return;

    axiosClient.get(`/api/users/by-uid/${firebaseUid}`)
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="owner-dashboard">
      <Header />

      {/* TOP NAVIGATION TABS */}
      <nav className="owner-nav">
        <button className={activeTab === "create" ? "active" : ""} onClick={() => setActiveTab("create")}>
          + Create Pet Listing
        </button>
        <button className={activeTab === "listings" ? "active" : ""} onClick={() => setActiveTab("listings")}>
          My Listings
        </button>
        <button className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>
          Messages
        </button>
        <button className={activeTab === "reservations" ? "active" : ""} onClick={() => setActiveTab("reservations")}>
          Reservations
        </button>
      </nav>

      {/* PAGE CONTENT SWITCH */}
      <main className="owner-main wrap">
        
        {/* Create Pet Listing */}
        {activeTab === "create" && (
          <div className="tab-panel centered">
            <h2>Create a New Pet Listing</h2>
            <p>You can add a new pet to your listings.</p>
            <button className="btn-primary" onClick={() => window.location.href = "/owner/createapet"}>
              Start Listing
            </button>
          </div>
        )}

        {/* My Listings */}
        {activeTab === "listings" && (
          <div className="tab-panel centered">
            <h2>My Listings</h2>
            <button className="btn-secondary" onClick={() => window.location.href = "/owner/ownerlistings"}>
              View My Listings
            </button>
          </div>
        )}

        {/* Messages */}
        {activeTab === "messages" && (
          <div className="tab-panel centered">
            <h2>Messages</h2>
            <p>Chat feature coming soon 🐾</p>
          </div>
        )}

        {/* Reservations */}
        {activeTab === "reservations" && (
          <div className="tab-panel centered">
            <h2>Reservations</h2>
            <button className="btn-secondary" onClick={() => window.location.href = "/owner/reservations"}>
              Manage Reservations
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
