import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient"; // Make sure this is already configured
import Header from "../components/Header";
import "../styles/ReservationsView.css";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReservationsView({ embedded }) {
  const navigate = useNavigate();
  const accountId = localStorage.getItem("accountId"); // customerId (Seeker ID)
  const { pathname } = useLocation();
  const hideButton = pathname.startsWith("/owner/dashboard");

  // State to store reservation data
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reservation data on component load
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axiosClient.get(`/api/reservations/seeker/${accountId}`);
        setReservations(res.data || []);
      } catch (err) {
        console.error("Failed to load reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) fetchReservations();
  }, [accountId]);

  const handleFind = () => navigate("/allListings");

  // Categorization logic
  const upcomingReservations = reservations.filter((res) =>
    ["Pending", "Confirmed"].includes(res.petResStatus)
  );
  const pastReservations = reservations.filter((res) =>
    ["Completed"].includes(res.petResStatus)
  );

  // Stats
  const total = reservations.length;
  const pending = reservations.filter((res) => res.petResStatus === "Pending").length;
  const confirmed = reservations.filter((res) => res.petResStatus === "Confirmed").length;
  const completed = reservations.filter((res) => res.petResStatus === "Completed").length;

  return (
    <div className="reservations-page">
      {!embedded && <Header />}

      <div className="reservations-container">
        <h2 className="title">Reservations</h2>

        {/* Filters */}
        <div className="filters">
          {!embedded && (
            <select>
              <option>All roles</option>
              <option>Owner</option>
              <option>Seeker</option>
            </select>
          )}

          <select>
            <option>Any status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
          </select>

          <input type="text" placeholder="Search pets, people, IDs." />

          {!hideButton && (
            <button className="new-booking-btn" onClick={handleFind}>
              New Booking
            </button>
          )}
        </div>

        {/* Loading indicator */}
        {loading && <p className="placeholder">Loading reservations...</p>}

        {/* Upcoming Section */}
        <div className="section-card">
          <h3>Upcoming</h3>
          {upcomingReservations.length === 0 ? (
            <p className="placeholder">No upcoming reservations yet.</p>
          ) : (
            upcomingReservations.map((res) => (
              <p key={res.petResId}>
                Pet ID: {res.petId} | From:{" "}
                {new Date(res.startDate).toLocaleDateString()} →{" "}
                {new Date(res.endDate).toLocaleDateString()} | Status:{" "}
                {res.petResStatus}
              </p>
            ))
          )}
        </div>

        {/* Past Section */}
        <div className="section-card">
          <h3>Past</h3>
          {pastReservations.length === 0 ? (
            <p className="placeholder">No past reservations found.</p>
          ) : (
            pastReservations.map((res) => (
              <p key={res.petResId}>
                Pet ID: {res.petId} | From:{" "}
                {new Date(res.startDate).toLocaleDateString()} | Status:{" "}
                {res.petResStatus}
              </p>
            ))
          )}
        </div>

        {/* Stats Summary */}
        <div className="glance-card">
          <h3>At a glance</h3>
          <div className="glance-stats">
            <div className="stat-box">
              <div className="stat-value">{total}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{confirmed}</div>
              <div className="stat-label">Confirmed</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{completed}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {!embedded && <Footer />}
    </div>
  );
}
