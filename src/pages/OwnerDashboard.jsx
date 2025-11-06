import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axiosClient from "../axiosClient";
import "../styles/OwnerDashboard.css";

export default function OwnerDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const firebaseUid = localStorage.getItem("uid"); // stored after login
    if (!firebaseUid) return;

    axiosClient.get(`/api/users/by-uid/${firebaseUid}`)
      .then(res => setUserData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-wrapper">
        <section className="owner-info-card">
          {userData ? (
            <>
              <h3>{userData.fullName}</h3>
              <p>{userData.city}, {userData.country}</p>
              <p>Email: {userData.email}</p>
              <p>Role: Pet Owner</p>

              <button className="btn-secondary">Edit Profile</button>
              <button className="btn-danger">Delete Account</button>
            </>
          ) : <p>Loading...</p>}
        </section>

        <section className="dashboard-actions">
          <button 
            className="btn-primary"
            onClick={() => window.location.href = "/create-pet"}
          >
            + Create Pet Listing
          </button>

          <button 
            className="btn-secondary"
            onClick={() => window.location.href = "/owner/listings"}
          >
            View My Listings
          </button>

          <button 
            className="btn-secondary"
            onClick={() => window.location.href = "/messages"}
          >
            Messages
          </button>

          <button 
            className="btn-secondary"
            onClick={() => window.location.href = "/reservations"}
          >
            Reservations
          </button>
        </section>
      </div>
    </div>
  );
}