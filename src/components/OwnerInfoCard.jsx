import React from "react";
import "../styles/OwnerInfoCard.css";

//placeholder
let imageUrl = "https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg"

//owner comes from the PetList.jsx Wee need to retrieve their details as well
function OwnerInfoCard({ owner }) {
  if (!owner) return null;
  const { name, location, rating, listingsCount, about } = owner;

  return (
    <div className="owner-card">
        <div className="detail-top">
                <img src={imageUrl} alt={"placeholder"} className="detail-img" />
                <div>
                  
             
      <h3>{name}</h3>
      <p className="owner-location">{location}</p>
      <p>Listings: {listingsCount} • Rating: {rating} ⭐</p>
      <p className="owner-about">{about}</p>
         </div>
              </div>
      <div className="owner-buttons">
        <button className="btn outline">View Profile</button>
        <button className="btn ghost">Message</button>
      </div>
    </div>
  );
}

export default OwnerInfoCard;