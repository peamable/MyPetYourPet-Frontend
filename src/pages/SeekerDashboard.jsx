import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/SeekerDashboard.css";
import axiosClient from "../axiosClient";
import SeekerReservations from "./ReservationsView"
import SeekerProfileCard from "../components/UserProfileCard";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { deleteUser } from "firebase/auth";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function PetSeekerDashboard() {
  const accountId = localStorage.getItem("accountId"); //like shared preferences
  const [activeTab, setActiveTab] = useState("browse");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()
  const handleEdit = () =>
  {
     navigate("/customer/editProfile", { state: { userData } })
  }

  useEffect(() => {
     //change to fetch seeker
    const fetchSeeker = async () => { 
        try {

          const res = await axiosClient.get(`/api/customerAccount/getSeekerDetails/${accountId}`);
          const seekerData = await res.data;   
          setUserData(seekerData); // ✅ Correct state setter
        } catch (err) {
          console.error("Seeker fetch error:", err);
        }
    };

    fetchSeeker();

   }, []);

   const handleDelete = async () => {
    const ok = window.confirm(
        "Are you sure you want to delete your account?\nThis action cannot be undone."
      );
      if (!ok) return;

      try {
    const email = localStorage.getItem("email");
    if (!email) throw new Error("No email in storage.");

    const user = auth.currentUser;

    const password = prompt("Please re-enter your password to confirm deletion:");

    if (!password) return; // user cancelled
    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential);

    // Backend soft delete seeker
    await axiosClient.delete(`/api/customerAccount/deleteSeeker?email=${encodeURIComponent(email)}`);


    // Firebase side
    if (user) {
      // PERMANENT delete
      await deleteUser(user);
    }

    
    // Cleanup + redirect
    localStorage.clear();
    navigate("/"); // or "/login"

  } catch (err) {
    console.error(err);
    alert("Delete failed. Please try again.");
  }

   };



   return (
    <div className="seeker-dashboard ">
      <Header />

      <div className="layout-wrapper">

              
          <div className="side-profile" >
            {userData ? (
                  <SeekerProfileCard
                    name={userData.fullName}
                    role="Seeker" //"Seeker"
                    location={userData.customerInfo?.location || "Location not set"}
                    email={userData.email}
                    phone={userData.customerInfo?.phone}
                    bio={userData.customerInfo?.bio}
                    rating={userData.customerInfo?.ratingAvg} //the controller that fills should add status and rating
                    status={userData.customerInfo?.profileStatus}
                    profilePicUrl={userData.profilePicture}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  ) : (
                 <p>Loading...</p>
                )}
              </div>


      
            <div className="main-content">

           
      

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
                    <Link to="/allListings" className="btn-outline">Browse Here</Link>
                    <p>Find pets available near you and request a hangout.</p>

                    <div className="pet-grid">
                        {/* TEMP sample data to show what browse looks like */}
                        {[
                          { name: "Buddy", breed: "Golden Retriever", age: "3 yrs", img: "https://placedog.net/450/450" },
                          { name: "Luna", breed: "French Bulldog", age: "1 yr", img: "https://placedog.net/451/451" }
                        ].map(pet => (
                          <div className="pet-card" key={pet.name}>
                            <img src={pet.img} alt={pet.name} />
                            <h3>{pet.name}</h3>
                            <p>{pet.breed} • {pet.age}</p>
                            {/* <button className="btn-primary">View Profile</button> */}
                          </div>
                        ))}
                      </div>
                  </section>
                )}

                
                {/* ---------------- RESERVATIONS ---------------- */}
                {activeTab === "reservations" && (
                  // <section className="reservations-section wrap">
                  //   <h2>Your Reservations</h2>

                  //   <div className="reservation-block">
                  //     <h3>Upcoming</h3>
                  //     <p>No upcoming bookings yet.</p>
                  //   </div>

                  //   <div className="reservation-block">
                  //     <h3>Past</h3>
                  //     <p>No past bookings yet.</p>
                  //   </div>

                  //   <div className="stats">
                  //     <div><strong>0</strong> Total</div>
                  //     <div><strong>0</strong> Pending</div>
                  //     <div><strong>0</strong> Confirmed</div>
                  //     <div><strong>0</strong> Completed</div>
                  //   </div>
                  // </section>
                  <SeekerReservations embedded={true} />
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
            </div>
      </div>

      <Footer />
    </div>
  );
}

