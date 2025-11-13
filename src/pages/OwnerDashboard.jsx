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
//     const firebaseUid = localStorage.getItem("uid");
//     if (!firebaseUid) return;

//     axiosClient
//       .get(`/api/users/by-uid/${firebaseUid}`)
//       .then((res) => setUserData(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="owner-dashboard">
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
    </div>
  );
}
