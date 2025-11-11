import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosClient from "../axiosClient";
import "../styles/OwnerDashboard.css";
import CreateAPet from "./CreateAPet";   
import OwnerListings from "./OwnerListings"; 
import OwnerReservation from "./ReservationsView";

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("create");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const firebaseUid = localStorage.getItem("uid");
    if (!firebaseUid) return;

    axiosClient
      .get(`/api/users/by-uid/${firebaseUid}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="owner-dashboard">
      <Header />

      {/* Top Navigation Tabs (Same as Seeker) */}
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

      <div className="wrap tab-content">

        {/* Profile sidebar remains visible */}
        <aside className="owner-side-profile">
          {userData ? (
            <>
              <h3>{userData.fullName}</h3>
              <p>{userData.city}, {userData.country}</p>
              <p>{userData.email}</p>
              <button className="btn-secondary">Edit Profile</button>
              <button className="btn-danger">Delete Account</button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </aside>

        {/* Tab Dynamic Content */}
        <main className="owner-tab-display">

          {activeTab === "create" && (
            <CreateAPet embedded={true} />
          )}

          {activeTab === "listings" && (
            <OwnerListings embedded={true} />
          )}

          {activeTab === "messages" && (
            <div className="simple-tab-panel">
              <h2>Messages</h2>
              <p>Chat UI coming soon</p>
            </div>
          )}

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

        </main>
      </div>

      <Footer />
    </div>
  );
}
