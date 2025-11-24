import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosClient from "../axiosClient";
import "../styles/OwnerDashboard.css";
import CreateAPet from "./CreateAPet";   
import OwnerListings from "./OwnerListings"; 
import OwnerReservation from "./ReservationsView";
import { useNavigate } from "react-router-dom";
import OwnerProfileCard from "../components/UserProfileCard";


export default function OwnerDashboard() {

  const accountId = localStorage.getItem("accountId"); //like shared preferences
  const navigate = useNavigate()
  const handleEdit = () =>
  {
     navigate("/customer/editProfile", { state: { userData } })
  }
  const [activeTab, setActiveTab] = useState("listings");
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

 //   axiosClient.get(`http://localhost:8080/api/customerAccount/getPetOwnerdetails/${firebaseUid}`)
    //   .then(res => setUserData(res.data))
    //   .catch(err => console.log(err));


    const fetchOwner = async () => {
        try {
          // const res = await fetch(`http://localhost:8080/api/customerAccount/getPetOwnerdetails/3`);
          // if (!res.ok) throw new Error("Failed to load owner info");
          // const ownerData = await res.json();

          // const res = await axiosClient.get(`/api/customerAccount/getPetOwnerdetails/2`);
          const res = await axiosClient.get(`/api/customerAccount/getOwnerDetails/${accountId}`);
          const ownerData = await res.data;   
          setUserData(ownerData); // Correct state setter
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
        
        <button className={activeTab === "listings" ? "active" : ""} onClick={() => setActiveTab("listings")}>
          My Listings
        </button>
        <button className={activeTab === "create" ? "active" : ""} onClick={() => setActiveTab("create")}>
          + Create Pet Listing
        </button>
        <button className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>
          Messages
        </button>
        <button className={activeTab === "reservations" ? "active" : ""} onClick={() => setActiveTab("reservations")}>
          Reservations
        </button>
      </nav>

      <div className="layout-wrapper" >

        <div className="side-profile" >
            {userData ? (
                  <OwnerProfileCard
                    name={userData.fullName}
                    role="Owner" // dYNAMIC WIRTH IT?
                    location={userData.customerInfo?.location || "Location not set"}
                    email={userData.email}
                    phone={userData.customerInfo?.phone}
                    bio={userData.customerInfo?.bio}
                    rating={userData.customerInfo?.ratingAvg} //the controller that fills should add status and rating
                    profilePicUrl={userData.profilePicture}
                    status={userData.customerInfo?.profileStatus}
                    onEdit={handleEdit}
                    // onDelete={handleDelete}
                  />
                  ) : (
                 <p>Loading...</p>
                )}
              </div>     

      <div className="wrap tab-content">

          {/* ................................................................................................... */}
        {/* Profile sidebar remains visible */}

         {/* <aside className="owner-side-profile">
          {userData ? (
            <>
              <h3>{userData.fullName}</h3>
              {/* <p>{userData.city}, {userData.country}</p> */}
              {/* <p>{userData.customerInfo?.location || "Location not set"}</p> */}
              {/* <p>Email: {userData.email}</p>
              <p>Role: Pet Owner</p> */}
              {/* <p>Email: {userData.email}</p>
              <p>Phone: {userData.customerInfo?.phone}</p> */}
              {/* <p>Age: {userData.customerInfo?.age}</p>
              <p>Gender: {userData.customerInfo?.gender}</p> */}
              {/* <p>Status: {userData.customerInfo?.profileStatus}</p>
              <p>Rating: {userData.customerInfo?.ratingAvg} ⭐</p> */}
              {/* <img src={userData.profilePicture} alt={userData.fullName} 
              className="owner-profile-img"/> */}


              {/* <button className="btn-secondary" onClick={handleEdit}>Edit Profile</button>
              <button className="btn-danger">Delete Account</button>
            </>
          ) : (
            <p>Loading...</p>
          )} */}
        {/* </aside>  */} 
            {/* this is messy but that the only way i could comment */}
        {/* ................................................................................................... */}

       <div> {/* Tab Dynamic Content */}<div/>
        <main className="owner-tab-display">


          {activeTab === "listings" && (
            <OwnerListings embedded={true} accountId={accountId} />
          )}

          {activeTab === "create" && (
            <CreateAPet embedded={true} accountId={accountId} />
          )}


          {activeTab === "messages" && (
            <div className="simple-tab-panel">
              <h2>Messages</h2>
              <p>Chat UI coming soon</p>
            </div>
          )}

          {activeTab === "reservations" && (
          
            <OwnerReservation embedded={true} />
            
          )}

        </main>
       </div>

       
     </div>
     </div>
     </div>
     <Footer />
    </div>
  );
}
