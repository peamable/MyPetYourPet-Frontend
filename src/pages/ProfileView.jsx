// SeekerProfilePage.jsx
import React from "react";
import Header from "../components/Header";
import SeekerProfileCard from "../components/SeekerProfileCard";
import "../styles/ProfileView.css";
function ProfilePage() {
  const handleEdit = () => {
    // e.g. navigate("/profile/edit");
  };

  const handleDelete = () => {
    // open confirm modal / call API
  };

  return (
    <div>
        <Header />
    <div className="page page--seeker-profile">
        
      {/* we get the data from the backend and fill it in here */}

      <main className="page-content">
        <SeekerProfileCard
          name="Scarlet Hansen"
          role="Seeker"
          location="Vancouver, BC"
          email="scarlet@email.com"
          phone="+1 (604) 555-0123"
          bio="Dog lover, my spouse is allergic so I cannot have one. Looking forward to fun hangout sessions."
          preferences={["Short Walks", "Cuddly", "Regular Meetings"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
    </div>
  );
}

export default ProfilePage;