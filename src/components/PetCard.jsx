// src/components/PetCard.jsx
import React from "react";
import "../styles/PetCard.css";

function PetCard({
 name,
  breed,
  behavior,
  fee,
  image,
  status,       // Active/Hidden
  tags = [],
  onPreview,
  onEdit,     
}) {
  return (
    <div className="pet-card">
      {image && (
        <img src={image} alt={name} className="pet-img" />
      )}

      <div className="pet-content">
        <div className="pet-header">
          <h2 className="pet-name">
            {name}.{" "}
            {status && (
              <span
                className={`pet-status ${
                  status.toLowerCase() === "active" ? "active" : "hidden"
                }`}
              >
                {status}
              </span>
            )}
          </h2>
          {breed && <p className="pet-breed">{breed}</p>}
        </div>

        {behavior && (
          <p className="pet-description">{behavior}</p>
        )}

        {fee != null && (
          <p className="pet-fee">From ${fee.toFixed(2)} per hour</p>
        )}

        {tags.length > 0 && (
          <div className="pet-tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pet-actions">
          {onPreview && (
            <button className="btn outline" onClick={onPreview}>
              View details
            </button>
          )}

          {onEdit && (
            <button className="btn orange" onClick={onEdit}>
              Edit Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default PetCard;
