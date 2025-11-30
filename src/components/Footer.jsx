import React from "react";
import { useState } from "react";
import "../styles/Footer.css";

export default function Footer() {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (contentType) => {
    setModalContent(contentType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">

          <div className="footer-brand">
            <span role="img" aria-label="paw" className="paw">
              🐾
            </span>
            <h3>My Pet, Your Pet</h3>
          </div>

          <p className="footer-tagline">
            Connecting pet lovers, one moment at a time.
          </p>

          <div className="footer-links">
            <button onClick={() => openModal("privacy")}>Privacy Policy</button>
            <button onClick={() => openModal("terms")}>Terms of Service</button>
            <button onClick={() => openModal("contact")}>Contact</button>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} My Pet, Your Pet. All rights reserved.
          </p>
        </div>
      </footer>

      {/* === Modal === */}
      {modalOpen && (
        <div className="footer-modal-overlay">
          <div className="footer-modal-box">

            {/* Modal Title */}
            <h2>
              {modalContent === "privacy" && "Privacy Policy"}
              {modalContent === "terms" && "Terms of Service"}
              {modalContent === "contact" && "Contact Us"}
            </h2>

            {/* Modal Body */}
            <div className="footer-modal-content">
              {/* PRIVACY POLICY */}
              {modalContent === "privacy" && (
                <p>
                  This Privacy Policy explains how the My Pet, Your Pet platform
                  collects, uses, and protects personal information.
                  <br /><br />

                  <strong>Information We Collect:</strong><br />
                  • Basic account information (name, email, age, city)<br />
                  • Pet information submitted by owners<br />
                  • Platform activity such as reservation requests<br /><br />

                  <strong>How We Use Information:</strong><br />
                  • To verify users and enable core platform features<br />
                  • To improve platform safety<br />
                  • To send important account notifications<br /><br />

                  <strong>Data Protection:</strong><br />
                  We never sell or share personal information with third parties.
                  This is an academic prototype; a full policy will be added prior
                  to public release.
                </p>
              )}

              {/* TERMS OF SERVICE */}
              {modalContent === "terms" && (
                <p>
                  These Terms govern the use of the My Pet, Your Pet platform.
                  <br /><br />

                  <strong>User Responsibilities:</strong><br />
                  • Provide accurate registration information<br />
                  • Treat pets, owners, and seekers respectfully<br />
                  • Use the platform appropriately and lawfully<br /><br />

                  <strong>Platform Responsibilities:</strong><br />
                  • Provide a safe and functional environment<br />
                  • Review user accounts before granting access<br /><br />

                  This platform is part of an academic project and not intended
                  for commercial use.
                </p>
              )}

              {/* CONTACT */}
              {modalContent === "contact" && (
                <p>
                  For questions or support, contact our team:
                  <br /><br />
                  <strong>mypetyourpet.team@example.com</strong>
                  <br /><br />
                  We typically respond within 1–2 business days during active
                  development.
                </p>
              )}
            </div>

            {/* Close Button */}
            <button className="footer-modal-close" onClick={closeModal}>
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}
