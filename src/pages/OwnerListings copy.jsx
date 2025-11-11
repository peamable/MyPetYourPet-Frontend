import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/OwnerListings.css";

export default function OwnerListings() {
  
  // Example data (Later replace with API data)
  const owner = {
    name: "Scarlet Hansen",
    location: "Vancouver, BC",
    listings: 3,
    rating: 4.9,
  };

  const pets = [
    {
      name: "Buddy",
      breed: "Golden Retriever",
      status: "Active",
      description: "Friendly, loves kids, perfect for walks and cuddles",
      tags: ["Large", "Child-Friendly", "Vaccinated"],
      image:
        "https://images.pexels.com/photos/3299907/pexels-photo-3299907.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Luna",
      breed: "French Bulldog",
      status: "Hidden",
      description: "Playful and Social, great for short park hangouts.",
      tags: ["Small", "City-Friendly", "Vaccinated"],
      image:
        "https://images.pexels.com/photos/1814062/pexels-photo-1814062.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="owner-listings-page">
      <Header />

      <div className="owner-layout">
        {/* LEFT SIDEBAR */}
        <aside className="owner-sidebar">
          <div className="owner-card">
            <div className="owner-avatar"></div>
            <h3>{owner.name}</h3>
            <p>{owner.location}</p>
            <p>
              Listings : {owner.listings} &nbsp;&nbsp; Ratings : {owner.rating} ★
            </p>
            <div className="owner-buttons">
              <button className="btn-secondary" onClick={() => window.location.href = "/owner/petprofileview"}>Edit Profile</button>
              <button className="btn-secondary">Account Settings</button>
            </div>
          </div>

          <div className="sidebar-menu">
            <button className="menu-active">My Listings</button>
            <button>Messages</button>
            <button>Payments</button>
            <button>Support</button>
          </div>
        </aside>

        {/* RIGHT LISTINGS GRID */}
        <main className="pet-listings">
          {pets.map((pet, index) => (
            <div className="pet-card" key={index}>
              <img src={pet.image} alt={pet.name} />
              <div className="pet-info">
                <h2>{pet.name}.</h2>
                <span className={`status-tag ${pet.status.toLowerCase()}`}>
                  {pet.status}
                </span>
                <p className="pet-breed">{pet.breed}</p>
                <p className="pet-desc">{pet.description}</p>

                <div className="tags">
                  {pet.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pet-actions">
                  <button className="btn-outline">Preview</button>
                  <button className="btn-primary">Edit Listing</button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <Footer />
    </div>
  );
}
