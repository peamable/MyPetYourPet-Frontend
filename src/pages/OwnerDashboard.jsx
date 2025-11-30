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
import { auth } from "../firebaseConfig";
import { deleteUser } from "firebase/auth";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import UpdatePet from "../components/UpdatePet";   
import MessagingView from "./MessagingView";


export default function OwnerDashboard() {
  const [selectedPet, setSelectedPet] = useState(null);
  const accountId = localStorage.getItem("accountId"); //like shared preferences
  const navigate = useNavigate()
  const handleEdit = () =>
  {
     navigate("/customer/editProfile", { state: { userData } })
  }
  const [activeTab, setActiveTab] = useState("listings");
  const [userData, setUserData] = useState(null);

  const status = localStorage.getItem("status");

  useEffect(() => {
    const fetchOwner = async () => {
        try {
          const res = await axiosClient.get(`/api/customerAccount/getOwnerDetails/${accountId}`);
          const ownerData = await res.data;   
          setUserData(ownerData); // Correct state setter
          localStorage.setItem("status",ownerData.customerInfo?.profileStatus)
        } catch (err) {
          console.error("Owner fetch error:", err);
        }
    };
    fetchOwner();

  }, []);

    const handleWrongUser = async () => {
      const cRole = userData.customerType ==="PetOwner"? "Owner":"Seeker";
      if(cRole == "Seeker"){
        navigate("/");
      }
    };
    handleWrongUser();

  const handleDelete = async () => {
    const ok = window.confirm(
        "Are you sure you want to delete your account?\nThis action cannot be undone."
      );
      if (!ok) return;

      try {
    const email = localStorage.getItem("email");
    if (!email) throw new Error("No email in storage.");

    const user = auth.currentUser;

    const password = prompt("Please re-enter your password to confirm deletion:"); //not safe though

    if (!password) return; // user cancelled
    const credential = EmailAuthProvider.credential(email, password);

    await reauthenticateWithCredential(user, credential);

    // Backend soft delete seeker
    await axiosClient.delete(`/api/customerAccount/deleteOwner?email=${encodeURIComponent(email)}`);


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
    <div className="page">
      <Header />
     <div className="dashboard-page">
      

      {/* Top Navigation Tabs (Same as Seeker) */}
      <nav className="owner-nav">
        
        <button className={activeTab === "listings" ? "active" : ""} onClick={() => {
          setActiveTab("listings");
          setSelectedPet(null);}}>
          My Listings
        </button>
        {/* ..................................................................*/}
        <button className={activeTab === "create" ? "active" : ""} onClick={() => setActiveTab("create")}>
          + Create Pet Listing
        </button>
        {/* comment here if you uncomment below*/}
        {/* ..................................................................*/}
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
                    role={userData.customerType ==="PetOwner"? "Owner":"Seeker"}
                    location={userData.customerInfo?.location || "Location not set"}
                    email={userData.email}
                    phone={userData.customerInfo?.phone}
                    bio={userData.customerInfo?.bio}
                    rating={userData.customerInfo?.ratingAvg} //the controller that fills should add status and rating
                    profilePicUrl={userData.profilePicture}
                    status={userData.customerInfo?.profileStatus}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  ) : (
                 <p>Loading...</p>
                )}
              </div>     

      <div className="wrap tab-content">

         

       <div> {/* Tab Dynamic Content */}<div/>
        <main className="owner-tab-display">


          {/* {activeTab === "listings" && (
            <OwnerListings embedded={true} accountId={accountId} />
          )} */}
          {activeTab === "listings" && (
            <OwnerListings
              embedded={true}
              accountId={accountId}
              onEditPet={(pet) => {
                setSelectedPet(pet);
                setActiveTab("updatePet");
              }}
            />
          )}


          {/* {activeTab === "updatePet" && (
            <UpdatePet embedded={true} accountId={accountId} />
          )} */}

          {activeTab === "updatePet" && selectedPet && (
            <UpdatePet
              embedded={true}
              accountId={accountId}
              pet={selectedPet}
              onClose={() => {
                setSelectedPet(null);
                setActiveTab("listings");
              }}
            />
          )}


          {activeTab === "create" && (
            <CreateAPet 
            embedded={true} 
            accountId={accountId} 
            onClose={() => {
                setSelectedPet(null);
                setActiveTab("listings");
            }}/>
          )}

          {activeTab === "messages" && (
            <MessagingView embedded/>
            // <div className="simple-tab-panel">
            //   <h2>Messages</h2>
            //   <p>Chat UI coming soon</p>
            // </div>
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
