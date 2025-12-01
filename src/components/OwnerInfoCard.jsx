import React from "react";
import "../styles/OwnerInfoCard.css";
import { useState } from "react";
import ChatBox from "./ChatBox";

//owner comes from the PetList.jsx Wee need to retrieve their details as well
function OwnerInfoCard({ owner }) {

  // const [showPopup, setShowPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);
  if (!owner) return null;

  const {
  fullName,
  profilePicture,
  customerInfo: {
    location,
    ratingAvg,
    bio
  } = {}
} = owner;

 //for messaging

  const loggedInUser = localStorage.getItem("accountId")
  const ownerId = owner.id;  
  const seekerId = loggedInUser; 
  // For debugging
  // console.log("OWNER OBJECT:", owner);
  // console.log("ownerId:", ownerId);
  // console.log("seekerId:", seekerId);
  // console.log("chatId PREVIEW:", [ownerId, seekerId]);
  const chatId = [ownerId, seekerId].sort().join("_");

  return (
    <div className="owner-card">
        <div className="detail-top">
                <img src={profilePicture} alt={fullName} className="detail-img"/>
        <div>
                  
             
      {/* <h3>{name}</h3>
      <p className="owner-location">{location}</p>
      <p>Listings: {listingsCount} • Rating: {rating} ⭐</p>
      <p className="owner-about">{about}</p> */}
      <h3>{fullName}</h3>
      <p className="owner-location">{location}</p>
      <p>Rating: {ratingAvg} ⭐</p>
      <p className="owner-about">{bio || "No bio available."}</p>

         </div>
              </div>
      <div className="owner-buttons">
        {/* <button className="btn outline">View Profile</button> DEFINE THIS ONCLICK */}
        <button className="btn ghost"
        onClick={() => setShowChat(true)}>Message</button>
      </div>

      {/* {showPopup && (
        <div className = "message-popup">
          <p>We would love for you to be able to communicate with the owner.<br/>This feature will be available soon.</p>
          <button onClick={() => setShowPopup(false)}>OK</button>
        </div>

      )} */}

      {showChat && (
      <ChatBox
        chatId={chatId}
        senderId={seekerId}
        onClose={() => setShowChat(false)}
      />
    )}
        </div>
      );
    }

export default OwnerInfoCard;