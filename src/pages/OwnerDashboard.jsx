import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosClient from "../axiosClient";
import "../styles/OwnerDashboard.css";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("create");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const firebaseUid = localStorage.getItem("uid");//stored after login
    if (!firebaseUid) return;

    axiosClient.get(`/api/users/by-uid/${firebaseUid}`)
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="owner-dashboard">
      <Header />

      {/* --- Top Navigation Tabs --- */}
      <nav className="owner-nav">
        {["create", "listings", "messages", "reservations"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              if (tab === "create") {
                window.location.href = "/owner/createapet";
              } else {
                setActiveTab(tab);
              }
            }}
          >
            {tab === "create" && "+ Create Pet Listing"}
            {tab === "listings" && "My Listings"}
            {tab === "messages" && "Messages"}
            {tab === "reservations" && "Reservations"}
          </button>
        ))}
      </nav>

      {/* Content Body */}
      <div className="owner-content wrap">

        {/* LEFT PROFILE CARD */}
        <aside className="owner-info-card">
          {userData ? (
            <>
              <h3>{userData.fullName}</h3>
              <p>{userData.city}, {userData.country}</p>
              <p>Email: {userData.email}</p>

              <button className="btn-secondary">Edit Profile</button>
              <button className="btn-danger">Delete Account</button>
            </>
          ) : <p>Loading...</p>}
        </aside>

        {/* RIGHT CONTENT AREAS */}
        <section className="owner-main-content">

          {activeTab === "create" && (
            <div className="tab-panel">
              <h2>Create a Pet Listing</h2>
              <p>Go to the pet listing form.</p>
              <button className="btn-primary" onClick={() => window.location.href = "/owner/createapet"}>
                Start Listing
              </button>
            </div>
          )}

          {activeTab === "listings" && (
            <div className="tab-panel">
              <h2>My Listings</h2>
              <p>View and manage your posted pets.</p>
              <button className="btn-secondary" onClick={() => window.location.href = "/owner/ownerlistings"}>
                Open Listings
              </button>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="tab-panel">
              <h2>Messages</h2>
              <p>Chat UI coming soon 🐾</p>
            </div>
          )}

          {activeTab === "reservations" && (
            <div className="tab-panel">
              <h2>Reservations</h2>
              <p>Booking management</p>
              <button className="btn-secondary" onClick={() => window.location.href = "/owner/reservations"}>View Reservations</button>
            </div>
          )}

        </section>
      </div>

      <Footer />
    </div>
  );
}
