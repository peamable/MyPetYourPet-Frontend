import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axiosClient from "../axiosClient";
import "../styles/OwnerDashboard.css";

export default function OwnerDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const firebaseUid = localStorage.getItem("uid"); // stored after login
    // if (!firebaseUid) return;

 //   axiosClient.get(`http://localhost:8082/api/customerAccount/getPetOwnerdetails/${firebaseUid}`)
    //   .then(res => setUserData(res.data))
    //   .catch(err => console.log(err));


    const fetchOwner = async () => {
        try {
          const res = await fetch(`http://localhost:8082/api/customerAccount/getPetOwnerdetails/3`);
          if (!res.ok) throw new Error("Failed to load owner info");
          const ownerData = await res.json();

          setUserData(ownerData); // ✅ Correct state setter
        } catch (err) {
          console.error("Owner fetch error:", err);
        }
    };

    fetchOwner();

  }, []);

  return (
    <div className="page">
      <Header />
    <div className="dashboard-page">
      

      <div className="dashboard-wrapper">
        <section className="owner-info-card">
          {userData ? (
            <>
              <h3>{userData.fullName}</h3>
              {/* <p>{userData.city}, {userData.country}</p> */}
              <p>{userData.customerInfo?.location || "Location not set"}</p>
              {/* <p>Email: {userData.email}</p>
              <p>Role: Pet Owner</p> */}
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.customerInfo?.phone}</p>
              {/* <p>Age: {userData.customerInfo?.age}</p>
              <p>Gender: {userData.customerInfo?.gender}</p> */}
              <p>Status: {userData.customerInfo?.profileStatus}</p>
              <p>Rating: {userData.customerInfo?.ratingAvg} ⭐</p>
              {/* <img src={userData.profilePicture} alt={userData.fullName} 
              className="owner-profile-img"/> */}


              <button className="btn-secondary">Edit Profile</button>
              <button className="btn-danger">Delete Account</button>
            </>
          ) : <p>Loading...</p>}
        </section>

        <section className="dashboard-actions">
          <button 
            className="btn-primary"
            onClick={() => window.location.href = "/owner/createapet"}
          >
            + Create Pet Listing
          </button>

          <button 
            className="btn-secondary"
            onClick={() => window.location.href = "/owner/ownerlistings"}
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
    </div>
  );
}