// SeekerProfileCard.jsx
import React from "react";
import "../styles/ProfileView.css";

function SeekerProfileCard({
  name,
  role,
  location,
  email,
  phone,
  bio,
  preferences = [],
  onEdit,
  onDelete,
  showDelete = true,
}) {
  return (
    <div className="profile-card">
      {/* Top: avatar + name/role/location */}
      <div className="profile-card-header">
        <div className="profile-avatar" aria-hidden="true" />
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

        {preferences.length > 0 && (
          <section className="profile-section">
            <h2 className="profile-section-title">My Preferences</h2>
            <div className="profile-preferences">
              {preferences.map((pref) => (
                <span key={pref} className="preference-pill">
                  {pref}
                </span>
              ))}
            </div>
          </section>
        )}
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

export default SeekerProfileCard;