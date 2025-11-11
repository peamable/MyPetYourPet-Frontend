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
      <img src={image} alt={name} className="pet-img" />

      <div className="pet-content">
        <div className="pet-header">
          <h2 className="pet-name">
            {name}.{" "}
            <span
              className={`pet-status ${
                status.toLowerCase() === "active" ? "active" : "hidden"
              }`}
            >
              {status}
            </span>
          </h2>
          <p className="pet-breed">{breed}</p>
        </div>

        <p className="pet-description">{description}</p>

        <div className="pet-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="pet-actions">
  {onPreview && (
    <button className="btn outline" onClick={onPreview}>
      Preview
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
