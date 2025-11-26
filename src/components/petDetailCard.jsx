import React from "react";
import "../styles/PetDetailCard.css";
import OwnerInfoCard from "./OwnerInfoCard";

function PetDetailCard({ pet, onClose, onRequest }) {
  if (!pet) return null;

  const {
    petName,
    petBreed,
    petBehavior,
    petFee,
    petAge,
    petGender,
    dewormingUpToDate,
    vaccinationUpToDate,
    petProfileStatus,
    profilePicture,
    owner,
  } = pet;

  

  const genderLabel = petGender === 1 ? "Female" : "Male";
  const statusLabel = petProfileStatus ? "Active" : "Hidden";

  return (
    <div className="pet-detail-backdrop">
      <div className="pet-detail-container">
        <div className="pet-detail-card">
          <button className="detail-close" onClick={onClose}>✕</button>

          <div className="detail-grid">
            {/* LEFT: Pet info */}
            <div className="detail-left">
              <div className="detail-top">
                <img src={profilePicture} alt={petName} className="detail-img" />
                <div>
                  <h2>{petName} <span className={`status ${statusLabel.toLowerCase()}`}>{statusLabel}</span></h2>
                  <p className="breed">{petBreed}</p>
                  <p>{genderLabel} • {petAge} years old</p>
                </div>
              </div>

              <section className="section">
                <h3>About</h3>
                <p>{petBehavior}</p>
              </section>

              <section className="section">
                <h3>Health & Care</h3>
                <div className="tags">
                  <span className={`chip ${vaccinationUpToDate ? "ok" : "warn"}`}>
                    {vaccinationUpToDate ? "Vaccinations up to date" : "Needs vaccination"}
                  </span>
                  <span className={`chip ${dewormingUpToDate ? "ok" : "warn"}`}>
                    {dewormingUpToDate ? "Deworming up to date" : "Needs deworming"}
                  </span>
                </div>
              </section>

              <section className="section">
                <h3>Fee</h3>
                <p className="fee">${petFee.toFixed(2)} per hour</p>
              </section>

              <div className="detail-actions">
                <button className="btn outline" onClick={onClose}>Back to list</button>
                <button className="btn orange" onClick={() => onRequest(pet)}>
                  Request reservation
                </button>
              </div>
            </div>

            {/* RIGHT: Owner info */}
            <div className="detail-right">
              <OwnerInfoCard owner={owner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetailCard;