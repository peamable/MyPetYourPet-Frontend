// SeekerProfileCard.jsx
import React from "react";
import "../styles/ProfileView.css";

function UserProfileCard({

  name,
  role,
  location,
  email,
  phone,
  bio,
  status,
  rating,
  profilePicUrl,
  onEdit,
  onDelete,
  showDelete = true,
}) {
  return (
    <div className="profile-card">
      {/* Top: avatar + name/role/location */}
        
      <div className="profile-card-header">
        {/* <div className="profile-avatar" aria-hidden="true" /> */}
        <img
        src={profilePicUrl || "https://tse4.mm.bing.net/th/id/OIP.eDOsXt3XNYFxCikumFhjjQHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"}
        alt="Profile"
        className="profile-avatar"
        />


        <div>
          <h1 className="profile-name">{name}</h1>
          <p className="profile-subtitle">
            {role} | {location}
          </p>
        </div>
      </div>

      {/* Middle: details (display-only) */}
      <div className="profile-card-body">
        <section className="profile-section">
          <h2 className="profile-section-title">Email</h2>
          <a href={`mailto:${email}`} className="profile-link">
            {email}
          </a>
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">Phone</h2>
          <p className="profile-text">{phone}</p>
        </section>

        <section className="profile-section">
          <h2 className="profile-section-title">Bio</h2>
          <p className="profile-text">{bio}</p>
        </section>
        <section className="profile-section">
          <h2 className="profile-section-title">Status</h2>
          <p className="profile-text">{status}</p>
        </section>
        <section className="profile-section">
          <h2 className="profile-section-title">Rating</h2>
          <p className="profile-text">{rating} ⭐</p> {/* we need data here */}
        </section>

      </div>

      {/* Bottom: buttons */}
      <div className="profile-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onEdit}
        >
          Edit Profile
        </button>

        {showDelete && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfileCard;